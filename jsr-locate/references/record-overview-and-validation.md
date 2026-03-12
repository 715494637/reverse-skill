# Overview and Validation Records

## Purpose

`总览.md` and `验证记录.md` should stay compact, readable, and stage-owned.

This reference is the canonical schema for locate-stage `总览.md` and `验证记录.md`.

## Visual Style

Use pure Markdown with light status markers:

- `✅ 已确认`
- `🟡 待确认`
- `⛔ 阻塞`
- `🔍 待验证`
- `➡️ 下一步`

Keep the normalized stage status visible in parentheses, for example `🟡 待确认（部分完成）`.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
├─ 总览.md
├─ 请求链路.md
├─ 运行态清单.md
├─ 恢复记录.md
└─ 验证记录.md
```

## Overview Skeleton

```markdown
# 总览

- 当前阶段：定位
- 当前状态：🟡 待确认（部分完成）
- 目标请求：
- 目标字段：
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

## 正常态 / 风控态对比（按需）
| 项目 | 正常态 | 风控态 | 是否同链 |
|---|---|---|---|
| 触发动作 |  |  |  |
| 上游请求 |  |  |  |
| 写点 |  |  |  |
| 组装链 |  |  |  |
| Cookie / 状态依赖 |  |  |  |

## 正常态 / 风控态分叉图（按需）
- 分叉起点：
- 正常态路径：
- 风控态路径：
- 缺失状态：
```

## Validation Skeleton

```markdown
# 验证记录

## 验证项1｜名称
- 触发阶段：定位 / 验证
- 归属阶段：验证
- 当前结果：🔍 待验证 / ✅ 一致 / 🟡 部分一致 / ⛔ 不一致
- 验证目标：

### 固定输入
| 项目 | 内容 |
|---|---|
| 输入样本 |  |
| 会话状态 |  |
| 页面动作 |  |

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

## Routing Rules

- `总览.md` owns current stage, confirmed facts, pending items, blockers, validation backlog, and the immediate next action
- normal/risk comparison tables and fork maps belong in `总览.md`, never in `请求链路.md`
- `请求链路.md` owns request blocks, status arrays, `来源/去向`, evidence, upstream expansion, and optional connection metadata
- `验证记录.md` starts as soon as a sink candidate, state-chain closure, or fork hypothesis needs proof
- `验证记录.md` may start during `定位`, but its owning stage and completion gate remain `验证`

## Quality Check

- `总览.md` starts with the short summary block
- `总览.md` uses `✅ / 🟡 / ⛔ / 🔍 / ➡️` consistently
- fork map appears only when risk branching matters
- `验证记录.md` uses concrete checkpoints, not only a final conclusion
- request-structure content stays in `请求链路.md`
