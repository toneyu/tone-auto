// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import process from 'child_process';
import { Client } from 'ssh2';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  cmdRef = React.createRef();

  stream = null;

  state = {
    connected: false
  };
  constructor(props) {
    super(props);

    const conn = new Client();
    conn
      .on('ready', () => {
        console.log('Client :: ready');
        conn.shell((err, stream) => {
          if (err) throw err;
          this.setState({ connected: true });
          stream
            .on('close', function() {
              console.log('Stream :: close');
              conn.end();
            })
            .on('data', function(data) {
              console.log(data.toString());
            });
          this.stream = stream;
          // stream.end('ls -l\nexit\n');
        });
      })
      .on('keyboard-interactive', function(
        name,
        instructions,
        instructionsLang,
        prompts,
        finish
      ) {
        console.log('Connection :: keyboard-interactive');
        finish(['fabC711']);
      })
      .connect({
        host: '10.12.15.158',
        port: 22,
        username: 'admin',
        password: 'fabC711',
        tryKeyboard: true
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const cmd = this.cmdRef.current.value;
    this.stream.write(cmd + '\n');
  };

  handleMuteClick = () => {
    this.stream.write('xCommand Audio Microphones Mute\n');
  };

  handleUnmuteClick = () => {
    this.stream.write('xCommand Audio Microphones Unmute\n');
  };

  handleByeClick = () => {
    this.stream.write('bye\n');
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        {this.state.connected ? (
          <div>
            <button className="btn btn-danger" onClick={this.handleMuteClick}>
              Mute
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.handleUnmuteClick}
            >
              Unmute
            </button>
            <button className="btn btn-warning" onClick={this.handleByeClick}>
              Bye
            </button>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter command"
                  ref={this.cmdRef}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div>Connecting...</div>
        )}
        <h2>Home</h2>
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <button type="button" className="btn btn-secondary">
          Secondary
        </button>

        <button type="button" className="btn btn-link">
          Link
        </button>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
    );
  }
}
