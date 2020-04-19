import { createSelector } from 'reselect';
import { getStep, getSteps } from '../utils/script-process';

export const scriptNamesSelector = (state) => state.scripts.ids;

export const scriptDescriptionSelector = (scriptName) => (state) =>
  state.scripts.entities[scriptName]?.Script.$.description;

export const createStepSelector = (processId) =>
  createSelector(
    [
      (state) => state.scripts.entities[state.scriptProcess.entities[processId].scriptName],
      (_, stepIndex) => stepIndex,
    ],
    (script, stepIndex) => getStep(script, stepIndex),
  );

export const scriptLoadedSelector = (processId) => (state) =>
  state.scriptProcess.entities[processId].isLoaded;

export const loadedScriptNameSelector = (processId) => (state) =>
  state.scriptProcess.entities[processId].scriptName;

export const loadedStepNamesSelector = (processId) => (state) => {
  let steps =
    state.scripts.entities[state.scriptProcess.entities[processId].scriptName]?.Script.Steps.Step;
  if (!Array.isArray(steps)) {
    steps = [steps];
  }
  return steps ? steps.map((step) => step.$.name) : undefined;
};

export const stepNamesSelector = (scriptName) => (state) => {
  let steps = state.scripts.entities[scriptName]?.Script.Steps.Step;
  if (!Array.isArray(steps)) {
    steps = [steps];
  }
  return steps ? steps.map((step) => step.$.name) : undefined;
};

export const stepsSelector = (scriptName) => (state) => {
  return getSteps(state.scripts.entities[scriptName]);
};
