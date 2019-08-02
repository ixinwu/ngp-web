import React, { Component } from 'react';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import BlockLoader from '../block/loader';
import RouteContext from '../context/route';
import ParentContext from '../context/parent';

class Shell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.init ? 'loading' : 'ready',
    };
  }

  componentDidMount() {
    const { init, appKey } = this.props;

    if (init) {
      init(appKey)
        .then(() => {
          this.setState(prevState => ({
            ...prevState,
            status: 'ready',
          }));
        })
        .catch(() => {
          this.setState(prevState => ({
            ...prevState,
            status: 'error',
          }));
        });
    }
  }

  render() {
    const { identity, basename, initConfig } = this.props;
    const { status } = this.state;

    let content = <Loading size="large" message={initConfig.loadingTip || '加载中...'} />;
    if (status === 'loading') {
      content = <Loading size="large" message={initConfig.loadingTip || '加载中...'} />;
    }
    if (status === 'error') {
      content = <Error message={initConfig.errorTip || '加载失败...'} />;
    }
    if (status === 'ready') {
      content = (
        <RouteContext.Provider value={{ path: basename }}>
          <ParentContext.Provider value={() => {}}>
            <BlockLoader identity={identity} />
          </ParentContext.Provider>
        </RouteContext.Provider>
      );
    }
    return content;
  }
}

export default Shell;
