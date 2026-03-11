const fs = require('fs');

module.exports = function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch (error) {
    return false;
  }
}
