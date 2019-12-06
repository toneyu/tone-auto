import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import App from './containers/App';
import TabsContainer from './containers/TabsContainer';
import routes from './constants/routes';
import CommandsPage from './containers/HomePage';
import ScriptsPage from './containers/ScriptsPage';
import ConnectionsPage from './containers/ConnectionPage';

const Routes = () => (
  <App>
    <TabsContainer />
    <Switch>
      <Route path={routes.SCRIPTS}>
        <ScriptsPage />
      </Route>
      <Route path={routes.CONNECTIONS}>
        <ConnectionsPage />
      </Route>
      <Route path={routes.COMMANDS}>
        <CommandsPage />
      </Route>
      <Redirect to={routes.CONNECTIONS} />
    </Switch>
  </App>
);

export default Routes;
