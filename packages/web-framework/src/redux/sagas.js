import warning from 'warning';
import { takeEvery, takeLatest, put, call, select } from '@ixinwu-ngp/web-core';
import { withRouter } from 'react-router-dom';
import ngp from '../ref';
import mountBundle from '../bundle/mount';
import mountBlock from '../block/mount';
import {
  ROUTE_MOUNT,
  ROUTE_UNMOUNT,
  ROUTE_ENTER,
  ROUTE_LEAVE,
  ROUTE_READY,
  ROUTE_ERROR,
  INIT_CLIENT_REQUEST,
  INIT_CLIENT_SUCCESS,
  INIT_CLIENT_FAILURE,
} from './actions';

function getPageBundle(loader) {
  return typeof loader === 'function'
    ? new Promise(resolve => {
        loader(module => {
          const bundle = {};
          Object.keys(module.default).forEach(key => {
            bundle[key] = module.default[key].default || module.default[key];
          });
          resolve(bundle);
        });
      })
    : Promise.resolve(loader);
}

const getState = state => state;

function* routeMount(action) {
  const { pathname, pageKey } = action.payload;
  try {
    yield put({
      type: ROUTE_ENTER,
      payload: action.payload,
    });
    let childRouteConfigs = [];
    const { pages, pageBundleLoaders, pageConfigLoaders } = ngp.app;
    const pageCache = pages[pageKey] || {};
    // 加载page的代码bundle
    const bundleLoader = pageBundleLoaders[pageKey];
    let pageBundle = pageCache.bundle;
    if (!pageBundle && bundleLoader) {
      pageBundle = yield call(getPageBundle, bundleLoader);
    }
    // 添加子路由
    if (pageBundle && pageBundle.routes) {
      childRouteConfigs = childRouteConfigs.concat(pageBundle.routes);
    }
    // 获取page的配置config，纯自定义的页面是没有configLoader的
    let pageConfig = pageCache.config;
    const configLoader = pageConfigLoaders[pageKey];
    if (!pageConfig && configLoader) {
      const state = yield select(getState);
      pageConfig = yield configLoader(pageKey, state);
    }
    // 添加子路由
    if (pageConfig && pageConfig.routes) {
      childRouteConfigs = childRouteConfigs.concat(pageConfig.routes);
    }

    warning(pageBundle, 'page should hava a bundle');
    if (!pageBundle) {
      yield put({
        type: ROUTE_ERROR,
        payload: {
          pathname,
        },
      });
      return;
    }

    ngp.app.registerPage(pageKey, {
      config: pageConfig,
      bundle: pageBundle,
    });

    let pageComp;
    if (pageConfig && pageBundle) {
      pageComp = withRouter(mountBlock(pageConfig, pageBundle));
    }
    if (!pageConfig && pageBundle) {
      pageComp = withRouter(mountBundle(pageBundle));
    }

    yield put({
      type: ROUTE_READY,
      payload: {
        pathname,
        childRouteConfigs,
        pageComp,
      },
    });
  } catch (e) {
    warning(!e, e.message || 'Route mount Error');
    yield put({
      type: ROUTE_ERROR,
      payload: {
        pathname,
      },
    });
  }
}

function* routeMountSaga() {
  yield takeEvery(ROUTE_MOUNT, routeMount);
}

function* routeUnmount(action) {
  const { pathname, pageKey } = action.payload;
  try {
    const pageCache = ngp.app.pages[pageKey] || {};

    const pageBundle = pageCache.bundle || {};
    const pageConfig = pageCache.config || {};
    const identity = pageConfig.identity || pageBundle.identity;

    ngp.app.unmount(identity);

    yield put({
      type: ROUTE_LEAVE,
      payload: {
        pathname,
      },
    });
  } catch (e) {
    warning(!e, e.message || 'Route mount Error');
    yield put({
      type: ROUTE_LEAVE,
      payload: {
        pathname,
      },
    });
  }
}

function* routeUnmountSaga() {
  yield takeEvery(ROUTE_UNMOUNT, routeUnmount);
}

function* initClient(appKey) {
  // TODO 调用实际的配置获取接口
  if (appKey) {
    yield put({
      type: INIT_CLIENT_SUCCESS,
    });
  } else {
    yield put({
      type: INIT_CLIENT_FAILURE,
    });
  }
}

function* initClientSaga() {
  yield takeLatest(INIT_CLIENT_REQUEST, initClient);
}

export default {
  routeMountSaga,
  routeUnmountSaga,
  initClientSaga,
};
