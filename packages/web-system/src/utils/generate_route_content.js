import React from 'react';
import { Route } from 'react-router-dom';
import RouteContainer from '../route_container';

export default function generateRouteContent(pagePath, routes) {
  return routes.map(routeConfig => (
    <Route
      exact={routeConfig.exact}
      key={`${pagePath}${routeConfig.url}`}
      path={`${pagePath}${routeConfig.url}`}
      render={props => {
        return (
          <RouteContainer
            routeConfig={routeConfig}
            pagePath={`${pagePath}${routeConfig.url}`}
            {...props}
          />
        );
      }}
    />
  ));
}
