export const ROUTE_MOUNT = 'ROUTE_MOUNT';
export const ROUTE_UPDATE = 'ROUTE_UPDATE';
export const ROUTE_UNMOUNT = 'ROUTE_UNMOUNT';

export function routeMount(routeConfig, parentRoute, pathname, search) {
  const path = `${parentRoute ? parentRoute.path : ''}${routeConfig.url}`;
  const id = routeConfig.id || path;
  return {
    type: ROUTE_MOUNT,
    payload: {
      id,
      path,
      parentRouteId: parentRoute ? parentRoute.id : null,
      pathname,
      search,
      ...routeConfig,
    },
  };
}

export function routeUpdate(route, obj) {
  return {
    type: ROUTE_UPDATE,
    payload: {
      id: route.id,
      ...obj,
    },
  };
}

export function routeUnmount(route) {
  return {
    type: ROUTE_UNMOUNT,
    payload: {
      id: route.id,
    },
  };
}

export const BLOCK_MOUNT = 'BLOCK_MOUNT';
export const BLOCK_UPDATE = 'BLOCK_UPDATE';
export const BLOCK_UNMOUNT = 'BLOCK_UNMOUNT';
export const BLOCK_ENTER = 'BLOCK_ENTER';
export const BLOCK_CONFIG_REQUEST = 'BLOCK_CONFIG_REQUEST';

export function blockMount(key) {
  return {
    type: BLOCK_MOUNT,
    payload: {
      key,
      status: 'loading',
    },
  };
}

export function blockUnmount(key) {
  return {
    type: BLOCK_UNMOUNT,
    payload: {
      key,
    },
  };
}

export function requestBlockConfig(key, identity, block, route) {
  return {
    type: BLOCK_CONFIG_REQUEST,
    payload: {
      key,
      identity,
      block,
      route,
    },
  };
}
