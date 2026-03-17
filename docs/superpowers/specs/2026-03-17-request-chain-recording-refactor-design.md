# Request-Chain Recording Spec Refactor Design

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `jsr-reverse/references/request-chain-recording.md` into a handoff-first, traceable, low-noise spec that keeps only information useful to reverse work and handoff continuity.

**Architecture:** Single-file, single-source record at `reverse-records/请求链路.md`. The spec is reorganized into a small number of high-value blocks: purpose, record path, header skeleton, request block skeleton, handoff block, plus an optional connection section. Low-value or redundant guidance is removed. No new phases or multi-file record sets are introduced.

**Tech Stack:** Markdown documentation

---

## 1. Scope & Triggers

**Scope**
- Only refactor: `jsr-reverse/references/request-chain-recording.md`
- English-only version in this round

**Out of Scope**
- Any other skills or references
- Chinese version (`zh/jsr-shared/references/request-chain-recording.md`)
- New files or multi-file record sets

**Success Criteria**
- Clear, short structure centered on handoff and traceability
- Single record path enforced: `reverse-records/请求链路.md`
- Field records always include status arrays + source/target + evidence

---

## 2. Proposed Structure (Top-Level)

1) **Purpose** — states handoff and traceability goals; forbids stage summaries or conclusions.
2) **Record Path** — only `reverse-records/请求链路.md`; no multi-file lists.
3) **Header Skeleton** — minimal summary block for handoff entry.
4) **Request Block Skeleton** — per-request section with compact tables and evidence requirements.
5) **Handoff Block** — mandatory end block for continuation.
6) **Connection Info (Optional)** — only for protocol flows (WebSocket/protobuf/SSE/heartbeat/renewal).

---

## 3. Keep / Remove Rules

**Keep (High Value)**
- Status array vocabulary and example
- Source/target + evidence requirements
- One request per section + upstream expansion order
- Mandatory handoff block

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
- No empty structures: use `- 无` when a section has no fields, and `无` for no upstream.
- Evidence must be verifiable (packet capture / response body / pre-send comparison); do not record guesses as evidence.

---

## 5. Example Policy & Acceptance

**Example Policy**
- Keep one minimal example only.
- Example must show target request first, real source/evidence, and a closed upstream chain.

**Acceptance Criteria**
- Top-level structure matches the proposed six blocks.
- Single record path is enforced.
- Every field includes status + source/target + evidence.
- Mandatory handoff block is present.
- Optional connection info is clearly scoped to protocol flows only.

---

## Implementation Impact

- Modify only `jsr-reverse/references/request-chain-recording.md`.
- Remove low-value sections and consolidate content under the new structure.
- No other files or references are touched.
