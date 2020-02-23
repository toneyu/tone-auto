import ConnectionStatus from '../constants/connection-status';
import {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  DISCONNECT_REQUEST,
  DISCONNECT_SUCCESS,
} from '../actions/connection';
import { ADD_CONNECTIONS } from '../actions/connections';

const initialState = {
  byHost: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONNECTIONS:
      return {
        ...state,
        byHost: action.connections.reduce(
          (acc, connection) => ({
            ...acc,
            [connection.host]: { status: ConnectionStatus.DISCONNECTED, ...connection },
          }),
          state.byHost,
        ),
      };
    case CONNECT_REQUEST:
      return {
        ...state,
        byHost: {
          ...state.byHost,
          [action.host]: {
            ...state.byHost[action.host],
            status: ConnectionStatus.CONNECTING,
          },
        },
      };
    case CONNECT_SUCCESS:
      return {
        ...state,
        byHost: {
          ...state.byHost,
          [action.host]: {
            ...state.byHost[action.host],
            status: ConnectionStatus.CONNECTED,
          },
        },
      };
    case CONNECT_FAILURE:
      return {
        ...state,
        byHost: {
          ...state.byHost,
          [action.host]: {
            ...state.byHost[action.host],
            status: ConnectionStatus.DISCONNECTED,
          },
        },
      };
    case DISCONNECT_REQUEST:
      return {
        ...state,
        byHost: {
          ...state.byHost,
          [action.host]: {
            ...state.byHost[action.host],
            status: ConnectionStatus.DISCONNECTING,
          },
        },
      };
    case DISCONNECT_SUCCESS:
      return {
        ...state,
        ...state,
        byHost: {
          ...state.byHost,
          [action.host]: {
            ...state.byHost[action.host],
            status: ConnectionStatus.DISCONNECTED,
          },
        },
      };
    default:
      return state;
  }
};
