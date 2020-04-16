import React, { useMemo } from 'react';
import { Box, Header, Text } from 'grommet';
import { useSelector } from 'react-redux';
import { progressSelector, stepLogsSelector } from '../selectors/script-progress';
import { createStepSelector } from '../selectors/scripts';

const ScriptStep = ({ stepIndex }) => {
  const stepSelector = useMemo(createStepSelector, []);
  const step = useSelector((state) => stepSelector(state, stepIndex));
  const progress = useSelector(progressSelector(step.name));
  const logs = useSelector(stepLogsSelector(step.name));

  return (
    <Box>
      <Header>{step.name}</Header>
      <Header>{step.description}</Header>
      <Header>{progress}</Header>
      {logs.map((log) => (
        <Text size="xsmall" key={log.timestamp}>
          {log}
        </Text>
      ))}
    </Box>
  );
};

export default ScriptStep;
