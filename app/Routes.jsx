import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import App from './containers/App';
import TabsContainer from './containers/TabsContainer';
import routes from './constants/routes';
import CommandsPage from './containers/HomePage';
import ScriptsPage from './containers/ScriptsPage';
import ConnectionsPage from './containers/ConnectionPage';
import ConnectedRoute from './ConnectedRoute';

const Routes = () => (
  <App>
    <TabsContainer />
    <Switch>
      <ConnectedRoute path={routes.SCRIPTS} component={ScriptsPage} />
      <Route path={routes.CONNECTIONS}>
        <ConnectionsPage />
      </Route>
      <ConnectedRoute path={routes.COMMANDS} component={CommandsPage} />
      <Redirect to={routes.CONNECTIONS} />
    </Switch>
  </App>
);

export default Routes;
