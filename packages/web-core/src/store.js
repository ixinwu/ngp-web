import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import {
  createRootReducer,
  wrapReducer,
  generateReducerGetter,
  generateReducerSetter,
} from './utils';
import core from './core';

let store = null;

export default function configureStore({ reducers, initialState, middlewares, rootHOR }) {
  const initReducers = {};
  const asyncReducers = {};
  const getters = {};
  const setters = {};
  const asyncSagas = {};

  Object.keys(reducers).forEach(reducerKey => {
    initReducers[reducerKey] = wrapReducer(reducers[reducerKey], null, reducerKey);
  });

  let rootReducer = createRootReducer({ ...initReducers, ...asyncReducers });
  if (rootHOR) {
    rootReducer = rootHOR(rootReducer);
  }
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(rootReducer, initialState, applyMiddleware(...middlewares, sagaMiddleware));
  Object.keys(reducers).forEach(reducerKey => {
    getters[reducerKey] = generateReducerGetter(store.getState, null, reducerKey);
    setters[reducerKey] = generateReducerSetter(store.dispatch, null, reducerKey);
  });

  const enhancedStore = {
    ...store,
    getGetters: () => getters,
    getSetters: () => setters,
    injectReducers(identity, injectedReducers) {
      if (!injectedReducers || !identity) return;
      if (asyncReducers[identity]) return;
      // 包装reducer，增加默认的更新action
      const newReducers = {};
      const newGetters = {};
      const newSetters = {};
      Object.keys(injectedReducers).forEach(reducerKey => {
        newReducers[reducerKey] = wrapReducer(injectedReducers[reducerKey], identity, reducerKey);
        newGetters[reducerKey] = generateReducerSetter(store.getState, identity, reducerKey);
        newSetters[reducerKey] = generateReducerSetter(store.dispatch, identity, reducerKey);
      });

      asyncReducers[identity] = createRootReducer(newReducers);
      getters[identity] = newGetters;
      setters[identity] = newSetters;

      let rootReplaceReducer = createRootReducer({ ...initReducers, ...asyncReducers });
      if (rootHOR) {
        rootReplaceReducer = rootHOR(rootReplaceReducer);
      }
      store.replaceReducer(rootReplaceReducer);
    },
    removeReducers(identity) {
      if (!asyncReducers[identity]) return;
      asyncReducers[identity] = null;
      delete asyncReducers[identity];

      getters[identity] = null;
      delete getters[identity];

      setters[identity] = null;
      delete setters[identity];

      let rootReplaceReducer = createRootReducer({ ...initReducers, ...asyncReducers });
      if (rootHOR) {
        rootReplaceReducer = rootHOR(rootReplaceReducer);
      }
      store.replaceReducer(rootReplaceReducer);
    },
    runSaga: sagaMiddleware.run,
    injectSaga(identity, saga, ...args) {
      if (!saga) return;
      if (asyncSagas[identity]) return;
      asyncSagas[identity] = sagaMiddleware.run(saga, ...args);
    },
    removeSaga(identity) {
      if (!asyncSagas[identity]) return;
      asyncSagas[identity].cancel();
      asyncSagas[identity] = null;
      delete asyncSagas[identity];
    },
    close: () => store.dispatch(END),
  };

  core.store = enhancedStore;

  return enhancedStore;
}
