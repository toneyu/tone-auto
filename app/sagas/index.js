import { all } from 'redux-saga/effects';

import connection from './connection';
import files from './files';
import xmlFiles from './xml-files';

export default function* rootSaga() {
  yield all([connection(), files(), xmlFiles()]);
}
