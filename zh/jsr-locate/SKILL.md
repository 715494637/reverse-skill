---
name: jsr-locate
description: Use when a dynamic request field, header, cookie, websocket frame, worker message, or challenge token must be traced back to its real write boundary, triggering action, upstream response dependency, or state source before discussing pure computation, replay, or environment patching. Use for locating sinks, hooks, request chains, HttpOnly cookie dependencies, upstream expansion, and source proof.
---

# JSR Locate

## 概述

本 skill 用于把动态字段还原成可证明的来源链，并明确最终写入边界、触发动作、上游依赖链，以及正常态与风控态的关系。

定位完成至少要回答四件事：

- 值最终写到哪里
- 值从哪里来
- 哪条上游状态链把它闭合
- 正常态与风控态是否走同一条 builder 链

## 核心原则

- 目标单位定义成 `字段 + 写入点 + 触发动作 + 当前状态`，不要只盯函数名。
- 先找最近写入边界，再回溯 `builder` 和 `entry`。
- 先拿到正常态样本，再分析风控态分叉。
- 只要目标依赖响应字段、`Set-Cookie`、`HttpOnly`、challenge、session、device state，就先写状态链，再讨论纯算。
- 正常态 / 风控态分叉图是必交付。
- `WebSocket`、`protobuf`、长连接、心跳、续期场景，先建连接状态链和消息族，再谈单包 payload。
- 发现上游依赖后，必须一直展开到能拿到正常响应的那条链。
- 若边界被 `jsvmp`、`worker`、`wasm`、控制流平坦化遮住，切 `$jsr-recover`。
- 若写入点已清楚，但本地执行与浏览器不一致或一调试就变，切 `$jsr-runtime`。

## 强制参考加载

- 不要停留在 `SKILL.md`。进入实质分析、代码阅读、hook 设计、重放设计前，至少加载一个匹配参考。
- 任何来源追踪任务都要读 `references/locate-workflow.md`。
- 只要涉及请求参数、请求头、`cookie`、`HttpOnly`、上游响应、依赖展开、连接信息，就要读 `references/request-chain-recording.md`。
- 只要问题是“从哪观察、从哪 hook、要不要断点”，就要读 `references/hook-and-boundary-patterns.md`。
- 任务范围一旦扩大，要先补读新匹配的参考，再继续推进。

## 先做四个判断

1. 最终落点是什么：`query`、`body`、`header`、`cookie`、`storage`、`WebSocket` 帧、`worker` 回传、还是隐藏 DOM 字段。
2. 触发动作是什么：初始化、点击、提交、响应到达、挑战通过、心跳、续期。
3. 变化模型是什么：固定、每次变化、会话级、挑战级、风控级、响应驱动。
4. 当前样本是什么状态：正常态、风控态、半闭合态、未知态。

## 定位顺序

1. 先抓一轮完整正常态样本，保留请求顺序、响应摘要、页面动作和时间点。
2. 一旦涉及响应字段、`Set-Cookie`、`HttpOnly`、challenge、session、device state，立即打开当前会话的 `请求链路.md`，先写状态链，再继续看代码。
3. 先找最近写入边界，不要一上来搜 `md5`、`aes`、`sign`。
4. 从 sink 向上回溯，分清谁触发、谁组装、谁最终写入。
5. 每个字段都要打标签：固定、动态、加密、本地计算、响应获取、环境产生。
6. 一旦字段来自上游响应或 `Set-Cookie`，立刻展开整条依赖链。
7. 协议 / 长连接场景先拆包络层、消息族、连接状态，再看 payload 逻辑。
8. 同时记录正常态 builder 路径、风控态 fallback 路径、分叉起点和缺失状态。
9. 若链路已清楚但内部语义被壳遮住，切 `$jsr-recover`；若链路已清楚但复现不稳，切 `$jsr-runtime`。

## 交付要求

- 证明目标字段的最终写入边界。
- 说明 `entry -> builder -> writer` 关系。
- 给出状态链，证明是否依赖响应、`HttpOnly cookie`、challenge、session、device state。
- 说明前置请求、响应字段、状态载体和触发动作。
- 给出正常态 / 风控态分叉图，写清分叉起点、正常路径、fallback 路径、缺失状态。
- 协议 / 长连接场景补齐连接状态链、消息族和目标消息包络边界。
- 留下中文逆向记录，保证下游不用重新做定位。

## 工作目录落盘

所有逆向记录都写入当前任务工作目录下的 `reverse-records/`，并使用中文。

目录结构：

```text
reverse-records/
├─ 会话1/
│  ├─ 总览.md
│  ├─ 请求链路.md
│  ├─ 运行时依赖.md
│  ├─ 恢复记录.md
│  └─ 验证记录.md
├─ 会话2/
│  └─ ...
└─ ...
```

会话规则：

- 一个逆向会话只使用一个 `会话N/` 目录。
- 用户指定了 `会话N`，就只读写那个目录。
- 用户未指定时，创建下一个未占用的 `会话N/` 目录，并且只写入那个目录。
- 不得覆盖、合并、重命名、清理其他 `会话N/` 目录。
- 协议 / 长连接状态写入当前会话 `请求链路.md` 的专门章节，不再单独创建 `协议状态.md`。

当前会话中与定位直接相关的文件：

- `reverse-records/会话N/总览.md`
- `reverse-records/会话N/请求链路.md`
- `reverse-records/会话N/验证记录.md`（需要验证时）

更新规则：

- 第一个实质动作前先创建或更新当前会话 `总览.md`。
- 一旦开始展开依赖链，就创建或更新当前会话 `请求链路.md`。
- 每次阶段切换、发现上游依赖、状态链闭合变化、确认正常态 / 风控态分叉、确认 sink、卡点变化、下一步变化、拿到验证结果后，都要立即回写记录。
- 每次回写都要重写 `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证`。
- 不得在当前会话 `总览.md` 或 `请求链路.md` 已过期的情况下持续长时间分析。
- 协议 / 长连接场景要在当前会话 `请求链路.md` 内维护专门章节，同步记录连接状态、消息族、序号 / ack / 续期规则。

## 结束条件

- 已证明最终写入边界。
- 已证明来源属于本地计算、上游响应、环境状态或混合依赖中的哪类。
- 若存在上游依赖，链路已展开到正常响应。
- 下一阶段无需重复做定位。
