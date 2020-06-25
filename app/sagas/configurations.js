import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import {
  loadConfigurationSuccess,
  loadConfigurationFailure,
  LOAD_CONFIGURATION_REQUEST,
} from '../actions/configurations';

function* loadConfiguration({ host }) {
  const { password } = yield select((state) => state.connection.entities[host]);

  try {
    // TODO: Stop hardcoding username 'admin'
    const { data: configuration } = yield axios.get(`https://${host}/configuration.xml`, {
      auth: {
        username: 'admin',
        password,
      },
    });
    yield put(loadConfigurationSuccess(host, configuration));
  } catch (error) {
    yield put(loadConfigurationFailure(error, host));
  }
}

export default function*() {
  yield takeLatest(LOAD_CONFIGURATION_REQUEST, loadConfiguration);
}
