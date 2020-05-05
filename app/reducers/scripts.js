import { createEntityAdapter } from '@reduxjs/toolkit';
import { LOAD_SCRIPT_SUCCESS } from '../actions/scripts';

const scriptsAdapter = createEntityAdapter({
  selectId: (script) => script.Script.$.name,
});

export default (state = scriptsAdapter.getInitialState(), action) => {
  switch (action.type) {
    case LOAD_SCRIPT_SUCCESS: {
      return scriptsAdapter.addMany(state, action.scripts);
    }
    default:
      return state;
  }
};
