import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { Switch } from 'react-router-dom';
import { routeMount, routeUpdate, routeUnmount } from '../redux/actions';
// 布局
import RoutePopup from './popup';
import RouteSlide from './slide';
import generateRouteContent from '../utils/generate_route_content';
import BlockLoader from '../block/loader';
import RouteContext from '../context/route';
import ParentContext from '../context/parent';

class RouteContainer extends Component {
  componentDidMount() {
    const { routeConfig, parentRoute, routeMount, location } = this.props;
    routeMount(routeConfig, parentRoute, location.pathname, location.search);
  }

  componentDidUpdate(prevProps) {
    const { current, routeUpdate, location, match } = this.props;
    if (
      current &&
      match.isExact &&
      (prevProps.location.pathname !== location.pathname ||
        prevProps.location.search !== location.search)
    ) {
      routeUpdate(current, {
        pathname: location.pathname,
        search: location.search,
      });
    }
  }

  componentWillUnmount() {
    const { current, routeUnmount } = this.props;
    routeUnmount(current);
  }

  backToParent = searchParam => {
    const { parentRoute, history } = this.props;
    if (!parentRoute) {
      return;
    }
    const parentSearch = searchParam || parentRoute.search;
    if (parentSearch) {
      history.push({
        pathname: parentRoute.pathname,
        search: parentSearch,
      });
    } else {
      history.push({
        pathname: parentRoute.pathname,
      });
    }
  };

  handleBackToParent = searchParam => {
    this.backToParent(searchParam);
  };

  render() {
    const { location, current } = this.props;

    if (current) {
      const { childRouteConfigs = [] } = current;
      const matchChildRouteConfig = childRouteConfigs.find(childRouteConfig =>
        matchPath(location.pathname, { path: `${current.path}${childRouteConfig.url}` }),
      );
      const isCovered =
        matchChildRouteConfig &&
        matchChildRouteConfig.type !== 'SlideIn' &&
        matchChildRouteConfig.type !== 'Popup' &&
        current.type !== 'Inside';

      let content = null;
      const identity = current.identity || current.blockKey || current.pageKey;

      if (!isCovered) {
        content = (
          <RouteContext.Provider value={current}>
            <ParentContext.Provider value={this.backToParent}>
              <BlockLoader identity={identity} />
            </ParentContext.Provider>
          </RouteContext.Provider>
        );
      }

      const childRoutes = generateRouteContent(current, childRouteConfigs);
      if (current.type === 'SlideIn') {
        const style = {
          width: current.width || '30%',
        };
        return (
          <RouteSlide onClose={this.handleBackToParent} style={style}>
            {content}
            <Switch>{childRoutes}</Switch>
          </RouteSlide>
        );
      }
      if (current.type === 'Popup') {
        const style = {
          width: current.width || 590,
          height: current.height || 590,
        };
        return (
          <RoutePopup maskClosable onClose={this.handleBackToParent} style={style}>
            {content}
            <Switch>{childRoutes}</Switch>
          </RoutePopup>
        );
      }

      if (current.type === 'Inside') {
        return (
          <RouteContext.Provider value={current}>
            <ParentContext.Provider value={this.backToParent}>
              <BlockLoader identity={identity}>
                <Switch>{childRoutes}</Switch>
              </BlockLoader>
            </ParentContext.Provider>
          </RouteContext.Provider>
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

const mapStateToProps = (state, ownProps) => {
  const current = state.routeHistory.find(route => route.path === ownProps.match.path);

  return {
    current,
  };
};

const mapDispatchToProps = {
  routeMount,
  routeUpdate,
  routeUnmount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteContainer);
