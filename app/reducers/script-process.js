import { LOAD_SCRIPT_PROCESS } from '../actions/script-process';

const initialState = {
  isLoaded: false,
  scriptName: undefined,
  stepIndex: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SCRIPT_PROCESS:
      return {
        ...state,
        isLoaded: true,
        scriptName: action.scriptName,
      };
    default:
      return state;
  }
};
