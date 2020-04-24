import React, { useMemo } from 'react';
import { Box, Header, Nav, Anchor, Menu } from 'grommet';
import { Play, Download } from 'grommet-icons';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import { loadedStepNamesSelector } from '../selectors/scripts';
import ScriptStep from './ScriptStep';
import { startScriptProcess } from '../actions/script-process';
import {
  stepsProcessSelector,
  scriptNameProcessSelector,
  createProcessHostsByKeySelector,
} from '../selectors/script-progress';
import { connectionEndpointsSelector } from '../selectors/connections';

const ScriptProcess = ({ processId }) => {
  const processHostsByKeySelector = useMemo(() => createProcessHostsByKeySelector(processId), []);
  const stepNames = useSelector(loadedStepNamesSelector(processId));
  const dispatch = useDispatch();
  const steps = useSelector(stepsProcessSelector(processId));
  const scriptName = useSelector(scriptNameProcessSelector(processId));
  const hostsById = useSelector(processHostsByKeySelector);
  const endpoints = useSelector(connectionEndpointsSelector);
  console.log(hostsById);

  return (
    <Box>
      <Nav direction="row" background="brand" pad="medium">
        <Anchor
          icon={<Play />}
          hoverIndicator
          onClick={() => dispatch(startScriptProcess(processId))}
        />
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
        <Menu
          label="Menu"
          items={endpoints.map((endpoint) => ({
            label: endpoint,
            onClick: () => {
              console.log(endpoint);
            },
          }))}
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
            <ScriptStep processId={processId} stepIndex={stepIndex} key={stepName} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScriptProcess;
