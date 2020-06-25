import { all } from 'redux-saga/effects';

import connection from './connection';
import files from './files';
import xmlFiles from './xml-files';
import putXml from './put-xml';
import scriptProcess from './script-process';
import scripts from './scripts';
import configurations from './configurations';

export default function* rootSaga() {
  yield all([
    scripts(),
    connection(),
    files(),
    xmlFiles(),
    putXml(),
    scriptProcess(),
    configurations(),
  ]);
}
