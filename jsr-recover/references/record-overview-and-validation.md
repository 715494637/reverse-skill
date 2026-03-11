# Overview and Validation Records

## Purpose

`总览.md` records the stage snapshot for the current recovery session. `验证记录.md` records the proof that the chosen recovery level and extracted structure are trustworthy.

Keep structure cards in `恢复记录.md`. Do not move bridge, layer, or key-function detail into `总览.md`.

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
- status：`ready / partial / blocked`
- stage：`recover`
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
- 所属阶段：recover

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
- 等价性：完全等价 / 部分等价 / 不等价
- 缺口位置：
- 证据：
```

## Routing Rules

- `总览.md` owns `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` and the current blocked or partial status block.
- `恢复记录.md` owns layer cards, bridge cards, state carriers, and key-function cards.
- `验证记录.md` starts as soon as equivalence work or fixed-input checkpointing begins.

## Quality Check

- `总览.md` has all six required stage fields.
- `恢复记录.md` stays structural.
- `验证记录.md` uses concrete checkpoints and names the remaining gap explicitly.
