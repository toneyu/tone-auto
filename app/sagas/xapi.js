import { put } from 'redux-saga/effects';
import {
  commandSuccess,
  commandFailure,
  configSetSuccess,
  configSetFailure,
  statusSetSuccess,
  statusSetFailure,
  configGetSuccess,
  configGetFailure,
  statusGetFailure,
  statusGetSuccess,
} from '../actions/xapi';

export function* commandSaga(xapi, { args }) {
  try {
    const response = yield xapi.command(...args);
    console.log(response);

    yield put(commandSuccess(response));
  } catch (e) {
    yield put(commandFailure(e));
  }
}

export function* configGetSaga(xapi, { args }) {
  try {
    const response = yield xapi.config.get(...args);
    console.log(response);

    yield put(configGetSuccess(response));
  } catch (e) {
    yield put(configGetFailure(e));
  }
}

export function* statusGetSaga(xapi, { args }) {
  try {
    const response = yield xapi.status.get(...args);
    console.log(response);

    yield put(statusGetSuccess(response));
  } catch (e) {
    yield put(statusGetFailure(e));
  }
}

export function* configSetSaga(xapi, { args }) {
  try {
    const response = yield xapi.config.set(...args);
    console.log(response);

    yield put(configSetSuccess(response));
  } catch (e) {
    yield put(configSetFailure(e));
  }
}

export function* statusSetSaga(xapi, { args }) {
  try {
    const response = yield xapi.status.set(...args);
    console.log(response);

    yield put(statusSetSuccess(response));
  } catch (e) {
    yield put(statusSetFailure(e));
  }
}
