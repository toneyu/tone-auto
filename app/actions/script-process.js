import moment from 'moment';
import shortid from 'shortid';

export const LOAD_SCRIPT_PROCESS = 'script-process/LOAD_SCRIPT_PROCESS';
export const UPDATE_PROGRESS = 'script-process/UPDATE_PROGRESS';
export const START_SCRIPT_PROCESS = 'script-process/START_SCRIPT_PROCESS';

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
