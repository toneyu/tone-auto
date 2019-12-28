// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from '../constants/routes';
import xcom from '../assets/xcom.csv';
import { script1Request, script2Request, script3Request, script4Request } from '../actions/scripts';

const STATUS = {
  CONNECTED: 'CONNECTED',
  DISCONNECTING: 'DISCONNECTING',
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
};

class ScriptsPage extends React.Component {
  script1 = () => this.props.script1Request;

  script2 = () => this.props.script2Request;

  script3 = () => this.props.script3Request;

  script4 = () => this.props.script4Request;

  render() {
    const { status } = this.state;
    return (
      <div>
        {status === STATUS.CONNECTED ? (
          <>
            <Link to={routes.HOME}>
              <div>Custom Buttons</div>
            </Link>
            <div>
              <button className="btn btn-danger" onClick={this.handlelDisconnect}>
                Disconnect
              </button>
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
          <>
            {xcom.map((row) => (
              <div>
                <button className="btn btn-primary" onClick={this.connect(row)}>
                  Connect to {row.host}
                </button>
              </div>
            ))}
          </>
        )}
        <h2>ScriptsPage</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.connection.status,
});

export default connect(
  mapStateToProps,
  {
    script1Request,
    script2Request,
    script3Request,
    script4Request,
  },
)(ScriptsPage);
