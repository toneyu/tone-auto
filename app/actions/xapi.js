export const COMMAND_REQUEST = 'xapi/COMMAND_REQUEST';
export const COMMAND_SUCCESS = 'xapi/COMMAND_SUCCESS';
export const COMMAND_FAILURE = 'xapi/COMMAND_FAILURE';

export const STATUS_GET_REQUEST = 'xapi/STATUS_GET_REQUEST';
export const STATUS_GET_SUCCESS = 'xapi/STATUS_GET_SUCCESS';
export const STATUS_GET_FAILURE = 'xapi/STATUS_GET_FAILURE';

export const STATUS_SET_REQUEST = 'xapi/STATUS_SET_REQUEST';
export const STATUS_SET_SUCCESS = 'xapi/STATUS_SET_SUCCESS';
export const STATUS_SET_FAILURE = 'xapi/STATUS_SET_FAILURE';

export const CONFIG_GET_REQUEST = 'xapi/CONFIG_GET_REQUEST';
export const CONFIG_GET_SUCCESS = 'xapi/CONFIG_GET_SUCCESS';
export const CONFIG_GET_FAILURE = 'xapi/CONFIG_GET_FAILURE';

export const CONFIG_SET_REQUEST = 'xapi/CONFIG_SET_REQUEST';
export const CONFIG_SET_SUCCESS = 'xapi/CONFIG_SET_SUCCESS';
export const CONFIG_SET_FAILURE = 'xapi/CONFIG_SET_FAILURE';

export const commandRequest = (host, ...args) => ({
  type: COMMAND_REQUEST,
  args,
  host,
});

export const commandSuccess = (host) => ({
  type: COMMAND_SUCCESS,
  host,
});

export const commandFailure = (host, error) => ({
  type: COMMAND_FAILURE,
  error,
  host,
});

export const statusGetRequest = (host, ...args) => ({
  type: STATUS_GET_REQUEST,
  args,
  host,
});

export const statusGetSuccess = (host, ...args) => ({
  type: STATUS_GET_SUCCESS,
  args,
  host,
});

export const statusGetFailure = (host, error) => ({
  type: STATUS_GET_FAILURE,
  error,
  host,
});

export const statusSetRequest = (host, ...args) => ({
  type: STATUS_SET_REQUEST,
  args,
  host,
});

export const statusSetSuccess = (host, ...args) => ({
  type: STATUS_SET_SUCCESS,
  args,
  host,
});

export const statusSetFailure = (host, error) => ({
  type: STATUS_SET_FAILURE,
  error,
  host,
});

export const configSetRequest = (host, ...args) => ({
  type: CONFIG_SET_REQUEST,
  args,
  host,
});

export const configSetSuccess = (host, ...args) => ({
  type: CONFIG_SET_SUCCESS,
  args,
  host,
});

export const configSetFailure = (host, error) => ({
  type: CONFIG_SET_FAILURE,
  error,
  host,
});

export const configGetRequest = (host, ...args) => ({
  type: CONFIG_GET_REQUEST,
  args,
  host,
});

export const configGetSuccess = (host, ...args) => ({
  type: CONFIG_GET_SUCCESS,
  args,
  host,
});

export const configGetFailure = (host, error) => ({
  type: CONFIG_GET_FAILURE,
  error,
  host,
});
