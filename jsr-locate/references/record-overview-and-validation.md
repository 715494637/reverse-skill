# Overview and Validation Records

## Purpose

`总览.md` records the stage snapshot for the current locate session.

This reference is the canonical schema for `总览.md` and `验证记录.md` in locate work.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
├─ 会话1/
│  ├─ 总览.md
│  ├─ 请求链路.md
│  ├─ 运行态清单.md
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
- 最终写入点：
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

## 当前状态块
- 状态：`就绪 / 部分完成 / 阻塞`
- 阶段：`定位`
- 代码：
- 摘要：
- 证据：
- 影响：
- 下一动作：

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

## 验证项1
- 触发阶段：定位 / 验证
- 归属阶段：验证
- 验证目标：

### 固定输入
- 输入样本：
- 会话状态：
- 页面动作：

### 对照点
- 检查点1：
- 检查点2：
- 检查点3：

### 结果
- 浏览器侧输出：
- 本地侧输出：
- 失败样本：
- 差异定位：
- 验证结论：
```

## Routing Rules

- `总览.md` owns `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` and the current normalized status block.
- Normal/risk comparison tables and fork maps belong in `总览.md`, never in `请求链路.md`.
- `请求链路.md` owns request blocks, status arrays, `来源/去向`, evidence, upstream expansion, and optional connection metadata.
- `验证记录.md` starts as soon as a sink candidate, state-chain closure, or fork hypothesis needs proof.
- `验证记录.md` may be started during `定位`, but its owning stage and completion gate remain `验证`.
- validation targets are limited to sink proof, state-chain closure, or fork proof.

## Quality Check

- `总览.md` has all six required stage fields.
- `总览.md` keeps a filled current status block whenever the stage is `部分完成` or `阻塞`.
- fork maps are stored only when risk branching is relevant.
- `验证记录.md` uses concrete checkpoints, not only a final conclusion.
- request-structure content stays in `请求链路.md`.
