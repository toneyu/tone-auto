export const LOAD_SCRIPT_FILE_REQUEST = 'script-files/LOAD_SCRIPT_FILE_REQUEST';
export const LOAD_SCRIPT_FILE_SUCCESS = 'script-files/LOAD_SCRIPT_FILE_SUCCESS';
export const LOAD_SCRIPT_FILE_FAILURE = 'script-files/LOAD_SCRIPT_FILE_FAILURE';

export const loadScriptFileRequest = (file) => ({
  type: LOAD_SCRIPT_FILE_REQUEST,
  file,
});

export const loadScriptFileSuccess = (script) => ({
  type: LOAD_SCRIPT_FILE_SUCCESS,
  script,
});

export const loadScriptFileFailure = (error) => ({
  type: LOAD_SCRIPT_FILE_FAILURE,
  error,
});
