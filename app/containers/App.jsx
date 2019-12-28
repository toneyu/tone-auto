// @flow
import * as React from 'react';

export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return <div style={{ width: '100vw', height: '100vh' }}>{children}</div>;
  }
}
