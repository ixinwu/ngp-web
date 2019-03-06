import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { Switch } from 'react-router-dom';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import { routeMount, routeUnmount } from '../redux/actions';
// 布局
import RouteLayout from '../route_layout';
import generateRouteContent from '../utils/generate_route_content';

const { Popup: PopupLayout, Slide: SlideLayout } = RouteLayout;

class RouteContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.ref = React.createRef();
  // }

  componentDidMount() {
    const {
      routeConfig,
      pagePath,
      routeMount,
      location: { search },
    } = this.props;
    routeMount(pagePath, routeConfig, search);
  }

  componentWillUnmount() {
    const { routeConfig, pagePath, routeUnmount } = this.props;
    routeUnmount(pagePath, routeConfig);
  }

  handleBackToParent = searchParam => {
    const {
      parent: { pathname, search },
      history,
    } = this.props;
    const parentSearch = searchParam || search;
    if (parentSearch) {
      history.push({
        pathname,
        search: parentSearch,
      });
    } else {
      history.push({
        pathname,
      });
    }
  };

  render() {
    const { routeConfig, pagePath, current, location, parent } = this.props;

    if (current) {
      const { childRouteConfigs = [] } = current;
      const matchChildRouteConfig = childRouteConfigs.find(childRouteConfig =>
        matchPath(location.pathname, { path: `${pagePath}${childRouteConfig.url}` }),
      );
      const isCovered =
        matchChildRouteConfig &&
        matchChildRouteConfig.type !== 'SlideIn' &&
        matchChildRouteConfig.type !== 'Popup' &&
        routeConfig.type !== 'Inside';

      let content = null;

      if (!isCovered && current.status === 'loading') {
        content = <Loading size="large" message={current.tip} />;
      }
      if (!isCovered && current.status === 'error') {
        content = <Error message={current.tip} />;
      }
      if (!isCovered && current.status === 'ready' && current.pageComp) {
        const PageComp = current.pageComp;
        content = (
          <PageComp
            currentRoute={current}
            parentRoute={parent}
            onBackToParent={this.handleBackToParent}
            pagePath={pagePath}
          />
        );
      }

      const childRoutes = generateRouteContent(pagePath, childRouteConfigs);
      if (routeConfig.type === 'SlideIn') {
        const style = {
          width: routeConfig.width || '30%',
        };
        return (
          <SlideLayout onClose={this.handleBackToParent} style={style}>
            {content}
            <Switch>{childRoutes}</Switch>
          </SlideLayout>
        );
      }
      if (routeConfig.type === 'Popup') {
        const style = {
          width: routeConfig.width || 590,
          height: routeConfig.height || 590,
        };
        return (
          <PopupLayout maskClosable onClose={this.handleBackToParent} style={style}>
            {content}
            <Switch>{childRoutes}</Switch>
          </PopupLayout>
        );
      }

      if (routeConfig.type === 'Inside' && current.pageComp) {
        const PageComp = current.pageComp;
        return (
          <PageComp
            currentRoute={current}
            parentRoute={parent}
            onBackToParent={this.handleBackToParent}
            pagePath={pagePath}
          >
            <Switch>{childRoutes}</Switch>
          </PageComp>
        );
      }
      return (
        <React.Fragment>
          {content}
          <Switch>{childRoutes}</Switch>
        </React.Fragment>
      );
    }

    return null;
  }
}

RouteContainer.propTypes = {
  current: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  pagePath: PropTypes.string,
  parent: PropTypes.object,
  routeConfig: PropTypes.object,
  routeMount: PropTypes.func.isRequired,
  routeUnmount: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const current = state.routeHistory.find(route => route.pathname === ownProps.pagePath);
  const parent = state.routeHistory.find(
    route => route.pathname === ownProps.pagePath.replace(/(\/[^/]*?)$/, ''),
  );

  return {
    current,
    parent,
  };
};

const mapDispatchToProps = {
  routeMount,
  routeUnmount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteContainer);
