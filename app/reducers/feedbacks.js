import { createEntityAdapter } from '@reduxjs/toolkit';
import {
  TEARDOWN_FEEDBACK_REQUEST,
  TEARDOWN_FEEDBACK_SUCCESS,
  SETUP_FEEDBACK_REQUEST,
  SETUP_FEEDBACK_SUCCESS,
  SETUP_FEEDBACK_FAILURE,
  TEARDOWN_FEEDBACK_FAILURE,
} from '../actions/feedback';
import { FeedbackStatus } from '../constants';

const statusesAttachedAdapter = createEntityAdapter({
  selectId: (status) => status.host,
});

export default (state = statusesAttachedAdapter.getInitialState(), action) => {
  switch (action.type) {
    case SETUP_FEEDBACK_REQUEST: {
      return statusesAttachedAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: FeedbackStatus.CONNECTING,
      });
    }
    case SETUP_FEEDBACK_SUCCESS: {
      return statusesAttachedAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: FeedbackStatus.CONNECTED,
      });
    }
    case SETUP_FEEDBACK_FAILURE: {
      return statusesAttachedAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: FeedbackStatus.DISCONNECTED,
      });
    }
    case TEARDOWN_FEEDBACK_REQUEST: {
      return statusesAttachedAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: FeedbackStatus.DISCONNECTING,
      });
    }
    case TEARDOWN_FEEDBACK_SUCCESS: {
      return statusesAttachedAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: FeedbackStatus.DISCONNECTED,
      });
    }
    case TEARDOWN_FEEDBACK_FAILURE: {
      return statusesAttachedAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: FeedbackStatus.CONNECTED,
      });
    }
    default:
      return state;
  }
};
