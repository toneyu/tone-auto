import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box } from 'grommet';
import { Next, Down } from 'grommet-icons';
import { downloadConfigurationRequest } from '../actions/xml-files';
import { putXmlRequest } from '../actions/put-xml';
import Spinner from '../components/Spinner';
import ConnectionStatus from '../constants/connection-status';
import { connectionStatusSelector } from '../selectors/connections';
import Statuses from './Statuses';
import { connectRequest } from '../actions/connection';
import DialForm from './DialForm';
import DmtfForm from './DtmfForm';
import ConfigurationDiff from './ConfigurationDiff';
import SoftwareUpgrade from './SoftwareUpgrade';

const Connection = ({ host, password }) => {
  const dispatch = useDispatch();
  const connectionStatus = useSelector(connectionStatusSelector(host));
  const [configurationDiffOpen, setConfigurationDiffOpen] = useState(false);

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
          <DialForm host={host} />
          <DmtfForm host={host} />

          <div>
            <SoftwareUpgrade host={host} />
            <Button
              icon={configurationDiffOpen ? <Down /> : <Next />}
              onClick={() =>
                setConfigurationDiffOpen((configurationDiffOpen) => !configurationDiffOpen)
              }
              label="Compare Configuration"
            />
            {configurationDiffOpen && <ConfigurationDiff host={host} />}
            <Button
              onClick={() => dispatch(downloadConfigurationRequest(host))}
              label="Download Configuration"
            />
            <Button
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <SystemUnit>
            <SoftwareUpgrade>
              <URL>
              cmterm-s53200ce9_12_4-4aa097e0eb6.k3.cop.sgn
              </URL>
            </SoftwareUpgrade>
          </SystemUnit>
        </Command>`,
                  ),
                )
              }
              label="Install Upgrade"
            />
            <Button
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
              label="Disconnect Call"
            />

            <Button
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
        <Call>
          <Status>
          Connected
          </Status>
          </Call>
        </Command>`,
                  ),
                )
              }
              label="Call Status"
            />
            <Button
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
              label="Mute"
            />
            <Button
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
              label="Unmute"
            />
            <Button
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
              label="Selfview mode on"
            />
            <Button
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
              label="Selfview mode off"
            />
            <Button
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
              label="Do not Disturb Status on"
            />
            <Button
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
              label="Do not Disturb Status off"
            />
            <Button
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
              label="Call Hold"
            />
            <Button
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
              label="Call Resume"
            />
            <Button
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
              label="Dial 1"
            />

            <Button
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Dial>
            <Number>webcast39@vmr.vmrdev.accenture.com</Number>
          </Dial>
        </Command>
               `,
                  ),
                )
              }
              label="webcast39@vmr.vmrdev.accenture.com"
            />

            <Button
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
              label="Send 1#"
            />
            <Button
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
              label="Dial 123@connect.accenture.com"
            />
            <Button
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
                <Command>
                <Dial>
                  <Number>234@vmrdev.accenture.com</Number>
                </Dial>
              </Command>
               `,
                  ),
                )
              }
              label="Dial 234vmrdev@accenture.com"
            />
            <Button
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
              label="Accept Call"
            />
            <Button
              onClick={() =>
                dispatch(
                  putXmlRequest(
                    host,
                    `
        <Command>
          <Call>
            <Disconnect></Disconnect>
    -      </Call>
        </Command>
               `,
                  ),
                )
              }
              label="Disconnect Call"
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default Connection;