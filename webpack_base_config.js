const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    alias: {
      '@ixinwu-ngp/materials-block': path.resolve(__dirname, './packages/materials-block/src'),
      '@ixinwu-ngp/materials-component': path.resolve(
        __dirname,
        './packages/materials-component/src',
      ),
      '@ixinwu-ngp/materials-layout': path.resolve(__dirname, './packages/materials-layoutf/src'),
    },
  },
};
