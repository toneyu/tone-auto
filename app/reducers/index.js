// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import connection from './connection';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    connection,
  });
}
