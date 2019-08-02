import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import unmount from './unmount';
import { blockMount, blockUnmount } from '../redux/actions';
import BlockContainer from './container';
import RouteContext from '../context/route';
import ParentContext from '../context/parent';

class BlockLoader extends Component {
  componentDidMount() {
    const { identity } = this.props;
    blockMount(identity);
  }

  componentWillUnmount() {
    const { identity, blockUnmount } = this.props;
    unmount(identity);
    blockUnmount(identity);
  }

  render() {
    const { block, identity } = this.props;

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
                    identity={identity}
                    route={route}
                    backToParent={backToParent}
                    pagePath={route.path}
                  />
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
  const block = state.blocks.find(block => block.identity === ownProps.identity);

  return {
    block,
  };
};

const mapDispatchToProps = {
  blockMount,
  blockUnmount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockLoader);
