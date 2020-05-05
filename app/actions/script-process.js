import moment from 'moment';
import shortid from 'shortid';

export const LOAD_SCRIPT_PROCESS = 'script-process/LOAD_SCRIPT_PROCESS';
export const UPDATE_PROGRESS = 'script-process/UPDATE_PROGRESS';
export const START_SCRIPT_PROCESS = 'script-process/START_SCRIPT_PROCESS';
export const UPDATE_SCRIPT_HOST = 'script-process/UPDATE_SCRIPT_HOST';
export const SCRIPT_PROCESS_FAILURE = 'script-process/SCRIPT_PROCESS_FAILURE';
export const DELETE_SCRIPT_PROCESS = 'script-process/DELETE_SCRIPT_PROCESS';

export const loadScriptProcess = (scriptName, stepNames) => ({
  type: LOAD_SCRIPT_PROCESS,
  scriptName,
  stepNames,
  processId: shortid(),
});

export const updateProgress = (processId, stepName, progress, log) => ({
  type: UPDATE_PROGRESS,
  stepName,
  progress,
  log,
  timestamp: moment().format(),
  processId,
});

export const startScriptProcess = (processId) => ({
  type: START_SCRIPT_PROCESS,
  processId,
});

export const updateScriptHost = (key, processId, host) => ({
  type: UPDATE_SCRIPT_HOST,
  key,
  processId,
  host,
});

export const scriptProcessFailure = (processId, error) => ({
  type: SCRIPT_PROCESS_FAILURE,
  processId,
  error,
});

export const deleteScriptProcess = (processId) => ({
  type: DELETE_SCRIPT_PROCESS,
  processId,
});
