import { Accordion, Box, Button, Form, FormField, Heading } from 'grommet';
import { Add, Upload } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { disconnectRequest } from '../actions/connection';
import { addConnections } from '../actions/connections';
import { loadHostsFilesRequest } from '../actions/hosts';
import ConnectionPanel from './ConnectionPanel';

const ConnectionPage = ({ connections, loadHostsFilesRequest, addConnections }) => {
  const [activePanels, setActivePanels] = useState(new Set());

  const removeActivePanel = (index) => {
    activePanels.delete(index);
    setActivePanels(new Set(activePanels));
  };

  const addActivePanel = (index) => {
    setActivePanels(new Set(activePanels.add(index)));
  };

  return (
    <Box>
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
        <Button icon={<Upload />} type="submit" label="Import Hosts" />
      </Form>
      <Form
        onSubmit={({ value }) => {
          addConnections([{ host: value.host, password: value.password }]);
        }}
      >
        <Box pad="small">
          <Heading level="4">Add a New Connection</Heading>
          <Box direction="row" align="center" gap="small">
            <FormField name="host" placeholder="host" />
            <FormField type="password" placeholder="password" name="password" />
            <Button type="submit" icon={<Add />} label="Add" />
          </Box>
        </Box>
      </Form>
      <Heading level="2">Connections</Heading>
      <Accordion multiple activeIndex={[...activePanels]}>
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
    </Box>
  );
};

const mapStateToProps = (state) => ({
  connections: Object.values(state.connection.byHost),
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
