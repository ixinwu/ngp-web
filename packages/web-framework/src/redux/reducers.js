import {
  ROUTE_ENTER,
  ROUTE_LEAVE,
  ROUTE_READY,
  ROUTE_ERROR,
  INIT_CLIENT_REQUEST,
  INIT_CLIENT_SUCCESS,
  INIT_CLIENT_FAILURE,
} from './actions';

function routeHistory(state = [], action) {
  switch (action.type) {
    case ROUTE_ENTER:
      return [
        ...state,
        {
          ...action.payload,
          status: 'loading',
          tip: '页面加载中...',
          childRouteConfigs: [],
        },
      ];
    case ROUTE_LEAVE:
      return state.filter(route => route.pathname !== action.payload.pathname);
    case ROUTE_READY:
      return state.map(route => {
        if (route.pathname === action.payload.pathname) {
          return {
            ...route,
            pageComp: action.payload.pageComp,
            childRouteConfigs: action.payload.childRouteConfigs,
            status: 'ready',
            tip: '',
          };
        }
        return route;
      });
    case ROUTE_ERROR:
      return state.map(route => {
        if (route.pathname === action.payload.pathname) {
          return {
            ...route,
            status: 'error',
            tip: '页面加载失败',
          };
        }
        return route;
      });
    default:
      return state;
  }
}

function clientLoading(state = true, action) {
  switch (action.type) {
    case INIT_CLIENT_REQUEST:
      return true;
    case INIT_CLIENT_SUCCESS:
    case INIT_CLIENT_FAILURE:
      return false;
    default:
      return state;
  }
}

function clientError(state = false, action) {
  switch (action.type) {
    case INIT_CLIENT_REQUEST:
    case INIT_CLIENT_SUCCESS:
      return false;
    case INIT_CLIENT_FAILURE:
      return true;
    default:
      return state;
  }
}

function appConfig(state = {}, action) {
  switch (action.type) {
    case INIT_CLIENT_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

function apiConfig(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default {
  clientLoading,
  clientError,
  routeHistory,
  appConfig,
  apiConfig,
};
