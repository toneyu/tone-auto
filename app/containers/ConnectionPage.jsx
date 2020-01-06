import { Accordion } from 'grommet';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { disconnectRequest } from '../actions/connection';
import ConnectionPanel from './ConnectionPanel';

const ConnectionPage = ({ connections }) => {
  const [activePanels, setActivePanels] = useState(new Set());

  const removeActivePanel = (index) => {
    activePanels.delete(index);
    setActivePanels(new Set(activePanels));
  };

  const addActivePanel = (index) => {
    setActivePanels(new Set(activePanels.add(index)));
  };

  return (
    <div>
      <Accordion multiple activeIndex={useMemo(() => [...activePanels], [activePanels])}>
        {connections.map((connection, index) => (
          <ConnectionPanel
            host={connection.host}
            password={connection.password}
            key={connection.host}
            addActivePanel={() => addActivePanel(index)}
            removeActivePanel={() => removeActivePanel(index)}
            isActive={activePanels.has(index)}
          />
        ))}
      </Accordion>
    </div>
  );
};

const mapStateToProps = (state) => ({
  connections: Object.values(state.connection.connectionsByHost),
});

const mapDispatchToProps = {
  disconnectRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPage);
