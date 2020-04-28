import React, { useMemo } from 'react';
import { Box, Header, Nav, Anchor, Select, FormField } from 'grommet';
import { Play, Download } from 'grommet-icons';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadedStepNamesSelector,
  scriptHostsSelector,
  createHostKeysByStepNameSelector,
} from '../selectors/scripts';
import ScriptStep from './ScriptStep';
import { startScriptProcess, updateScriptHost } from '../actions/script-process';
import {
  stepsProcessSelector,
  scriptNameProcessSelector,
  createProcessHostsByKeySelector,
} from '../selectors/script-progress';
import { connectionEndpointsSelector } from '../selectors/connections';

const ScriptProcess = ({ processId }) => {
  const dispatch = useDispatch();

  const processHostsByKeySelector = useMemo(() => createProcessHostsByKeySelector(processId), []);
  const scriptName = useSelector(scriptNameProcessSelector(processId));
  const hostKeysByStepNameSelector = useMemo(() => createHostKeysByStepNameSelector(scriptName));
  const endpointsNameByKey = useSelector(processHostsByKeySelector);
  const hostKeysByStepName = useSelector(hostKeysByStepNameSelector);
  const stepNames = useSelector(loadedStepNamesSelector(processId));
  const steps = useSelector(stepsProcessSelector(processId));
  const hostsByKey = useSelector(processHostsByKeySelector);
  const endpoints = useSelector(connectionEndpointsSelector);
  const hostNames = useSelector(scriptHostsSelector(scriptName));
  console.log(hostsByKey);

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
                endpoint: endpointsNameByKey[hostKeysByStepName[step.name]],
              })),
            );
            saveAs(new File([data], `${scriptName}.csv`, { type: 'text/csv;charset=utf-8;' }));
          }}
        />
        {hostNames.map((hostName) => (
          <FormField label={hostName} key={hostName}>
            <Select
              placeholder={hostName}
              options={endpoints}
              value={hostsByKey[hostName] ?? ''}
              size="small"
              onChange={(name) => dispatch(updateScriptHost(hostName, processId, name.value))}
            />
          </FormField>
        ))}
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
