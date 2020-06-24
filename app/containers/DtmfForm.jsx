import React, { useState } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { useDispatch } from 'react-redux';
import { putXmlRequest } from '../actions/put-xml';

const DmtfForm = ({ host }) => {
  const dispatch = useDispatch();
  const [dtmf, setDtmf] = useState('');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(
          putXmlRequest(
            host,
            `
      <Command>
        <Call>
          <DTMFSend>
            <DTMFString>${dtmf}</DTMFString>
          </DTMFSend>
        </Call>
      </Command>
             `,
          ),
        );
      }}
    >
      <Box direction="column" align="center" margin="medium">
        <FormField label="DTMF">
          <TextInput
            placeholder="1XXXXXXXXXX#"
            value={dtmf}
            onChange={({ target: { value } }) => setDtmf(value)}
          />
        </FormField>
        <Button primary type="submit" label="Send DTMF" />
      </Box>
    </Form>
  );
};

export default DmtfForm;
