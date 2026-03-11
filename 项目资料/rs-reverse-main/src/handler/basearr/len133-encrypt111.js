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
    ),
    10,
    (() => {
      const flag = +ascii2string(gv.keys[24]);
      return [
        flag > 0 && flag < 8 ? 1 : 0,
        13,
        ...numToNumarr4(config.r2mkaTime + config.runTime - config.startTime),
        ...numToNumarr4(+ascii2string(gv.keys[19])),
        ...numToNumarr8(Math.floor((config.random || Math.random()) * 1048575) * 4294967296 + (((config.currentTime + 0) & 4294967295) >>> 0)),
        flag,
      ];
    })(),
    7,
    [
      ...numToNumarr4(16777216),
      ...numToNumarr4(0),
      ...numToNumarr2(4117),
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
    15,
    (() => {
      const [key, valstr] = ascii2string(gv.keys[40]).split(':');
      const val = ((str) => {
        if (typeof str !== 'string') throw new Error('传入参数非字符串');
        str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '')
        if (str.length !== 4) throw new Error('字符长度非4个未做适配');
        const data = [...str].map(it => gv.alphabet.indexOf(it));
        const val1 = (data[0] << gv.cp2[54]) | (data[1] >> gv.cp2[13]);
        const val2 = ((gv.cp2[15] & data[1]) << gv.cp2[13]) | (data[2] >> gv.cp2[54]);
        const val3 = ((gv.cp2[42] & data[2]) << gv.cp2[45]) | data[3];
        if (val2 === 4) return val3;
        throw new Error(`解析${str}j结果中中间值不为二会在数据组装时传回{k:"[E]"}, 当前案例{k:1}为正确值`)
      })(valstr);
      const arr = string2ascii(`{"${key}":${val}}`);
      return [ arr.length , ...arr ];
    })(),
  )
}

Object.assign(getBasearr, {
  adapt: ['XElMWxdaV1BJWBdeVk8XWlc='],
  'XElMWxdaV1BJWBdeVk8XWlc=': {
    lastWord: 'T',
    encryptLens: 111,
    devUrl: 'UU1NSQMWFlxJTFsXWldQSVgXXlZPF1pXFg==',
  },
  lens: 133,
  example: [3,49,1,0,33,128,159,173,0,238,8,77,97,99,73,110,116,101,108,0,0,8,143,52,0,0,0,1,0,0,0,0,0,0,0,3,190,0,150,4,55,6,192,0,0,0,0,0,0,0,0,10,19,1,13,104,186,70,142,242,99,53,20,0,8,94,52,26,35,27,113,4,7,12,1,0,0,0,0,0,0,0,16,21,199,129,0,1,0,6,16,1,0,1,0,1,1,217,155,133,250,238,102,1,0,0,0,2,4,225,224,103,203,9,5,11,100,0,0,0,13,1,0,15,8,7,123,34,107,34,58,49,125]
});

module.exports = getBasearr;
