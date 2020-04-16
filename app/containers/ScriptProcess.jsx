import React from 'react';
import { Box, Header, Nav, Anchor } from 'grommet';
import { Play, Stop } from 'grommet-icons';
import { useSelector, useDispatch } from 'react-redux';
import { loadedStepNamesSelector } from '../selectors/scripts';
import ScriptStep from './ScriptStep';
import { startScriptProcess } from '../actions/script-process';

const ScriptProcess = () => {
  const stepNames = useSelector(loadedStepNamesSelector);
  const dispatch = useDispatch();

  return (
    <Box>
      <Nav direction="row" background="brand" pad="medium">
        <Anchor icon={<Play />} hoverIndicator onClick={() => dispatch(startScriptProcess())} />
        <Anchor icon={<Stop />} hoverIndicator />
      </Nav>
      {/* <Box>
        <Header>Feedbacks:</Header>
        <Box>
          <Box>
            <Header>Feedback 1 Label</Header>
            <Header>Feedback Progress</Header>
          </Box>
        </Box>
      </Box> */}
      <Box>
        <Header>Steps</Header>
        <Box>
          {stepNames.map((stepName, stepIndex) => (
            <ScriptStep stepIndex={stepIndex} key={stepName} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScriptProcess;
