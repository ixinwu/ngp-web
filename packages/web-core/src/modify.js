import core from './core';

// 这种方式不是redux-saga的方式，如果后期自己实现类似saga的实现方式，需要重新实现
export default function modify(fn, ...args) {
  const { store } = core;
  return fn.call(null, store.getSetters(), ...args);
}
