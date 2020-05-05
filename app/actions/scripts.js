export const LOAD_SCRIPT_REQUEST = 'scripts/LOAD_SCRIPT_REQUEST';
export const LOAD_SCRIPT_SUCCESS = 'scripts/LOAD_SCRIPT_SUCCESS';
export const LOAD_SCRIPT_FAILURE = 'scripts/LOAD_SCRIPT_FAILURE';

export const loadScriptRequest = (files) => ({
  type: LOAD_SCRIPT_REQUEST,
  files,
});

export const loadScriptSuccess = (scripts) => ({
  type: LOAD_SCRIPT_SUCCESS,
  scripts,
});

export const loadScriptFailure = (error, files) => ({
  type: LOAD_SCRIPT_FAILURE,
  error,
  files,
});
