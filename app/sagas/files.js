import { takeEvery, all, put } from 'redux-saga/effects';
import Papa from 'papaparse';
import {
  LOAD_HOSTS_FILES_REQUEST,
  loadHostsFilesSuccess,
  loadHostsFilesFailure,
} from '../actions/hosts';
import { addConnections } from '../actions/connections';

function* loadHostsFilesSaga({ files }) {
  try {
    const csvTexts = yield all(
      files.map((file) => {
        const blob = new Blob([file]);
        return new Response(blob).text();
      }),
    );
    console.log(csvTexts);
    const parsedCsvs = csvTexts.flatMap(
      (csvText) =>
        Papa.parse(csvText, {
          header: true,
        }).data,
    );
    yield put(addConnections(parsedCsvs.filter(({ host }) => host.trim().length > 0)));
    yield put(loadHostsFilesSuccess(files));
  } catch (error) {
    yield put(loadHostsFilesFailure(error, files));
  }
}

export default function*() {
  yield takeEvery(LOAD_HOSTS_FILES_REQUEST, loadHostsFilesSaga);
}
