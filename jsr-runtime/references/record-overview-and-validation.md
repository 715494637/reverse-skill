# Overview and Validation Records

## Purpose

`总览.md` records the stage snapshot for the current runtime session. `验证记录.md` records the proof that a patch item, state closure, or branch diagnosis is correct.

Keep the minimal runtime manifest itself in `运行时依赖.md`. Do not move the manifest into `总览.md`.

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
- status：`ready / partial / blocked`
- stage：`runtime`
- summary：
- evidence：
- impact：
- next_action：
```

## Validation Skeleton

```markdown
# 验证记录

## 验证项1
- 验证目标：
- 所属阶段：runtime

### 固定输入
- 输入样本：
- 时间源：
- 随机源：
- 会话状态：

### 补项开关
- 补项1：
- 补项2：

### 检查点
- 检查点1：
- 检查点2：
- 检查点3：

### 结果
- 是否通过：
- 分叉是否收敛：
- 证据：
```

## Routing Rules

- `总览.md` owns `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` and the current blocked or partial status block.
- `运行时依赖.md` owns the manifest, pure-compute precheck, removable items, and only the runtime facts needed for the chain.
- `验证记录.md` starts as soon as a patch toggle, state closure, or divergence point must be proved.

## Quality Check

- `总览.md` has all six required stage fields.
- `运行时依赖.md` remains focused on runtime facts only.
- `验证记录.md` records fixed inputs and patch toggles explicitly.
- Validation details do not live only in `运行时依赖.md`.
