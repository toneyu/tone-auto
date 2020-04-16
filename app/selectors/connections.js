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
