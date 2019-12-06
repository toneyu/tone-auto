import { all } from 'redux-saga/effects';

import connection from './connection';

export default function* rootSaga() {
  yield all([connection()]);
}
