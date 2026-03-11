---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, missing state, anti-debugging, unstable sources, or risk-branch conditions.
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
- 创建或刷新 `总览.md`、`验证记录.md` 前，要读 `references/record-overview-and-validation.md`。
- 问题从一种类别扩大到另一种类别时，先补读新匹配的参考，再继续推进。

## 最小输入

开始前至少收齐下面这块输入：

```text
Target chain or function:
Browser behavior:
Local behavior:
Current blocker or symptom:
Known evidence:
Constraints:
```

必填：

- `Target chain or function`
- `Browser behavior`
- `Local behavior`
- `Current blocker or symptom`
- `Known evidence`（没有就写 `none`）
- `Constraints`（没有就写 `none`）

如果已经怀疑是指纹、挑战或风控分支，还要补：

- `Suspected consumer`
- `Suspected branch point`

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

## 失败输出

如果运行时工作停住、只能部分收敛，或还不能闭合缺口，就返回并落盘下面这个平铺状态块：

```yaml
status: ready | partial | blocked
stage: runtime
summary:
evidence:
  - ...
impact:
next_action:
```

- `partial`：已经知道问题类别，但还有阻塞依赖没闭合。
- `blocked`：还没有浏览器正常态样本、还没找到首个分叉点，或问题类别还无法自洽。
- 在对象缺口、状态缺口和不稳定源没拆清前，不得宣称最小运行时清单已经成立。

## 工作目录落盘

所有逆向记录都写入当前任务工作目录下的 `reverse-records/`，并使用中文。

- 一个逆向会话只使用一个 `会话N/` 目录。
- 用户指定了 `会话N`，就只读写那个目录。
- 用户未指定时，创建下一个未占用的 `会话N/` 目录，并且只写入那个目录。
- 不得覆盖、合并、重命名、清理其他 `会话N/` 目录。
- `references/record-overview-and-validation.md` 负责定义 `总览.md` 和 `验证记录.md` 的精确骨架。
- `总览.md` 记录阶段快照、问题分类、卡点、下一步、风险，以及当前 blocked / partial 状态块。
- `运行时依赖.md` 只记录最小清单、纯算迁移前检查、可移除项和当前链路需要的 runtime 事实。
- `验证记录.md` 在补项开关、状态闭合或分叉点需要证明时开始记录。
- 第一个诊断动作前刷新 `总览.md`，讨论依赖或补项时刷新 `运行时依赖.md`，进入验证时刷新 `验证记录.md`。

## 结束条件

- 已知根因属于哪类运行时问题。
- 已知最小运行时清单。
- 固定输入与固定源后，中间值可稳定复现。
- 下一阶段无需重新做运行时诊断。
