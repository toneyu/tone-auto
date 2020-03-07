export const connectionStatusSelector = (host) => (state) =>
  state.connection.entities[host]?.status;
