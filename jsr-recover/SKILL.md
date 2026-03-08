---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, ast transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protobuf envelopes, or protocol wrappers, and you need to recover semantic layers, bridge contracts, state carriers, or dispatcher behavior instead of only beautifying code. Use for 还原、JSVMP、AST、WASM、Worker、协议语义、桥接层恢复。
---

# JSR Recover

## Overview

本 skill 用于识别业务逻辑所处的遮蔽层，并确定最低必要恢复层级与恢复顺序。

恢复工作的目标不是全量外观整理，而是取得以下结果：

- 哪一层负责容器、调度、桥接、状态、算子、写回。
- 哪些函数是真业务，哪些只是壳。
- 哪些输入输出可以作为等价性检查点。

## 核心原则

- 先还原语义边界，再追求代码好看。
- 先找容器、调度器、桥接层，再找业务算子。
- 先判断恢复级别 `A / B / C`，默认从最低有效级别开始，不默认做全量恢复。
- `worker / wasm / webpack / 协议壳` 场景必须先写“桥接契约卡片”，不允许直接钻内部实现。
- 能黑盒复用模块闭包就先黑盒复用，不默认走全量反编译。
- 先证明每层职责，再决定要不要继续往下拆。
- 只恢复当前问题所需的那一段，不做低价值全量还原。
- 每一层都要做等价性验证，不以外观相似作为判定依据。

## 六层视角

1. `外层容器`：`webpack`、IIFE、loader、模块装载、懒加载
2. `调度层`：分发器、状态机、字节码循环、控制流平坦化总开关
3. `状态载体`：寄存器、栈、上下文对象、闭包池、对象表、内存区
4. `桥接层`：`worker` 消息契约、`wasm` 的 `imports/exports`、协议编解码壳
5. `核心算子`：签名、散列、加密、指纹采样、序列化、挑战计算
6. `业务写回`：把结果写回请求、头、`cookie`、帧、存储的地方

## 默认顺序

1. 先判断当前被遮住的是哪一层。
2. 先判断当前恢复级别：`A` 只抽关键 `opcode`，`B` 恢复 dispatcher + 关键状态载体，`C` 才做最小反编译 / 最小解释器。
3. 先确认当前层的入口、输入、输出，再决定是否需要扩大恢复范围。
4. 遇到 `worker / wasm / webpack / 协议壳` 时，先写桥接契约卡片和模块闭包边界。
5. 先证明桥接契约或调度关系，再提炼关键算子。
6. 在把算子迁到纯算前，先确认它不依赖上游响应、`HttpOnly cookie`、challenge、浏览器内部状态、指纹和时间窗。
7. 每恢复一层，就记下等价性检查点。
8. 如果写回点不明，退回 `$jsr-locate`；如果结果不稳且依赖环境，切 `$jsr-runtime`。

## 交付要求

- 说清当前难点属于 `jsvmp`、`ast`、`worker`、`wasm`、协议壳、还是容器包装。
- 说清当前恢复级别是 `A / B / C`，以及为什么停在这一层。
- 说清当前层的入口、桥接边界、状态载体和关键算子。
- `worker / wasm / webpack / 协议壳` 场景必须给出桥接契约卡片；`webpack` 黑盒复用场景还要给出模块闭包边界。
- 给出关键函数卡片与等价性验证记录。
- 让下游不再重新拆这层壳。

## 工作目录落盘

默认把恢复过程写入当前任务工作目录下的 `reverse-records/`。

- 必写：`reverse-records/总览.md`
- 必写：`reverse-records/恢复记录.md`
- 必写：`reverse-records/验证记录.md`
- 协议 / 长连接场景必写：`reverse-records/协议状态.md`

写入要求：

- 开始恢复前先更新 `总览.md`
- 一旦确认遮蔽层、桥接层、关键函数卡片，写入 `恢复记录.md`
- 每做一次等价性对照、桥接层对照、关键中间值对照，都写 `验证记录.md`
- `WebSocket`、`protobuf`、长连接、心跳、序号、续期问题，额外维护 `协议状态.md`
- `worker / wasm / webpack` 场景在 `恢复记录.md` 中额外维护“桥接契约卡片 + 模块闭包边界”

## 按需读取参考

- 需要先设计恢复路线、决定先拆哪层：读 `references/recover-strategy.md`
- 需要处理 `jsvmp`、`ast`、控制流平坦化：读 `references/jsvmp-and-ast.md`
- 需要处理 `worker`、`wasm`、`webpack/runtime` 包装：读 `references/wasm-worker-webpack.md`
- 需要处理 `WebSocket`、`protobuf`、长连接状态迁移：读 `references/protocol-and-long-connection.md`
- 需要设计等价性校验与恢复记录：读 `references/equivalence-and-validation.md`

## 结束条件

- 已知当前遮蔽层属于哪一类。
- 已知关键桥接边界或调度入口。
- 已产出关键函数卡片与等价性记录。
- 下游可以直接基于恢复结果继续推进。
