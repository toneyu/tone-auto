import React from 'react';
import { TableRow, TableCell, Button, Text } from 'grommet';
import { CirclePlay, Download } from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import { scriptDescriptionSelector } from '../selectors/scripts';
import { loadScriptProcess } from '../actions/script-process';

const ScriptRow = ({ scriptName }) => {
  const dispatch = useDispatch();
  const description = useSelector(scriptDescriptionSelector(scriptName));

  return (
    <TableRow>
      <TableCell scope="row">
        <Text>{scriptName}</Text>
      </TableCell>
      <TableCell scope="row">{description ? <Text>{description}</Text> : '---'}</TableCell>
      <TableCell>
        <Button disabled icon={<Download color="brand" />} />
      </TableCell>
      <TableCell>
        <Button
          icon={<CirclePlay color="brand" />}
          onClick={() => dispatch(loadScriptProcess(scriptName))}
        />
      </TableCell>
    </TableRow>
  );
};

export default ScriptRow;
