# jsr-recover Shell

## 目的

验证 `jsr-reverse` 在“链路已定位，但本地算法仍被 shell 遮住”时，会先路由到 `recover` 阶段，优先打穿 `JSVMP / AST / worker / wasm / webpack/runtime / RS shell`，而不是过早转去 runtime 补环境。

## Baseline

### Prompt

```text
浏览器里请求能发，本地 Node 生成器卡在 load 分支里的 undefined.call。帮我继续推进到本地可运行。
```

### 预期错误行为

- 直接开始补 `window/navigator/document`
- 只做 beautify，不建立语义边界
- 把 `undefined.call` 当成普通缺对象，而不是 shell 或桥接断点
- 没有说明何时才应该切到 runtime

## Skilled Run

### Prompt

```text
$jsr-reverse 已知请求链路和目标 sink，当前卡在本地 load 分支 undefined.call。先路由到 recover 阶段，恢复真实算法或 shell 边界，再决定是否需要 runtime。不要先补环境。
```

### 预期读取

- `jsr-reverse/SKILL.md`
- `jsr-reverse/references/recover-strategy.md`
- `jsr-reverse/references/jsvmp-and-ast.md`
- 如果像 worker/wasm/webpack runtime，再读 `jsr-reverse/references/wasm-worker-webpack.md`
- 如果像瑞数壳，再读 `jsr-reverse/references/rs-recovery-anchors.md`

### 预期正确行为

- 先明确首阶段是 `recover`
- 先判断 `undefined.call` 是桥接缺口还是环境缺口
- 把任务拆成 `入口 shell`、`桥接契约`、`真实算法边界`
- 只在 shell 打通后仍存在浏览器/本地分歧时才切到 `runtime`
- 输出里明确本阶段目标是 `恢复可解释语义`

## 失败判据

- 没继续读 recover 阶段所需 reference
- 首阶段不是 `recover`
- 一上来就做 jsdom 或大范围 mock
- 只说“继续调试”但没有 shell/桥接判断
- 在 recover 未完成时直接切到 runtime

## 通过判据

- 输出里明确首阶段是 `recover`
- 输出里明确区分 `shell 缺口` 与 `runtime 缺口`
- 输出里先要求恢复 `桥接契约` 或 `真实算法边界`
- 能看到 `jsr-reverse/SKILL.md` 和 recover 相关 reference 被实际读取
