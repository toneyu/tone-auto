export const DOWNLOAD_CONFIGURATION_REQUEST = 'xml-files/DOWNLOAD_CONFIGURATION_REQUEST';
export const DOWNLOAD_CONFIGURATION_SUCCESS = 'xml-files/DOWNLOAD_CONFIGURATION_SUCCESS';
export const DOWNLOAD_CONFIGURATION_FAILURE = 'xml-files/DOWNLOAD_CONFIGURATION_FAILURE';

export const downloadConfigurationRequest = (host) => ({
  type: DOWNLOAD_CONFIGURATION_REQUEST,
  host,
});

export const downloadConfigurationSuccess = (text) => ({
  type: DOWNLOAD_CONFIGURATION_SUCCESS,
  text,
});

export const downloadConfigurationFailure = (error) => ({
  type: DOWNLOAD_CONFIGURATION_FAILURE,
  error,
});
