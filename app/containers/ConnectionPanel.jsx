import { AccordionPanel, Box } from 'grommet';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ConnectionPanelHeader from './ConnectionPanelHeader';
import ConnectionStatus from '../constants/connection-status';
import Connection from './Connection';

const usePrev = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const ConnectionPanel = ({ connection }) => {
  const connectionStatus = useSelector(
    (state) => state.connection.entities[connection.host]?.status,
  );
  const prevConnectionStatus = usePrev(connectionStatus);
  if (
    connectionStatus !== prevConnectionStatus &&
    connectionStatus === ConnectionStatus.CONNECTED
  ) {
    // addActivePanel();
  }

  return (
    <AccordionPanel
      header={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <ConnectionPanelHeader {...connection} connectionStatus={connectionStatus} />
      }
    >
      <Box pad="medium" background="light-2">
        <Connection host={connection.host} />
      </Box>
    </AccordionPanel>
  );
};

export default ConnectionPanel;
