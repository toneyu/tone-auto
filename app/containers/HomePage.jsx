import React, { Component } from 'react';
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

class HomePage extends Component {
  cmdRef = React.createRef();

  // Custom Buttons
  handleMuteClick = () => {
    this.props.command(this.props.host, 'Audio Microphones Mute');
  };

  handleUnmuteClick = () => {
    this.props.command(this.props.host, 'Audio Microphones Unmute');
  };

  handleGetMuteClick = () => {
    this.props.statusGet(this.props.host, 'Audio Microphones Mute');
  };

  handleSelfModeOn = () => {
    this.props.configSet(this.props.host, 'Video Selfview Default Mode', 'On');
  };

  handleSelfModeOff = () => {
    this.props.configSet(this.props.host, 'Video Selfview Default Mode', 'Off');
  };

  handleGetSelfModeStatus = () => {
    this.props.configGet(this.props.host, 'Video Selfview Default Mode');
  };

  handleDoNotDisturbOn = () => {
    this.props.command(this.props.host, 'Conference DoNotDisturb Activate');
  };

  handleDoNotDisturbOff = () => {
    this.props.command(this.props.host, 'Conference DoNotDisturb Deactivate');
  };

  handleDoNotDisturbStatus = () => {
    this.props.statusGet(this.props.host, 'Conference DoNotDisturb');
  };

  handleCallResume = () => {
    this.props.command(this.props.host, 'Call Resume');
  };

  handleCallHold = () => {
    this.props.command(this.props.host, 'Call Hold');
  };

  handleCallStatus = () => {
    this.props.statusGet(this.props.host, 'Call');
  };

  handleDialOne = () => {
    this.props.command(this.props.host, 'Dial', { Number: '1' });
  };

  handleDialTwo = () => {
    this.props.command(this.props.host, 'Dial', { Number: '2' });
  };

  handleDialX = () => {
    this.props.command(this.props.host, 'Dial', { Number: '919205699777' });
  };

  handleCallDisconnect = () => {
    this.props.command(this.props.host, 'Call Disconnect');
  };

  handleCallAccept = () => {
    this.props.command(this.props.host, 'Call Accept');
  };

  render() {
    const { downloadConfigurationRequest, host } = this.props;

    return (
      <div>
        {/* <Link to={routes.SCRIPTS}>
          <div className={styles.link}>Scripts</div>
        </Link> */}
        <div>
          <Button onClick={() => downloadConfigurationRequest(host)}>Download Configuration</Button>
          <button className="btn btn-warning" onClick={this.handleDisconnect}>
            Disconnect Call
          </button>
          <button className="btn btn-warning" onClick={this.handleMuteClick}>
            Mute
          </button>
          <button className="btn btn-warning" onClick={this.handleUnmuteClick}>
            Unmute
          </button>
          <button className="btn btn-warning" onClick={this.handleGetMuteClick}>
            Get Mute Status
          </button>
          <button className="btn btn-warning" onClick={this.handleSelfModeOn}>
            Selfview mode on
          </button>
          <button className="btn btn-warning" onClick={this.handleSelfModeOff}>
            Selfview mode off
          </button>
          <button className="btn btn-warning" onClick={this.handleGetSelfModeStatus}>
            Get Selfview Status
          </button>
          <button className="btn btn-warning" onClick={this.handleDoNotDisturbOn}>
            Do not Disturb Status on
          </button>
          <button className="btn btn-warning" onClick={this.handleDoNotDisturbOff}>
            Do not Disturb Status off
          </button>
          <button className="btn btn-warning" onClick={this.handleDoNotDisturbStatus}>
            Get Do not Disturb Status
          </button>
          <button className="btn btn-warning" onClick={this.handleCallResume}>
            Call Hold
          </button>
          <button className="btn btn-warning" onClick={this.handleCallHold}>
            Call Resume
          </button>
          <button className="btn btn-warning" onClick={this.handleCallStatus}>
            Get Call Status
          </button>
          <button className="btn btn-warning" onClick={this.handleDialOne}>
            Dial 1
          </button>
          <button className="btn btn-warning" onClick={this.handleDialTwo}>
            Dial 2
          </button>
          <button className="btn btn-warning" onClick={this.handleDialX}>
            Dial 917039480488
          </button>
          <button className="btn btn-warning" onClick={this.handleCallAccept}>
            Accept Call
          </button>
          <button className="btn btn-warning" onClick={this.handleCallDisconnect}>
            Disconnect Call
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  command: commandRequest,
  statusGet: statusGetRequest,
  statusSet: statusSetRequest,
  configGet: configGetRequest,
  configSet: configSetRequest,
  downloadConfigurationRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
