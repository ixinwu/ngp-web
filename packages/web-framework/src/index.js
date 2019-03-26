import ngp from './ref';

export { connect, mount, unmount } from '@ixinwu-ngp/web-core';
export { default as connectBlock } from './block/connect';
export { default as mountBlock } from './block/mount';
export { default as unmountBlock } from './block/unmount';
export { default as connectBundle } from './bundle/connect';
export { default as mountBundle } from './bundle/mount';
export { default as unmountBundle } from './bundle/unmount';

export { default as RouteContainer } from './route_container';
export { default as RouteLayout } from './route_layout';
export * from './client';
export * from './utils';
export * from './styles';
export { default as createServer } from './server/create_server';
export { Switch, Route } from 'react-router-dom';

export { default as defaultConfig } from './client/config';
export { default as defaultReducers } from './redux/reducers';
export { default as defaultSagas } from './redux/sagas';

export default ngp;
