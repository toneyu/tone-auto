import React from 'react';
import { Box } from 'grommet';
import { useSelector } from 'react-redux';
import { processesIdsSelector } from '../selectors/script-progress';
import ScriptProcess from './ScriptProcess';

const Processes = () => {
  const processesIds = useSelector(processesIdsSelector);
  return (
    <Box>
      {processesIds.map((processId) => (
        <ScriptProcess key={processId} processId={processId} />
      ))}
    </Box>
  );
};

export default Processes;
