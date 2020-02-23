import { createEntityAdapter } from '@reduxjs/toolkit';
import ConnectionStatus from '../constants/connection-status';
import {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  DISCONNECT_REQUEST,
  DISCONNECT_SUCCESS,
} from '../actions/connection';
import { ADD_CONNECTIONS } from '../actions/connections';

const connectionsAdapter = createEntityAdapter({
  selectId: (connection) => connection.host,
});

export default (state = connectionsAdapter.getInitialState(), action) => {
  switch (action.type) {
    case ADD_CONNECTIONS: {
      return connectionsAdapter.addMany(
        state,
        action.connections.map((connection) => ({
          ...connection,
          status: ConnectionStatus.DISCONNECTED,
        })),
      );
    }
    case CONNECT_REQUEST: {
      return connectionsAdapter.updateOne(state, {
        id: action.host,
        changes: { status: ConnectionStatus.CONNECTING },
      });
    }
    case CONNECT_SUCCESS: {
      return connectionsAdapter.updateOne(state, {
        id: action.host,
        changes: { status: ConnectionStatus.CONNECTED },
      });
    }
    case CONNECT_FAILURE: {
      return connectionsAdapter.updateOne(state, {
        id: action.host,
        changes: { status: ConnectionStatus.DISCONNECTED },
      });
    }
    case DISCONNECT_REQUEST: {
      return connectionsAdapter.updateOne(state, {
        id: action.host,
        changes: { status: ConnectionStatus.DISCONNECTING },
      });
    }
    case DISCONNECT_SUCCESS: {
      return connectionsAdapter.updateOne(state, {
        id: action.host,
        changes: { status: ConnectionStatus.DISCONNECTED },
      });
    }
    default:
      return state;
  }
};
