# Equivalence Validation and Recovery Records

## Purpose

`恢复记录.md` and `验证记录.md` record only recovery structure and proof.

This reference is the canonical schema for `恢复记录.md`, and it also defines recovery-specific equivalence rules and checkpoint requirements.

Do not write the following here:

- full request-chain expansion
- minimal runtime manifests
- general progress summaries

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

## Writing Rules

- `恢复记录.md` stores layer cards, boundary cards, recovery level, stop reason, state carriers, and key-function cards.
- `验证记录.md` stores checkpoints, fixed inputs, equivalence results, and gap location.
- keep checkpoints concrete; do not validate only the final output
- keep layer names explicit: `外层容器`, `调度层`, `状态载体`, `桥接层`, `核心算子`, `写回层`
- each key-function card must state `输入 / 输出 / 副作用 / 依赖 / 证据`

## Recovery Skeleton

```markdown
# 恢复记录

- 样本编号：
- 证据编号：
- 遮蔽层类型：
- 恢复级别：A级 / B级 / C级
- 停止理由：
- 入口锚点：
- 语义边界：
- 桥接契约：
- 状态载体：
- 关键数据结构：
- 关键函数卡片：
- 协议语义：
- 已确认映射：
- 未恢复缺口：
- 下一恢复点：
```

## Equivalence Requirements

Every equivalence check must be able to answer:

- what input sample is fixed
- which checkpoint is being compared
- which gap remains if the result is only partially equivalent
- which evidence proves the checkpoint, not just the final output

Typical checkpoints include:

- bridge contract input and output
- recovered operator input and output
- dispatcher or state-carrier transitions
- extracted result before write-back

## Quality Check

- no recovery artifact uses the old runtime filename `运行时依赖.md`
- recovery structure and validation proof are separated
- checkpoints are concrete enough to explain where equivalence fails
- non-recovery content is not mixed into these files
