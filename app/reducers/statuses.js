import { createEntityAdapter } from '@reduxjs/toolkit';
import { UPDATE_STATUS } from '../actions/statuses';

const statusesAdapter = createEntityAdapter({
  selectId: (status) => status.host,
});

export default (state = statusesAdapter.getInitialState(), action) => {
  switch (action.type) {
    case UPDATE_STATUS: {
      return statusesAdapter.upsertOne(state, {
        host: action.host,
        [action.path]: action.status,
      });
    }
    default:
      return state;
  }
};
