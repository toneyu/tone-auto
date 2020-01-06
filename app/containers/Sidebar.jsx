import { Tooltip } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import WifiIcon from '@material-ui/icons/Wifi';
import { push } from 'connected-react-router';
import { Box } from 'grommet';
import React from 'react';
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
        icon={<WifiIcon style={{ color: 'green' }} />}
        active={pathname === routes.CONNECTIONS}
        onClick={() => push(routes.CONNECTIONS)}
        label="Connect"
      />
      <ConnectedButton
        fill
        label="Scripts (TODO)"
        icon={<FormatListNumberedIcon />}
        active={pathname === routes.SCRIPTS}
        onClick={() => push(routes.SCRIPTS)}
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
