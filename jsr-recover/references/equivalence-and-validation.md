# Equivalence Validation and Recovery Records

## Purpose

`恢复记录.md` and `验证记录.md` record only recovery structure and proof.

Do not write the following here:

- full request-chain expansion
- minimal runtime manifests
- general progress summaries

These files should prove what was recovered, where the gap remains, and why the result is trustworthy.

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

Session rules:

- One reverse session uses one `会话N/` folder only.
- If the user specifies `会话N`, use only that folder.
- If the user does not specify one, create the next unused `会话N/` folder.
- Never overwrite or edit another `会话N/` folder.

## Writing Rules

- `恢复记录.md` stores structure, layer, boundary, state carrier, and key-function cards.
- `验证记录.md` stores checkpoints, fixed inputs, equivalence results, and gap location.
- Keep checkpoints concrete; do not validate only the final output.
- Keep layer names explicit: `外层容器`, `调度层`, `状态载体`, `桥接层`, `核心算子`, `写回层`.
- Each key-function card must state `输入`, `输出`, `副作用`, `依赖`, and `证据`.

## Recovery Skeleton

```markdown
# 恢复记录

## 模块 / 壳层1
- 遮蔽层：
- 所在层：
- 位置锚点：
- 入口：
- 出口：
- 状态载体：
- 桥接边界：

### 关键函数1
- 所在层：
- 输入：
- 输出：
- 副作用：
- 依赖：
- 证据：

### 关键函数2
- 所在层：
- 输入：
- 输出：
- 副作用：
- 依赖：
- 证据：
```

## Validation Skeleton

```markdown
# 验证记录

## 验证项1
- 验证目标：
- 当前层：

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

## Quality Check

- Recovery structure and validation proof are separated.
- Layer names are explicit.
- Key-function cards are concrete.
- Checkpoints are concrete.
- Gap location is explicit.
- Non-recovery content is not mixed into these files.
