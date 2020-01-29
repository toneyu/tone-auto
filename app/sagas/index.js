import { all } from 'redux-saga/effects';

import connection from './connection';
import files from './files';
import xmlFiles from './xml-files';
import putXml from './put-xml';

export default function* rootSaga() {
  yield all([connection(), files(), xmlFiles(), putXml()]);
}
