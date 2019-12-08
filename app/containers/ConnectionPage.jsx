import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import xcom from '../assets/xcom.csv';
import { connectRequest, disconnectRequest } from '../actions/connection';
import ConnectionStatus from '../constants/connection-status';

class ConnectionPage extends Component {
  handleConnectClick = (row) => () => {
    this.props.connectRequest(row.host, row.password);
  };

  render() {
    const { connectionStatus } = this.props;
    return (
      <div>
        <div className={styles.connections}>
          {connectionStatus === ConnectionStatus.CONNECTED && (
            <button className="btn btn-danger" onClick={() => this.props.disconnectRequest()}>
              Disconnect
            </button>
          )}
          {xcom.map((row) => (
            <div className={styles.ip} key={row.host}>
              <button
                className="btn btn-primary"
                onClick={this.handleConnectClick(row)}
                disabled={
                  connectionStatus === ConnectionStatus.CONNECTING ||
                  connectionStatus === ConnectionStatus.DISCONNECTING
                }
              >
                Connect to {row.host}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  connectionStatus: state.connection.status,
});

const mapDispatchToProps = {
  connectRequest,
  disconnectRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPage);
