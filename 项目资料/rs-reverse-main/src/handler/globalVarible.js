const _merge = require('lodash/merge');
const _chunk = require('lodash/chunk');
const _get = require('lodash/get');
const _set = require('lodash/set');
const _cloneDeep = require('lodash/cloneDeep');
const config = require('@src/config/');
const makecookieRuntimeConfig = require('@src/config/makecookieRuntimeConfig');

const cache = {};

class GlobalVarible {
  get config() {
    // 不同版本的可变配置
    return cache.config
  }
  get makecookieRuntimeConfig() {
    // 生成cookie需要的配置项
    return { ...makecookieRuntimeConfig, ...(cache.makecookieRuntimeConfig || {}) };
  }
  get metaContent() {
    return cache.metaContent;
  }
  get bignum() {
    return cache.bignum;
  }
  get cfgnum() {
    return cache.cfgnum;
  }
  get decryptKeys() {
    return cache.decryptKeys;
  }
  get basestr() {
    // 来自cp2
    return 'qrcklmDoExthWJiHAp1sVYKU3RFMQw8IGfPO92bvLNj.7zXBaSnu0TC6gy_4Ze5d{}|~ !#$%()*+,-;=?@[]^';
  }
  get alphabet() {
    // 来自cp2
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  }
  get utils() {
    return cache.utils;
  }
  get cp0() {
    return cache.cp0;
  }
  get cp0_96() {
    return (idx, cur) => {
      const isIdxNum = typeof idx === 'number';
      const isCurNum = typeof cur === 'number';
      if (isIdxNum && isCurNum) return _get(cache, `cp0_96.${idx}.${cur}`);
      if (isIdxNum) return _get(cache, `cp0_96.${idx}`);
      return cache.cp0_96
    }
  }
  get cp2() {
    return cache.cp2;
  }
  get cp6() {
    return cache.cp6;
  }
  get ts() {
    // 返回$_ts
    return cache.ts;
  }
  get r2mka() {
    // 返回获取任务对象的方法，为空时返回任务树
    return cache.r2mka;
  }
  get keys() {
    // 返回密钥集合
    return cache.keys;
  }
  get argv() {
    // 命令调用参数
    return cache.argv;
  }
  _getAttr(attr) {
    return cache[attr];
  }
  _setAttr(attr, value) {
    _set(cache, attr, value);
    if (attr === 'cp0') {
      cache.cp0_96 = _chunk(value, 96);
    }
  }
}
const gv = new GlobalVarible();

module.exports = gv;

module.exports.wrap = function gvwrap(func) {
  return (command, argv = {}) => {
    if (command && typeof command === 'object') argv = command;
    gv._setAttr('argv', {
      ..._cloneDeep(argv),
      mate: _merge(argv.url || {}, argv.jsurls || {}),
    });
    config(gv);
    if (func) {
      return command && typeof command === 'function' ? func(command, gv) : func(gv);
    }
    return gv;
  }
}
