import {
  ROUTE_MOUNT,
  ROUTE_UPDATE,
  ROUTE_UNMOUNT,
  BLOCK_ENTER,
  BLOCK_UPDATE,
  BLOCK_UNMOUNT,
} from './actions';

function routeHistory(state = [], action) {
  switch (action.type) {
    case ROUTE_MOUNT:
      return [
        ...state,
        {
          childRouteConfigs: [],
          ...action.payload,
        },
      ];
    case ROUTE_UPDATE:
      return state.map(route => {
        if (route.id === action.payload.id) {
          return {
            ...route,
            ...action.payload,
          };
        }
        return route;
      });
    case ROUTE_UNMOUNT:
      return state.filter(route => route.id !== action.payload.id);
    default:
      return state;
  }
}

function blocks(state = [], action) {
  switch (action.type) {
    case BLOCK_ENTER:
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    case BLOCK_UPDATE:
      return state.map(block => {
        if (block.identity === action.payload.identity) {
          return {
            ...block,
            ...action.payload,
          };
        }
        return block;
      });
    case BLOCK_UNMOUNT:
      return state.filter(block => block.identity !== action.payload.identity);
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
  routeHistory,
  blocks,
  apiConfig,
};
