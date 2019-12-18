import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import {
  commandRequest,
  statusGetRequest,
  statusSetRequest,
  configSetRequest,
  configGetRequest,
} from '../actions/xapi';

class HomePage extends Component {
  cmdRef = React.createRef();

  // Custom Buttons
  handleMuteClick = () => {
    this.props.command('Audio Microphones Mute');
  };

  handleUnmuteClick = () => {
    this.props.command('Audio Microphones Unmute');
  };

  handleGetMuteClick = () => {
    this.props.statusGet('Audio Microphones Mute');
  };

  handleSelfModeOn = () => {
    this.props.configSet('Video Selfview Default Mode', 'On');
  };

  handleSelfModeOff = () => {
    this.props.configSet('Video Selfview Default Mode', 'Off');
  };

  handleGetSelfModeStatus = () => {
    this.props.configGet('Video Selfview Default Mode');
  };

  handleDoNotDisturbOn = () => {
    this.props.command('Conference DoNotDisturb Activate');
  };

  handleDoNotDisturbOff = () => {
    this.props.command('Conference DoNotDisturb Deactivate');
  };

  handleDoNotDisturbStatus = () => {
    this.props.statusGet('Conference DoNotDisturb');
  };

  handleCallResume = () => {
    this.props.command('Call Resume');
  };

  handleCallHold = () => {
    this.props.command('Call Hold');
  };

  handleCallStatus = () => {
    this.props.statusGet('Call');
  };

  handleDialOne = () => {
    this.props.command('Dial', { Number: '1' });
  };

  handleDialTwo = () => {
    this.props.command('Dial', { Number: '2' });
  };

  handleDialX = () => {
    this.props.command('Dial', { Number: '917039480488' });
  };

  handleCallDisconnect = () => {
    this.props.command('Call Disconnect');
  };

  render() {
    return (
      <div>
        {/* <Link to={routes.SCRIPTS}>
          <div className={styles.link}>Scripts</div>
        </Link> */}
        <div className={styles.cmds}>
          <button className="btn btn-danger" onClick={this.handleDisconnect}>
            Disconnect
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
