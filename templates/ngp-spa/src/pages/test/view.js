import React, { Component } from 'react';
import { connect } from '@ixinwu-ngp/web-core';
import { withStyles } from '@ixinwu-ngp/web-styles';
import styles from './styles';
import { FlowDesign } from 'react-flow-design';

class XXXX extends Component {
  state = {
    processesDesign: [],
  };

  componentDidMount() {}

  handleFlowDesignChange = design => {
    this.setState(prevState => ({
      ...prevState,
      processesDesign: design,
    }));
  };

  render() {
    const { classes, aaa, bbb } = this.props;
    return (
      <div className={classes.container}>
        test_b, {aaa}, {bbb}
        <div>
          <FlowDesign design={this.state.processesDesign} onChange={this.handleFlowDesignChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state[ownProps.identity],
});

export default connect(mapStateToProps)(withStyles(styles)(XXXX));
