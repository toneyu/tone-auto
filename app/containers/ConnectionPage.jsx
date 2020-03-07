import React from 'react';
import { Accordion, Box, Button, Form, FormField, Heading } from 'grommet';
import { Add, Upload } from 'grommet-icons';
import { connect } from 'react-redux';
import { disconnectRequest } from '../actions/connection';
import { addConnections } from '../actions/connections';
import { loadHostsFilesRequest } from '../actions/hosts';
import ConnectionPanel from './ConnectionPanel';

const ConnectionPage = ({ connections, loadHostsFilesRequest, addConnections }) => {
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
        * <Button icon={<Upload />} type="submit" label="Import Hosts" />
      </Form>
      <Form
        onSubmit={({ value }) => {
          addConnections([{ host: value.host, password: value.password }]);
        }}
      >
        {' '}
        <Box pad="small">
          <Heading level="4">Add a New Connection</Heading>
          <Box direction="row" align="center" gap="small">
            <FormField name="host" placeholder="host" />
            <FormField type="password" placeholder="password" name="password" />
            <Button type="submit" icon={<Add />} label="Add" />
          </Box>
        </Box>{' '}
      </Form>
      <Heading level="2">Connections</Heading>
      <Accordion multiple>
        {connections.map((connection) => (
          <ConnectionPanel connection={connection} key={connection.host} />
        ))}
      </Accordion>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  connections: Object.values(state.connection.entities),
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
