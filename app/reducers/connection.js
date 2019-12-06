import ConnectionStatus from '../constants/connection-status';
import {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  DISCONNECT_REQUEST,
  DISCONNECT_SUCCESS,
} from '../actions/connection';

const initialState = {
  status: ConnectionStatus.DISCONNECTED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_REQUEST:
      return {
        status: ConnectionStatus.CONNECTING,
      };
    case CONNECT_SUCCESS:
      return {
        status: ConnectionStatus.CONNECTED,
      };
    case CONNECT_FAILURE:
      return {
        status: ConnectionStatus.DISCONNECTED,
      };
    case DISCONNECT_REQUEST:
      return {
        status: ConnectionStatus.DISCONNECTING,
      };
    case DISCONNECT_SUCCESS:
      return {
        status: ConnectionStatus.DISCONNECTED,
      };
    default:
      return state;
  }
};
