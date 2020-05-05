// import React, { Component } from 'react';
import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, Box, Form, Button } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { Upload } from 'grommet-icons';
import ScriptRow from './ScriptRow';
import { scriptNamesSelector } from '../selectors/scripts';
import Processes from './Processes';
import { loadScriptRequest } from '../actions/scripts';

const ScriptsPage = () => {
  const dispatch = useDispatch();
  const scriptNames = useSelector(scriptNamesSelector);

  return (
    <Box>
      <Box>
        <Form
          onSubmit={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.xml';
            input.onchange = (event) => {
              const files = Array.from(event.target.files);
              if (files) {
                dispatch(loadScriptRequest(files));
              }
            };
            input.click();
          }}
        >
          <Button icon={<Upload />} type="submit" label="Import XML Script" />
        </Form>
      </Box>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Description
            </TableCell>
            <TableCell scope="col" border="bottom">
              Export
            </TableCell>
            <TableCell scope="col" border="bottom">
              Load
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scriptNames.map((scriptName) => (
            <ScriptRow scriptName={scriptName} key={scriptName} />
          ))}
        </TableBody>
      </Table>
      <Processes />
    </Box>
  );
};

export default ScriptsPage;
