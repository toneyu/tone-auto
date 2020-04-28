import { parseStringPromise } from 'xml2js';
import { takeEvery, select, put, race, take } from 'redux-saga/effects';
import {
  START_SCRIPT_PROCESS,
  updateProgress,
  scriptProcessFailure,
} from '../actions/script-process';
import {
  scriptNameProcessSelector,
  createProcessHostsByKeySelector,
} from '../selectors/script-progress';
import { stepsSelector, scriptHostsSelector } from '../selectors/scripts';
import { putXmlRequest, PUT_XML_SUCCESS, PUT_XML_FAILURE } from '../actions/put-xml';
import { StepProgress } from '../constants';
import { connectionByNameSelector } from '../selectors/connections';

function* scriptProcessSaga({ processId }) {
  const scriptName = yield select(scriptNameProcessSelector(processId));
  const steps = yield select(stepsSelector(scriptName));
  const connectionByName = yield select(connectionByNameSelector);
  const processHostsByKey = yield select(createProcessHostsByKeySelector(processId));
  const hostKeys = yield select(scriptHostsSelector(scriptName));

  const processHostsSet = new Set(Object.keys(processHostsByKey));

  const missingHostKeys = hostKeys.filter((hostKey) => !processHostsSet.has(hostKey));

  // TODO: Handle errors
  if (missingHostKeys.length > 0) {
    yield put(
      scriptProcessFailure(
        processId,
        new Error(`Missing host keys: ${missingHostKeys.join(', ')}`),
      ),
    );
    return;
  }

  for (const step of steps) {
    switch (step.type) {
      case 'putxml': {
        const { payload } = step;
        const connection = connectionByName[processHostsByKey[payload.host]];
        if (!connection) {
          yield put(updateProgress(processId, step.name, StepProgress.ENDED_ERROR));
          throw new Error(`Connection host password ${payload.host} is missing`);
        }
        yield put(putXmlRequest(connection.host, payload.putxml));
        const { success, failure } = yield race({
          success: take(PUT_XML_SUCCESS),
          failure: take(PUT_XML_FAILURE),
        });
        if (success) {
          console.log(success);
          const log = yield parseStringPromise(success.response.data, {
            explicitArray: false,
            trim: true,
            normalize: true,
          });
          yield put(
            updateProgress(processId, step.name, StepProgress.ENDED_OK, JSON.stringify(log)),
          );
        } else {
          console.log(failure);
          yield put(
            updateProgress(processId, step.name, StepProgress.ENDED_ERROR, failure.error.message),
          );
          throw failure;
        }
        break;
      }
      default:
        break;
    }
  }
}

export default function*() {
  const runningProcessIds = new Set();
  yield takeEvery(START_SCRIPT_PROCESS, function*(action) {
    const { processId } = action;
    if (!runningProcessIds.has(processId)) {
      runningProcessIds.add(processId);
      yield* scriptProcessSaga(action);
      runningProcessIds.delete(processId);
    }
  });
}
