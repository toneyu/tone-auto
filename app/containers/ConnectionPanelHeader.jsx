import { Header, Heading, Button } from 'grommet';
import { Close, Connect } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { connectRequest, disconnectRequest } from '../actions/connection';
import ConnectionStatus from '../constants/connection-status';

const spinner = (
  <svg version="1.1" viewBox="0 0 32 32" width="24px" height="24px" fill="#7D4CDB">
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const ConnectionPanelHeader = ({
  connectionStatus,
  connectRequest,
  disconnectRequest,
  host,
  password,
  onClick,
}) => (
  <Header pad="small" onClick={onClick}>
    <Heading level={3}>{host}</Heading>
    <Button
      reverse
      onClick={() =>
        connectionStatus === ConnectionStatus.DISCONNECTED
          ? connectRequest(host, password)
          : connectionStatus === ConnectionStatus.CONNECTED
          ? disconnectRequest(host)
          : ''
      }
      disabled={
        connectionStatus === ConnectionStatus.CONNECTING ||
        connectionStatus === ConnectionStatus.DISCONNECTING
      }
      icon={
        connectionStatus === ConnectionStatus.CONNECTED ? (
          <Close />
        ) : connectionStatus === ConnectionStatus.CONNECTING ||
          connectionStatus === ConnectionStatus.DISCONNECTING ? (
          <>{spinner}</>
        ) : (
          <Connect />
        )
      }
      label={
        connectionStatus === ConnectionStatus.CONNECTED
          ? 'Disconnect'
          : connectionStatus === ConnectionStatus.CONNECTING
          ? 'Connecting'
          : connectionStatus === ConnectionStatus.DISCONNECTING
          ? 'Disconnecting'
          : 'Connect'
      }
    />
  </Header>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  connectRequest,
  disconnectRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPanelHeader);
