import { createSelector } from '@reduxjs/toolkit';

export const connectionStatusSelector = (host) => (state) =>
  state.connection.entities[host]?.status;

export const connectionByNameSelector = (state) =>
  Object.values(state.connection.entities).reduce(
    (acc, curr) => ({
      ...acc,
      [curr.endpoint]: curr,
    }),
    {},
  );

export const connectionEndpointsSelector = createSelector(
  [(state) => state.connection.ids, (state) => state.connection.entities],
  (ids, entities) => ids.map((id) => entities[id].endpoint),
);
