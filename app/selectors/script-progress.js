import { createSelector } from '@reduxjs/toolkit';

export const progressSelector = (processId, stepName) => (state) =>
  state.scriptProcess.entities[processId].entities[stepName].progress;

export const scriptNameProcessSelector = (processId) => (state) =>
  state.scriptProcess.entities[processId].scriptName;

export const stepLogEntitiesSelector = (processId, stepName) => (state) =>
  state.scriptProcess.entities[processId].entities[stepName].logs.ids.map(
    (id) => state.scriptProcess.entities[processId].entities[stepName].logs.entities[id],
  );

export const stepsProcessSelector = (processId) => (state) =>
  state.scriptProcess.entities[processId].ids.map(
    (id) => state.scriptProcess.entities[processId].entities[id],
  );

export const processesIdsSelector = (state) => state.scriptProcess.ids;

export const createProcessHostsByKeySelector = (processId) =>
  createSelector(
    [(state) => state.scriptProcess.entities[processId].hosts.entities],
    (entities) =>
      Object.values(entities).reduce((acc, entity) => ({ ...acc, [entity.key]: entity.host }), {}),
  );

export const hostNameSelector = (processId, host) => (state) =>
  state.scriptProcess.entities[processId].hosts.entities[host]?.host;