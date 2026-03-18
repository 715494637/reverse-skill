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

- 首先读取 `jsr-reverse/SKILL.md`
- 在确认当前阶段为 `recover` 后，先读 `jsr-reverse/references/recover-strategy.md`
- 然后再读 `jsr-reverse/references/jsvmp-and-ast.md`
- 如果像 worker/wasm/webpack runtime，再读 `jsr-reverse/references/wasm-worker-webpack.md`
- 如果像瑞数壳，再读 `jsr-reverse/references/rs-recovery-anchors.md`

### 预期正确行为

- 先明确当前首阶段是 `recover`，并沿用 `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff` 主链路
- 明确 skilled run 必须先读 `jsr-reverse/SKILL.md`，再按顺序读 recover reference：`recover-strategy.md` 在前，`jsvmp-and-ast.md` 在后
- 先判断 `undefined.call` 是桥接缺口、shell 遮挡，还是确属环境缺口
- 把任务拆成 `入口 shell`、`桥接契约`、`真实算法边界`
- 输出里明确给出当前 recovery level `A / B / C`，并说明为什么该级别已足以支撑当前推进
- 输出里必须明确至少一个已命名的 recover artifact，并给出用于 handoff 的 checkpoint 信息，例如已确认的 VM 入口、桥接参数表、写回点、去壳片段或待验证断点，而不是只给泛化说明
- 明确说明何时切到 `runtime`：只有在 shell/桥接已打通后，仍存在浏览器/本地执行分歧时才切换
- 明确说明何时切到 `validation`：当真实算法边界、关键输入输出与写回路径已能稳定复述或复跑时，进入验证收口
- 若 VM 入口相关性或写回关系尚未被证明，必须回退到 `locate` 补证据，而不能继续停留在 `recover` 空转
- 输出里明确本阶段目标是 `恢复可解释语义`，而不是提前补环境

## 失败判据

- 没有先读取 `jsr-reverse/SKILL.md`
- 没有先读 `recover-strategy.md` 再读 `jsvmp-and-ast.md`
- 首阶段不是 `recover`
- 没有显式说明当前处于 `recover`，或没有体现主工作流阶段切换条件
- 一上来就做 jsdom、补 `window/navigator/document` 或大范围 mock
- 只说“继续调试”但没有 shell/桥接判断
- 没给出 recovery level `A / B / C`，或没解释该级别为什么足够
- 输出没有任何已命名的 recover artifact，或没有给出用于 handoff 的 checkpoint 信息，只有泛化 prose
- 没说明何时切到 `runtime`
- 没说明何时切到 `validation`
- 在 VM 入口相关性或写回关系未证实时，没有回退 `locate`
- 在 recover 未完成时直接切到 runtime

## 通过判据

- 能看到 `jsr-reverse/SKILL.md` 被先读取，且 recover reference 的读取顺序为 `recover-strategy.md` 在前、`jsvmp-and-ast.md` 在后
- 输出里明确当前首阶段是 `recover`，并能说明后续何时切到 `runtime`、何时切到 `validation`
- 输出里明确区分 `shell 缺口`、`桥接缺口` 与 `runtime 缺口`
- 输出里先要求恢复 `桥接契约` 或 `真实算法边界`，而不是先补环境
- 输出里明确给出 recovery level `A / B / C` 及其充分性说明
- 输出里至少包含一个已命名的 recover artifact，并带有用于 handoff 的 checkpoint 信息
- 若 VM 入口相关性或写回关系未证实，输出明确要求回退 `locate` 补证据
