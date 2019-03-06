import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import ShellFrame from '@ixinwu-ngp/materials-block/shell_frame';
import mountBlock from '../block/mount';
import { apiService } from '../utils';
import { initClient, initClientSuccess, initClientFailure } from '../redux/actions';

const styles = {};

class Shell extends Component {
  static propTypes = {
    apiConfig: PropTypes.object.isRequired,
    appConfig: PropTypes.object.isRequired,
    appKey: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    clientError: PropTypes.bool.isRequired,
    clientLoading: PropTypes.bool.isRequired,
    getAppConfig: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    initClient: PropTypes.func.isRequired,
    initClientFailure: PropTypes.func.isRequired,
    initClientSuccess: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  // 这个生命周期hook只会在浏览器执行
  componentDidMount() {
    const {
      initClient,
      initClientSuccess,
      initClientFailure,
      appKey,
      apiConfig,
      appConfig,
      getAppConfig,
    } = this.props;

    const token = Cookies.get('token');
    if (!token) {
      window.location.href = `${window.location.origin}/login`;
    }
    // 初始化接口调用服务
    apiService.setApiConfig(apiConfig);
    apiService.setToken(token);

    // 应用配置没有获取则在浏览器获取
    if (!appConfig || (appConfig && appConfig.key !== appKey)) {
      // 优先使用自定义的应用配置获取
      if (getAppConfig) {
        getAppConfig(appKey)
          .then(data => {
            initClientSuccess(data);
          })
          .catch(() => initClientFailure());
      } else {
        initClient(appKey);
      }
    }
  }

  render() {
    const { clientLoading, clientError, classes, appConfig, history, location, match } = this.props;

    let content;

    if (appConfig && appConfig.identity && !this.appComp) {
      const bundle = {};
      Object.keys(ShellFrame).forEach(key => {
        bundle[key] = ShellFrame[key].default || ShellFrame[key];
      });
      this.appComp = mountBlock(appConfig, bundle);
    }

    if (clientLoading) {
      content = <Loading size="large" message="应用初始化中..." />;
    }
    if (clientError) {
      content = <Error message="应用初始化失败，请联系管理员处理" />;
    }

    if (!clientLoading && !clientError && this.appComp) {
      const Comp = this.appComp;
      content = <Comp history={history} location={location} match={match} />;
    }

    return <div className={classes.container}>{content}</div>;
  }
}

const mapStateToProps = state => ({
  appConfig: state.appConfig,
  apiConfig: state.apiConfig,
  clientLoading: state.clientLoading,
  clientError: state.clientError,
});

const mapStateToDispatch = { initClient, initClientSuccess, initClientFailure };

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(withStyles(styles)(Shell));
