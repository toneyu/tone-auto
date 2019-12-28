// import React, { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { script1Request, script2Request, script3Request, script4Request } from '../actions/scripts';

class ScriptsPage extends React.Component {
  render() {
    const { script1Request, script2Request, script3Request, script4Request } = this.props;
    return (
      <div>
        <div>
          {/* <button className="btn btn-danger" onClick={this.handlelDisconnect}>
            Disconnect
          </button> */}
          <button className="btn btn-primary" onClick={script1Request}>
            Script 1
          </button>
          <button className="btn btn-primary" onClick={script2Request}>
            Script 2
          </button>
          <button className="btn btn-primary" onClick={script3Request}>
            Script 3
          </button>
          <button className="btn btn-primary" onClick={script4Request}>
            Script 4
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  script1Request,
  script2Request,
  script3Request,
  script4Request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScriptsPage);
