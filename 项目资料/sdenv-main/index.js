const browser = require('./browser/');
const version = require('./package.json').version.split('-')[0];

module.exports = {
  ...require('./utils/'),
  browser,
  version: `v${version}`,
}
