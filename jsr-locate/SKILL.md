---
name: jsr-locate
description: Use when a dynamic request field, header, cookie, websocket frame, worker message, or challenge token must be traced back to its real write boundary, triggering action, upstream response dependency, or state source before discussing pure computation, replay, or environment patching. Use for 定位、hook、请求链路、HttpOnly cookie 依赖、前置请求展开、字段来源证明。
---

# JSR Locate

## Overview

本 skill 用于将未知动态字段还原为可证明的来源链，并明确其写入边界、触发动作与状态依赖。

定位的目标永远是四件事：

- 它最终写到哪里。
- 它从哪里来。
- 它依赖哪些前置状态。
- 它在正常态和风控态下是否走同一条链。

## 核心原则

- 把目标单位定义成“字段 + 写入位置 + 触发动作 + 当前状态”，不要只盯函数名。
- 先找最近的写入边界，再回溯 `builder` 和 `entry`。
- 先拿到正常态链路，再分析风控态差异。
- 只要目标请求依赖响应字段、`Set-Cookie`、challenge、session、device state，就先建立“状态链”，禁止跳过状态链直接讨论纯算。
- 正常态 / 风控态分叉图是必交付，不是可选说明。
- 只要目标在 `WebSocket`、`protobuf`、长连接、心跳、续期里，就先建立“连接状态链”，不要只盯单包 payload。
- 只要字段来自上游响应，就必须把上游请求整条展开。
- 只有在边界被 `jsvmp`、`worker`、`wasm`、控制流平坦化遮住时，才切到 `$jsr-recover`。
- 只有在浏览器能跑、本地不稳或一调试就变时，才切到 `$jsr-runtime`。

## 先做四个判断

1. 目标字段的最终落点是什么：`query`、`body`、`header`、`cookie`、`storage`、`WebSocket` 帧、`worker` 回传，还是 DOM 隐藏字段。
2. 目标字段在什么动作后出现：初始化、点击、表单提交、响应到达、挑战通过、心跳、续期。
3. 目标字段是怎么变化的：固定、一次一变、会话级、挑战级、风控级、响应驱动。
4. 当前样本是什么状态：正常态、风控态、半完成态、未知态。

## 定位顺序

1. 先抓一轮完整正常态样本，保留请求顺序、响应摘要、页面动作与时间点。
2. 只要怀疑目标字段依赖响应字段、`Set-Cookie`、challenge、session、device state，就先在 `请求链路.md` 里建立“状态链”。
3. 找离目标字段最近的写入边界，不要先搜“md5”“aes”“sign”。
4. 从写入点往上回溯，区分谁负责触发、谁负责组装、谁负责最终写入。
5. 给每个字段打状态标签，区分它是固定、动态、加密、本地计算、响应获取还是环境产生。
6. 一旦发现字段来自上游响应或 `Set-Cookie`，立刻展开整条依赖链，直到拿到正常响应为止。
7. 如果目标属于 `WebSocket`、`protobuf`、长连接，先拆包络层、消息族与连接状态，再讨论单条消息里的加密或序列化。
8. 对同一目标同时记录正常态 / 风控态分叉起点、正常态 builder 路径、风控态 fallback 路径与缺失状态。
9. 如果字段链路清楚但内部逻辑看不透，切 `$jsr-recover`；如果链路清楚但本地复现不稳，切 `$jsr-runtime`。

## 交付要求

- 说清目标字段的最终写入点。
- 说清 `entry -> builder -> writer` 的关系。
- 必须给出状态链，证明目标字段是否依赖响应、`HttpOnly cookie`、challenge、session 或 device state。
- 说清它依赖哪些前置请求、响应字段、状态和页面动作。
- 必须给出正常态 / 风控态分叉图，写明分叉起点、正常态构建路径、风控态 fallback 路径、缺失状态。
- 协议 / 长连接场景必须给出连接状态链、消息族和目标消息的包络边界。
- 给出完整中文记录，而不是只给一个函数名。

## 工作目录落盘

默认把定位过程写入当前任务工作目录下的 `reverse-records/`。

- 必写：`reverse-records/总览.md`
- 必写：`reverse-records/请求链路.md`
- 需要验证时追加：`reverse-records/验证记录.md`
- 协议 / 长连接场景必写：`reverse-records/协议状态.md`

写入要求：

- 进入定位任务后先创建或更新 `总览.md`
- 一旦开始展开请求依赖链，立即写 `请求链路.md`
- `请求链路.md` 必须同时包含“状态链”和“正常态 / 风控态分叉图”
- 发现正常态 / 风控态差异时，在 `请求链路.md` 内单独写对照表
- 协议 / 长连接场景在 `协议状态.md` 中同时维护“连接状态链 + 消息族 + 序号 / ack / 续期规则”
- 每推进一步，都回写“当前阶段 / 已确认 / 卡点 / 下一步”

## 按需读取参考

- 需要学会如何设计定位路径、从未知推到已知：读 `references/locate-workflow.md`
- 需要把请求参数、`cookie`、`HttpOnly`、依赖链、进度、卡点记清楚：读 `references/request-chain-recording.md`
- 需要判断该从哪一层下手观察、什么时候该 hook、什么时候不该：读 `references/hook-and-boundary-patterns.md`

不要一次性全读，按当前卡点读取对应参考。

## 结束条件

- 已证明最终写入边界。
- 已证明字段来源属于本地计算、上游响应、环境状态中的哪一类。
- 若存在上游依赖，已把链路展开到正常响应。
- 下一阶段无需重新做定位。
