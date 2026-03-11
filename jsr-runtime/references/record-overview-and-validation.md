# Overview and Validation Records

## Purpose

`总览.md` records the stage snapshot for the current runtime session.

This reference is the canonical schema for `总览.md` and `验证记录.md` in runtime work.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
├── 会话1/
│   ├── 总览.md
│   ├── 请求链路.md
│   ├── 运行态清单.md
│   ├── 恢复记录.md
│   └── 验证记录.md
├── 会话2/
│   └── ...
└── ...
```

## Overview Skeleton

```markdown
# 总览

## 目标定义
- 目标链路 / 函数：
- 浏览器现象：
- 本地现象：
- 当前样本状态：

## 当前阶段
- 运行时分类 / 纯算迁移前检查 / 验证

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
- 阶段：`运行时`
- 代码：
- 摘要：
- 证据：
- 影响：
- 下一动作：
```

## Validation Skeleton

```markdown
# 验证记录

## 验证项1
- 触发阶段：运行时 / 验证
- 归属阶段：验证
- 验证目标：

### 固定输入
- 输入样本：
- 时间源：
- 随机源：
- 会话状态：

### 路线证明（按需）
- 适配检查：
- 执行模式：
- 注入时机：
- 状态闭合信号：
- 状态载体：
- 二跳验证：

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

- `总览.md` owns `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` and the current blocked or partial status block.
- `运行态清单.md` owns the manifest, pure-compute precheck, removable items, and only the runtime facts needed for the chain.
- `验证记录.md` starts as soon as a patch toggle, state closure, route choice, or divergence point must be proved.
- `验证记录.md` may be started during `运行时`, but its owning stage and completion gate remain `验证`.
- when a route depends on lifecycle or navigation-produced state, `路线证明` must be filled.

## Quality Check

- `总览.md` has all six required stage fields.
- `总览.md` keeps a filled current status block whenever the stage is `部分完成` or `阻塞`.
- `运行态清单.md` remains focused on runtime facts only.
- `验证记录.md` records fixed inputs and patch toggles explicitly.
- `验证记录.md` records route proof explicitly when `sdenv`-style routing is used.
- validation details do not live only in `运行态清单.md`.
