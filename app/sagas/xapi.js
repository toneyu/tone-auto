import { put } from 'redux-saga/effects';
import {
  commandSuccess,
  commandFailure,
  configSetSuccess,
  configSetFailure,
  statusSetSuccess,
  statusSetFailure,
} from '../actions/xapi';

export function* commandSaga(xapi, args) {
  try {
    const response = yield xapi.command(...args);
    console.log(response);

    yield put(commandSuccess(response));
  } catch (e) {
    yield put(commandFailure(e));
  }
}

export function* configSetSaga(xapi, args) {
  try {
    const response = yield xapi.config.set(...args);
    console.log(response);

    yield put(configSetSuccess(response));
  } catch (e) {
    yield put(configSetFailure(e));
  }
}

export function* statusSetSaga(xapi, args) {
  try {
    const response = yield xapi.config.set(...args);
    console.log(response);

    yield put(statusSetSuccess(response));
  } catch (e) {
    yield put(statusSetFailure(e));
  }
}
