export const LOAD_CONFIGURATION_REQUEST = 'LOAD_CONFIGURATION_REQUEST';
export const LOAD_CONFIGURATION_SUCCESS = 'LOAD_CONFIGURATION_SUCCESS';
export const LOAD_CONFIGURATION_FAILURE = 'LOAD_CONFIGURATION_FAILURE';

export const loadConfigurationRequest = (host) => ({
  type: LOAD_CONFIGURATION_REQUEST,
  host,
});

export const loadConfigurationSuccess = (host, configuration) => ({
  type: LOAD_CONFIGURATION_SUCCESS,
  host,
  configuration,
});

export const loadConfigurationFailure = (error, host) => ({
  type: LOAD_CONFIGURATION_FAILURE,
  error,
  host,
});
