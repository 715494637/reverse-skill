const getScd = require('./getScd');
const globaltext = require('./globaltext');
const dataOper = require('./dataOper');
const arraySwap = require('./arraySwap');
const initTs = require('./initTs');
const findFullString = require('@/utils/findFullString');
const getCodemap = require('@utils/getCodemap');
const unescape = require('@utils/unescape');

module.exports = class {
  constructor(ts, immucfg) {
    this.startTime = new Date().getTime();
    this.$_ts = initTs(ts, immucfg);
    this.scd = getScd(this.$_ts.nsd);
    this.keynames = this.$_ts.cp[1];
    this.keycodes = []
    this.optext = globaltext();
    this.opmate = this.mateOper();
    this.opdata = dataOper();
    this.r2mkaText = null;
    this.immucfg = immucfg;
    this.functionsNameSort = []; // 存放vm代码中定义的方法，用于计算代码特征码使用
    this.mainFunctionIdx = null; // 主函数（编号为1）在代码中的开始与结束下标
    this.config = {
      hasDebug: !!ts.hasDebug, // 是否添加额外的debugger字符串
      hasCodemap: !!ts.hasCodemap, // 是否生成codemap
    }
    this.code = ''; // 原始代码
    this.codePure = ''; // 去除干扰debugger的纯净代码
    this.debuggerScd = undefined; // 用于迭代判断坐标是否需要加入干扰debugger
    this.debuggerPosi = undefined; // 用于存储干扰debugger在生成数组中的实际下标
  }

  run() {
    const codeArr = this.parseGlobalText1();
    codeArr.push(this.parseGlobalText2());
    codeArr.push("})(", '$_ts', ".scj,", '$_ts', ".aebi);");
    for (let i = 0; i < codeArr.length; i++) {
      this.code += codeArr[i];
      if (!this.debuggerPosi || this.debuggerPosi.includes(i)) continue;
      this.codePure += codeArr[i];
    }
    if (!this.immucfg.globalText3) {
      const subStr = `r2mKa${this.code.includes('r2mKa0') ? '0' : '1'}`;
      this.immucfg.globalText3 = findFullString(this.code, subStr);
    }
    this.parseTs(this.code);
    this.endTime = new Date().getTime();
    if (this.config.hasCodemap) this.codemap = getCodemap(this.code);
    return this;
  }

  genCodemap() {
    if (!this.codemap) this.codemap = getCodemap(this.code);
    return this;
  }

  parseR2mka(text) {
    const start = text.indexOf('"') + 1;
    const end = text.lastIndexOf('"') - 2;
    return unescape(text.substr(start, end));
  }

  parseTs(codeStr) {
    this.$_ts.cp[4] = new Date().getTime() - this.startTime;
    let flag = 0;
    for (let i = 0; i < codeStr.length; i += 100) {
      flag += codeStr.charCodeAt(i)
    }
    this.$_ts.cp[3] = flag;
    this.$_ts.lcd = undefined;
    this.$_ts.nsd = undefined;
  }

  parseGlobalText2() {
    const { opmate, opdata, optext, keynames, getCurr } = this;
    optext.init(0, this.immucfg.globalText2);
    opdata.init();
    opmate.init();
    opmate.setMate('G_$ht', true);
    const keycodes = optext.getLine(optext.getCode()).split(String.fromCharCode(257));
    return this.special(optext.getList().data, keycodes, this.keynames).join('');
  }

  special(list, keycodes, keynames) {
    const ans = [];
    for (let i = 0; i < list.length - 1; i += 2) {
      ans.push(keycodes[list[i]], keynames[list[i + 1]])
    }
    ans.push(keycodes[list[list.length - 1]])
    return ans;
  }

  parseGlobalText1(codeArr = []) {
    const { opmate, opdata, optext, keynames, getCurr } = this;
    optext.init(0, this.immucfg.globalText1);
    opdata.init({ arr8: [4, 16, 64, 256, 1024, 4096, 16384, 65536] });
    opmate.init();
    opmate.setMate('G_$e4', true);
    opmate.setMate('G_$$c', true);
    opmate.setMate('G_$dK', true);
    opmate.setMate('G_$kv', true);
    opmate.setMate('G_$cR', true);
    opmate.setMate();
    this.keycodes.push(...optext.getLine(optext.getCode() * 55295 + optext.getCode()).split(String.fromCharCode(257)));
    opmate.setMate();
    const r2mkaText = optext.getLine(optext.getCode() * 55295 + optext.getCode())
    this.keycodes.push(r2mkaText);
    this.r2mkaText = this.parseR2mka(r2mkaText);
    // 代码段数量
    opmate.setMate('G_code_num', true);
    for (let i = 0; i < opmate.getMateOri('G_code_num'); i++) {
      if (this.config.hasDebug) {
        [this.debuggerScd, this.debuggerPosi] = this.getDebuggerScd(this.$_ts.nsd, this.debuggerPosi);
      }
      this.gren(i, codeArr);
    }
    codeArr.push('}}}}}}}}}}'.substr(opmate.getMateOri('G_code_num') - 1));
    this.mainFunctionIdx.push(codeArr.join('').length);
    return codeArr;
  }

  gren(current, codeArr) {
    const { opmate, opdata, optext, mate, scd, $_ts, keycodes, keynames } = this;
    const codeFirst = '\n\n\n\n\n';
    codeArr.push(codeFirst.substring(0, scd() % 5));
    opmate.setMate('_$ku');
    opmate.setMate('_$$6');
    opmate.setMate('_$b$');
    opmate.setMate('_$$q');
    opmate.setMate('_$jw');
    opmate.setMate('_$$g');
    opmate.setMate('_$cu');
    opmate.setMate('_$aw');
    opdata.setData('_$_K', optext.getList().data)
    opdata.setData('_$$H', optext.getList().data)
    opdata.setData('_$_C', optext.getList().data)
    const arr2two = opdata.getData('_$_C').reduce((ans, item, idx) => {
      if (idx % 2 === 0) {
        ans.prev = item;
      } else {
        ans.arr.push([ans.prev, item]);
      }
      return ans;
    }, { arr: [] , prev: undefined}).arr
    opdata.setData('_$$w', arraySwap(arr2two, scd));
    opmate.setMate('_$bf');
    opdata.setData('_$g$', optext.getList().data);
    $_ts.aebi[current] = opdata.getData('_$g$')
    opmate.setMate('_$e4');
    function func2(num) {
      const data = []
      for (let i = 0; i < num; i++) {
        const item = optext.getList()
        data.push(item.data)
      }
      return data
    }
    opdata.setData( '_$cS', arraySwap(
      func2(opmate.getMateOri('_$e4')),
      scd
    ));
    opmate.setMate('_$$c');
    opdata.setData('_$$k', func2(opmate.getMateOri('_$$c')));
    if (current) {
      if (this.mainFunctionIdx === null) this.mainFunctionIdx = [codeArr.join('').length];
      codeArr.push("function ", opmate.getMate('_$jw'), "(", opmate.getMate('_$$6'));
      opdata.getData('_$_K').forEach(it => codeArr.push(",", keynames[it]));
      codeArr.push("){");
    } else {
      codeArr.push("(function(", opmate.getMate('G_$dK'), ",", opmate.getMate('G_$kv'), "){var ", opmate.getMate('_$$6'), "=0;");
    }
    const functionsNameMap = opdata.getData('_$$w').reduce((ans, [key1, key2], idx) => {
      const arr = ["function ", keynames[key1], "(){var ", opmate.getMate('_$$q'), "=[", key2, "];Array.prototype.push.apply(", opmate.getMate('_$$q'), ",arguments);return ", opmate.getMate('_$$g'), ".apply(this,", opmate.getMate('_$$q'), ");}"]
      codeArr.push(...arr);
      return {
        ...ans,
        [keynames[key1]]: arr.join(''),
      }
    }, {});
    opdata.getData('_$cS').forEach(item => {
      for (let i = 0; i < item.length - 1; i += 2) {
        codeArr.push(keycodes[item[i]], keynames[item[i + 1]])
      }
      codeArr.push(keycodes[item[item.length - 1]])
    })

    if (opdata.getData('_$$H').length) {
      opdata.getData('_$$H').forEach((it, idx) => codeArr.push(idx ? "," : 'var ', keynames[it]));
      codeArr.push(';');
    }
    codeArr.push("var ", opmate.getMate('_$b$'), ",", opmate.getMate('_$cu'), ",", opmate.getMate('_$ku'), "=");
    codeArr.push(opmate.getMate('_$$6'), ",", opmate.getMate('_$aw'), "=", opmate.getMate('G_$kv'), "[", current, "];");
    codeArr.push("while(1){", opmate.getMate('_$cu'), "=", opmate.getMate('_$aw'), "[", opmate.getMate('_$ku'), "++];");
    codeArr.push("if(", opmate.getMate('_$cu'), "<", opmate.getMateOri('_$bf'), "){");
    try {
      if ([1, 2, 3, 4].includes(current)) {
        this.functionsSort(current, functionsNameMap);
      }
    } catch(err) {
      logger.error('排序函数生成失败，会影响cookie生成！');
    }
    this.grenIfelse(0, opmate.getMateOri('_$bf'), codeArr);
    codeArr.push("}else ", ';', '}');
  }

  functionsSort(current, functionsNameMap) {
    const { opdata, opmate, keycodes, keynames } = this
    const len = opdata.getData('_$$w').length;
    const aebi = this.$_ts.aebi[current];
    const getName = (idx) => {
      const numarr = opdata.getData('_$$k')[idx];
      if (!numarr || numarr.length !== 5 || !functionsNameMap[keynames[numarr[3]]]) throw new Error('排序函数生成失败，请检查！');
      return keynames[numarr[3]];
    }
    let start = 0;
    if (current === 1) {
      keycodes
        .filter(it => it.match(/^\([0-9]+\);$/))
        .forEach(it => {
          const s = parseInt(it.slice(1));
          if (s + len > aebi.length) return;
          try {
            aebi.slice(s, s + len).forEach(getName);
          } catch(err) {
            return;
          }
          start = s;
        });
    }
    aebi.slice(start, start + len).forEach(idx => {
      const name = getName(idx)
      this.functionsNameSort.push({
        name,
        current,
        code: functionsNameMap[name],
      });
    })
  }

  grenIfelse(start, end, codeArr) {
    const { opdata, opmate } = this
    const arr8 = opdata.getData('arr8')
    let text;
    let diff = end - start;
    if (diff == 0) {
      return codeArr;
    } else if (diff == 1) {
      this.grenIfElseAssign(start, codeArr);
    } else if (diff <= 4) {
      text = "if(";
      end--;
      for (; start < end; start++) {
        codeArr.push(text, opmate.getMate('_$cu'), "===", start, "){");
        this.grenIfElseAssign(start, codeArr);
        text = "}else if(";
      }
      codeArr.push("}else{");
      this.grenIfElseAssign(start, codeArr);
      codeArr.push("}");
    } else {
      const step = arr8[arr8.findIndex(it => diff <= it) - 1] || 0;
      text = "if(";
      for (; start + step < end; start += step) {
        codeArr.push(text, opmate.getMate('_$cu'), "<", start + step, "){");
        this.grenIfelse(start, start + step, codeArr);
        text = "}else if(";
      }
      codeArr.push("}else{");
      this.grenIfelse(start, end, codeArr);
      codeArr.push("}");
    }
    return codeArr;
  }
  grenIfElseAssign(start, codeArr) {
    if (this.debuggerScd?.(codeArr.length)) {
      codeArr.push('debugger;');
    }
    const { opdata, keynames, keycodes } = this;
    const arr = opdata.getData('_$$k')[start];
    const len = arr.length - (arr.length % 2);
    for (let i = 0; i < len; i += 2) {
      codeArr.push(keycodes[arr[i]], keynames[arr[i + 1]]);
    }
    arr.length != len ? codeArr.push(keycodes[arr[len]]) : 0;
  }

  mateOper() {
    const { keynames, optext } = this;
    let mate, mateOri;
    function init() {
      mate = {};
      mateOri = {};
    }
    init();
    return {
      setMate(key='UNSET', isNotCover = false) {
        if (isNotCover && key !== 'UNSET' && key in mateOri) throw Error(`关键词键${key}重复定义`);
        mateOri[key] = optext.getCode();
        mate[key] = keynames[mateOri[key]];
        // console.log(mateOri[key], optext.getCurr() - 1, key, '===>', mate[key]);
      },
      getMate(key) {
        if (!(key in mate)) throw Error(`关键词键${key}未定义`);
        return mate[key];
      },
      getMateOri(key) {
        if (!(key in mateOri)) throw Error(`关键词键${key}未定义`);
        return mateOri[key];
      },
      getAllMate() {
        return Object.keys(mateOri).map(key => [key, mateOri[key], mate[key]])
      },
      init,
    }
  }

  getDebuggerScd(nsd, posis = []) {
    let scd = getScd(nsd);
    let max = scd() % 10 + 10;
    return [(posi) => {
      let ret = false;
      -- max;
      if (max <= 0) {
        max = scd() % 10 + 10;
        if (max < 64) {
          ret = true;
          posis.push(posi);
        }
      }
      return ret;
    }, posis]
  }
}