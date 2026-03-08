---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, hidden browser state, anti-debugging, timing or randomness, fingerprint surfaces, or risk-control branching, and you need a minimal runtime manifest instead of broad simulation. Use for 补环境、反调试、状态依赖、最小环境设计、风控分支判断。
---

# JSR Runtime

## Overview

本 skill 用于识别当前调用链的最小运行时缺口，并形成可验证的环境与状态依赖清单。

运行时问题常被误判成算法问题。真正要做的是：

- 先分清是缺对象、缺状态、反调试、随机源、时间窗，还是风控分支。
- 只为当前调用链补最小必需项。
- 以中间值稳定作为运行时目标，而不是以环境外观相似作为目标。

## 核心原则

- 补环境是减法，不是堆对象。
- 状态缺失和对象缺失必须分开判断。
- 先固定时间、随机数、种子，再谈输出差异。
- 只有通过“纯算迁移前检查”，才能把问题定义成纯算；否则继续补状态链或最小环境。
- 遇到 `deviceId`、`blackbox`、`sensor_data`、验证码、滑块、风控 cookie 时，先做“指纹归因矩阵”，不要把一切都归结为缺浏览器对象。
- 每补一项都要回答“去掉它会怎样”。
- 如果真实难点在 `jsvmp`、`worker`、`wasm` 或协议壳里，应切 `$jsr-recover`。
- 如果最终写入点还没找清楚，应退回 `$jsr-locate`。

## 运行时任务的默认顺序

1. 先拿浏览器正常态样本，不在未知态上补环境。
2. 先分类当前失败：缺对象、缺状态、反调试、不确定源、风控分支。
3. 先做纯算迁移前六问：是否依赖上游响应、`HttpOnly cookie`、一次性 challenge、浏览器内部状态、指纹采集、时间窗。
4. 只有六问都闭合，才允许把当前 builder 判成“可纯算迁移”。
5. 一旦涉及 `deviceId`、`blackbox`、`sensor_data`、指纹 cookie，先画“表面 -> 采集器 -> 聚合器 -> 风控消费点 -> 目标字段/分支”的归因链。
6. 先稳定时间和随机源，再比较中间值。
7. 先补状态，再补对象；大量环境类异常源于会话未闭合。
8. 每新增一项依赖，都回头验证它是否真的影响结果。

## 交付要求

- 说清当前问题属于哪一类运行时问题。
- 列出最小环境清单，而不是一份模糊“可能需要”的大列表。
- 说明每个补项的必要性、证据和可去除性。
- 说明当前链路是否允许纯算迁移，以及是哪一项依赖阻止了纯算迁移。
- 指纹 / 风控场景必须给出指纹归因矩阵，说明哪些表面真的被消费、哪些只是噪声。
- 给出稳定复现条件：时间、随机源、状态、输入样本。

## 工作目录落盘

默认把运行时诊断写入当前任务工作目录下的 `reverse-records/`。

- 必写：`reverse-records/总览.md`
- 必写：`reverse-records/运行时依赖.md`
- 需要验证时追加：`reverse-records/验证记录.md`

写入要求：

- 开始诊断前先更新 `总览.md`
- 一旦开始列依赖、状态、补丁、反调试点，立即写 `运行时依赖.md`
- 每新增一个补项，都在 `运行时依赖.md` 记录“为什么需要、去掉后怎样、是否可移除”
- 一旦开始做固定时间、固定随机源、正常态/风控态对照，补写 `验证记录.md`
- 指纹 / 风控场景在 `运行时依赖.md` 中同时维护“指纹归因矩阵 + 可裁剪表面列表”

## 按需读取参考

- 需要先判断自己面对的是哪类运行时问题：读 `references/runtime-diagnosis.md`
- 需要设计最小环境，而不是堆浏览器壳：读 `references/minimal-env-design.md`
- 需要处理反调试、栈校验、风控分支、正常态/风控态差异：读 `references/anti-debug-and-risk-branches.md`

不要把三个参考一次性读完，按当前卡点加载。

## 结束条件

- 已说明根因属于缺对象、缺状态、反调试、不确定源或风控分支中的哪类。
- 已列出最小环境清单。
- 固定输入后，中间值可稳定复现。
- 下一阶段不需要再重新判定环境问题。
