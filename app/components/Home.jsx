import React, { Component } from 'react';
import styles from './Home.css';
import getSshStream from '../utils/get-ssh-stream';

const STATUS = {
  CONNECTED: 'CONNECTED',
  DISCONNECTING: 'DISCONNECTING',
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
};

export default class Home extends Component {
  state = {
    status: STATUS.DISCONNECTED,
  };

  xapi = null;

  cmdRef = React.createRef();

  componentDidMount = () => {
    this.connect();
  };

  connect = () => {
    this.setState({ status: STATUS.CONNECTING });
    getSshStream(() => {
      this.setState({ status: STATUS.DISCONNECTED });
    })
      // eslint-disable-next-line promise/always-return
      .then((xapi) => {
        this.setState({ status: STATUS.CONNECTED });
        this.xapi = xapi;
      })
      .catch((err) => {
        this.setState({ status: STATUS.DISCONNECTED });
        console.error(err);
      });
  };

  // Custom Buttons
  handleMuteClick = () => {
    this.xapi.command('Audio Microphones Mute');
  };

  handleUnmuteClick = () => {
    this.xapi.command('Audio Microphones Unmute');
  };

  handleGetMuteClick = () => {
    this.xapi.status.get('Audio Microphones Mute').then((mute) => {
      console.log(`mute is: ${mute}`);
    });
  };

  handleSelfModeOn = () => {
    this.xapi.config.set('Video Selfview Default Mode', 'On');
  };

  handleSelfModeOff = () => {
    this.xapi.config.set('Video Selfview Default Mode', 'Off');
  };

  handleGetSelfModeStatus = () => {
    this.xapi.config.get('Video Selfview Default Mode').then((selfview) => {
      console.log(`selfview is: ${selfview}`);
    });
  };

  handleDoNotDisturbOn = () => {
    this.xapi.command('Conference DoNotDisturb Activate');
  };

  handleDoNotDisturbOff = () => {
    this.xapi.command('Conference DoNotDisturb Deactivate');
  };

  handleDoNotDisturbStatus = () => {
    this.xapi.status.get('Conference DoNotDisturb').then((status) => {
      console.log(`Do Not Disturb Status is: ${status}`);
    });
  };

  handleCallResume = () => {
    this.xapi.command('Call Resume');
  };

  handleCallHold = () => {
    this.xapi.command('Call Hold');
  };

  handleCallStatus = () => {
    this.xapi.status.get('Call').then((status) => {
      console.log(`Call Status is: ${status}`);
    });
  };

  // command = async (...args) => {
  //   const response = await this.xapi.command(...args);
  //   const { status } = response;
  //   console.log(args);
  //   console.log(status);
  //   if (status != 'OK') {
  //     throw Error(status);
  //   }
  //   return response;
  // };

  //Script #1 Confirm General Functionality
  script1 = async () => {
    let response;

    // Enable selfview from the touchpad or remote
    await this.xapi.config.set('Video Selfview Default Mode', 'On');
    response = await this.xapi.config.get('Video Selfview Default Mode');
    console.log(response);

    // // Disable selfview from the touchpad or remote
    await this.xapi.config.set('Video Selfview Default Mode', 'Off');
    response = await this.xapi.config.get('Video Selfview Default Mode');
    console.log(response);

    // Change the status of the endpoint from Available to Do Not Disturb
    await this.xapi.command('Conference DoNotDisturb Deactivate');
    response = await this.xapi.status.get('Conference DoNotDisturb');
    console.log(response);

    // // Place a call to the endpoint from any other endpoint
    await this.xapi.command('Dial', { Number: '1' });
    console.log(response);
    //response = await this.xapi.status.get('Dial', { Number: '1' });
    //console.log(response);

    // Change the status of the endpoint from Do Not Disturb to Available
    await this.xapi.command('Conference DoNotDisturb Activate');
    response = await this.xapi.status.get('Conference DoNotDisturb');
    console.log(response);

    // // Place a call to the endpoint from any other endpoint
    response = await this.xapi.command('Dial', { Number: '2' });
    console.log(response);
    //response = await this.xapi.status.get('Dial', { Number: '2' });
    //console.log(response);

    // // Dial out to 917039480488
    await this.xapi.command('Dial', { Number: '917039480488' });
    console.log(response);
    //response = await this.xapi.status.get('Dial', { Number: '917039480488' });
    //console.log(response);

    //Disconnect from call
    await this.xapi.command('Call Disconnect');
    console.log(response);
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Check current volume/mute status
    await this.xapi.status.get('Audio');
    response = await this.xapi.status.get('Audio');
    console.log(response);
  };

  // Script #2 Confirm Skype meeting Connectivity
  script2 = async () => {
    let response;

    //Mute/Unmute both endpoints and speak
    await this.xapi.status.get('Audio VolumeMute');
    response = await this.xapi.status.get('Audio VolumeMute');
    console.log(response);

    //Resume the call
    await this.xapi.command('Call Resume');
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Place the second endpoint on hold
    await this.xapi.command('Call Hold');
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Disconnect both endpoints from call
    await this.xapi.command('Call Disconnect');
    response = await this.xapi.status.get('Call');
    console.log(response);
  };

  //Script #3 VC Connectivity
  script3 = async () => {
    let response;

    //Mute/Unmute both endpoints and speak
    await this.xapi.status.get('Audio VolumeMute');
    response = await this.xapi.status.get('Audio VolumeMute');
    console.log(response);

    //Resume the call
    await this.xapi.command('Call Resume');
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Place the second endpoint on hold
    await this.xapi.command('Call Hold');
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Disconnect both endpoints from call
    await this.xapi.command('Call Disconnect');
    response = await this.xapi.status.get('Call');
    console.log(response);
  };

  //Confirm TEAMS meeting Connectivity
  script4 = async () => {
    let response;

    //Mute/Unmute both endpoints and speak
    await this.xapi.status.get('Audio VolumeMute');
    response = await this.xapi.status.get('Audio VolumeMute');
    console.log(response);

    //Place the second endpoint on hold
    await this.xapi.command('Call Hold');
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Resume the call
    await this.xapi.command('Call Resume');
    response = await this.xapi.status.get('Call');
    console.log(response);

    //Disconnect both endpoints from call
    await this.xapi.command('Call Disconnect');
    response = await this.xapi.status.get('Call');
    console.log(response);
  };

  handleDisconnect = () => {
    this.setState({ status: STATUS.DISCONNECTING });
    this.xapi.close();
  };

  render() {
    const { status } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        {status === STATUS.CONNECTED ? (
          <>
            <div className={styles.cmds}>
              <button className="btn btn-danger" onClick={this.handleDisconnect}>
                Disconnect
              </button>
              <button className="btn btn-danger" onClick={this.handleMuteClick}>
                Mute
              </button>
              <button className="btn btn-secondary" onClick={this.handleUnmuteClick}>
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
                <button className="btn btn-warning" onClick={this.handleCallHold}>
                  Call Resume
                </button>
                <button className="btn btn-warning" onClick={this.handleCallStatus}>
                  Get Call Status
                </button>
              </button>
            </div>
            <div className={styles.scripts}>
              <button className="btn btn-primary" onClick={() => this.script1().then()}>
                Script 1
              </button>
              <button className="btn btn-primary" onClick={this.script2}>
                Script 2
              </button>
              <button className="btn btn-primary" onClick={this.script3}>
                Script 3
              </button>
              <button className="btn btn-primary" onClick={this.script4}>
                Script 4
              </button>
            </div>
          </>
        ) : status === STATUS.CONNECTING ? (
          <div>Connecting...</div>
        ) : status === STATUS.DISCONNECTING ? (
          <div>Disconnecting...</div>
        ) : (
          <button className="btn btn-primary" onClick={this.connect}>
            Reconnect
          </button>
        )}
        <h2>Home</h2>
      </div>
    );
  }
}
