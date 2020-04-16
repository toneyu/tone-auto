import { parseStringPromise } from 'xml2js';
import { takeLeading, select, put, race, take } from 'redux-saga/effects';
import { START_SCRIPT_PROCESS, updateProgress } from '../actions/script-process';
import { scriptNameProcessSelector } from '../selectors/script-progress';
import { stepsSelector } from '../selectors/scripts';
import { putXmlRequest, PUT_XML_SUCCESS, PUT_XML_FAILURE } from '../actions/put-xml';
import { StepProgress } from '../constants';
import { connectionByNameSelector } from '../selectors/connections';

function* scriptProcessSaga() {
  const scriptName = yield select(scriptNameProcessSelector);
  const steps = yield select(stepsSelector(scriptName));
  const connectionByName = yield select(connectionByNameSelector);

  for (const step of steps) {
    switch (step.type) {
      case 'putxml': {
        const { payload } = step;
        const connection = connectionByName[payload.host];
        if (!connection) {
          yield put(updateProgress(step.name, StepProgress.ENDED_ERROR));
          throw new Error(`Connection host password ${payload.host} is missing`);
        }
        yield put(putXmlRequest(connectionByName[payload.host].host, payload.putxml));
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
          yield put(updateProgress(step.name, StepProgress.ENDED_OK, JSON.stringify(log)));
        } else {
          console.log(failure);
          yield put(updateProgress(step.name, StepProgress.ENDED_ERROR, failure.error.message));
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
  yield takeLeading(START_SCRIPT_PROCESS, scriptProcessSaga);
}
