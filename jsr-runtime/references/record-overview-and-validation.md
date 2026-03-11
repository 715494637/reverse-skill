# Overview and Validation Records

## Purpose

`总览.md` and `验证记录.md` should remain compact and runtime-owned.

This reference is the canonical schema for runtime-stage `总览.md` and `验证记录.md`.

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

- 当前阶段：运行时
- 当前状态：🟡 待确认（部分完成）
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

## Validation Skeleton

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

## Routing Rules

- `总览.md` owns current stage, confirmed facts, pending items, blockers, validation backlog, and the immediate next action
- `运行态清单.md` owns the manifest, pure-compute precheck, removable items, and only the runtime facts needed for the current chain
- `验证记录.md` starts as soon as a patch toggle, state closure, route choice, or divergence point needs proof
- `验证记录.md` may start during `运行时`, but its owning stage and completion gate remain `验证`
- when a route depends on lifecycle or navigation-produced state, `路线证明` must be filled

## Quality Check

- `总览.md` starts with the short summary block
- `总览.md` uses `✅ / 🟡 / ⛔ / 🔍 / ➡️` consistently
- `运行态清单.md` stays focused on runtime facts only
- `验证记录.md` records fixed inputs and route proof explicitly
- validation details do not live only in `运行态清单.md`
