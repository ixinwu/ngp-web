import '@babel/polyfill';
import { configureStore } from '@ixinwu-ngp/web-core';
import ngp from '../ref';
import generateReducer from '../utils/generate_reducer';
import Application from './client';
import defaultConfig from './config';
import defaultReducers from '../redux/reducers';
import defaultSagas from '../redux/sagas';

export default function createClient(options = {}) {
  const { models = {}, config = {}, sagas = {}, reducers = {}, middlewares = [] } = options;

  // 初始化 state
  const initialState = {
    ...defaultConfig,
    ...config,
  };

  const modelReducers = {};

  if (models) {
    Object.keys(models).forEach(key => {
      modelReducers[key] = generateReducer({
        key,
        defaultValue: models[key].defaultValue,
      });
    });
  }

  const store = configureStore({
    // rootHOR
    // init reducers
    reducers: {
      ...defaultReducers,
      ...reducers,
      ...modelReducers,
    },
    // init state
    initialState,
    // init middleware
    middlewares,
  });

  // 启动 saga
  const initSagas = {
    ...defaultSagas,
    ...sagas,
  };
  Object.keys(initSagas).forEach(key => store.runSaga(initSagas[key]));

  // 创建应用来管理
  const app = new Application({
    ...options,
    store,
    config: initialState,
  });

  ngp.app = app;

  return app;
}
