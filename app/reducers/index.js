// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import connection from './connection';
import statuses from './statuses';
import feedbacks from './feedbacks';
import scripts from './scripts';
import scriptProcess from './script-process';
import configurations from './configurations';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    connection,
    statuses,
    feedbacks,
    scripts,
    scriptProcess,
    configurations,
  });
}
