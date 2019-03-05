export const ROUTE_ENTER = 'ROUTE_ENTER';
export const ROUTE_LEAVE = 'ROUTE_LEAVE';
export const ROUTE_READY = 'ROUTE_READY';
export const ROUTE_ERROR = 'ROUTE_ERROR';

export const ROUTE_MOUNT = 'ROUTE_MOUNT';
export const ROUTE_UNMOUNT = 'ROUTE_UNMOUNT';

// export const ROUTE_STATUS_UPDATE = 'ROUTE_STATUS_UPDATE';
// export const ROUTE_TIP_UPDATE = 'ROUTE_TIP_UPDATE';

export function routeMount(pathname, routeConfig, search) {
  return {
    type: ROUTE_MOUNT,
    payload: {
      pathname,
      search,
      ...routeConfig,
    },
  };
}

export function routeUnmount(pathname, routeConfig) {
  return {
    type: ROUTE_UNMOUNT,
    payload: {
      pathname,
      ...routeConfig,
    },
  };
}

export const INIT_CLIENT_REQUEST = 'INIT_CLIENT_REQUEST';
export const INIT_CLIENT_SUCCESS = 'INIT_CLIENT_SUCCESS';
export const INIT_CLIENT_FAILURE = 'INIT_CLIENT_FAILURE';

export function initClient(appKey) {
  return {
    type: INIT_CLIENT_REQUEST,
    payload: { appKey },
  };
}

export function initClientSuccess(data) {
  return {
    type: INIT_CLIENT_SUCCESS,
    payload: data,
  };
}

export function initClientFailure() {
  return {
    type: INIT_CLIENT_FAILURE,
  };
}
