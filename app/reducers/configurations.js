import { createEntityAdapter } from '@reduxjs/toolkit';
import { LOAD_CONFIGURATION_SUCCESS } from '../actions/configurations';

const configurationAdapter = createEntityAdapter({
  selectId: (connection) => connection.host,
});

export default (state = configurationAdapter.getInitialState(), action) => {
  switch (action.type) {
    case LOAD_CONFIGURATION_SUCCESS:
      return configurationAdapter.addOne(state, {
        host: action.host,
        configuration: action.configuration,
      });
    default:
      return state;
  }
};
