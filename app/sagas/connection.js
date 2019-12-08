import { eventChannel } from 'redux-saga';
import { take, call, all, race, put, takeLeading, fork, cancel } from 'redux-saga/effects';
import * as jsxapi from 'jsxapi';

import {
  CONNECT_REQUEST,
  DISCONNECT_REQUEST,
  connectSuccess,
  disconnectSuccess,
  DISCONNECT_SUCCESS,
} from '../actions/connection';
import {
  SCRIPT_1_REQUEST,
  SCRIPT_2_REQUEST,
  SCRIPT_3_REQUEST,
  SCRIPT_4_REQUEST,
} from '../actions/scripts';
import { COMMAND_REQUEST, STATUS_SET_REQUEST, CONFIG_SET_REQUEST } from '../actions/xapi';
import { script1Saga, script2Saga, script3Saga, script4Saga } from './scripts';
import { commandSaga, statusSetSaga, configSetSaga } from './xapi';

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

export function* receiveMessagesWatcher(xapiChannel) {
  while (true) {
    const message = yield take(xapiChannel);
    if (message === 'close') {
      yield put(disconnectSuccess());
    } else if (message === 'open') {
      yield put(connectSuccess());
    } else {
      yield put(disconnectSuccess(message));
      console.error(message);
    }
  }
}

export function* xapiWatcher(xapi) {
  yield takeLeading(SCRIPT_1_REQUEST, script1Saga, xapi);
  yield takeLeading(SCRIPT_2_REQUEST, script2Saga, xapi);
  yield takeLeading(SCRIPT_3_REQUEST, script3Saga, xapi);
  yield takeLeading(SCRIPT_4_REQUEST, script4Saga, xapi);

  yield takeLeading(COMMAND_REQUEST, commandSaga, xapi);
  yield takeLeading(STATUS_SET_REQUEST, statusSetSaga, xapi);
  yield takeLeading(CONFIG_SET_REQUEST, configSetSaga, xapi);
}

export default function* messagesWatcher() {
  let requestedNewWhileConnected = false;
  let host;
  let password;
  while (true) {
    try {
      if (!requestedNewWhileConnected) {
        ({ host, password } = yield take(CONNECT_REQUEST));
      }

      const xapi = jsxapi.connect(`ssh://${host}`, {
        username: 'admin',
        password,
      });
      const xapiChannel = yield call(createXapiChannel, xapi);

      const scripts = yield fork(xapiWatcher, xapi);

      const { requestAction, disconnected } = yield race({
        listeners: all([call(receiveMessagesWatcher, xapiChannel)]),
        close: take(DISCONNECT_REQUEST),
        requestAction: take(CONNECT_REQUEST),
        disconnected: take(DISCONNECT_SUCCESS),
      });

      requestedNewWhileConnected = requestAction !== undefined;
      if (requestedNewWhileConnected) {
        ({ host, password } = requestAction);
      }

      yield cancel(scripts);
      yield xapi.close();

      yield xapiChannel.close();
      if (!disconnected) {
        yield put(disconnectSuccess());
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}
