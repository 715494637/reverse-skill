const parser = require('../parser/');
const gv = require('../globalVarible');

const {
  fixedValue20,
  factorial,
  fibonacci,
  numToNumarr2,
  numToNumarr4,
  numToNumarr8,
  uuid,
  string2ascii,
  execRandomByNumber,
  execNumberByTime,
  hexnum,
  ascii2string,
  getFixedNumber,
  numarrAddTime,
  decode,
  decrypt,
  encryptMode1,
  encryptMode2,
  numarrJoin,
  numarr2string,
  numarrEncrypt,
  xor,
} = parser;

function getBasearr(hostname, config) {
  return numarrJoin(
    3,
    numarrJoin(
      1,
      config['window.navigator.maxTouchPoints'],
      config['window.eval.toString().length'],
      128,
      ...numToNumarr4(uuid(config['window.navigator.userAgent'])),
      string2ascii(config['window.navigator.platform']),
      ...numToNumarr4(config.execNumberByTime),
      ...execRandomByNumber(98, config.random),
      0,
      0,
      ...numToNumarr4(Number(hexnum('3136373737323136'))),
      ...numToNumarr4(0),
      ...numToNumarr2(config['window.innerHeight']),
      ...numToNumarr2(config['window.innerWidth']),
      ...numToNumarr2(config['window.outerHeight']),
      ...numToNumarr2(config['window.outerWidth']),
      ...numToNumarr8(0),
      ...numToNumarr4(4),// 检测链接字符是否包含bXQProcmw6S8
      ...numToNumarr4(0),
      ...numToNumarr4(uuid(gv.config.url.pathname.toUpperCase())),
      ...numToNumarr4(0),
      ...numToNumarr8(0),
    ),
    10,
    (() => {
      const flag = +ascii2string(gv.keys[24]);
      return numarrJoin(
        3,
        13,
        ...numToNumarr4(config.r2mkaTime + config.runTime - config.startTime),
        ...numToNumarr4(+ascii2string(gv.keys[19])),
        ...numToNumarr8(Math.floor((config.random || Math.random()) * 1048575) * 4294967296 + (((config.currentTime + 0) & 4294967295) >>> 0)),
        flag,
        string2ascii(gv.config.url.hostname.substr(0, 20)),
      );
    })(),
    7,
    [
      ...numToNumarr4(16777216),
      ...numToNumarr4(0),
      ...numToNumarr2(2830),
      ...numToNumarr2(config.codeUid),
    ],
    0,
    [0],
    6,
    [
      1,
      ...numToNumarr2(0),
      ...numToNumarr2(0),
      config['window.document.hidden'] ? 0 : 1,
      ...encryptMode2(decrypt(ascii2string(gv.keys[22])), numarrAddTime(gv.keys[16])[0]),
      ...numToNumarr2(+decode(decrypt(ascii2string(gv.keys[22])))),
    ],
    2,
    fixedValue20(),
    9,
    (() => {
      const { connType } = config['window.navigator.connection'];
      const { charging, chargingTime, level } = config['window.navigator.battery']
      const connTypeIdx = ['bluetooth', 'cellular', 'ethernet', 'wifi', 'wimax'].indexOf(connType) + 1;
      let oper = 0;
      if (level) oper |= 2;
      if (charging) oper |= 1;
      if (connTypeIdx !== undefined) oper |= 8
      return [
        oper,
        level * 100,
        ...numToNumarr2(chargingTime),
        connTypeIdx,
      ]
    })(),
    13,
    [0],
  )
}

Object.assign(getBasearr, {
  adapt: ["WkxKTVZUShdeVk8XWlc="],
  "WkxKTVZUShdeVk8XWlc=": {
    hasDebug: true,
    lastWord: 'T',
    devUrl: 'UU1NSQMWFk5OThdaTEpNVlRKF15WTxdaVxY=',
    flag: 2830,
    lens: 166,
    example: [3,73,1,0,33,128,159,173,0,238,8,77,97,99,73,110,116,101,108,0,0,6,105,52,0,0,0,1,0,0,0,0,0,0,0,3,190,0,150,4,55,6,192,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,121,211,210,212,0,0,0,0,0,0,0,0,0,0,0,0,10,38,3,13,104,248,74,132,1,113,218,109,0,8,94,52,9,231,188,186,4,18,119,119,119,46,99,117,115,116,111,109,115,46,103,111,118,46,99,110,7,12,1,0,0,0,0,0,0,0,11,14,235,83,0,1,0,6,16,1,0,0,0,0,1,81,58,52,41,138,104,1,0,0,0,2,4,102,11,203,181,9,5,11,100,0,0,0,13,1,0]
  }
});

module.exports = getBasearr;
