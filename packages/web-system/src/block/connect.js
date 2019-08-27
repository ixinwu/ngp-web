import React, { Component } from 'react';
import { connect } from '@ixinwu-ngp/web-core';

const getDisplayName = name => `NgpConnect(${name})`;

function initMapStateToProps(mapState) {
  if (typeof mapState === 'function') {
    return mapState;
  }
  return () => ({});
}

export default function connectBlock(blockConfig) {
  const {
    config,
    settings,
    dataConfigs,
    handleConfigs,
    mapState,
    identity,
    handleTriggers,
  } = blockConfig;

  const mapStateToProps = initMapStateToProps(mapState);

  const newProps = {
    identity,
    ...handleTriggers,
    ...config,
    ...settings,
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
