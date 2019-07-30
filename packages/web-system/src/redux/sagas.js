import warning from 'warning';
import { takeEvery, put, call, select } from '@ixinwu-ngp/web-core';
import { withRouter } from 'react-router-dom';
import ngp from '../ref';
import mountBlock from '../block/mount';
import {
  BLOCK_MOUNT,
  BLOCK_ENTER,
  BLOCK_UPDATE,
  BLOCK_CONFIG_REQUEST,
  ROUTE_UPDATE,
} from './actions';

function getBundle(loader) {
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

function getConfig(loader, identity, state, ...args) {
  return typeof loader === 'function'
    ? new Promise((resolve, reject) => {
        loader(identity, state, ...args)
          .then(config => {
            resolve(config);
          })
          .catch(e => {
            reject(e);
          });
      })
    : Promise.resolve(loader);
}

function* blockMount(action) {
  const { identity } = action.payload;
  try {
    yield put({
      type: BLOCK_ENTER,
      payload: {
        ...action.payload,
        status: 'loading',
        tip: '加载中...',
      },
    });
    let blockBundle = ngp.loadedBlocks[identity];
    if (!blockBundle) {
      const loader = ngp.blocks[identity];
      blockBundle = yield call(getBundle, loader);
      ngp.loadedBlocks[identity] = blockBundle;
    }

    warning(blockBundle, 'block is empty');
    if (!blockBundle) {
      yield put({
        type: BLOCK_UPDATE,
        payload: {
          status: 'error',
          tip: '加载失败',
        },
      });
      return;
    }

    yield put({
      type: BLOCK_UPDATE,
      payload: {
        status: 'bundle_ready',
      },
    });
  } catch (e) {
    warning(!e, e.message);
    yield put({
      type: BLOCK_UPDATE,
      payload: {
        status: 'error',
        tip: '加载失败',
      },
    });
  }
}

function* blockMountSaga() {
  yield takeEvery(BLOCK_MOUNT, blockMount);
}

const getState = state => state;

// 请求block配置
function* blockConfigRequest(action) {
  const { identity, route } = action.payload;
  try {
    yield put({
      type: BLOCK_UPDATE,
      payload: {
        ...action.payload,
        status: 'config_loading',
        tip: '获取配置中...',
      },
    });

    const blockBundle = ngp.loadedBlocks[identity];
    const state = yield select(getState);
    let config = yield call(getConfig, blockBundle.getConfig, identity, state);

    if (!config) {
      config = {
        identity,
      };
    }

    // 更新子路由
    if (config.routes) {
      const childRouteConfigs = route.childRouteConfigs;

      config.routes.forEach(childRoute => {
        if (!childRouteConfigs.find(childRouteConfig => childRouteConfig.url === childRoute.url)) {
          childRouteConfigs.push(childRoute);
        }
      });

      yield put({
        type: ROUTE_UPDATE,
        payload: {
          id: route.id,
          childRouteConfigs,
        },
      });
    }

    const comp = withRouter(mountBlock(config, blockBundle));

    yield put({
      type: BLOCK_UPDATE,
      payload: {
        status: 'ready',
        comp,
      },
    });
  } catch (e) {
    warning(!e, e.message);
    yield put({
      type: BLOCK_UPDATE,
      payload: {
        status: 'error',
        tip: '加载失败',
      },
    });
  }
}

function* blockConfigRequestSaga() {
  yield takeEvery(BLOCK_CONFIG_REQUEST, blockConfigRequest);
}

export default {
  blockMountSaga,
  blockConfigRequestSaga,
};
