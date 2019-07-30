import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import { requestBlockConfig } from '../redux/actions';

class BlockContainer extends Component {
  componentDidMount() {
    const { identity, block, route } = this.props;
    requestBlockConfig(identity, block, route);
  }

  render() {
    const { block, identity, ...rest } = this.props;

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

const mapDispatchToProps = {
  requestBlockConfig,
};

export default connect(
  null,
  mapDispatchToProps,
)(BlockContainer);
