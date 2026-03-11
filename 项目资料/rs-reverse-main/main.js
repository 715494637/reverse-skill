#!/usr/bin/env node
const fs = require('fs');
const JSON5 = require('json5');
const _merge = require('lodash/merge');
const _omit = require('lodash/omit');
const _pick = require('lodash/pick');
const _get = require('lodash/get');
const inquirerSelect = require('@inquirer/select').default;
const path = require('path');
const yargs = require('yargs');
const log4js = require('log4js');
const paths = require('./utils/paths');
require('module-alias')(path.dirname(paths.package));
const pkg = require(paths.package);
const gv = require('@src/handler/globalVarible');
const adapts = require('@src/handler/basearr/index').adapts;
const { initGv, logger, getCode, getImmucfg, simpleEncrypt, simpleDecrypt, isValidUrl } = require('@utils/')
const { makeCode, makeCookie, makeCodeHigh, basearrParse } = require('@src/');

function debugLog(level) {
  if (level) {
    if (!log4js.levels.levels.map(it => it.levelStr).includes(level.toUpperCase())) {
      throw new Error('日志等级输入错误，请检查!');
    }
    logger.level = level;
  }
  logger.trace('execPath:', __dirname);
  logger.trace('filePath:', __filename);
  logger.trace('processCwd:', process.cwd());
  logger.trace('paths:\n', JSON.stringify(paths, null, 2));
}

const commandBuilder = {
  'has-debug': {
    type: 'boolean',
    describe: '如网站是额外debugger版本，但是未真正使用，可使用--has-debug=false或--no-has-debug关闭',
  },
  f: {
    alias: 'file',
    describe: '含有nsd, cd值的json文件, 额外配置项：from（来源）、hasDebug（额外debugger）',
    type: 'string',
    coerce: (input) => {
      input = paths.resolveCwd(input);
      if (!fs.existsSync(input)) throw new Error(`输入文件不存在: ${input}`);
      return input;
    }
  },
  j: {
    alias: 'jsurls',
    describe: '瑞数加密的js文件链接或者本地js文件路径',
    type: 'array',
    coerce: getCode,
  },
  u: {
    alias: 'url',
    describe: '瑞数返回204状态码的请求地址',
    type: 'string',
    coerce: getCode,
  },
  o: {
    alias: 'output',
    describe: '输出文件目录',
    type: 'string',
    default: './output',
    coerce: (path) => {
      return paths.resolveCwd(path);
    }
  },
  l: {
    alias: 'level',
    describe: '日志打印等级，参考log4js，默认为warn',
    type: 'string',
  },
  c: {
    alias: 'config',
    describe: '配置对象，传入对象或者json文件路径',
    type: 'string',
    coerce: (input) => {
      const inputCwd = paths.resolveCwd(input);
      if (fs.existsSync(inputCwd) && fs.statSync(inputCwd).isFile()) {
        input = fs.readFileSync(inputCwd, 'utf8')
      }
      const data = JSON5.parse(input);
      gv._setAttr('makecookieRuntimeConfig', data)
      return data;
    },
  },
  b: {
    alias: 'basearr',
    describe: '压缩前数字数组的序列化文本',
    type: 'array',
    demandOption: true,
  },
}

const notUrlHanlde = async (config, ts) => {
  if (isValidUrl(ts.from)) {
    config.url = new URL(ts.from);
    config.hostname = simpleEncrypt(config.url.hostname.replace(/^www\./, ''));
    if (adapts[config.hostname]) {
      config.adapt = adapts[config.hostname];
    }
    return;
  }
  config.hostname = await inquirerSelect({
    message: '请选择来源数据来源：',
    choices: Object.keys(adapts).map(it => ({
      name: simpleDecrypt(it, 57),
      value: it,
    }))
  })
}

const commandHandler = gv.wrap(async (command, { argv, config }) => {
  debugLog(argv.level);
  const outputResolve = (...p) => path.resolve(argv.output, ...p);
  const ts = (() => {
    if (argv.file) return JSON5.parse(fs.readFileSync(argv.file, 'utf8'));
    if (argv.url) return argv.url.$_ts;
    const tspath = paths.exampleResolve('codes', '$_ts.json')
    return JSON5.parse(fs.readFileSync(tspath, 'utf8'))
  })();
  if (typeof argv.hasDebug === 'boolean') ts.hasDebug = argv.hasDebug;
  if (!argv.mate.url && argv._[0] === 'makecookie' && argv.mate.jscode) await notUrlHanlde(config, ts);
  logger.trace(`$_ts.nsd: ${ts.nsd}`);
  logger.trace(`$_ts.cd: ${ts.cd}`);
  try {
    command(ts, outputResolve);
  } catch (err) {
    logger.error(err.stack);
    if (ts.hasDebug) logger.warn('当前为额外debugger版本，由于存在使用该版本但是未开启额外debugger功能，如遇到报错请使用--no-has-debug或--has-debug=false后重新尝试！');
  }
});

module.exports = yargs
  .help('h')
  .alias('v', 'version')
  .version(pkg.version)
  .usage('使用: node $0 <commond> [options]')
  .command(
    'makecode',
    '根据传入的ts文件、网站地址、js文件地址等，生成全量ts文本、静态文本、内外层虚拟机代码等文件',
    (yargs) => {
      return yargs
        .option('f', commandBuilder.f)
        .option('j', commandBuilder.j)
        .option('u', commandBuilder.u)
        .option('o', commandBuilder.o)
        .option('l', commandBuilder.l)
        .example('$0 makecode')
        .example('$0 makecode -f /path/to/ts.json')
        .example('$0 makecode -u https://url/index.html')
        .example('$0 makecode -u https://url/index.html -f /path/to/ts.json')
        .example('$0 makecode -j https://url/main.js -f /path/to/ts.json')
        .example('$0 makecode -j /path/to/main.js -f /path/to/ts.json');
    },
    commandHandler.bind(null, makeCode),
  )
  .command(
    'makecode-high',
    '接收网站地址，生成两次请求对应的全量ts文本、静态文本、内外层虚拟机代码等文件',
    (yargs) => {
      return yargs
        .option('m', commandBuilder.m)
        .option('u', { ...commandBuilder.u, demandOption: true })
        .option('o', commandBuilder.o)
        .option('l', commandBuilder.l)
        .option('has-debug', commandBuilder['has-debug'])
        .example('$0 makecode-high -u https://url/index.html');
    },
    commandHandler.bind(null, makeCodeHigh),
  )
  .command(
    'makecookie',
    '生成cookie字符串，包含后台返回+程序生成，可直接复制使用',
    (yargs) => {
      return yargs
        .option('f', commandBuilder.f)
        .option('j', commandBuilder.j)
        .option('u', commandBuilder.u)
        .option('o', commandBuilder.o)
        .option('l', commandBuilder.l)
        .option('c', commandBuilder.c)
        .option('has-debug', commandBuilder['has-debug'])
        .example('$0 makecookie')
        .example('$0 makecookie -f /path/to/ts.json')
        .example('$0 makecookie -u https://url/index.html')
        .example('$0 makecookie -u https://url/index.html -f /path/to/ts.json')
        .example('$0 makecookie -j https://url/main.js -f /path/to/ts.json')
        .example('$0 makecookie -j /path/to/main.js -f /path/to/ts.json');
    },
    commandHandler.bind(null, makeCookie),
  )
  .command(
    'exec',
    '直接运行代码，用于开发及演示时使用',
    (yargs) => {
      return yargs
        .option('f', commandBuilder.f)
        .option('j', commandBuilder.j)
        .option('l', commandBuilder.l)
        .option('c', {
          alias: 'code',
          describe: '要运行的代码，如：gv.cp2，即打印cp2的值',
          type: 'string',
          demandOption: true,
          coerce: (input) => {
            const inputCwd = paths.resolveCwd(input);
            if (fs.existsSync(inputCwd) && fs.statSync(inputCwd).isFile()) {
              return fs.readFileSync(inputCwd, 'utf8')
            }
            return input;
          },
        })
        .option('f', commandBuilder.f)
        .example('$0 exec -f /path/to/ts.json -c gv.cp0');
    },
    (argv) => {
      debugLog(argv.level);
      Math.random = () => 0.1253744220839037;
      gv.wrap(initGv)(argv);
      Object.assign(global, gv.utils);
      Object.assign(global, require('@src/handler/viewer/'));
      if (argv.code) {
        const output = JSON.stringify(eval(argv.code));
        console.log([`\n  输入：${argv.code}`, `输出：${output}\n`].join('\n  '));
      } else {
        eval(fs.readFileSync(paths.resolve('utils/consoles/keys.js'), 'utf8'));
      }
    }
  )
  .command(
    'basearr',
    '接收压缩前数字数组的序列化文本并格式化解析',
    (yargs) => {
      return yargs
        .option('l', commandBuilder.l)
        .option('b', commandBuilder.b)
        .example("$0 basearr -b '[3,49,...,103,...,125]' -b '[3,49,...,87,...,125]'")
    },
    (argv) => {
      debugLog(argv.level);
      basearrParse(argv.basearr);
    }
  )
  .updateStrings({
    'Show version number': '显示版本号',
    'Show help': '显示帮助信息',
  })
  .example('$0 makecode -u http://url/path')
  .example('$0 makecookie -f /path/to/ts.json')
  .example('$0 makecookie -u http://url/path')
  .example('$0 makecode-high -u http://url/path')
  .example("$0 exec -c 'ascii2string(gv.keys[21])'")
  .example("$0 basearr -b '[3,49,...,103,...,125]' -b '[3,49,...,87,...,125]'")
  .demandCommand(1, '请指定要运行的命令')
  .epilog('更多信息请访问：https://github.com/pysunday/rs-reverse')
  .strict()
  .argv;