// import React, { Component } from 'react';
import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, Box } from 'grommet';
import { useSelector } from 'react-redux';
import ScriptRow from './ScriptRow';
import { scriptNamesSelector, scriptLoadedSelector } from '../selectors/scripts';
import ScriptProcess from './ScriptProcess';

const ScriptsPage = () => {
  const scriptNames = useSelector(scriptNamesSelector);
  const scriptLoaded = useSelector(scriptLoadedSelector);

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
      {scriptLoaded && <ScriptProcess />}
    </Box>
  );
};

export default ScriptsPage;
