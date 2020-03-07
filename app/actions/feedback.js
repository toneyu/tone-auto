export const SETUP_FEEDBACK_REQUEST = 'status/SETUP_FEEDBACK_REQUEST';
export const SETUP_FEEDBACK_SUCCESS = 'status/SETUP_FEEDBACK_SUCCESS';
export const SETUP_FEEDBACK_FAILURE = 'status/SETUP_FEEDBACK_FAILURE';
export const TEARDOWN_FEEDBACK_REQUEST = 'status/TEARDOWN_FEEDBACK_REQUEST';
export const TEARDOWN_FEEDBACK_SUCCESS = 'status/TEARDOWN_FEEDBACK_SUCCESS';
export const TEARDOWN_FEEDBACK_FAILURE = 'status/TEARDOWN_FEEDBACK_FAILURE';

export const setupFeedbackRequest = (host, path) => ({
  type: SETUP_FEEDBACK_REQUEST,
  host,
  path,
});

export const setupFeedbackSuccess = (host, path) => ({
  type: SETUP_FEEDBACK_SUCCESS,
  host,
  path,
});

export const setupFeedbackFailure = (host, path, error) => ({
  type: SETUP_FEEDBACK_FAILURE,
  host,
  path,
  error,
});

export const teardownFeedbackRequest = (host, path) => ({
  type: TEARDOWN_FEEDBACK_REQUEST,
  host,
  path,
});

export const teardownFeedbackSuccess = (host, path) => ({
  type: TEARDOWN_FEEDBACK_SUCCESS,
  host,
  path,
});

export const teardownFeedbackFailure = (host, path, error) => ({
  type: TEARDOWN_FEEDBACK_FAILURE,
  host,
  path,
  error,
});
