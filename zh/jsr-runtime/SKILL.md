---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, hidden browser state, anti-debugging, timing or randomness, fingerprint surfaces, or risk-control branching, and you need a minimal runtime manifest instead of broad simulation. Use for environment patching, anti-debugging, state dependencies, minimal environment design, and risk-branch analysis.
---

# JSR Runtime

## 概述

本 skill 用于识别当前执行链的最小运行时缺口，并产出可验证的对象、状态、固定源和风控分支清单。

运行时工作完成的标准，不是“本地勉强跑起来一次”，而是要说明浏览器为什么能走通、本地为什么分叉，以及最小缺口到底是什么。

## 核心原则

- 补环境是减法，不是堆对象。
- 缺对象和缺状态必须分开分类。
- 对比输出前先固定时间、随机数和种子。
- 只有纯算迁移前检查闭合后，才能把链路定义成纯算。
- 遇到 `deviceId`、`blackbox`、`sensor_data`、挑战、滑块、风控 cookie，要先做指纹归因矩阵，不要统称“缺浏览器环境”。
- 每个补项都要回答：去掉它会发生什么。
- 如果真实难点藏在 `jsvmp`、`worker`、`wasm`、协议壳里，应切 `$jsr-recover`。
- 如果最终写入点还没证明清楚，应退回 `$jsr-locate`。

## 强制参考加载

- 不要停留在 `SKILL.md`。开始诊断运行时缺口前，至少加载一个匹配参考。
- 任何运行时分类任务都要读 `references/runtime-diagnosis.md`。
- 只要要设计最小清单、确定补项范围、判断是否允许纯算迁移，就要读 `references/minimal-env-design.md`。
- 只要涉及反调试、栈校验、指纹诱发风控、正常态 / 风控态分叉，就要读 `references/anti-debug-and-risk-branches.md`。
- 问题从一种类别扩大到另一种类别时，先补读新匹配的参考，再继续推进。

## 默认顺序

1. 先拿浏览器正常态样本，再补本地运行时。
2. 先给失败分类：缺对象、缺状态、反调试、不稳定源、风控分支。
3. 先做纯算迁移前检查：上游响应、`HttpOnly cookie`、一次性 challenge、浏览器内部状态、指纹采集、时间窗 / 序号。
4. 只有检查项全部闭合，才允许判定为“可纯算迁移”。
5. 对指纹敏感目标，先画 `surface -> collector -> aggregator -> consumer -> target field / risk branch`。
6. 先固定时间和随机源，再比较中间值。
7. 先补状态，再补对象；很多环境问题本质上是会话未闭合。
8. 每新增一项依赖，都要验证它是否真的影响结果。

## 交付要求

- 说明当前问题属于哪类运行时问题。
- 给出最小运行时清单，而不是模糊大列表。
- 说明每个补项的必要性、证据和可移除性。
- 明确当前是否允许纯算迁移；若不允许，要指出阻塞项。
- 指纹 / 风控场景给出指纹归因矩阵。
- 给出稳定复现条件：时间、随机源、状态、输入样本。

## 工作目录落盘

所有逆向记录都写入当前任务工作目录下的 `reverse-records/`，并使用中文。

会话规则：

- 一个逆向会话只使用一个 `会话N/` 目录。
- 用户指定了 `会话N`，就只读写那个目录。
- 用户未指定时，创建下一个未占用的 `会话N/` 目录，并且只写入那个目录。
- 不得覆盖、合并、重命名、清理其他 `会话N/` 目录。

当前会话中与运行时分析直接相关的文件：

- `reverse-records/会话N/总览.md`
- `reverse-records/会话N/运行时依赖.md`
- `reverse-records/会话N/验证记录.md`（需要验证时）

更新规则：

- 第一个运行时诊断动作前先更新当前会话 `总览.md`。
- 一旦开始讨论依赖、状态缺口、反调试点、补丁项、指纹归因，就创建或更新当前会话 `运行时依赖.md`。
- 每次重分类、依赖变化、补项决策、反调试发现、正常态 / 风控态分叉更新、卡点变化、下一步变化、拿到验证结果后，都要立即回写记录。
- 每次回写都要重写 `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证`。
- 不得在当前会话 `总览.md` 或 `运行时依赖.md` 已过期的情况下持续长时间分析。

## 结束条件

- 已知根因属于哪类运行时问题。
- 已知最小运行时清单。
- 固定输入与固定源后，中间值可稳定复现。
- 下一阶段无需重新做运行时诊断。
