import * as jsxapi from 'jsxapi';
// import normalizePath from 'jsxapi/lib/xapi/normalizePath.js';
import { eventChannel } from 'redux-saga';
import {
  takeEvery,
  all,
  call,
  cancel,
  fork,
  put,
  race,
  take,
  takeLeading,
} from 'redux-saga/effects';
import {
  connectFailure,
  connectSuccess,
  CONNECT_REQUEST,
  disconnectSuccess,
  DISCONNECT_REQUEST,
  DISCONNECT_SUCCESS,
} from '../actions/connection';
import {
  SCRIPT_1_REQUEST,
  SCRIPT_2_REQUEST,
  SCRIPT_3_REQUEST,
  SCRIPT_4_REQUEST,
} from '../actions/scripts';
import {
  COMMAND_REQUEST,
  CONFIG_GET_REQUEST,
  CONFIG_SET_REQUEST,
  STATUS_GET_REQUEST,
  STATUS_SET_REQUEST,
} from '../actions/xapi';
import { script1Saga, script2Saga, script3Saga, script4Saga } from './scripts';
import { commandSaga, configGetSaga, configSetSaga, statusGetSaga, statusSetSaga } from './xapi';
import {
  SETUP_FEEDBACK_REQUEST,
  setupFeedbackFailure,
  setupFeedbackSuccess,
  TEARDOWN_FEEDBACK_REQUEST,
  teardownFeedbackFailure,
  teardownFeedbackSuccess,
} from '../actions/feedback';
import { updateStatus } from '../actions/statuses';

export function createFeedbackChannel(xapi, path) {
  return eventChannel((emit) => {
    let off = () => {};
    xapi.status.get(path).then((data) => {
      emit(data);
      off = xapi.status.on(path, (data, root) => {
        console.log(data);
        console.log(root);
        console.log(path);
        emit(data);
      });
    });

    // xapi.status.get('Status/Audio/Microphones/Mute');

    const unsubscribe = () => {
      off();
    };

    return unsubscribe;
  });
}

export function createXapiChannel(xapi) {
  return eventChannel((emit) => {
    xapi
      .on('error', emit)
      .on('ready', () => emit('open'))
      .on('close', () => emit('close'));

    const unsubscribe = () => {
      xapi.close();
    };

    return unsubscribe;
  });
}

export function* receiveMessagesWatcher(xapiChannel, host) {
  while (true) {
    const message = yield take(xapiChannel);
    if (message === 'close') {
      yield put(disconnectSuccess(host));
    } else if (message === 'open') {
      yield put(connectSuccess(host));
    } else {
      yield put(disconnectSuccess(host));
      console.error(message);
    }
  }
}

function* feedbackWatcher(xapi, host, { path }) {
  let updateStatusWatcher;
  let channel;
  try {
    channel = yield call(createFeedbackChannel, xapi, path);
    yield put(setupFeedbackSuccess(host, path));
    updateStatusWatcher = yield takeEvery(channel, function* a(data) {
      yield put(updateStatus(host, path, data));
    });
  } catch (error) {
    yield put(setupFeedbackFailure(host, path, error));
  }

  if (updateStatusWatcher && channel) {
    while (true) {
      try {
        yield take((action) => action.type === TEARDOWN_FEEDBACK_REQUEST && action.host === host);
        yield cancel(updateStatusWatcher);
        channel.close();
        yield put(teardownFeedbackSuccess(host, path));
        break;
      } catch (error) {
        yield put(teardownFeedbackFailure(host, path, error));
      }
    }
  }
}

export function* xapiWatcher(xapi, host) {
  const takeEveryHost = (pattern, saga) =>
    fork(function* a() {
      while (true) {
        const action = yield take(pattern);
        const { host: requestedHost } = action;
        if (requestedHost === host) {
          yield fork(saga, xapi, action);
        }
      }
    });

  yield takeEveryHost(COMMAND_REQUEST, commandSaga);
  yield takeEveryHost(STATUS_GET_REQUEST, statusGetSaga);
  yield takeEveryHost(STATUS_SET_REQUEST, statusSetSaga);
  yield takeEveryHost(CONFIG_GET_REQUEST, configGetSaga);
  yield takeEveryHost(CONFIG_SET_REQUEST, configSetSaga);

  yield takeLeading(SCRIPT_1_REQUEST, script1Saga, xapi);
  yield takeLeading(SCRIPT_2_REQUEST, script2Saga, xapi);
  yield takeLeading(SCRIPT_3_REQUEST, script3Saga, xapi);
  yield takeLeading(SCRIPT_4_REQUEST, script4Saga, xapi);

  // const muteChannel = yield call(createMuteChannel, xapi);
  // yield takeEvery(muteChannel, function* a(data) {
  //   yield put(updateStatus(host, 'Audio Microphones Mute', data));
  // });

  yield takeEvery(
    (action) => action.type === SETUP_FEEDBACK_REQUEST && action.host === host,
    feedbackWatcher,
    xapi,
    host,
  );
}

function* messagesWatcher(host, password) {
  try {
    const xapi = jsxapi.connect(`wss://${host}`, {
      username: 'admin',
      password,
    });
    const xapiChannel = yield call(createXapiChannel, xapi);

    const scripts = yield fork(xapiWatcher, xapi, host);

    const { disconnected } = yield race({
      listeners: all([call(receiveMessagesWatcher, xapiChannel, host)]),
      close: call(function* a() {
        let disconnectHost;
        do {
          ({ host: disconnectHost } = yield take(DISCONNECT_REQUEST));
        } while (disconnectHost !== host);
      }),
      disconnected: call(function* a() {
        let disconnectHost;
        do {
          ({ host: disconnectHost } = yield take(DISCONNECT_SUCCESS));
        } while (disconnectHost !== host);
      }),
    });

    yield cancel(scripts);
    yield xapi.close();

    yield xapiChannel.close();
    if (!disconnected) {
      yield put(disconnectSuccess(host));
    }
  } catch (e) {
    console.error(e.message);
    yield put(connectFailure(host, e));
  }
}

// const takeLeadingConnectionRequest = (patternOrChannel, saga, ...args) =>
//   fork(function* a() {
//     while (true) {
//       const action = yield take(patternOrChannel);
//       yield call(saga, ...args.concat(action));
//     }
//   });

export default function*() {
  // yield takeLeadingConnectionRequest(CONNECT_REQUEST, messagesWatcher);
  const activeHosts = new Set();

  while (true) {
    const { host, password } = yield take(CONNECT_REQUEST);
    if (!activeHosts.has(host)) {
      yield fork(function* a() {
        activeHosts.add(host);
        yield call(messagesWatcher, host, password);
        activeHosts.delete(host);
      });
    }
  }
}
