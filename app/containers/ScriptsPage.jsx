// import React, { Component } from 'react';
import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, Box } from 'grommet';
import { useSelector } from 'react-redux';
import ScriptRow from './ScriptRow';
import { scriptNamesSelector } from '../selectors/scripts';
import Processes from './Processes';

const ScriptsPage = () => {
  const scriptNames = useSelector(scriptNamesSelector);

  return (
    <Box>
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
