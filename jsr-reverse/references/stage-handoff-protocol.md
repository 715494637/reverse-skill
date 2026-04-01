# Stage Handoff Protocol

## Purpose

Define the mandatory context-transfer format when switching between stages. Prevents information loss in long conversations by forcing explicit carry-forward of proven facts and open questions.

This protocol is not a stage itself. It fires at every stage boundary crossing.

## When to Fire

- Every time the `Current stage` in the output contract changes
- When a stage re-enters itself after a material evidence change (e.g., locate discovers a new upstream hop that invalidates prior conclusions)

## Handoff Card Format

Output this block at the moment of stage switch, before the new stage's output contract:

```text
--- Stage Handoff ---
From: {previous stage}
To: {next stage}

Proven facts carried forward:
  - 目标请求: {method + path + key fields}
  - 写入边界: {file/location + function/expression, or "未证实"}
  - 上游依赖链: {proven hops, or "未展开"}
  - 样本状态: {正常态 / 风控态 / 未区分}
  - 已恢复契约: {recovered contract summary, or "N/A"}
  - 运行时分歧点: {first divergence, or "N/A"}

Open questions for next stage:
  - {question 1}
  - {question 2}
  - ...

Invalidated assumptions:
  - {any prior conclusion now disproven, or "无"}
```

## Field Rules

### Proven facts

Only include facts that have real evidence behind them. Each fact must trace back to a concrete observation (packet capture, breakpoint hit, response body, call stack, etc.), not to a guess or name similarity.

Mandatory fields:

| Field | Required from | Notes |
|---|---|---|
| 目标请求 | locate onward | Method, path, and the key dynamic fields |
| 写入边界 | locate exit | The proven sink or write point; "未证实" if locate is not yet complete |
| 上游依赖链 | locate onward | Each proven hop; "未展开" if still partial |
| 样本状态 | evidence gate onward | Must distinguish normal vs. risk vs. unresolved |
| 已恢复契约 | recover exit | Contract type + scope; "N/A" before recover |
| 运行时分歧点 | runtime exit | First divergence class + location; "N/A" before runtime |

### Open questions

List only questions that the **next stage** must answer. Do not carry forward questions that belong to a stage already completed.

### Invalidated assumptions

If the stage switch happens because prior conclusions were disproven (e.g., a "proven" sink turned out to be a decoy), list what was invalidated. This prevents the next stage from building on stale facts.

## Carry-Forward Discipline

- Facts proven in earlier stages are **not re-proven** in later stages unless explicitly invalidated.
- If a later stage discovers evidence that contradicts a carried-forward fact, it must:
  1. Record the contradiction in `Invalidated assumptions`
  2. Decide whether to regress to an earlier stage or continue with the corrected fact
  3. Update `reverse-records/请求链路.md` immediately

## Compact Mode

For simple stage transitions where the context is small (e.g., L1/L2 tasks), the handoff card may be shortened to:

```text
--- Stage Handoff ---
From: locate → To: validation
Proven: POST /api/sign, field x-sign = concat(uid, ts, nonce), no upstream dependency
Open: equivalence proof pending
```

The full format is mandatory for L3/L4 tasks or whenever more than 3 proven facts need to be carried.

## Integration with Artifact

The handoff card is **transient output** — it appears in the conversation at the moment of switch. The **persistent record** remains `reverse-records/请求链路.md`. After outputting the handoff card, ensure the artifact reflects the same proven facts.
