export const progressSelector = (stepName) => (state) =>
  state.scriptProcess.entities[stepName].progress;

export const scriptNameProcessSelector = (state) => state.scriptProcess.scriptName;
