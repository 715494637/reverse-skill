# Overview and Validation Records

## Purpose

`总览.md` records the stage snapshot for the current locate session. `验证记录.md` records the proof that a sink, upstream dependency, or fork hypothesis is correct.

Keep request structure, field provenance, and upstream expansion in `请求链路.md`. Do not move them into `总览.md` or `验证记录.md`.

## Record Path

Write records under the current task working directory:

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

## Overview Skeleton

```markdown
# 总览

## 目标定义
- 目标请求：
- 目标字段：
- 最终 sink：
- 触发动作：
- 当前状态：

## 当前阶段
- 样本采集 / 写边界定位 / 上游展开 / 风控分叉核对

## 已确认
- ...

## 当前卡点
- ...

## 下一步
- ...

## 风险
- ...

## 待验证
- ...

## 正常态 / 风控态对比（按需）
| Item | 正常态 | 风控态 | Same chain |
|---|---|---|---|
| 触发动作 |  |  |  |
| 上游请求 |  |  |  |
| 写点 |  |  |  |
| builder / writer |  |  |  |
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

## 验证项1
- 验证目标：
- 所属阶段：locate

### 固定输入
- 输入样本：
- 会话状态：
- 页面动作：

### 检查点
- 检查点1：
- 检查点2：
- 检查点3：

### 结果
- 是否通过：
- 仍有缺口：
- 证据：
```

## Routing Rules

- `总览.md` owns `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证`.
- Normal/risk comparison tables and fork maps belong in `总览.md`, never in `请求链路.md`.
- `请求链路.md` owns request blocks, status arrays, `来源/去向`, evidence, upstream expansion, and optional connection metadata.
- `验证记录.md` starts as soon as a sink candidate, state-chain closure, or fork hypothesis needs proof.

## Quality Check

- `总览.md` has all six required stage fields.
- Fork maps are stored only when risk branching is relevant.
- `验证记录.md` uses concrete checkpoints, not only a final conclusion.
- Request-structure content stays in `请求链路.md`.
