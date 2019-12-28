// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { Grommet } from 'grommet';
import Routes from '../Routes';

const Root = ({ store, history }) => (
  <Grommet plain>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </Grommet>
);

export default hot(Root);
