import { Box, Grid, Main } from 'grommet';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import ConnectionsPage from './containers/ConnectionPage';
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
            <Route path={routes.SCRIPTS} component={ScriptsPage} />
            <Route path={routes.CONNECTIONS} component={ConnectionsPage} />
            <Redirect to={routes.SCRIPTS} />
            {/* <Redirect to={routes.CONNECTIONS} /> */}
          </Switch>
        </Main>
      </Box>
    </Grid>
  </App>
);

export default Routes;
