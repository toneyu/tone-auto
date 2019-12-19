import { Button, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { commandRequest } from '../actions/xapi';

class DialPage extends React.Component {
  state = {
    number: '',
  };

  render() {
    const { command } = this.props;
    return (
      <Paper>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            command('Dial', { Number: this.state.number });
          }}
        >
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            onChange={(e) => this.setState({ number: e.target.value })}
            value={this.state.number}
          />
          <Button type="submit" variant="contained" color="primary">
            Dial
          </Button>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
  connectionStatus: state.connection.status,
});

const mapDispatchToProps = { push, command: commandRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialPage);
