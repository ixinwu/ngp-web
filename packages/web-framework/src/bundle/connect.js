import React, { Component } from 'react';

const getDisplayName = name => `NgpConnectBundle(${name})`;

export default function connectBundle(config) {
  return WrappedComponent => {
    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const displayName = getDisplayName(wrappedComponentName);

    const newProps = {
      identity: config.identity,
      ...config.handleTriggers,
    };

    // eslint-disable-next-line
    class BundleComponent extends Component {
      render() {
        return <WrappedComponent {...this.props} {...newProps} />;
      }
    }

    BundleComponent.WrappedComponent = WrappedComponent;
    BundleComponent.displayName = displayName;

    return BundleComponent;
  };
}
