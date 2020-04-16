export const progressSelector = (stepName) => (state) =>
  state.scriptProcess.entities[stepName].progress;

export const scriptNameProcessSelector = (state) => state.scriptProcess.scriptName;

export const stepLogsSelector = (stepName) => (state) =>
  state.scriptProcess.entities[stepName].logs.ids.map(
    (id) => state.scriptProcess.entities[stepName].logs.entities[id].log,
  );

export const stepsProcessSelector = (state) =>
  state.scriptProcess.ids.map((id) => state.scriptProcess.entities[id]);
