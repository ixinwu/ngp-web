import core from './core';

export default function unmount(identity) {
  const { store } = core;
  const { removeReducers, removeSaga } = store;

  removeReducers(identity);
  removeSaga(identity);

  core.identityProps[identity] = null;
  delete core.identityProps[identity];
  core.bundles[identity] = null;
  delete core.bundles[identity];
}
