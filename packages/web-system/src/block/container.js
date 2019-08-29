import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import { requestBlockConfig } from '../redux/actions';

class BlockContainer extends Component {
  componentDidMount() {
    const { key, identity, block, route, requestBlockConfig } = this.props;
    requestBlockConfig(key, identity, block, route);
  }

  render() {
    const { block, key, ...rest } = this.props;

    let content = <Loading size="large" message="初始化中..." />;
    if (block) {
      if (block.status === 'config_loading') {
        content = <Loading size="large" message={block.tip} />;
      }
      if (block.status === 'error') {
        content = <Error message={block.tip} />;
      }
      if (block.status === 'ready') {
        if (block.comp) {
          content = <block.comp {...rest} />;
        } else {
          content = <Error message={block.tip} />;
        }
      }

      return content;
    }

    return content;
  }
}

const mapStateToProps = (state, ownProps) => {
  const block = state.blocks.find(block => block.key === ownProps.key);

  return {
    block,
  };
};

const mapDispatchToProps = {
  requestBlockConfig,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockContainer));
