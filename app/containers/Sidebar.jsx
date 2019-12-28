import { CircularProgress, Tooltip } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PhoneIcon from '@material-ui/icons/Phone';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import { push } from 'connected-react-router';
import React from 'react';
import { Box } from 'grommet';
import { connect } from 'react-redux';
import SidebarButton from '../components/SidebarButton';
import ConnectionStatus from '../constants/connection-status';
import routes from '../constants/routes';

const ConnectedButton = ({ connected, ...buttonProps }) => (
  <Tooltip title={!connected ? 'Please connect first.' : ''}>
    <div>
      <SidebarButton
        {...buttonProps}
        disabled={!connected}
        color={connected ? 'primary' : 'disabled'}
      />
    </div>
  </Tooltip>
);

const SidebarButtons = ({ pathname, push, connectionStatus }) => {
  const connected = connectionStatus === ConnectionStatus.CONNECTED;

  return (
    <Box fill>
      <SidebarButton
        icon={
          connectionStatus === ConnectionStatus.CONNECTED ? (
            <WifiIcon style={{ color: 'green' }} />
          ) : connectionStatus === ConnectionStatus.CONNECTING ? (
            <CircularProgress />
          ) : (
            <WifiOffIcon color="error" />
          )
        }
        active={pathname === routes.CONNECTIONS}
        onClick={() => push(routes.CONNECTIONS)}
        label="Connect"
      />
      <ConnectedButton
        fill
        label="Commands"
        icon={<AppsIcon />}
        active={pathname === routes.COMMANDS}
        onClick={() => push(routes.COMMANDS)}
        connected={connected}
      />
      <ConnectedButton
        fill
        label="Scripts"
        icon={<FormatListNumberedIcon />}
        active={pathname === routes.SCRIPTS}
        onClick={() => push(routes.SCRIPTS)}
        connected={connected}
      />
      <ConnectedButton
        fill
        label="Dial"
        icon={<PhoneIcon />}
        active={pathname === routes.DIAL}
        onClick={() => push(routes.DIAL)}
        connected={connected}
      />
    </Box>
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
)(SidebarButtons);
