export const configurationsSelector = (host) => (state) =>
  state.configurations.entities[host]?.configuration;
