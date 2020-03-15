import React from 'react';
import { TableRow, TableCell, Button } from 'grommet';
import { View } from 'grommet-icons';

const ScriptRow = ({ name }) => {
  return (
    <TableRow>
      <TableCell scope="row">
        <strong>{name}</strong>
      </TableCell>
      <TableCell>
        <Button icon={<View color="brand" />} />
      </TableCell>
    </TableRow>
  );
};

export default ScriptRow;
