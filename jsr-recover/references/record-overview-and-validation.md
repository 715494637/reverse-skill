# Overview and Validation Records

## Purpose

`总览.md` records the stage snapshot for the current recovery session.

This reference is the canonical schema for `总览.md` and `验证记录.md` in recovery work.

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
- 目标：
- 目标工件：
- 当前壳层：
- 恢复目标：

## 当前阶段
- 层级判断 / 桥接恢复 / 关键算子提炼 / 等价验证

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
- 阶段：`恢复`
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
- 触发阶段：恢复 / 验证
- 归属阶段：验证
- 验证目标：

### 固定输入
- 输入样本：
- 时间源：
- 随机源：
- 会话状态：

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
- `恢复记录.md` owns layer cards, bridge cards, state carriers, recovery level, stop reason, and key-function cards.
- `验证记录.md` starts as soon as equivalence work or fixed-input checkpointing begins.
- `验证记录.md` may be started during `恢复`, but its owning stage and completion gate remain `验证`.
- validation targets are limited to recovery level justification, bridge proof, and equivalence checkpoints.

## Quality Check

- `总览.md` has all six required stage fields.
- `总览.md` keeps a filled current status block whenever the stage is `部分完成` or `阻塞`.
- `恢复记录.md` stays structural and records why recovery can stop at the chosen level.
- `验证记录.md` uses concrete checkpoints and names the remaining gap explicitly.
