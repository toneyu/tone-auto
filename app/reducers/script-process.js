import { createEntityAdapter } from '@reduxjs/toolkit';
import { LOAD_SCRIPT_PROCESS, UPDATE_PROGRESS } from '../actions/script-process';
import { StepProgress } from '../constants';

const scriptProcessAdapter = createEntityAdapter({
  selectId: (step) => step.name,
});

const logsAdapter = createEntityAdapter({
  selectId: (logEntity) => logEntity.timestamp,
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
            logs: logsAdapter.getInitialState(),
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
        changes: {
          progress: action.progress,
          logs: logsAdapter.addOne(state.entities[action.stepName].logs, {
            timestamp: action.timestamp,
            log: action.log,
          }),
        },
      });
    }
    default:
      return state;
  }
};
