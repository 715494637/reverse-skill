# Request-Chain Recording Spec Refactor Design

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `jsr-reverse/references/request-chain-recording.md` into a handoff-first, traceable, low-noise spec that keeps only information useful to reverse work and handoff continuity.

**Architecture:** Single-file, single-source record at `reverse-records/请求链路.md`. The spec is reorganized into a small number of high-value blocks: purpose, record path, header skeleton, request block skeleton, handoff block, plus an optional connection section. Low-value or redundant guidance is removed. No new phases or multi-file record sets are introduced.

**Tech Stack:** Markdown documentation

---

## 1. Scope & Triggers

**Scope**
- Only refactor: `jsr-reverse/references/request-chain-recording.md`
- This round keeps the existing Chinese template language and fields in the English doc.

**Out of Scope**
- Any other skills or references
- Chinese version (`zh/jsr-shared/references/request-chain-recording.md`)
- New files or multi-file record sets

**Success Criteria**
- Clear, short structure centered on handoff and traceability
- Single record path enforced: `reverse-records/请求链路.md`
- Request field records (header/query/body/cookie/response tables) always include status arrays + source/target + evidence (request metadata table is exempt)

---

## 2. Proposed Structure (Top-Level)

1) **Purpose** — states handoff and traceability goals; forbids stage summaries or conclusions. Summary is limited to request identity and closure status and lives only in the Header Skeleton.
2) **Record Path** — only `reverse-records/请求链路.md`; no multi-file lists.
3) **Header Skeleton** — minimal summary block for handoff entry (target request, object, sample state, open closures, ids).
4) **Request Block Skeleton** — per-request section with compact tables and evidence requirements; this section contains the status array vocabulary + example.
5) **Handoff Block** — mandatory end block for continuation (current phase + next step).
6) **Connection Info (Optional)** — only for protocol flows (WebSocket/protobuf/SSE/heartbeat/renewal).

### Required Block Fields (verbatim)

**Header Skeleton (summary lives here only)**
```markdown
# 请求链路

- 目标请求：
- 目标对象：
- 当前样本状态：🟡 待确认（正常态 / 风控态 / 未知）
- 关键未闭环：
- 样本编号：
- 证据编号：
```

**Closure status definition**
- “Closure status” is the combination of `当前样本状态` + `关键未闭环` only. Do not add phase conclusions elsewhere.

**Request Block Skeleton (table headers are fixed)**
```markdown
## 请求A｜目标请求

| 项目 | 内容 |
|---|---|
| 接口 |  |
| 触发方式 |  |
| 上游请求 | `请求B`、`请求C` / 无 |
| 响应结果 |  |

### 请求头
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### Query 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### Body 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### Cookie
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### 响应输出
| 字段 | 状态 | 去向 | 证据 |
|---|---|---|---|
```

**Handoff Block (mandatory end block)**
```markdown
## 交接块

- 当前阶段：
- 最后更新时间：
- 目标请求与关键字段：
- 已确认链路：
- 未闭环点：
- 下一步建议：
```

---

## 3. Keep / Remove Rules

**Keep (High Value)**
- Status array vocabulary and example (explicit list below)
- Source/target + evidence requirements
- One request per section + upstream expansion order
- Mandatory handoff block

**Status Vocabulary (verbatim)**
- `未知`
- `已知`
- `固定`
- `动态`
- `明文`
- `加密`
- `本地计算`
- `响应获取`
- `环境产生`
- `会话相关`
- `风控相关`
- `时序相关`
- `一次性`
- `可复用`
- `HttpOnly`

Example:
```json
["动态", "响应获取", "HttpOnly", "会话相关"]
```

**Remove / Merge (Low Value or Redundant)**
- Visual style section
- Multi-file record path list (总览/运行态清单/恢复记录/验证记录)
- Long quality checklist (merge to a short evidence completeness reminder)

**Optional Only**
- Connection info block for protocol flows

---

## 4. Field & Formatting Rules

- Status arrays remain unchanged (no new tokens).
- Input fields use `状态 / 来源 / 证据`.
- Response fields use `状态 / 去向 / 证据`.
- No empty structures: if a field table (header/query/body/cookie/response) has no fields, insert a single row `| - 无 | - | - | - |` (or `| - 无 | - | - | - |` for response tables) to keep table structure. Use `无` in the request metadata row for upstream when there is no upstream request.
- Evidence must be verifiable (packet capture / response body / pre-send comparison); do not record guesses as evidence.

---

## 5. Example Policy & Acceptance

**Example Policy**
- Keep one minimal example only.
- Example must include: header summary, one target request block, and the handoff block.
- Example should attempt to include header/query/body/cookie/response tables; if a category is not present, use `- 无` for that table.
- Example must show target request first, real source/evidence, and a closed upstream chain (every upstream reference in the target request has a concrete source in an earlier request or is marked `无`).

**Acceptance Criteria**
- Top-level structure matches the proposed six blocks.
- Single record path is enforced.
- Every request field table entry includes status + source/target + evidence (metadata table excluded).
- Mandatory handoff block is present.
- Optional connection info is clearly scoped to protocol flows only.

---

## 6. Migration Notes

- Use the exact Header Skeleton and Request Block Skeleton fields defined in Section 2.
- If any existing table headers differ, normalize to the specified columns.
- Remove or merge sections explicitly marked as low value in Section 3.
- Keep status vocabulary unchanged; do not add tokens.
- Handoff block remains mandatory at file end.

---

## Implementation Impact

- Modify only `jsr-reverse/references/request-chain-recording.md`.
- Remove low-value sections and consolidate content under the new structure.
- No other files or references are touched.
