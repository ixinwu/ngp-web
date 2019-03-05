import React, { Component } from 'react';
import { connect } from '@ixinwu-ngp/web-core';

const getDisplayName = name => `NgpConnect(${name})`;

function initMapStateToProps(mapState) {
  if (typeof mapState === 'function') {
    return mapState;
  }
  // TODO实现映射配置解析
  return () => {};
}

export default function connectBlock(blockConfig) {
  const { config, dataConfigs, handleConfigs, mapState, identity, handleTriggers } = blockConfig;

  const mapStateToProps = initMapStateToProps(mapState);

  const newProps = {
    identity,
    ...handleTriggers,
    ...config,
    dataConfigs,
    handleConfigs,
  };

  return WrappedComponent => {
    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const displayName = getDisplayName(wrappedComponentName);
    const ConnectWrappedComponent = connect(mapStateToProps)(WrappedComponent);

    // eslint-disable-next-line
    class BlockComponent extends Component {
      render() {
        return <ConnectWrappedComponent {...this.props} {...newProps} />;
      }
    }

    BlockComponent.WrappedComponent = WrappedComponent;
    BlockComponent.displayName = displayName;

    return BlockComponent;
  };
}
