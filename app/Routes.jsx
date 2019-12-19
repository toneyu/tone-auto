import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AccentureLogo from './assets/accenture.png';
import Minecraft from './assets/minecraft.jpg';
import ConnectedRoute from './ConnectedRoute';
import routes from './constants/routes';
import App from './containers/App';
import ConnectionsPage from './containers/ConnectionPage';
import DialPage from './containers/DialPage';
import CommandsPage from './containers/HomePage';
import ScriptsPage from './containers/ScriptsPage';
import Status from './containers/Status';
import TabsContainer from './containers/TabsContainer';

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
      <ConnectedRoute path={routes.DIAL} component={DialPage} />
      <Redirect to={routes.CONNECTIONS} />
    </Switch>
  </App>
);

export default Routes;
