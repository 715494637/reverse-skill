---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, AST transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protocol wrappers, or RS/瑞数-style r2mKa and cp/appcode shells.
---

# JSR Recover

## AST 恢复专项补充

- 遇到 AST 去混淆、字符串表恢复、helper 内联、控制流平坦化、bundle 拆包时，优先读取 `references/ast-deobfuscation-playbook.md`。
- 这类任务先做混淆指纹判断，再决定变换顺序，并为每一步维护输入、输出、保持不变项和验证证据。
- 该专项只负责可验证的语义恢复，不把“代码变好看”当成完成。

## 瑞数专项补充

- 遇到 `r2mKa`、`$_ts` 的 `cp` 字段、keys 派生路径、`$_ts.l__` appcode 时，优先读取 `references/rs-recovery-anchors.md`。
- 这类任务优先锚定 `r2mKa -> cp 解码 -> keys 路径 -> $_ts.l__`，不要先从大块 beautify 代码里盲找。
- 只拿到弱锚点、还不足以支持下游继续推进时，只能记为 `部分完成`，不能宣称 recover 完成。

## 概述

本 skill 用于识别真实业务逻辑被哪一层遮住，并确定支持当前任务所需的最低恢复级别和恢复顺序。

恢复完成的标准，不是代码外观变好看，而是当前层的职责、桥接边界、状态载体和关键算子已经清楚到足以支持下游继续定位或复现。

## 核心原则

- 先恢复语义边界，再追求代码外观。
- 先识别容器层、调度层、桥接层，再深入业务算子。
- 先判断恢复级别 `A / B / C`，从最低有效级别开始。
- 遇到 AST 重度遮蔽时，先做混淆家族指纹判断，再按顺序执行变换，并为每一步保留记录和验证点。
- 对 `worker`、`wasm`、`webpack/runtime`、协议壳，先写桥接契约卡片，再进入内部实现。
- 对瑞数壳层，优先从 `r2mKa`、`cp0/cp2/cp6`、`cp3 -> dynamicTaskOffset -> keys`、`$_ts.l__` appcode 入手，而不是从大块 beautify 源码倒推。
- `$_ts.l__` 渲染或 appcode 包装层要当桥接工件处理，它可能承载业务文本或解密后的代码，不是页面噪音。
- 在模块边界和输入输出契约稳定时，优先考虑黑盒复用，不默认全量反编译。
- 只恢复当前问题真正需要的那一段。
- 每恢复一层都要留下等价性检查点。
- 如果写回点还不清楚，退回 `$jsr-locate`；如果结果不稳定且依赖运行时状态，切 `$jsr-runtime`。

## 强制参考加载

- 不要停留在 `SKILL.md`。开始实质恢复前，至少加载一个匹配参考。
- 任何需要判断恢复顺序或恢复级别的任务，都要读 `references/recover-strategy.md`。
- 只要涉及 `jsvmp`、AST 变换、控制流平坦化，就要读 `references/jsvmp-and-ast.md`。
- 只要主恢复工作是 AST 去混淆、字符串表恢复、helper 内联、控制流还原或 bundle 拆包，就要读 `references/ast-deobfuscation-playbook.md`。
- 只要遮蔽层涉及 `worker`、`wasm`、`webpack`、runtime loader，就要读 `references/wasm-worker-webpack.md`。
- 只要是协议包络、`WebSocket`、`protobuf`、长连接、心跳、ack、续期问题，就要读 `references/protocol-and-long-connection.md`。
- 只要出现瑞数特征：`r2mKa`、`$_ts` 的 cp 字段、keys 派生路径、`$_ts.l__` appcode，就要读 `references/rs-recovery-anchors.md`。
- 只要需要证明桥接契约、关键函数、关键算子的等价性，就要读 `references/equivalence-and-validation.md`。
- 创建或刷新 `总览.md`、`验证记录.md` 前，要读 `references/record-overview-and-validation.md`。

## 最小输入

开始前至少收齐下面这块输入：

```text
目标：
目标工件：
壳层类型（若已知）：
恢复目标：语义说明 / 关键算子提炼 / 最小重建
已知锚点：
验证样本：
约束：
```

必填：

- `目标`
- `目标工件`

建议补齐：

- `壳层类型`
- `恢复目标`
- `已知锚点`
- `验证样本`
- `约束`（没有就写 `无`）

如果已经知道壳层家族，再补最紧的锚点：

- `worker`：消息方向、桥接入口、共享状态
- `wasm`：imports、exports、wrapper 层
- `webpack/runtime`：模块入口、懒加载点、模块边界
- `protocol`：握手、业务包、续期或 ack 证据

瑞数壳层额外补：

- `$_ts 样本`
- `r2mKa 锚点`
- `AppCode 锚点`

## 六层视角

1. `外层容器`：`webpack`、IIFE、loader、模块启动、懒加载
2. `调度层`：dispatcher、状态机、字节码循环、平坦化 `switch`
3. `状态载体`：寄存器、栈、上下文对象、闭包池、表、内存区
4. `桥接层`：`worker` 消息契约、`wasm` imports/exports、协议编解码壳
5. `核心算子`：散列、签名、加密、指纹采集、序列化、挑战逻辑
6. `写回层`：结果最终写入请求、头、`cookie`、帧、存储的位置

## 默认顺序

1. 先判断当前到底是哪一层在遮蔽真实逻辑。
2. 先选恢复级别：`A` 关键 `opcode` 抽离，`B` dispatcher + 关键状态载体，`C` 最小反编译 / 最小解释器。
3. 如果存在瑞数壳层，默认按 `r2mKa dispatcher -> cp 解码 -> keys 路径 -> $_ts.l__ appcode` 的顺序恢复，除非证据明确否定这条顺序。
4. 如果当前主工作是 AST 重度恢复，先按 `references/ast-deobfuscation-playbook.md` 做指纹判断，再按保留证据的顺序拆包或变换。
5. 先确认当前层的入口、输入、输出，再决定是否扩大恢复范围。
6. 对 `worker`、`wasm`、`webpack`、协议壳，先写桥接契约卡片和模块边界说明。
7. 先证明桥接契约或调度关系，再提炼核心算子。
8. 在把算子迁成纯算前，重新检查上游响应、`HttpOnly cookie`、challenge、浏览器状态、指纹、时间窗依赖。
9. 每恢复一层，都补一条等价性检查点。
10. 若 sink 不清楚，退回 `$jsr-locate`；若结果不稳定且受运行时状态影响，切 `$jsr-runtime`。

## 交付要求

- 说明当前遮蔽层属于 `jsvmp`、`ast`、`worker`、`wasm`、协议壳还是容器壳。
- 说明当前恢复级别 `A / B / C` 以及为什么停在这里。
- 说明当前层的入口、桥接边界、状态载体和关键算子。
- 瑞数任务要给出可复用的 `r2mKa`、`cp0/cp2/cp6`、keys 派生路径，以及对下游有用的 `$_ts.l__` appcode 锚点。
- `worker`、`wasm`、`webpack`、协议壳场景给出桥接契约卡片；需要时补模块闭包边界。
- 给出关键函数卡片和等价性验证记录。
- 恢复结果要足够支撑下游继续推进，不再重新拆同一层壳。

## 失败输出

如果恢复工作停住、只能部分收敛，或还不能证明当前恢复级别足够，就返回并落盘下面这个平铺状态块：

```yaml
状态: 就绪 | 部分完成 | 阻塞
阶段: 恢复
代码:
摘要:
证据:
  - ...
影响:
下一动作:
```

- `部分完成`：已经分清遮蔽层，但桥接、状态载体或关键算子还没闭合。
- `阻塞`：还没有稳定入口、没有边界锚点，或当前级别缺少验证样本。
- 瑞数任务里，如果 `r2mKa`、cp、keys 路径或 appcode 锚点已见到但还不足以支持下游推进，只能记 `部分完成`。
- 在 `A / B / C` 停止级别没说清前，不得宣称 recover 完成。

## 工作目录落盘

所有逆向记录都写入当前任务工作目录下的 `reverse-records/`，并使用中文。

- 一个逆向会话只使用一个 `会话N/` 目录。
- 用户指定了 `会话N`，就只读写那个目录。
- 用户未指定时，创建下一个未占用的 `会话N/` 目录，并且只写入那个目录。
- 不得覆盖、合并、重命名、清理其他 `会话N/` 目录。
- `恢复记录.md` 的唯一骨架以 `references/equivalence-and-validation.md` 为准；`总览.md` 与 `验证记录.md` 的唯一骨架以 `references/record-overview-and-validation.md` 为准。
- `总览.md` 记录阶段快照、当前恢复目标、卡点、下一步、风险，以及当前 blocked / partial 状态块。
- `恢复记录.md` 记录结构卡片：遮蔽层、桥接边界、状态载体、模块说明和关键函数卡片。
- `验证记录.md` 在等价性工作或固定输入检查开始时记录。
- 第一个恢复动作前刷新 `总览.md`，第一条层级或桥接发现出现时刷新 `恢复记录.md`，开始等价性验证时刷新 `验证记录.md`。

## 结束条件

- 已知当前遮蔽层属于哪类。
- 已知关键桥接边界或调度入口。
- 已有关键函数卡片和等价性检查点。
- 下游可以直接基于当前恢复结果继续推进。
