export const SETUP_STATUS_FEEDBACK_REQUEST = 'status/SETUP_STATUS_FEEDBACK_REQUEST';
export const SETUP_STATUS_FEEDBACK_SUCCESS = 'status/SETUP_STATUS_FEEDBACK_SUCCESS';
export const SETUP_STATUS_FEEDBACK_FAILURE = 'status/SETUP_STATUS_FEEDBACK_FAILURE';
export const UPDATE_STATUS = 'status/UPDATE_STATUS';

export const setupStatusFeedbackRequest = (host, path) => ({
  type: SETUP_STATUS_FEEDBACK_REQUEST,
  host,
  path,
});

export const setupStatusFeedbackSuccess = (host, path) => ({
  type: SETUP_STATUS_FEEDBACK_SUCCESS,
  host,
  path,
});

export const setupStatusFeedbackFailure = (host, path, error) => ({
  type: SETUP_STATUS_FEEDBACK_FAILURE,
  host,
  path,
  error,
});

export const updateStatus = (host, path, status) => ({
  type: UPDATE_STATUS,
  host,
  path,
  status,
});
