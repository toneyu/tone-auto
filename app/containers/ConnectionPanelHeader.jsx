import React from 'react';
import { Header, Heading } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { connectRequest } from '../actions/connection';
import { connectionStatusSelector } from '../selectors/connections';
import ConnectionStatus from '../constants/connection-status';

const ConnectionPanelHeader = ({ host, password, endpoint, version, dir }) => {
  const dispatch = useDispatch();
  const connectionStatus = useSelector(connectionStatusSelector(host));

  return (
    <Header
      pad="small"
      onClick={() => {
        if (connectionStatus === ConnectionStatus.DISCONNECTED) {
          dispatch(connectRequest(host, password));
        }
      }}
    >
      <Heading level={4}>{host}</Heading>
      <Heading level={3}>{endpoint}</Heading>
      <Heading level={5}>{version}</Heading>
      <Heading level={5}>{dir}</Heading>
    </Header>
  );
};

export default ConnectionPanelHeader;
