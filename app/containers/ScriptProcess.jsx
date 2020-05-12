import React, { useMemo } from 'react';
import { Box, Nav, Anchor, Select, FormField, Button, Heading } from 'grommet';
import { Play, Download, Close } from 'grommet-icons';
import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadedStepNamesSelector,
  scriptHostsSelector,
  createHostKeysByStepNameSelector,
} from '../selectors/scripts';
import ScriptStep from './ScriptStep';
import {
  startScriptProcess,
  updateScriptHost,
  deleteScriptProcess,
} from '../actions/script-process';
import {
  stepsProcessSelector,
  scriptNameProcessSelector,
  createProcessHostsByKeySelector,
} from '../selectors/script-progress';
import { connectionEndpointsSelector } from '../selectors/connections';
import { saveAsCsv } from '../utils/save-as';

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
      <Nav align="center" direction="row" background="brand" pad="medium">
        <Box>
          <Heading>{scriptName}</Heading>
          <Heading level="5">{`(Id: ${processId})`}</Heading>
        </Box>
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
            saveAsCsv(scriptName, data);
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
        <Button
          margin={{ marginLeft: 'auto' }}
          icon={<Close />}
          onClick={() => dispatch(deleteScriptProcess(processId))}
        />
      </Nav>
      {/* <Box>
        <Heading>Feedbacks:</Heading>
        <Box>
          <Box>
            <Heading>Feedback 1 Label</Heading>
            <Heading>Feedback Progress</Heading>
          </Box>
        </Box>
      </Box> */}
      <Box>
        <Heading level="3">Steps</Heading>
        <Box align="start">
          {stepNames.map((stepName, stepIndex) => (
            <ScriptStep processId={processId} stepIndex={stepIndex} key={stepName} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScriptProcess;
