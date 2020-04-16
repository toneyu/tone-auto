import moment from 'moment';

export const LOAD_SCRIPT_PROCESS = 'script-process/LOAD_SCRIPT_PROCESS';
export const UPDATE_PROGRESS = 'script-process/UPDATE_PROGRESS';
export const START_SCRIPT_PROCESS = 'script-process/START_SCRIPT_PROCESS';

export const loadScriptProcess = (scriptName, stepNames) => ({
  type: LOAD_SCRIPT_PROCESS,
  scriptName,
  stepNames,
});

export const updateProgress = (stepName, progress, log) => ({
  type: UPDATE_PROGRESS,
  stepName,
  progress,
  log,
  timestamp: moment().format(),
});

export const startScriptProcess = () => ({
  type: START_SCRIPT_PROCESS,
});
