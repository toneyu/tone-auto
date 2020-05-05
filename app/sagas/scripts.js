import { takeEvery, put, all } from 'redux-saga/effects';
import { parseStringPromise } from 'xml2js';
import { LOAD_SCRIPT_REQUEST, loadScriptSuccess, loadScriptFailure } from '../actions/scripts';

function* loadScriptSaga({ files }) {
  try {
    const scripts = yield all(
      files.map(async (file) => {
        const blob = new Blob([file]);
        const text = await new Response(blob).text();
        const parsedXml = await parseStringPromise(text, {
          explicitArray: false,
          trim: true,
          normalize: true,
        });

        return parsedXml;
      }),
    );

    yield put(loadScriptSuccess(scripts));
  } catch (e) {
    yield put(loadScriptFailure(e, files));
  }
}

export default function*() {
  yield takeEvery(LOAD_SCRIPT_REQUEST, loadScriptSaga);
}
