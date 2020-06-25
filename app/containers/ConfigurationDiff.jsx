import React, { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Box } from 'grommet';
import { Upload } from 'grommet-icons';
import { useMount } from 'react-use';
import { configurationsSelector } from '../selectors/configurations';
import { loadConfigurationRequest } from '../actions/configurations';

const ConfigurationDiff = ({ host }) => {
  const configuration = useSelector(configurationsSelector(host));
  const [uploadedConfiguration, setUploadedConfiguration] = useState();
  const dispatch = useDispatch();
  useMount(() => {
    dispatch(loadConfigurationRequest(host));
  });

  return (
    <Box>
      <Form
        onSubmit={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.xml';
          input.onchange = async (event) => {
            const files = Array.from(event.target.files);
            const texts = await Promise.all(
              files.map((file) => {
                const blob = new Blob([file]);
                return new Response(blob).text();
              }),
            );

            setUploadedConfiguration(texts[0]);
          };
          input.click();
        }}
      >
        <Button icon={<Upload />} type="submit" label="Select Configuration File" />
      </Form>
      <Box>
        <ReactDiffViewer
          leftTitle={
            uploadedConfiguration
              ? 'Selected Configuration File'
              : '**Please Select a Configuration File**'
          }
          rightTitle="Live Configuration"
          oldValue={uploadedConfiguration}
          newValue={configuration}
          styles={{
            line: {
              fontSize: '0.8em',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ConfigurationDiff;
