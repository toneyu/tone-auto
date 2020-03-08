export const CONNECT_REQUEST = 'connection/CONNECT_REQUEST';
export const CONNECT_SUCCESS = 'connection/CONNECT_SUCCESS';
export const CONNECT_FAILURE = 'connection/CONNECT_FAILURE';

export const DISCONNECT_REQUEST = 'connection/DISCONNECT_REQUEST';
export const DISCONNECT_SUCCESS = 'connection/DISCONNECT_SUCCESS';

export const connectRequest = (host, password) => ({
  type: CONNECT_REQUEST,
  host,
  password,
});

export const connectSuccess = (host) => ({
  type: CONNECT_SUCCESS,
  host,
});

export const connectFailure = (host, error) => ({
  type: CONNECT_FAILURE,
  host,
  error,
});

export const disconnectRequest = (host) => ({
  type: DISCONNECT_REQUEST,
  host,
});

export const disconnectSuccess = (host) => ({
  type: DISCONNECT_SUCCESS,
  host,
});
