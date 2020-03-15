// import React, { Component } from 'react';
import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet';
import { useSelector } from 'react-redux';
import ScriptRow from './ScriptRow';
import { scriptNamesSelector } from '../selectors/scripts';

const ScriptsPage = () => {
  const scriptNames = useSelector(scriptNamesSelector);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
          <TableCell scope="col" border="bottom">
            View
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scriptNames.map((scriptName) => (
          <ScriptRow name={scriptName} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ScriptsPage;
