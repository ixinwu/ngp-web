const path = require('path');
const _ = require('underscore.string');

const baseName = path.basename(process.cwd());

const getBaseDir = () => {
  return baseName;
};

const getAppName = appName => {
  // If appName is not given, use the current directory
  if (appName === undefined) {
    appName = getBaseDir();
  }

  return _.slugify(_.humanize(appName));
};

module.exports = {
  getBaseDir,
  getAppName,
};
