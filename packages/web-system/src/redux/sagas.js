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
    ? new Promise((resolve, reject) => {
        loader()
          .then(m => {
            const bundle = {};
            Object.keys(m.default).forEach(key => {
              bundle[key] = m.default[key].default || m.default[key];
            });
            resolve(bundle);
          })
          .catch(e => {
            reject(e);
          });
      })
    : Promise.resolve(loader);
}

function getConfig(loader, key, state, ...args) {
  return typeof loader === 'function'
    ? new Promise((resolve, reject) => {
        loader(key, state, ...args)
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
  console.log('blockMount--------------------------');
  const { key } = action.payload;
  console.log('blockMount------', key);
  try {
    yield put({
      type: BLOCK_ENTER,
      payload: {
        ...action.payload,
        status: 'loading',
        tip: '加载中...',
      },
    });
    let blockBundle = ngp.loadedBlocks[key];
    if (!blockBundle) {
      const loader = ngp.blocks[key].loader;
      blockBundle = yield call(getBundle, loader);
      ngp.loadedBlocks[key] = blockBundle;
    }

    warning(blockBundle, 'block is empty');
    if (!blockBundle) {
      yield put({
        type: BLOCK_UPDATE,
        payload: {
          key,
          status: 'error',
          tip: '加载失败',
        },
      });
      return;
    }

    yield put({
      type: BLOCK_UPDATE,
      payload: {
        key,
        status: 'bundle_ready',
      },
    });
  } catch (e) {
    warning(!e, e.message);
    yield put({
      type: BLOCK_UPDATE,
      payload: {
        key,
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
  const { key, identity, route } = action.payload;
  try {
    yield put({
      type: BLOCK_UPDATE,
      payload: {
        key,
        status: 'config_loading',
        tip: '获取配置中...',
      },
    });

    const blockBundle = ngp.loadedBlocks[key];
    const state = yield select(getState);
    let config = yield call(getConfig, blockBundle.config || blockBundle.getConfig, key, state);

    if (!config) {
      config = {
        identity: key,
      };
    }

    if (!config.identity) {
      config.identity = key;
    }

    if (identity) {
      config.identity = identity;
    }

    // 更新子路由
    if (config.routes) {
      const childRouteConfigs = route.childRouteConfigs || [];

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
        key,
        status: 'ready',
        comp,
      },
    });
  } catch (e) {
    warning(!e, e.message);
    yield put({
      type: BLOCK_UPDATE,
      payload: {
        key,
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
