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

export const connectSuccess = () => ({
  type: CONNECT_SUCCESS,
});

export const connectFailure = (error) => ({
  type: CONNECT_FAILURE,
  error,
});

export const disconnectRequest = () => ({
  type: DISCONNECT_REQUEST,
});

export const disconnectSuccess = () => ({
  type: DISCONNECT_SUCCESS,
});
