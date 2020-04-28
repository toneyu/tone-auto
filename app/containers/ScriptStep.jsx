import React, { useMemo } from 'react';
import { Box, Header, Text } from 'grommet';
import { useSelector } from 'react-redux';
import {
  progressSelector,
  stepLogEntitiesSelector,
  hostNameSelector,
} from '../selectors/script-progress';
import { createStepSelector } from '../selectors/scripts';

const ScriptStep = ({ processId, stepIndex }) => {
  const stepSelector = useMemo(() => createStepSelector(processId), []);
  const step = useSelector((state) => stepSelector(state, stepIndex));
  const progress = useSelector(progressSelector(processId, step.name));
  const logEntities = useSelector(stepLogEntitiesSelector(processId, step.name));
  const hostName = useSelector(hostNameSelector(processId, step.payload.host));

  return (
    <Box align="start">
      <Header>{step.name}</Header>
      <Header>{step.description}</Header>
      <Header>{progress}</Header>
      <Header>
        Host: {hostName ?? 'Unset'} ({step.payload.host})
      </Header>
      {logEntities.map((logEntity) => (
        <Text size="xsmall" key={logEntity.timestamp}>
          {logEntity.log}
        </Text>
      ))}
    </Box>
  );
};

export default ScriptStep;
