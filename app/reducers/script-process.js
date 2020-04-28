import { createEntityAdapter } from '@reduxjs/toolkit';
import {
  LOAD_SCRIPT_PROCESS,
  UPDATE_PROGRESS,
  UPDATE_SCRIPT_HOST,
  SCRIPT_PROCESS_FAILURE,
} from '../actions/script-process';
import { StepProgress } from '../constants';

const proccessAdapter = createEntityAdapter();

const scriptProcessAdapter = createEntityAdapter({
  selectId: (step) => step.name,
});

const logsAdapter = createEntityAdapter({
  selectId: (logEntity) => logEntity.timestamp,
});

const hostsAdapter = createEntityAdapter({
  selectId: (entity) => entity.key,
});

export default (state = proccessAdapter.getInitialState(), action) => {
  switch (action.type) {
    case LOAD_SCRIPT_PROCESS: {
      return proccessAdapter.addOne(state, {
        ...scriptProcessAdapter.setAll(
          state.entities[action.processId] ?? {},
          action.stepNames.map((stepName) => ({
            name: stepName,
            progress: StepProgress.NOT_STARTED,
            logs: logsAdapter.getInitialState(),
          })),
        ),
        hosts: hostsAdapter.getInitialState(),
        scriptName: action.scriptName,
        stepIndex: undefined,
        id: action.processId,
      });
    }
    case UPDATE_PROGRESS: {
      return proccessAdapter.updateOne(state, {
        id: action.processId,
        changes: scriptProcessAdapter.updateOne(state.entities[action.processId], {
          id: action.stepName,
          changes: {
            progress: action.progress,
            logs: logsAdapter.addOne(
              state.entities[action.processId].entities[action.stepName].logs,
              {
                timestamp: action.timestamp,
                log: action.log,
              },
            ),
          },
        }),
      });
    }
    case UPDATE_SCRIPT_HOST: {
      return proccessAdapter.updateOne(state, {
        id: action.processId,
        changes: {
          hosts: hostsAdapter.upsertOne(state.entities[action.processId].hosts, {
            key: action.key,
            host: action.host,
          }),
        },
      });
    }
    case SCRIPT_PROCESS_FAILURE: {
      return proccessAdapter.updateOne(state, {
        id: action.processId,
        changes: {
          stepIndex: undefined,
        },
      });
    }
    default:
      return state;
  }
};
