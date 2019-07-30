import React from 'react';
import { Route } from 'react-router-dom';
import RouteContainer from '../route/container';

export default function generateRouteContent(parentRoute, childRoutes) {
  const parentPath = parentRoute ? parentRoute.path : '';

  return childRoutes.map(routeConfig => {
    const path = `${parentPath}${routeConfig.url}`;

    return (
      <Route
        exact={routeConfig.exact}
        key={path}
        path={path}
        render={props => {
          return <RouteContainer routeConfig={routeConfig} parentRoute={parentRoute} {...props} />;
        }}
      />
    );
  });
}
