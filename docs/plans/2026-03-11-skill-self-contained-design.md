# Skill Self-Contained Design

**Goal:** Make `jsr-locate`, `jsr-recover`, and `jsr-runtime` executable even when the agent only reads `SKILL.md`.

**Problem:** Real usage shows the runtime reliably loads `SKILL.md`, but does not reliably open `references/`. That means key execution rules, artifact skeletons, and failure contracts cannot live only in `references/`.

## Design Decision

Treat `SKILL.md` as the only guaranteed execution surface.

Move the following into each `SKILL.md`:

- stage entry conditions
- minimal input block
- core working order
- handoff rules
- required deliverables
- failure output block
- exact record-file skeletons that the agent must write

Keep `references/` as optional extension material only:

- longer examples
- domain-specific background
- deeper variants and long-form notes

## Per-Skill Scope

### jsr-locate

Inline:

- locate order
- crypto-entry route
- RS two-hop route
- sink/source proof rules
- `总览.md`, `请求链路.md`, `验证记录.md` skeletons

### jsr-recover

Inline:

- recovery levels `A / B / C`
- six-layer view
- bridge-contract and key-function card rules
- RS anchor order
- `总览.md`, `恢复记录.md`, `验证记录.md` skeletons

### jsr-runtime

Inline:

- runtime classification
- pure-compute precheck
- RS runtime route and closure items
- fit-check and route proof requirements
- `总览.md`, `运行态清单.md`, `验证记录.md` skeletons

## Style Rules

- generated record skeletons stay compact
- pure Markdown only
- use light status markers: `✅ / 🟡 / ⛔ / 🔍 / ➡️`
- all execution records remain Chinese

## Non-Goals

- do not delete `references/`
- do not move every long explanation into `SKILL.md`
- do not create a fourth skill
