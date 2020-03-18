import React, { useMemo } from 'react';
import { Box, Header } from 'grommet';
import { useSelector } from 'react-redux';
import { createStepSelector } from '../selectors/scripts';

const ScriptStep = ({ stepIndex }) => {
  const stepSelector = useMemo(createStepSelector, []);
  const step = useSelector((state) => stepSelector(state, stepIndex));

  return (
    <Box>
      <Header>{step.name}</Header>
      <Header>{step.description}</Header>
      <Header>Progress</Header>
    </Box>
  );
};

export default ScriptStep;
