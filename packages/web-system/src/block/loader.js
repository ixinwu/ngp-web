import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import unmount from './unmount';
import { blockMount, blockUnmount } from '../redux/actions';
import BlockContainer from './container';
import RouteContext from '../context/route';
import ParentContext from '../context/parent';

class BlockLoader extends Component {
  componentDidMount() {
    const { blockKey, blockMount } = this.props;
    blockMount(blockKey);
  }

  componentWillUnmount() {
    const { blockKey, identity, blockUnmount } = this.props;
    unmount(identity || blockKey);
    blockUnmount(blockKey);
  }

  render() {
    const { block, blockKey, identity, children, ...rest } = this.props;

    let content = <Loading size="large" message="加载中..." />;
    if (block) {
      if (block.status === 'loading') {
        content = <Loading size="large" message={block.tip} />;
      }
      if (block.status === 'error') {
        content = <Error message={block.tip} />;
      }
      if (block.status && block.status !== 'loading' && block.status !== 'error') {
        content = (
          <RouteContext.Consumer>
            {route => (
              <ParentContext.Consumer>
                {backToParent => (
                  <BlockContainer
                    {...rest}
                    blockKey={blockKey}
                    identity={identity}
                    route={route}
                    backToParent={backToParent}
                    pagePath={route.pathname}
                  >
                    {children}
                  </BlockContainer>
                )}
              </ParentContext.Consumer>
            )}
          </RouteContext.Consumer>
        );
      }

      return content;
    }

    return content;
  }
}

const mapStateToProps = (state, ownProps) => {
  const block = state.blocks.find(block => block.blockKey === ownProps.blockKey);

  return {
    block,
  };
};

const mapDispatchToProps = {
  blockMount,
  blockUnmount,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BlockLoader),
);
