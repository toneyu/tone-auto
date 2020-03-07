export const statusSelector = (host, path) => (state) => state.statuses.entities[host]?.[path];
