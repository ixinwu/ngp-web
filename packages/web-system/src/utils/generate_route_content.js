import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ngp from '../ref';
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
          return routeConfig.isPublic || ngp.app.isAuthenticated ? (
            <RouteContainer routeConfig={routeConfig} parentRoute={parentRoute} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    );
  });
}
