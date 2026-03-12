---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, missing state, anti-debugging, unstable sources, risk-branch conditions, page-lifecycle-produced state, or RS/瑞数-style hasDebug and basearr differences.
---

# JSR Runtime

## Overview

Use this skill when browser execution works but local execution diverges and the real problem is a runtime gap, not a missing sink or hidden algorithm.

Runtime work is complete only when you can explain why the browser path works, why the local path diverges, and which smallest set of dependencies closes that gap.

## Self-Contained Rule

- Assume only this `SKILL.md` is guaranteed to be loaded.
- Do not block on opening `references/`.
- The record skeletons below are canonical even if no other file is opened.
- All execution records must be written in Chinese directly under `reverse-records/`.
- Do not create per-session subfolders; update the current task files in place.

## Minimum Input

Start from this intake block:

```text
Target chain or function:
Browser behavior:
Local behavior:
Current blocker or symptom:
Known evidence:
Constraints:
```

Required:

- `Target chain or function`
- `Browser behavior`
- `Local behavior`
- `Current blocker or symptom`
- `Known evidence`
- `Constraints`

Add these when relevant:

- `Suspected consumer`
- `Suspected branch point`
- `Candidate runtime route`
- `Known state-close signal`
- `Observed RS indicators`
- `Observed cookie key suffix`
- `Second-hop result`

## Runtime Classification

Classify the blocker first:

- missing object
- missing state
- anti-debugging
- unstable source
- risk branch

Do not merge these classes into one vague “browser environment” answer.

## Core Working Order

1. Capture one browser normal-state sample before patching local runtime.
2. Classify the first divergence into object, state, anti-debug, unstable source, or risk branch.
3. If RS/瑞数 indicators exist, classify whether the blocker belongs to `hasDebug`, `basearr` closure, fixed runtime facts, or second-hop state consumption.
4. Run a fit check before selecting `sdenv`, remote jsdom, or any route that depends on lifecycle-produced state.
5. When anti-debugging or lifecycle traps exist, choose the narrowest matching rule first; do not widen patch scope early.
6. If state is produced through lifecycle or navigation, select exactly one execution mode: offline local replay, remote passive, or remote active.
7. Record injection point, state-close signal, and produced state carrier before broad patching.
8. Run the pure-compute precheck: upstream response fields, `HttpOnly`, one-time challenge, browser-internal state, fingerprint collection, and time-window or sequence dependencies.
9. Only when all precheck items are closed may the chain be treated as pure-compute migratable.
10. For fingerprint-sensitive targets, map `surface -> collector -> aggregator -> consumer -> target field or risk branch`.
11. Stabilize time, randomness, and seeds before comparing intermediate values.
12. For RS tasks, do not claim closure before `basearr`, `encryptLens`, `lastWord`, `flag`, and fixed runtime facts are tested.
13. Patch state before patching objects whenever possible.
14. After every new dependency, verify whether it truly changes the result.
15. When a route produces state for a second hop, validate the second hop before accepting the route.
16. If semantics are hidden by `jsvmp`, `worker`, `wasm`, or protocol shell, hand off to `$jsr-recover`.
17. If the final sink is not proven, hand back to `$jsr-locate`.

## Required Record Files

### 总览.md

```markdown
# 总览

- 当前阶段：运行时
- 当前状态：🟡 待确认（部分完成） / ✅ 已确认 / ⛔ 阻塞
- 目标链路 / 函数：
- 当前结论：
- 关键证据：
- ➡️ 下一步：

## ✅ 已确认
- ...

## 🟡 待确认
- ...

## ⛔ 风险 / 阻塞
- ...

## 🔍 待验证
- ...
```

### 运行态清单.md

```markdown
# 运行态清单

- 当前状态：🟡 待确认（部分完成）
- 目标链路 / 函数：
- 浏览器现象：
- 本地现象：
- 适配检查：
- 执行模式：本地回放 / 远程被动 / 远程主动 / 不适用
- 浏览器画像：
- 注入时机：
- 状态闭合信号：
- 状态载体：
- ➡️ 下一步：

## 执行路线摘要
| 项目 | 内容 |
|---|---|
| 适配检查 |  |
| 执行模式 |  |
| 浏览器画像 |  |
| 注入时机 |  |
| 状态闭合信号 |  |
| 状态载体 |  |

## ✅ 必需对象
| 对象 | 必要性 | 证据 | 去掉后现象 |
|---|---|---|---|
| `对象1` |  |  |  |

## ✅ 必需状态
| 状态 | 状态标签 | 来源 | 证据 | 去掉后现象 |
|---|---|---|---|---|
| `状态1` | `["会话相关"]` |  |  |  |

## 固定源
| 项目 | 内容 |
|---|---|
| 时间源 |  |
| 随机源 |  |
| 种子 |  |

## 🔍 纯算迁移前检查
| 检查项 | 结论 | 证据 |
|---|---|---|
| 上游响应 |  |  |
| HttpOnly |  |  |
| 一次性 challenge / nonce / ticket |  |  |
| 浏览器内部状态 |  |  |
| 指纹采集 |  |  |
| 时间窗 / 序号 / 续期 |  |  |

## 🟡 反调试 / 指纹 / 风控（按需）
- 只写当前链路实际命中的点

## 🔍 可移除项与验证联动
| 项目 | 去掉后现象 | 结论 | 证据 |
|---|---|---|---|
| 项1 |  |  |  |

- 验证记录引用：
- 固定输入要求：
- 二跳验证：
```

### 验证记录.md

```markdown
# 验证记录

## 验证项1｜名称
- 触发阶段：运行时 / 验证
- 归属阶段：验证
- 当前结果：🔍 待验证 / ✅ 一致 / 🟡 部分一致 / ⛔ 不一致
- 验证目标：

### 固定输入
| 项目 | 内容 |
|---|---|
| 输入样本 |  |
| 时间源 |  |
| 随机源 |  |
| 会话状态 |  |

### 路线证明（按需）
| 项目 | 内容 |
|---|---|
| 适配检查 |  |
| 执行模式 |  |
| 注入时机 |  |
| 状态闭合信号 |  |
| 状态载体 |  |
| 二跳验证 |  |

### 检查点
- `检查点1`
- `检查点2`
- `检查点3`

### 结果
| 项目 | 内容 |
|---|---|
| 浏览器侧输出 |  |
| 本地侧输出 |  |
| 失败样本 |  |
| 差异定位 |  |
| 验证结论 |  |
| ➡️ 后续动作 |  |
```

## Deliverables

- runtime-problem class
- minimal runtime manifest, not a broad maybe-list
- necessity, evidence, and removability of each dependency
- fit-check result and chosen execution mode when route selection matters
- `hasDebug` decision, `basearr` closure state, fixed runtime facts, and second-hop result for RS tasks
- selected anti-debug rule and hit surface when used
- whether pure-compute migration is allowed and what blocks it if not
- stable reproduction conditions for time, randomness, state, and input

## Failure Output

When runtime work is incomplete, record:

```yaml
状态: 就绪 | 部分完成 | 阻塞
阶段: 运行时
代码:
摘要:
证据:
  - ...
影响:
下一动作:
```

Use `部分完成` when the runtime class is known but blocking dependencies remain open.
Use `阻塞` when there is no browser normal-state sample, no first divergence point, or no defensible runtime classification.
Use `部分完成` for RS tasks when `hasDebug`, `basearr`, fixed runtime facts, or second-hop validation remains unresolved.

## Optional Extensions

If `references/` are available, use them only as extensions:

- `references/runtime-diagnosis.md`
- `references/minimal-env-design.md`
- `references/anti-debug-and-risk-branches.md`
- `references/sdenv-fit-check-and-routing.md`
- `references/rs-runtime-and-basearr-fit.md`
- `references/record-overview-and-validation.md`

## Completion Criteria

- the root-cause class is known
- the minimal runtime manifest is known
- the chosen route is justified
- intermediate values become stable under fixed input and fixed sources
- downstream work does not need to re-diagnose the same runtime gap
