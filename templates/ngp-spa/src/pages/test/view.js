import React, { Component } from 'react';
import { connect } from '@ixinwu-ngp/web-core';
import { withStyles } from '@ixinwu-ngp/web-framework';
import styles from './styles';

class XXXX extends Component {
  componentDidMount() {}

  render() {
    const { classes, aaa, bbb } = this.props;
    return <div className={classes.container}>test_b, {aaa}, {bbb}</div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state[ownProps.identity],
});

export default connect(mapStateToProps)(withStyles(styles)(XXXX));
