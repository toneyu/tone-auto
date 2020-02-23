import { put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { putXmlSuccess, putXmlFailure, PUT_XML_REQUEST } from '../actions/put-xml';

function* putXmlSaga({ host, id, body }) {
  const { password } = yield select((state) => state.connection.entities[host]);

  try {
    // const response = yield xapi.command(...args);
    // console.log(response);

    // TODO: Stop hardcoding username 'admin'
    const response = yield axios.post(`https://${host}/putxml`, body, {
      auth: {
        username: 'admin',
        password,
      },
    });

    console.log(response);

    yield put(putXmlSuccess(id, response));
  } catch (error) {
    yield put(putXmlFailure(id, error));
  }
}

export default function*() {
  yield takeEvery(PUT_XML_REQUEST, putXmlSaga);
}
