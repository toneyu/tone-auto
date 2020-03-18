export const LOAD_SCRIPT_PROCESS = 'script-process/LOAD_SCRIPT_PROCESS';

export const loadScriptProcess = (scriptName) => ({
  type: LOAD_SCRIPT_PROCESS,
  scriptName,
});
