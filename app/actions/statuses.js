export const UPDATE_STATUS = 'status/UPDATE_STATUS';

export const updateStatus = (host, path, status) => ({
  type: UPDATE_STATUS,
  host,
  path,
  status,
});
