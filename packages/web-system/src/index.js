import ngp from './ref';

export { connect, mount, unmount } from '@ixinwu-ngp/web-core';
export { default as connectBlock } from './block/connect';
export { default as mountBlock } from './block/mount';
export { default as unmountBlock } from './block/unmount';

export { default as RouteContainer } from './route_container';
export { default as RouteLayout } from './route_layout';
export * from './client';
export * from './utils';
export { default as createServer } from './server/create_server';
export { Switch, Route } from 'react-router-dom';

export default ngp;
