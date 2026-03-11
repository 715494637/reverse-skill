const gv = require('@src/handler/globalVarible');

module.exports = function () {
  const values = [
    103, 0, 102, 203, 224,
    181, 108, 240, 101, 126,
    103, 11, 102, 203, 225,
    181, 208, 180, 100, 127
  ];
  const keys = [29, 30, 31, 32];
  const tasks = gv.r2mka("U250200532");
  for (let task of tasks) {
    const maps = values.reduce((ans, value, idx) => {
      ans[gv.ts.cp[1][task.taskori[idx * 7 + 6]]] = value;
      return ans;
    }, {})
    const data = keys.map(it => maps[gv.utils.ascii2string(gv.keys[it])]).filter(it => it !== undefined);
    if (data.length === keys.length) return data
  }
  throw new Error('4位计算数未找到，请检查！');
}
