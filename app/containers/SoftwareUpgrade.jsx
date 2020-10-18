import React, { useState } from 'react';
import { Button, Box, Heading, Form, Text } from 'grommet';
import { Close, Upload } from 'grommet-icons';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Spinner from '../components/Spinner';

const baseUrl = 'http://10.4.4.26:3000';
const ftpUrl = 'http://10.4.4.26/Files/';

const SoftwareUpgrade = ({ host }) => {
  const { password } = useSelector((state) => state.connection.entities[host]);

  const [fileNames, setFileNames] = useState([]);
  const [upgradeFile, setUpgradeFile] = useState();
  const { data: packages, isLoading, error, refetch } = useQuery(`${host}-packages`, () =>
    fetch(`${baseUrl}/packages`).then((res) => res.json()),
  );
  const [uploadPackage, { status }] = useMutation(async (files) => {
    const formData = new FormData();
    setFileNames(files.map((file) => file.name));
    files.forEach((file) => {
      formData.append(file.name, file);
    });
    await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });
    await refetch();
  });

  const [deletePackage] = useMutation(async (p) => {
    await fetch(`${baseUrl}/deletepackage/${p}`, { method: 'DELETE' });
    await refetch();
  });

  const [upgrade, { status: upgradeStatus }] = useMutation(async (url) => {
    const { data } = await axios.post(
      `https://${host}/putxml`,
      `
    <Command>
      <SystemUnit>
        <SoftwareUpgrade>
          <URL>${url}</URL>
        </SoftwareUpgrade>
      </SystemUnit>
    </Command>`,
      {
        auth: {
          username: 'admin',
          password,
        },
      },
    );
    console.log(data);
  });

  return (
    <Box align="start">
      {!isLoading && !error && (
        <Box border="all">
          <Heading level="2">Software Upgrade</Heading>
          <Form
            onSubmit={() => {
              const input = document.createElement('input');
              input.type = 'file';
              // input.accept = '.pkg';
              input.onchange = (event) => {
                const files = Array.from(event.target.files);
                if (files) {
                  uploadPackage(files);
                }
              };
              input.click();
            }}
          >
            * <Button icon={<Upload />} type="submit" label="Upload package" />
          </Form>
          <Box align="center">
            {packages.map((p) => (
              <Box key={p} direction="row">
                <Button icon={<Close />} onClick={() => deletePackage(p)} />
                <Button
                  label={p}
                  onClick={() => {
                    upgrade(`${ftpUrl}${p}`);
                    setUpgradeFile(p);
                  }}
                />
              </Box>
            ))}
          </Box>

          {status === 'loading' && (
            <>
              <Heading level="2">
                Uploading
                <Spinner />
              </Heading>
              <Box>
                {fileNames.map((fileName) => (
                  <Text>{fileName}</Text>
                ))}
              </Box>
            </>
          )}

          {upgradeStatus === 'loading' ? (
            <>
              <Heading level="2">
                Upgrading
                <Spinner />
              </Heading>
              <Box>
                <Text>{upgradeFile}</Text>
              </Box>
            </>
          ) : upgradeStatus === 'error' ? (
            <>
              <Heading level="2">
                Error Upgrading
                <Spinner />
              </Heading>
              <Box>
                <Text>{upgradeFile}</Text>
              </Box>
            </>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default SoftwareUpgrade;
