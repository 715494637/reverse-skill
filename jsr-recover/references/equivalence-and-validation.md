# Equivalence Validation and Recovery Records

## Purpose

`恢复记录.md` and `验证记录.md` record recovery structure and proof only.

The format should stay compact, structural, and proof-oriented.

Do not mix in full request-chain expansion, runtime manifests, or broad stage summaries.

## Visual Style

Use pure Markdown with light status markers:

- `✅ 已确认`
- `🟡 待确认`
- `⛔ 阻塞`
- `🔍 待验证`
- `➡️ 下一步`

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

## Writing Rules

- `恢复记录.md` owns layer cards, boundary cards, recovery level, stop reason, state carriers, and key-function cards
- `验证记录.md` owns checkpoints, fixed inputs, equivalence results, and remaining gaps
- keep checkpoints concrete; do not validate only the final output
- keep layer names explicit: `外层容器`, `调度层`, `状态载体`, `桥接层`, `核心算子`, `写回层`
- every key-function card must state `输入 / 输出 / 副作用 / 依赖 / 证据`

## Recovery Skeleton

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

## Equivalence Requirements

Every equivalence check must answer:

- which input sample is fixed
- which checkpoint is being compared
- which gap remains if the result is only partially equivalent
- which evidence proves the checkpoint, not just the final output

Typical checkpoints include:

- bridge contract input and output
- recovered operator input and output
- dispatcher or state-carrier transitions
- extracted result before write-back

## Quality Check

- recovery artifacts do not use the old runtime filename `运行时依赖.md`
- recovery structure and validation proof remain separate
- checkpoints are concrete enough to show where equivalence fails
- non-recovery content is not mixed into these files
