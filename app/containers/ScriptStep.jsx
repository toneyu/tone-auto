import React, { useMemo } from 'react';
import { Box, Header } from 'grommet';
import { useSelector } from 'react-redux';
import { progressSelector } from '../selectors/script-progress';
import { createStepSelector } from '../selectors/scripts';

const ScriptStep = ({ stepIndex }) => {
  const stepSelector = useMemo(createStepSelector, []);
  const step = useSelector((state) => stepSelector(state, stepIndex));
  const progress = useSelector(progressSelector(step.name));

  return (
    <Box>
      <Header>{step.name}</Header>
      <Header>{step.description}</Header>
      <Header>{progress}</Header>
    </Box>
  );
};

export default ScriptStep;
