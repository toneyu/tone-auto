import React from 'react';
import { Tabs, Tab, CircularProgress } from '@material-ui/core';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppsIcon from '@material-ui/icons/Apps';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import routes from '../constants/routes';
import ConnectionStatus from '../constants/connection-status';

const TabsContainer = ({ pathname, push, connectionStatus }) => {
  const connected = connectionStatus === ConnectionStatus.CONNECTED;

  return (
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
              <WifiIcon style={{ color: 'green' }} />
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
          icon={<AppsIcon />}
          label="Commands"
          color={connected ? 'primary' : 'disabled'}
          value={routes.COMMANDS}
          disabled={!connected}
        />
        <Tab
          icon={<FormatListNumberedIcon />}
          label="Scripts"
          value={routes.SCRIPTS}
          color={connected ? 'primary' : 'disabled'}
          disabled={!connected}
        />
      </Tabs>
    </Paper>
  );
};
const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
  connectionStatus: state.connection.status,
});

const mapDispatchToProps = { push };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabsContainer);
