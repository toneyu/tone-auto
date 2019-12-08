import React from 'react';
import { connect } from 'react-redux';

import ConnectionStatus from '../constants/connection-status';

const Status = ({ connectionStatus }) => (
  <div>
    {connectionStatus === ConnectionStatus.DISCONNECTED
      ? 'Disconnected'
      : connectionStatus === ConnectionStatus.CONNECTING
      ? 'Connecting'
      : connectionStatus === ConnectionStatus.CONNECTED
      ? 'Connected'
      : connectionStatus === ConnectionStatus.DISCONNECTING
      ? 'Disconnecting'
      : 'Unknown'}
  </div>
);

const mapStateToProps = (state) => ({
  connectionStatus: state.connection.status,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Status);
