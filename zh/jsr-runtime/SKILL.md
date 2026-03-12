---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, missing state, anti-debugging, unstable sources, risk-branch conditions, page-lifecycle-produced state, or RS/瑞数 hasDebug and basearr differences.
---

# JSR Runtime

## 角色

只有 sink 和壳层边界已经足够清楚，但浏览器执行与本地执行仍然分叉时才用这个 skill。

适用场景：

- 缺对象
- 缺状态
- 反调试
- 时间、随机源、seed 这类不稳定来源
- 风控分支
- 生命周期或导航阶段产生的状态
- 瑞数特有的 `hasDebug`、`basearr`、二跳状态消费

不适用场景：

- sink 仍在猜
- 真正问题其实是壳层语义还没恢复

如果当前阶段还不明确，先走 `$jsr-reverse`。

## 输入块

先收这块输入：

```text
目标链路或函数：
浏览器表现：
本地表现：
当前卡点：
已知 sink：
已知壳层边界：
已知证据：
目标：
约束：
```

## 读取顺序

### 1. 先固定读这两份

- `references/runtime-diagnosis.md`
- `references/minimal-env-design.md`

### 2. 再按症状补最小 runtime reference

- `references/anti-debug-and-risk-branches.md`：反调试或观察导致分支翻转
- `references/sdenv-fit-check-and-routing.md`：生命周期产状态、导航产状态、离线 HTML 回放、远程 jsdom / `sdenv` 路线
- `references/rs-runtime-and-basearr-fit.md`：瑞数 `hasDebug`、`basearr`、`encryptLens`、`lastWord`、`flag`、固定运行时事实、二跳状态消费

### 3. runtime 不再是主问题时立刻切换

- sink 或状态依赖链还没证实时，切回 `$jsr-locate`
- 分叉根因其实是壳层语义没恢复时，切 `$jsr-recover`

## Runtime 必须证明

- 第一个真实分叉点
- 分叉类别：对象 / 状态 / 反调试 / 不稳定源 / 风控分支
- 最小依赖集
- 路线需要分流时的最终执行路线
- 当前是否允许纯算法迁移

## 护栏

- sink 和壳层边界没清楚前，不要提前做 runtime。
- 能补状态时先补状态，再补对象。
- 反调试优先选最小匹配规则。
- 瑞数场景里，`hasDebug`、`basearr`、固定运行时事实、二跳验证没闭合前，不算 closure。
- 上游响应、`HttpOnly`、challenge、浏览器状态、指纹、时间窗依赖没闭合前，不要叫 pure-compute。

## 退出条件

只有分叉类别和最小依赖集已经足够自洽，能支撑 replay 或最终验证时，才离开 runtime。
