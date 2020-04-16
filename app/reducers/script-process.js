import { createEntityAdapter } from '@reduxjs/toolkit';
import { LOAD_SCRIPT_PROCESS, UPDATE_PROGRESS } from '../actions/script-process';
import { StepProgress } from '../constants';

const scriptProcessAdapter = createEntityAdapter({
  selectId: (step) => step.name,
});

export default (
  state = scriptProcessAdapter.getInitialState({
    isLoaded: false,
    scriptName: undefined,
    stepIndex: undefined,
  }),
  action,
) => {
  switch (action.type) {
    case LOAD_SCRIPT_PROCESS: {
      return {
        ...state,
        ...scriptProcessAdapter.setAll(
          state,
          action.stepNames.map((stepName) => ({
            name: stepName,
            progress: StepProgress.NOT_STARTED,
          })),
        ),
        isLoaded: true,
        scriptName: action.scriptName,
        stepIndex: undefined,
      };
    }
    case UPDATE_PROGRESS: {
      return scriptProcessAdapter.updateOne(state, {
        id: action.stepName,
        changes: { progress: action.progress },
      });
    }
    default:
      return state;
  }
};
