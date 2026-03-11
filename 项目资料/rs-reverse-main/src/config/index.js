const fs = require('fs');
const logger = require('@utils/logger');
const paths = require('@utils/paths');
const isValidUrl = require('@utils/isValidUrl');
const getImmucfg = require('@utils/getImmucfg');
const { simpleEncrypt } = require('@utils/simpleCrypt');

module.exports = (gv) => {
  const adapts = require('@src/handler/basearr/index').adapts;
  const config = {offsetConst: {}};
  const code = gv.argv.mate.jscode?.code || fs.readFileSync(paths.exampleResolve('codes', `main.js`), 'utf8');
  const val = code.match(/_\$[\$_A-Za-z0-9]{2}=_\$[\$_A-Za-z0-9]{2}\(0,([0-9]+),_\$[\$_A-Za-z0-9]{2}\(/);
  if (val && val.length === 2) {
    config.keynameNum = parseInt(val[1]);
  } else {
    throw new Error('keyname长度未匹配到!');
  }
  if (isValidUrl(gv.argv.mate.url)) {
    config.url = new URL(gv.argv.mate.url);
    config.hostname = simpleEncrypt(config.url.hostname.replace(/^www\./, ''));
    if (adapts[config.hostname]) {
      config.adapt = adapts[config.hostname];
    }
  }
  Object.assign(config, {
    hostname: isValidUrl(gv.argv.mate.url)
      ? simpleEncrypt((new URL(gv.argv.mate.url)).hostname.replace(/^www\./, ''))
      : undefined,
    immucfg: getImmucfg(code),
  });
  gv._setAttr('config', config);
}
