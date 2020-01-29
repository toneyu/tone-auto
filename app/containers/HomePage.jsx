import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'grommet';
import {
  commandRequest,
  configGetRequest,
  configSetRequest,
  statusGetRequest,
  statusSetRequest,
} from '../actions/xapi';
import { downloadConfigurationRequest } from '../actions/xml-files';
import { putXmlRequest } from '../actions/put-xml';

const HomePage = ({ downloadConfigurationRequest, host, putXmlRequest, statusGet, configGet }) => {
  return (
    <div>
      {/* <Link to={routes.SCRIPTS}>
          <div className={styles.link}>Scripts</div>
        </Link> */}
      <div>
        <Button className="btn btn-danger" onClick={() => downloadConfigurationRequest(host)}>
          Download Configuration
        </Button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Call>
            <Disconnect>
            </Disconnect>
          </Call>
        </Command>`,
            )
          }
        >
          Disconnect Call
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
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
            )
          }
        >
          Mute
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
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
            )
          }
        >
          Unmute
        </button>
        <button
          className="btn btn-warning"
          onClick={() => statusGet(host, 'Audio Microphones Mute')}
        >
          Get Mute Status
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
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
            )
          }
        >
          Selfview mode on
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
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
            )
          }
        >
          Selfview mode off
        </button>
        <button
          className="btn btn-warning"
          onClick={() => configGet(host, 'Video Selfview Default Mode')}
        >
          Get Selfview Status
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
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
            )
          }
        >
          Do not Disturb Status on
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
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
            )
          }
        >
          Do not Disturb Status off
        </button>
        <button
          className="btn btn-warning"
          onClick={() => statusGet(host, 'Conference DoNotDisturb')}
        >
          Get Do not Disturb Status
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Call>
            <Hold>
            </Hold>
          </Call>
        </Command>`,
            )
          }
        >
          Call Hold
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Call>
            <Resume>
            </Resume>
          </Call>
        </Command>`,
            )
          }
        >
          Call Resume
        </button>
        <button className="btn btn-warning" onClick={() => statusGet(host, 'Call')}>
          Get Call Status
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Dial>
            <Number>1</Number>
          </Dial>
        </Command>
               `,
            )
          }
        >
          Dial 1
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Dial>
            <Number>2</Number>
          </Dial>
        </Command>
               `,
            )
          }
        >
          Dial 2
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Dial>
            <Number>917039480488</Number>
          </Dial>
        </Command>
               `,
            )
          }
        >
          Dial 917039480488
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Call>
            <Accept>1</Accept>
          </Call>
        </Command>
               `,
            )
          }
        >
          Accept Call
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            putXmlRequest(
              host,
              `
        <Command>
          <Call>
            <Disconnect></Disconnect>
          </Call>
        </Command>
               `,
            )
          }
        >
          Disconnect Call
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  command: commandRequest,
  statusGet: statusGetRequest,
  statusSet: statusSetRequest,
  configGet: configGetRequest,
  configSet: configSetRequest,
  downloadConfigurationRequest,
  putXmlRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
