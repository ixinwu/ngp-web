const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs';
const loose = true;

module.exports = {
  presets: [['@babel/env', { loose, modules: false }], '@babel/react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose }],
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-object-rest-spread', { loose }],
    cjs && ['@babel/transform-modules-commonjs', { loose }],
    ['@babel/transform-runtime', { useESModules: !cjs }],
    '@babel/transform-object-assign',
  ].filter(Boolean),
};
