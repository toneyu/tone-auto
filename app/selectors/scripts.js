import { createSelector } from 'reselect';
import { getStep, getSteps } from '../utils/script-process';

export const scriptNamesSelector = (state) => state.scripts.ids;

export const scriptDescriptionSelector = (scriptName) => (state) =>
  state.scripts.entities[scriptName]?.Script.$.description;

export const createStepSelector = () =>
  createSelector(
    [
      (state) => state.scripts.entities[state.scriptProcess.scriptName],
      (_, stepIndex) => stepIndex,
    ],
    (script, stepIndex) => getStep(script, stepIndex),
  );

export const scriptLoadedSelector = (state) => state.scriptProcess.isLoaded;

export const loadedScriptNameSelector = (state) => state.scriptProcess.scriptName;

export const loadedStepNamesSelector = (state) => {
  const steps = state.scripts.entities[state.scriptProcess.scriptName]?.Script.Steps.Step;
  return steps ? steps.map((step) => step.$.name) : undefined;
};

export const stepNamesSelector = (scriptName) => (state) => {
  const steps = state.scripts.entities[scriptName]?.Script.Steps.Step;
  return steps ? steps.map((step) => step.$.name) : undefined;
};

export const stepsSelector = (scriptName) => (state) => {
  return getSteps(state.scripts.entities[scriptName]);
};
