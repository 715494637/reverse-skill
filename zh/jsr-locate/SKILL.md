---
name: jsr-locate
description: Use when a dynamic request field, header, cookie, websocket frame, worker message, or challenge token must be traced to its real write boundary and upstream state dependencies.
---

# JSR Locate

## 入口定位专项补充

- 遇到 `sign`、`token`、动态请求头、加密参数入口定位时，优先读取 `references/crypto-entry-locating.md`。
- 这类任务先走 `请求 -> initiator / 调用栈 -> 候选帧 -> 参数证据`，再做大范围源码搜索。
- 该专项只负责证明入口和写入关系，不负责完整算法还原；语义被壳层遮住时切到 `$jsr-recover`。

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
- 遇到 `sign`、`token`、动态请求头、加密参数入口定位时，先从真实请求和它的 initiator 栈入手，再做大范围文本搜索。
- 先拿到正常态样本，再分析风控态分叉。
- 只要目标依赖响应字段、`Set-Cookie`、`HttpOnly`、challenge、session、device state，就先写状态链，再讨论纯算。
- 如果入口只能通过动态别名或 resolver 找到，必须先记下包装链、触发条件、最小运行时前置条件和残余风险，才能把它当工作入口。
- 只要任务涉及风控分支，正常态 / 风控态分叉图就是必交付。
- `WebSocket`、`protobuf`、长连接、心跳、续期场景，先建连接状态链和消息族，再谈单包 payload。
- 发现上游依赖后，必须一直展开到能拿到正常响应的那条链。
- 若边界被 `jsvmp`、`worker`、`wasm`、控制流平坦化遮住，切 `$jsr-recover`。
- 若写入点已清楚，但本地执行与浏览器不一致或一调试就变，切 `$jsr-runtime`。

## 强制参考加载

- 不要停留在 `SKILL.md`。进入实质分析、代码阅读、hook 设计、重放设计前，至少加载一个匹配参考。
- 任何来源追踪任务都要读 `references/locate-workflow.md`。
- 只要涉及请求参数、请求头、`cookie`、`HttpOnly`、上游响应、依赖展开、连接信息，就要读 `references/request-chain-recording.md`。
- 只要问题是“从哪观察、从哪 hook、要不要断点”，就要读 `references/hook-and-boundary-patterns.md`。
- 只要任务要证明真实请求里的签名、token、header 或加密参数是从哪里生成的，就要读 `references/crypto-entry-locating.md`。
- 创建或刷新 `总览.md`、`验证记录.md` 前，要读 `references/record-overview-and-validation.md`。
- 任务范围一旦扩大，要先补读新匹配的参考，再继续推进。

## 最小输入

开始前至少收齐下面这块输入：

```text
Target request:
Target field:
Final sink (if known):
Trigger action:
Current state: normal / risk / unknown
Known evidence:
Constraints:
```

必填：

- `Target request`
- `Target field`
- `Current state`（未知时明确写 `unknown`）
- `Known evidence`（没有就写 `none`）
- `Constraints`（没有就写 `none`）

协议或长连接任务额外补：

- `Connection family`
- `Message type`
- `Current connection state`

## 先做四个判断

1. 最终落点是什么：`query`、`body`、`header`、`cookie`、`storage`、`WebSocket` 帧、`worker` 回传、还是隐藏 DOM 字段。
2. 触发动作是什么：初始化、点击、提交、响应到达、挑战通过、心跳、续期。
3. 变化模型是什么：固定、每次变化、会话级、挑战级、风控级、响应驱动。
4. 当前样本是什么状态：正常态、风控态、半闭合态、未知态。

## 定位顺序

1. 先抓一轮完整正常态样本，保留请求顺序、响应摘要、页面动作和时间点。
2. 遇到签名、token、header 或加密参数入口任务时，先按 `references/crypto-entry-locating.md` 的 `request -> initiator -> candidate frame -> argument proof` 顺序走，再做大范围源码搜索。
3. 一旦涉及响应字段、`Set-Cookie`、`HttpOnly`、challenge、session、device state，立即打开当前会话的 `请求链路.md`，先写状态链，再继续看代码。
4. 先找最近写入边界，不要一上来搜 `md5`、`aes`、`sign`。
5. 从 sink 向上回溯，分清谁触发、谁组装、谁最终写入。
6. 每个字段都要打标签：固定、动态、加密、本地计算、响应获取、环境产生。
7. 一旦字段来自上游响应或 `Set-Cookie`，立刻展开整条依赖链。
8. 协议 / 长连接场景先拆包络层、消息族、连接状态，再看 payload 逻辑。
9. 同时记录正常态 builder 路径、风控态 fallback 路径、分叉起点和缺失状态。
10. 若链路已清楚但内部语义被壳遮住，切 `$jsr-recover`；若链路已清楚但复现不稳，切 `$jsr-runtime`。

## 交付要求

- 证明目标字段的最终写入边界。
- 说明 `entry -> builder -> writer` 关系。
- 如果入口不是稳定路径而是 resolver / 动态别名，还要补包装链、resolver 触发条件、最小运行时前置条件和残余风险。
- 给出状态链，证明是否依赖响应、`HttpOnly cookie`、challenge、session、device state。
- 说明前置请求、响应字段、状态载体和触发动作。
- 给出正常态 / 风控态分叉图，写清分叉起点、正常路径、fallback 路径、缺失状态。
- 协议 / 长连接场景补齐连接状态链、消息族和目标消息包络边界。
- 留下中文逆向记录，保证下游不用重新做定位。

## 失败输出

如果定位工作停住、只能部分收敛，或还不能证明 sink，就返回并落盘下面这个平铺状态块：

```yaml
status: ready | partial | blocked
stage: locate
code:
summary:
evidence:
  - ...
impact:
next_action:
```

- `partial`：已经有候选链，但 sink 证明、来源证明或分叉证明还没闭合。
- `blocked`：还没有可用正常态样本、没有 sink 候选，或上游状态链还没闭合。
- 在 sink 没证明、风控分支没排除或没画清之前，不得宣称 locate 完成。

## 工作目录落盘

所有逆向记录都写入当前任务工作目录下的 `reverse-records/`，并使用中文。

- 一个逆向会话只使用一个 `会话N/` 目录。
- 用户指定了 `会话N`，就只读写那个目录。
- 用户未指定时，创建下一个未占用的 `会话N/` 目录，并且只写入那个目录。
- 不得覆盖、合并、重命名、清理其他 `会话N/` 目录。
- `references/record-overview-and-validation.md` 负责定义 `总览.md` 和 `验证记录.md` 的精确骨架。
- `总览.md` 记录阶段快照、卡点、下一步、风险、待验证，以及正常态 / 风控态对比表和分叉图。
- `请求链路.md` 只记录请求区块、状态数组、`来源/去向`、上游展开和按需连接信息。
- `验证记录.md` 在 sink 假设、状态闭合或分叉假设需要证明时开始记录。
- 第一个实质动作前刷新 `总览.md`，开始展开依赖链时刷新 `请求链路.md`，进入验证时刷新 `验证记录.md`。

## 结束条件

- 已证明最终写入边界。
- 已证明来源属于本地计算、上游响应、环境状态或混合依赖中的哪类。
- 若存在上游依赖，链路已展开到正常响应。
- 下一阶段无需重复做定位。
