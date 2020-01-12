// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addConnections } from '../actions/connections';
import xcom from '../assets/xcom.csv';
import 'filepond/dist/filepond.min.css';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.addConnections(xcom);
  }

  render() {
    const { children } = this.props;
    return <StyledApp>{children}</StyledApp>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addConnections,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
