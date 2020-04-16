import React from 'react';
import { Box, Header, Nav, Anchor } from 'grommet';
import { Play, Download } from 'grommet-icons';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import { loadedStepNamesSelector } from '../selectors/scripts';
import ScriptStep from './ScriptStep';
import { startScriptProcess } from '../actions/script-process';
import { stepsProcessSelector, scriptNameProcessSelector } from '../selectors/script-progress';

const ScriptProcess = () => {
  const stepNames = useSelector(loadedStepNamesSelector);
  const dispatch = useDispatch();
  const steps = useSelector(stepsProcessSelector);
  const scriptName = useSelector(scriptNameProcessSelector);

  return (
    <Box>
      <Nav direction="row" background="brand" pad="medium">
        <Anchor icon={<Play />} hoverIndicator onClick={() => dispatch(startScriptProcess())} />
        <Anchor
          icon={<Download />}
          hoverIndicator
          onClick={() => {
            const data = Papa.unparse(
              steps.map((step) => ({
                'VC Tests': step.name,
                results: step.logs.ids.map((id) => step.logs.entities[id].log).join('|'),
              })),
            );
            saveAs(new File([data], `${scriptName}.csv`, { type: 'text/csv' }));
          }}
        />
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
