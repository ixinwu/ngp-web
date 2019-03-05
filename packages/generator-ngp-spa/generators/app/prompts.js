const utils = require('../../utils');

module.exports = [
  {
    type: 'input',
    name: 'appKey',
    message: 'Please input your application key',
    default: utils.yeoman.getBaseDir(),
  },
  {
    type: 'input',
    name: 'appName',
    message: 'Please input your application name',
    default: utils.yeoman.getAppName(),
  },
];
