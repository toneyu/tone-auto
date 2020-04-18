import { AccordionPanel, Box } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';
import ConnectionPanelHeader from './ConnectionPanelHeader';
import Connection from './Connection';

const ConnectionPanel = ({ connection }) => {
  const connectionStatus = useSelector(
    (state) => state.connection.entities[connection.host]?.status,
  );

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
