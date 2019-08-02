import ngp from './ref';

export {
  mount,
  unmount,
  connect,
  modify,
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
  select,
  all,
  delay,
} from '@ixinwu-ngp/web-core';
export { default as connectBlock } from './block/connect';
export { default as mountBlock } from './block/mount';
export { default as unmountBlock } from './block/unmount';
export { default as BlockLoader } from './block/loader';
export { default as BlockContainer } from './block/container';

export { default as RouteContainer } from './route/container';
export { default as RoutePopup } from './route/popup';
export { default as RouteSlide } from './route/slide';
export * from './client';
export * from './utils';
export { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';

export default ngp;
