import { Accordion, Button, Form } from 'grommet';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { disconnectRequest } from '../actions/connection';
import { addConnections } from '../actions/connections';
import { loadHostsFilesRequest } from '../actions/hosts';
import ConnectionPanel from './ConnectionPanel';

const ConnectionPage = ({ connections, loadHostsFilesRequest }) => {
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
      <Form
        onSubmit={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.onchange = (event) => {
            const files = Array.from(event.target.files);
            if (files) {
              loadHostsFilesRequest(files);
            }
          };
          input.click();
        }}
      >
        <Button type="submit" label="Import Hosts" />
      </Form>
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
  addConnections,
  loadHostsFilesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPage);
