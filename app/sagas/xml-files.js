import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import {
  downloadConfigurationFailure,
  DOWNLOAD_CONFIGURATION_REQUEST,
  downloadConfigurationSuccess,
} from '../actions/xml-files';

function* downloadConfiguration({ host }) {
  const { password } = yield select((state) => state.connection.byHost[host]);

  try {
    // TODO: Stop hardcoding username 'admin'
    const { data } = yield axios.get(`https://${host}/configuration.xml`, {
      auth: {
        username: 'admin',
        password,
      },
    });
    console.log(data);
    saveAs(new File([data], `configuration-${host}.xml`, { type: 'text/xml' }));
    yield put(downloadConfigurationSuccess(data));
  } catch (error) {
    yield put(downloadConfigurationFailure(error));
  }
}

export default function*() {
  yield takeLatest(DOWNLOAD_CONFIGURATION_REQUEST, downloadConfiguration);
}
