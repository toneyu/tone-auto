import { createEntityAdapter } from '@reduxjs/toolkit';
import { ADD_SCRIPT } from '../actions/scripts';

const scriptsAdapter = createEntityAdapter({
  selectId: (script) => script.Script.$.name,
});

export default (state = scriptsAdapter.getInitialState(), action) => {
  switch (action.type) {
    case ADD_SCRIPT: {
      return scriptsAdapter.addOne(state, action.script);
    }
    default:
      return state;
  }
};
