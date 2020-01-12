export const LOAD_HOSTS_FILES_REQUEST = 'hosts/LOAD_HOSTS_FILES_REQUEST';
export const LOAD_HOSTS_FILES_SUCCESS = 'hosts/LOAD_HOSTS_FILES_SUCCESS';
export const LOAD_HOSTS_FILES_FAILURE = 'hosts/LOAD_HOSTS_FILES_FAILURE';

export const loadHostsFilesRequest = (files) => ({
  type: LOAD_HOSTS_FILES_REQUEST,
  files,
});
export const loadHostsFilesSuccess = (hosts, passwords) => ({
  type: LOAD_HOSTS_FILES_SUCCESS,
  hosts,
  passwords,
});
export const loadHostsFilesFailure = (error, files) => ({
  type: LOAD_HOSTS_FILES_FAILURE,
  error,
  files,
});
