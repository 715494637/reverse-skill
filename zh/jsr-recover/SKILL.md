---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, ast transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protobuf envelopes, or protocol wrappers, and you need to recover semantic layers, bridge contracts, state carriers, or dispatcher behavior instead of only beautifying code. Use for semantic recovery, JSVMP, AST, WASM, worker, protocol semantics, and bridge recovery.
---

# JSR Recover

## 概述

本 skill 用于识别真实业务逻辑被哪一层遮住，并确定支持当前任务所需的最低恢复级别和恢复顺序。

恢复完成的标准，不是代码外观变好看，而是当前层的职责、桥接边界、状态载体和关键算子已经清楚到足以支持下游继续定位或复现。

## 核心原则

- 先恢复语义边界，再追求代码外观。
- 先识别容器层、调度层、桥接层，再深入业务算子。
- 先判断恢复级别 `A / B / C`，从最低有效级别开始。
- 对 `worker`、`wasm`、`webpack/runtime`、协议壳，先写桥接契约卡片，再进入内部实现。
- 在模块边界和输入输出契约稳定时，优先考虑黑盒复用，不默认全量反编译。
- 只恢复当前问题真正需要的那一段。
- 每恢复一层都要留下等价性检查点。
- 如果写回点还不清楚，退回 `$jsr-locate`；如果结果不稳定且依赖运行时状态，切 `$jsr-runtime`。

## 强制参考加载

- 不要停留在 `SKILL.md`。开始实质恢复前，至少加载一个匹配参考。
- 任何需要判断恢复顺序或恢复级别的任务，都要读 `references/recover-strategy.md`。
- 只要涉及 `jsvmp`、AST 变换、控制流平坦化，就要读 `references/jsvmp-and-ast.md`。
- 只要遮蔽层涉及 `worker`、`wasm`、`webpack`、runtime loader，就要读 `references/wasm-worker-webpack.md`。
- 只要是协议包络、`WebSocket`、`protobuf`、长连接、心跳、ack、续期问题，就要读 `references/protocol-and-long-connection.md`。
- 只要需要证明桥接契约、关键函数、关键算子的等价性，就要读 `references/equivalence-and-validation.md`。

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
3. 先确认当前层的入口、输入、输出，再决定是否扩大恢复范围。
4. 对 `worker`、`wasm`、`webpack`、协议壳，先写桥接契约卡片和模块边界说明。
5. 先证明桥接契约或调度关系，再提炼核心算子。
6. 在把算子迁成纯算前，重新检查上游响应、`HttpOnly cookie`、challenge、浏览器状态、指纹、时间窗依赖。
7. 每恢复一层，都补一条等价性检查点。
8. 若 sink 不清楚，退回 `$jsr-locate`；若结果不稳定且受运行时状态影响，切 `$jsr-runtime`。

## 交付要求

- 说明当前遮蔽层属于 `jsvmp`、`ast`、`worker`、`wasm`、协议壳还是容器壳。
- 说明当前恢复级别 `A / B / C` 以及为什么停在这里。
- 说明当前层的入口、桥接边界、状态载体和关键算子。
- `worker`、`wasm`、`webpack`、协议壳场景给出桥接契约卡片；需要时补模块闭包边界。
- 给出关键函数卡片和等价性验证记录。
- 恢复结果要足够支撑下游继续推进，不再重新拆同一层壳。

## 工作目录落盘

所有逆向记录都写入当前任务工作目录下的 `reverse-records/`，并使用中文。

- 必写：`reverse-records/总览.md`
- 必写：`reverse-records/恢复记录.md`
- 必写：`reverse-records/验证记录.md`
- 协议 / 长连接场景必写：`reverse-records/协议状态.md`

更新规则：

- 第一个恢复动作前先更新 `总览.md`。
- 一旦识别出遮蔽层、桥接契约、关键函数卡片或模块边界，就创建或更新 `恢复记录.md`。
- 每次恢复级别变化、桥接发现变化、状态载体发现、关键算子抽离、等价性结果变化、卡点变化、下一步变化后，都要立即回写记录。
- 每次回写都要重写 `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证`。
- 不得在 `总览.md`、`恢复记录.md` 或 `验证记录.md` 已过期的情况下持续长时间恢复。

## 结束条件

- 已知当前遮蔽层属于哪类。
- 已知关键桥接边界或调度入口。
- 已有关键函数卡片和等价性检查点。
- 下游可以直接基于当前恢复结果继续推进。

