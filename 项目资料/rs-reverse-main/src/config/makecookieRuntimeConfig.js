const _random = require('lodash/random');

const current = new Date().getTime() + 1000;

module.exports = {
  'window.navigator.maxTouchPoints': 0,
  'window.eval.toString().length': 33,
  'window.navigator.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'window.navigator.platform': 'MacIntel',
  'window.name': '$_YWTU=LjFNq_oZCsth6KJ9xHOin6RRhL4fQt7Vsn8YCz9dRjl&$_YVTX=Wa&vdFm=_$hh',
  'window.navigator.battery': {
    charging: true, // 正在充电
    chargingTime: 0, // 距离充满时间
    dischargingTime: Infinity, // 预估可使用时间
    level: 1, // 电量100%
  },
  'window.navigator.connection': {
    downlink: 6.66, // 下行速度
    effectiveType: "4g", // 网络类型
    rtt: 0, // 往返延时
    saveData: false, // 节流模式
  },
  'window.innerHeight': 938,
  'window.innerWidth': 1680,
  'window.outerHeight': 1025,
  'window.outerWidth': 1680,
  'window.document.hidden': false,
  codeUid: null, // 代码特征值
  currentTime: current, // 完整的时间戳
  runTime: Math.floor(current / 1000), // 运行时间
  startTime: Math.floor(current / 1000) - 1, // 模拟浏览器启动时间
  random: null, // 代替Math.random方法返回值
  execNumberByTime: _random(1500, 2000), // 固定时间内的循环运行次数
}
