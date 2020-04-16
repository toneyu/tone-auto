import shortid from 'shortid';

export const PUT_XML_REQUEST = 'put-xml/PUT_XML_REQUEST';
export const PUT_XML_SUCCESS = 'put-xml/PUT_XML_SUCCESS';
export const PUT_XML_FAILURE = 'put-xml/PUT_XML_FAILURE';

export const putXmlRequest = (host, body) => ({
  type: PUT_XML_REQUEST,
  host,
  body,
  id: shortid(),
});

export const putXmlSuccess = (id, response) => ({
  type: PUT_XML_SUCCESS,
  id,
  response,
});

export const putXmlFailure = (id, error) => ({
  type: PUT_XML_FAILURE,
  id,
  error,
});
