import React, { useState } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { useDispatch } from 'react-redux';
import { putXmlRequest } from '../actions/put-xml';

const DialForm = ({ host }) => {
  const dispatch = useDispatch();
  const [dial, setDial] = useState('');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(
          putXmlRequest(
            host,
            `
  <Command>
  <Dial>
      <Number>${dial}</Number>
    </Dial>
  </Command>`,
          ),
        );
      }}
    >
      <Box direction="column" align="center" margin="medium">
        <FormField label="Dial">
          <TextInput
            placeholder="5XXXXX, 91XXX-XXX-XXXX"
            value={dial}
            onChange={({ target: { value } }) => setDial(value)}
          />
        </FormField>
        <Button primary type="submit" label="Dial Number" />
      </Box>
    </Form>
  );
};

export default DialForm;
