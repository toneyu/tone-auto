import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import App from './containers/App';
import TabsContainer from './containers/TabsContainer';
import routes from './constants/routes';
import CommandsPage from './containers/HomePage';
import ScriptsPage from './containers/ScriptsPage';
import ConnectionsPage from './containers/ConnectionPage';
import ConnectedRoute from './ConnectedRoute';
import Status from './containers/Status';
import AccentureLogo from './assets/accenture.png';
import Minecraft from './assets/minecraft.jpg';

const Routes = () => (
  <App>
    <div style={{ display: 'flex', width: '100%' }}>
      <img src={AccentureLogo} height={50} alt="accenture-logo" />
      <img src={Minecraft} height={50} style={{ marginLeft: 'auto' }} alt="accenture-logo" />
    </div>
    <Status />
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
