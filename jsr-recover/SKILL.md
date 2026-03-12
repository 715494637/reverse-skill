---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, AST transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protocol wrappers, or RS/瑞数-style r2mKa and cp/appcode shells.
---

# JSR Recover

## Overview

Use this skill when the real business logic is hidden behind a shell and downstream work cannot continue with surface-level beautification.

Recovery is complete only when the current layer’s role, bridge boundary, state carrier, and key operator are clear enough for downstream locate or replay work to continue.

## Self-Contained Rule

- Assume only this `SKILL.md` is guaranteed to be loaded.
- Do not block on opening `references/`.
- The record skeletons below are canonical even if no other file is opened.
- All execution records must be written in Chinese directly under `reverse-records/`.
- Do not create per-session subfolders; update the current task files in place.

## Minimum Input

Start from this intake block:

```text
Target:
Artifact:
Shell type (if known):
Recovery goal: semantic_explanation / key_operator_extraction / minimal_rebuild
Known anchor:
Validation sample:
Constraints:
```

Required:

- `Target`
- `Artifact`

Add these when relevant:

- `Shell type`
- `Recovery goal`
- `Known anchor`
- `Validation sample`
- `$_ts sample`
- `r2mKa anchor`
- `Appcode anchor`

## Recovery Levels

- `A`: extract only the key opcode, operator, or bridge fact needed right now
- `B`: recover dispatcher plus critical state carriers
- `C`: minimal decompilation or minimal interpreter when lower levels are insufficient

Do not climb to a higher level unless the lower level cannot support the current goal.

## Six-Layer View

1. `outer container`: `webpack`, IIFE, loader, bootstrap, lazy loading
2. `dispatcher layer`: dispatcher, state machine, bytecode loop, flattening switch
3. `state carrier`: registers, stacks, context objects, closure pools, tables, memory areas
4. `bridge layer`: `worker` contract, `wasm` imports/exports, protocol codec shell
5. `core operator`: hash, signature, encryption, fingerprint logic, serialization, challenge logic
6. `write-back layer`: where the result lands in request, header, `cookie`, frame, or storage

## Core Working Order

1. Identify which layer is hiding the business logic.
2. Select the lowest viable recovery level `A / B / C`.
3. For AST-heavy shells, fingerprint the obfuscation family first, then transform in evidence-preserving order.
4. For `worker`, `wasm`, `webpack/runtime`, and protocol shells, write the bridge-contract card before diving into internals.
5. For RS/瑞数-style shells, start from `r2mKa -> cp0/cp2/cp6 -> cp3 -> keys path -> $_ts.l__ appcode`, not bulk beautified source.
6. Treat `$_ts.l__` render or appcode wrappers as bridge artifacts, not page noise.
7. Confirm entry, input, and output of the current layer before widening scope.
8. Prove bridge contracts or dispatcher relations before extracting the core operator.
9. Before migrating an operator as pure computation, re-check upstream response, `HttpOnly`, challenge, browser state, fingerprint, and time-window dependencies.
10. After each recovered layer, record one equivalence checkpoint.
11. If the sink is still unclear, hand off to `$jsr-locate`.
12. If replay remains unstable because of runtime state, hand off to `$jsr-runtime`.

## Required Record Files

### 总览.md

```markdown
# 总览

- 当前阶段：恢复
- 当前状态：🟡 待确认（部分完成） / ✅ 已确认 / ⛔ 阻塞
- 目标：
- 目标工件：
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

### 恢复记录.md

```markdown
# 恢复记录

- 当前状态：🟡 待确认（部分完成）
- 目标：
- 目标工件：
- 遮蔽层类型：
- 恢复级别：A级 / B级 / C级
- 当前结论：
- 入口锚点：
- ➡️ 下一恢复点：

## 层级摘要
| 项目 | 内容 |
|---|---|
| 停止理由 |  |
| 语义边界 |  |
| 桥接契约 |  |
| 状态载体 |  |
| 关键数据结构 |  |
| 协议语义 |  |
| 已确认映射 |  |

## ✅ 关键函数卡片

### 函数1｜名称
| 项目 | 内容 |
|---|---|
| 输入 |  |
| 输出 |  |
| 副作用 |  |
| 依赖 |  |
| 证据 |  |

## 🟡 未恢复缺口
- 缺口1：
- 缺口2：
```

### 验证记录.md

```markdown
# 验证记录

## 验证项1｜名称
- 触发阶段：恢复 / 验证
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

- obscuring-layer class: `jsvmp / ast / worker / wasm / protocol shell / container wrapper`
- chosen recovery level `A / B / C` and why it stops there
- entry, bridge boundary, state carrier, and key operator of the current layer
- reusable RS anchors when handling `r2mKa`, `cp`, keys path, or `$_ts.l__`
- bridge-contract card for `worker`, `wasm`, `webpack`, or protocol shells
- key-function cards and equivalence records

## Failure Output

When recovery is incomplete, record:

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

Use `部分完成` when the obscuring layer is classified but the bridge, state carrier, key operator, or RS anchors are still insufficient.
Use `阻塞` when there is no stable entry, no boundary anchor, or no validation sample for the current level.

## Optional Extensions

If `references/` are available, use them only as extensions:

- `references/recover-strategy.md`
- `references/jsvmp-and-ast.md`
- `references/ast-deobfuscation-playbook.md`
- `references/wasm-worker-webpack.md`
- `references/protocol-and-long-connection.md`
- `references/rs-recovery-anchors.md`
- `references/equivalence-and-validation.md`
- `references/record-overview-and-validation.md`

## Completion Criteria

- the obscuring layer is classified
- the key bridge boundary or dispatcher entry is known
- key-function cards and equivalence checkpoints exist
- downstream work can continue directly without reopening the same shell
