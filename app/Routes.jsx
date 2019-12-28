import { Box, Grid, Main } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ConnectedRoute from './ConnectedRoute';
import routes from './constants/routes';
import App from './containers/App';
import ConnectionsPage from './containers/ConnectionPage';
import DialPage from './containers/DialPage';
import CommandsPage from './containers/HomePage';
import ScriptsPage from './containers/ScriptsPage';
import HeaderContainer from './containers/HeaderContainer';
import SidebarButtons from './containers/Sidebar';

const Routes = () => (
  <App>
    <Grid
      fill
      rows={['xxsmall', 'auto']}
      columns={['small', 'auto']}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'nav', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="header" background="brand">
        <HeaderContainer />
      </Box>
      <Box gridArea="nav" background="white">
        <SidebarButtons />
      </Box>
      <Box gridArea="main" background="light-2">
        <Main pad="small">
          <Switch>
            <ConnectedRoute path={routes.SCRIPTS} component={ScriptsPage} />
            <Route path={routes.CONNECTIONS}>
              <ConnectionsPage />
            </Route>
            <ConnectedRoute path={routes.COMMANDS} component={CommandsPage} />
            <ConnectedRoute path={routes.DIAL} component={DialPage} />
            <Redirect to={routes.CONNECTIONS} />
          </Switch>
        </Main>
      </Box>
    </Grid>
  </App>
);

export default Routes;
