import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import xcom from '../assets/xcom.csv';
import { connectRequest } from '../actions/connection';
import ConnectionStatus from '../constants/connection-status';

class ConnectionPage extends Component {
  handleConnectClick = (row) => () => {
    this.props.connectRequest(row.host, row.password);
  };

  render() {
    return (
      <div>
        <div className={styles.connections}>
          {xcom.map((row) => (
            <div className={styles.ip} key={row.host}>
              <button
                className="btn btn-primary"
                onClick={this.handleConnectClick(row)}
                disabled={
                  this.props.connectionStatus === ConnectionStatus.CONNECTING ||
                  this.props.connectionStatus === ConnectionStatus.DISCONNECTING
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPage);
