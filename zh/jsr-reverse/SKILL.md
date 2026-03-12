---
name: jsr-reverse
description: Use when a Web JS reverse task has unclear phase selection, mixed source-chain and shell blockers, runtime divergence, validation-only work, or RS/瑞数 clues such as 412, cookie hops, sign, token, JSVMP, worker, wasm, hasDebug, or basearr.
---

# JSR Reverse

## 角色

把它作为 Web JS 逆向的唯一默认入口。

它只负责四件事：

- 判断当前真正卡在哪个阶段
- 选择最小下一阶段
- 点名现在必须先读的最小 reference 集合
- 让任务尽量按 `locate -> recover -> runtime -> validation` 推进，除非证据要求改道

## 输入块

先收这块输入：

```text
URL 或目标页面：
目标请求 / 字段 / cookie / 消息：
触发动作：
当前现象：
已有证据：
目标：
约束：
```

## 先输出路由块

进入深挖前，先输出：

```text
当前阶段：
先读：
不要进入：
切换条件：
```

## 默认路由规则

1. 真实写入边界或上游状态链还没证实时，先走 `locate`。
2. 写入边界已经接近，但真实逻辑仍被壳层挡住时，再走 `recover`。
3. sink 和壳层边界都已清楚，但浏览器与本地执行分叉时，再走 `runtime`。
4. 主要工作已经变成检查点证明或最终一致性证明时，走 `validation`。
5. 如果用户明确要求避免补环境，把 `runtime` 当作最后的一致性校验，而不是主路径。

## 瑞数优先分流

只要出现下面任一线索，就把任务视为瑞数高优先级：

- `412`、`403`、挑战页、`204` 落地页
- 内联 `$_ts`
- `meta[r=m]`
- `r2mKa`
- `$_ts.l__`
- `hasDebug`
- `basearr`
- 首跳 / 二跳 cookie 消费

遇到瑞数线索时：

- 除非 sink 和壳层边界都已证实，否则先从 `locate` 开始
- 当前阶段优先读瑞数专用 reference，再补通用 reference

## Reference 路由

按症状精确读，不要整包读完。

### 进入 Locate

先读：

- `../jsr-locate/references/locate-workflow.md`
- `../jsr-locate/references/request-chain-recording.md`

再补一份定向 locate reference：

- `../jsr-locate/references/crypto-entry-locating.md`：`sign`、`token`、动态 header、加密参数、请求侧 crypto 入口
- `../jsr-locate/references/rs-collection-and-two-hop-routing.md`：`412`、`403`、`204`、内联 `$_ts`、`meta[r=m]`、`r2mKa`、`$_ts.l__`、首跳 / 二跳行为
- `../jsr-locate/references/hook-and-boundary-patterns.md`：hook、断点、initiator tracing、边界观察

### 进入 Recover

先读：

- `../jsr-recover/references/recover-strategy.md`

再补最小匹配 recovery reference：

- `../jsr-recover/references/jsvmp-and-ast.md`：`JSVMP`、dispatcher、flattening、AST 重壳
- `../jsr-recover/references/ast-deobfuscation-playbook.md`：字符串表恢复、helper inline、AST 变换、bundle 拆包
- `../jsr-recover/references/wasm-worker-webpack.md`：`worker`、`wasm`、`webpack/runtime`、bootstrap、loader
- `../jsr-recover/references/protocol-and-long-connection.md`：WebSocket、protobuf、SSE、heartbeat、ack、renewal
- `../jsr-recover/references/rs-recovery-anchors.md`：`r2mKa`、`cp0/cp2/cp6`、`cp3 -> keys`、`$_ts.l__ appcode`

### 进入 Runtime

先读：

- `../jsr-runtime/references/runtime-diagnosis.md`
- `../jsr-runtime/references/minimal-env-design.md`

再补最小匹配 runtime reference：

- `../jsr-runtime/references/anti-debug-and-risk-branches.md`：反调试或观察导致分支翻转
- `../jsr-runtime/references/sdenv-fit-check-and-routing.md`：生命周期产状态、导航产状态、离线回放、`sdenv` / jsdom 路线
- `../jsr-runtime/references/rs-runtime-and-basearr-fit.md`：`hasDebug`、`basearr`、`encryptLens`、`lastWord`、`flag`、固定运行时事实、二跳状态消费

### 进入 Validation

读：

- `../jsr-recover/references/equivalence-and-validation.md`

## 快速判题表

| 现象 | 下一阶段 | 现在先读 |
|---|---|---|
| 目标 cookie、header、body 字段或消息来源未知 | `locate` | `../jsr-locate/references/locate-workflow.md`、`../jsr-locate/references/request-chain-recording.md` |
| `sign`、`token`、加密请求字段来源未知 | `locate` | `../jsr-locate/references/crypto-entry-locating.md` |
| `412 -> cookie -> 200` 或瑞数首跳 / 二跳行为 | `locate` | `../jsr-locate/references/rs-collection-and-two-hop-routing.md` |
| sink 已接近，但代码被 dispatcher、AST 壳或 `JSVMP` 挡住 | `recover` | `../jsr-recover/references/recover-strategy.md`、`../jsr-recover/references/jsvmp-and-ast.md` |
| 主要卡点是 `worker`、`wasm`、`webpack/runtime` 壳 | `recover` | `../jsr-recover/references/wasm-worker-webpack.md` |
| 主要卡点是协议包络、ack 或 renewal | `recover` | `../jsr-recover/references/protocol-and-long-connection.md` |
| 浏览器正常、本地 load 失败，且 sink 与壳层边界都已知 | `runtime` | `../jsr-runtime/references/runtime-diagnosis.md`、`../jsr-runtime/references/minimal-env-design.md` |
| 调试会翻分支或改行为 | `runtime` | `../jsr-runtime/references/anti-debug-and-risk-branches.md` |
| 瑞数本地 load 失败卡在 `hasDebug` 或 `basearr` | `runtime` | `../jsr-runtime/references/rs-runtime-and-basearr-fit.md` |
| 主要只剩检查点证明 | `validation` | `../jsr-recover/references/equivalence-and-validation.md` |

## 阶段退出规则

- 只有 sink 和上游状态链都坐实后，才能退出 `locate`。
- 只有壳层已压缩到足以支撑下游继续时，才能退出 `recover`。
- 只有第一个真实分叉点和最小依赖集都坐实后，才能退出 `runtime`。
- 只有对比检查点具体且结论可辩护时，才能退出 `validation`。

## 护栏

- 已经有真实请求和 initiator 链时，不要先做大范围源码 grep。
- 写入边界还在猜时，不要先跳进 runtime 补环境。
- 只要桥接合约或算子切片就够时，不要全量反编译壳层。
- 瑞数首跳材料没确认二跳消费前，不要当成完整闭合。
- 末端输出相等不能替代中间检查点一致。
