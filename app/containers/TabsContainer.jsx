import React from 'react';
import { Tabs, Tab, CircularProgress } from '@material-ui/core';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import routes from '../constants/routes';
import ConnectionStatus from '../constants/connection-status';

const TabsContainer = ({ pathname, push, connectionStatus }) => (
  <Paper square>
    <Tabs
      value={pathname}
      indicatorColor="primary"
      textColor="primary"
      // onChange={handleChange}
      aria-label="disabled tabs example"
      onChange={(_, value) => push(value)}
    >
      <Tab
        icon={
          connectionStatus === ConnectionStatus.CONNECTED ? (
            <WifiIcon color="primary" />
          ) : connectionStatus === ConnectionStatus.CONNECTING ? (
            <CircularProgress />
          ) : (
            <WifiOffIcon color="error" />
          )
        }
        label="Connect"
        value={routes.CONNECTIONS}
      />
      <Tab
        icon={<WifiOffIcon />}
        label="Commands"
        value={routes.COMMANDS}
        disabled={connectionStatus !== ConnectionStatus.CONNECTED}
      />
      <Tab
        icon={<WifiOffIcon />}
        label="Scripts"
        value={routes.SCRIPTS}
        disabled={connectionStatus !== ConnectionStatus.CONNECTED}
      />
    </Tabs>
  </Paper>
);

const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
  connectionStatus: state.connection.status,
});

const mapDispatchToProps = { push };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabsContainer);
