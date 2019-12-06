import React, { Component } from 'react';
import styles from './App.css';
import xapi from '../actions/xapi';

export default class HomePage extends Component {
  cmdRef = React.createRef();

  // Custom Buttons
  handleMuteClick = () => {
    xapi.command('Audio Microphones Mute');
  };

  handleUnmuteClick = () => {
    xapi.command('Audio Microphones Unmute');
  };

  handleGetMuteClick = () => {
    xapi.status.get('Audio Microphones Mute').then((mute) => {
      console.log(`mute is: ${mute}`);
    });
  };

  handleSelfModeOn = () => {
    xapi.config.set('Video Selfview Default Mode', 'On');
  };

  handleSelfModeOff = () => {
    xapi.config.set('Video Selfview Default Mode', 'Off');
  };

  handleGetSelfModeStatus = () => {
    xapi.config.get('Video Selfview Default Mode').then((selfview) => {
      console.log(`selfview is: ${selfview}`);
    });
  };

  handleDoNotDisturbOn = () => {
    xapi.command('Conference DoNotDisturb Activate');
  };

  handleDoNotDisturbOff = () => {
    xapi.command('Conference DoNotDisturb Deactivate');
  };

  handleDoNotDisturbStatus = () => {
    xapi.status.get('Conference DoNotDisturb').then((status) => {
      console.log(`Do Not Disturb Status is: ${status}`);
    });
  };

  handleCallResume = () => {
    xapi.command('Call Resume');
  };

  handleCallHold = () => {
    xapi.command('Call Hold');
  };

  handleCallStatus = () => {
    xapi.status.get('Call').then((status) => {
      console.log(`Call Status is: ${status}`);
    });
  };

  handleDialOne = () => {
    xapi.command('Dial', { Number: '1' });
  };

  handleDialTwo = () => {
    xapi.command('Dial', { Number: '2' });
  };

  handleDialX = () => {
    xapi.command('Dial', { Number: '917039480488' });
  };

  handleCallDisconnect = () => {
    xapi.command('Call Disconnect');
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
