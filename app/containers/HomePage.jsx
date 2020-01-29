import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'grommet';
import { configGetRequest, statusGetRequest } from '../actions/xapi';
import { downloadConfigurationRequest } from '../actions/xml-files';
import { putXmlRequest } from '../actions/put-xml';

const HomePage = ({ host }) => {
  const dispatch = useDispatch();

  return (
    <div>
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
          <Dial>
            <Number>2</Number>
          </Dial>
        </Command>
               `,
              ),
            )
          }
        >
          Dial 2
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
            <Number>917039480488</Number>
          </Dial>
        </Command>
               `,
              ),
            )
          }
        >
          Dial 917039480488
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
    </div>
  );
};

export default HomePage;
