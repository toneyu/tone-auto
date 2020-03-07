import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Form, FormField, TextInput } from 'grommet';
import { configGetRequest, statusGetRequest } from '../actions/xapi';
import { downloadConfigurationRequest } from '../actions/xml-files';
import { putXmlRequest } from '../actions/put-xml';
import Spinner from '../components/Spinner';
import ConnectionStatus from '../constants/connection-status';
import { connectionStatusSelector } from '../selectors/connections';
import Statuses from './Statuses';
import { connectRequest } from '../actions/connection';

const HomePage = ({ host, password }) => {
  const dispatch = useDispatch();
  const [dial, setDial] = useState('');
  const [dtmf, setDtmf] = useState('');
  const connectionStatus = useSelector(connectionStatusSelector(host));

  return (
    <Box align="start">
      {connectionStatus === ConnectionStatus.CONNECTING ||
      connectionStatus === ConnectionStatus.DISCONNECTING ? (
        <Spinner />
      ) : connectionStatus === ConnectionStatus.DISCONNECTED ? (
        <Button label="Reconnect" onClick={() => dispatch(connectRequest(host, password))} />
      ) : (
        <>
          <Statuses host={host} />
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
                  onChange={({ target: { value } }) => setDial({ dial: value })}
                />
              </FormField>
              <Button primary type="submit" label="Dial Number" />
            </Box>
          </Form>
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
                  onChange={({ target: { value } }) => setDtmf({ dtmf: value })}
                />
              </FormField>
              <Button primary type="submit" label="Send DMTF" />
            </Box>
          </Form>

          <div>
            <Button
              className="btn btn-danger"
              onClick={() => dispatch(downloadConfigurationRequest(host))}
            >
              Download Configuration
            </Button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <Disconnect>
            </Disconnect>
          </Call>
        </Command>`,
                  ),
                )
              }
            >
              Disconnect Call
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
                <Command>
                <Audio>
                     <Microphones>
                     <Mute></Mute>
                     </Microphones>
                </Audio>
            </Command>
          `,
                  ),
                )
              }
            >
              Mute
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
            <Command>
            <Audio>
                 <Microphones>
                 <Unmute></Unmute>
                 </Microphones>
            </Audio>
        </Command>`,
                  ),
                )
              }
            >
              Unmute
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(statusGetRequest(host, 'Audio Microphones Mute'))}
            >
              Get Mute Status
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Configuration>
          <Video>
            <Selfview>
              <Default>
                <Mode>On</Mode>
              </Default>
            </Selfview>
          </Video>
        </Configuration>`,
                  ),
                )
              }
            >
              Selfview mode on
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Configuration>
          <Video>
            <Selfview>
              <Default>
                <Mode>Off</Mode>
              </Default>
            </Selfview>
          </Video>
        </Configuration>`,
                  ),
                )
              }
            >
              Selfview mode off
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(configGetRequest(host, 'Video Selfview Default Mode'))}
            >
              Get Selfview Status
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Conference>
            <DoNotDisturb>
              <Activate>
              </Activate>
            </DoNotDisturb>
          </Conference>
        </Command>`,
                  ),
                )
              }
            >
              Do not Disturb Status on
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Conference>
            <DoNotDisturb>
              <Deactivate>
              </Deactivate>
            </DoNotDisturb>
          </Conference>
        </Command>`,
                  ),
                )
              }
            >
              Do not Disturb Status off
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(statusGetRequest(host, 'Conference DoNotDisturb'))}
            >
              Get Do not Disturb Status
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <Hold>
            </Hold>
          </Call>
        </Command>`,
                  ),
                )
              }
            >
              Call Hold
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <Resume>
            </Resume>
          </Call>
        </Command>`,
                  ),
                )
              }
            >
              Call Resume
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(statusGetRequest(host, 'Call'))}
            >
              Get Call Status
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Dial>
            <Number>1</Number>
          </Dial>
        </Command>
               `,
                  ),
                )
              }
            >
              Dial 1
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <DTMFSend>
              <DTMFString>1#</DTMFString>
            </DTMFSend>
          </Call>
        </Command>
               `,
                  ),
                )
              }
            >
              Send 1#
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
                <Command>
                <Dial>
                  <Number>123@connect.accenture.com</Number>
                </Dial>
              </Command>
               `,
                  ),
                )
              }
            >
              Dial 123@connect.accenture.com
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <Accept>1</Accept>
          </Call>
        </Command>
               `,
                  ),
                )
              }
            >
              Accept Call
            </button>
            <button
              className="btn btn-warning"
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <Disconnect></Disconnect>
          </Call>
        </Command>
               `,
                  ),
                )
              }
            >
              Disconnect Call
            </button>
          </div>
        </>
      )}
    </Box>
  );
};

export default HomePage;
