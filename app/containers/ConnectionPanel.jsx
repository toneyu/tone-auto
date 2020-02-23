import { AccordionPanel, Box } from 'grommet';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { connectRequest } from '../actions/connection';
import ConnectionPanelHeader from './ConnectionPanelHeader';
import ConnectionStatus from '../constants/connection-status';
import HomePage from './HomePage';

const usePrev = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const ConnectionPanel = ({
  host,
  password,
  connectionStatus,
  isActive,
  removeActivePanel,
  addActivePanel,
}) => {
  const prevConnectionStatus = usePrev(connectionStatus);
  if (
    connectionStatus !== prevConnectionStatus &&
    connectionStatus === ConnectionStatus.CONNECTED
  ) {
    addActivePanel();
  }

  return (
    <AccordionPanel
      header={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <ConnectionPanelHeader
          host={host}
          password={password}
          connectionStatus={connectionStatus}
          onClick={() => {
            if (connectionStatus === ConnectionStatus.CONNECTED) {
              !isActive ? addActivePanel() : removeActivePanel();
            }
          }}
        />
      }
    >
      <Box pad="medium" background="light-2">
        <HomePage host={host} />
      </Box>
    </AccordionPanel>
  );
};

const mapStateToProps = (state, props) => ({
  connectionStatus: state.connection.entities[props.host].status,
});

const mapDispatchToProps = {
  connectRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPanel);
