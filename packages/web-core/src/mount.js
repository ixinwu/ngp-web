import { createBlockSaga, wrapHandle } from './utils';
import core from './core';

export default function mount(identity, { reducers = {}, handles = {}, sagas = {} }) {
  let bundle = core.bundles[identity];
  const { store } = core;

  if (!bundle) {
    const { dispatch } = store;

    // 包装handle，接入saga的流程
    const newHandles = {};
    const handleSagas = [];
    const handleTriggers = {};
    Object.keys(handles).forEach(handleKey => {
      const { trigger, saga } = wrapHandle(handles[handleKey], identity, handleKey, dispatch);

      handleSagas.push(saga);
      handleTriggers[handleKey] = trigger;

      newHandles[handleKey] = {
        saga,
        trigger,
      };
    });

    // 原生saga加载和支持handles产生的state修改saga
    const newSagas = Object.keys(sagas).map(key => sagas[key]);
    const saga = createBlockSaga([...newSagas, ...handleSagas]);

    bundle = {
      reducers,
      saga,
      handleTriggers,
    };

    core.bundles[identity] = bundle;
  }

  store.injectReducers(identity, bundle.reducers);
  store.injectSaga(identity, bundle.saga);

  return bundle;
}
