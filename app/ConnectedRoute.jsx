import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

import ConnectionStatus from './constants/connection-status';
import routes from './constants/routes';

const ConnectedRoute = ({ component: Component, connectionStatus, ...rest }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={(props) =>
      connectionStatus === ConnectionStatus.CONNECTED ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...props} />
      ) : (
        <Redirect to={routes.CONNECTIONS} />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  connectionStatus: state.connection.status,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedRoute);
