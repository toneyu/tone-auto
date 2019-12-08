import React from 'react';
import { Tabs, Tab, CircularProgress, Tooltip } from '@material-ui/core';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppsIcon from '@material-ui/icons/Apps';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import routes from '../constants/routes';
import ConnectionStatus from '../constants/connection-status';

function ConnectedTab({ connected, ...tabProps }) {
  return (
    <Tooltip title={!connected ? 'Please connect first.' : ''}>
      <div>
        <Tab {...tabProps} disabled={!connected} color={connected ? 'primary' : 'disabled'} />
      </div>
    </Tooltip>
  );
}
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

        <ConnectedTab
          icon={<AppsIcon />}
          label="Commands"
          value={routes.COMMANDS}
          connected={connected}
        />
        <ConnectedTab
          icon={<FormatListNumberedIcon />}
          label="Scripts"
          value={routes.SCRIPTS}
          connected={connected}
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
