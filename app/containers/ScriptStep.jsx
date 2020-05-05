import React, { useMemo } from 'react';
import { Box, Text, Heading } from 'grommet';
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
    <Box align="start" border="bottom">
      <Heading level="4">{step.name}</Heading>
      <Text>{step.description}</Text>
      <Text>{progress}</Text>
      <Box direction="row">
        <Text weight="bold">
          {step.payload.host}
          {':\u00A0'}
        </Text>{' '}
        <Text>{hostName ?? 'Unset'}</Text>
      </Box>
      {logEntities.map((logEntity) => (
        <Text size="xsmall" key={logEntity.timestamp}>
          {logEntity.log}
        </Text>
      ))}
    </Box>
  );
};

export default ScriptStep;
