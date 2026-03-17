---
name: jsr-reverse
description: Use when a Web JS reverse task has unclear phase selection, mixed source-chain and shell blockers, runtime divergence, validation-only work, or RS/瑞数 clues such as 412, cookie hops, sign, token, JSVMP, worker, wasm, hasDebug, or basearr.
---

# JSR Reverse

## Scope & Triggers

Use this as the only default entry skill for Web JS reverse work.

Its job is to do four things:

- classify the current blocker
- choose the smallest next phase
- point to the smallest reference set to read now
- keep the task on `locate -> recover -> runtime -> validation` unless evidence forces a different route

This skill applies when a Web JS reverse task has unclear phase selection, mixed source-chain and shell blockers, runtime divergence, validation-only work, or RS/瑞数 clues such as 412, cookie hops, sign, token, JSVMP, worker, wasm, hasDebug, or basearr.

## Process

### Intake

Start from this block:

```text
URL or target page:
Target request / field / cookie / message:
Trigger action:
Current symptom:
Known evidence:
Goal:
Constraints:
```

### Init Gate (Request Chain First)

If any of these are missing, run this gate before phase routing:

- the target request is not identified
- the upstream dependency chain is unknown
- there is no real request sample (only guesses)

Do this inside `jsr-reverse` (not a separate skill):

1. Use JS Reverse MCP to open the target site and perform the trigger action.
2. Capture all requests, headers, bodies, cookies, and responses.
3. Write the Request Chain Judgment block into `reverse-records/请求链路.md` by following `references/request-chain-recording.md`.
4. Only then output the routing block and choose the phase.

### Output First

If Init Gate is required, output the Request Chain Judgment block first, then output this routing block; if Init Gate is not required, output this routing block after intake:

```text
Current phase:
Read now:
Do not enter:
Switch when:
```

### Default Routing Rule

1. If the real write boundary or upstream state chain is still unproven, start with `locate`.
2. If the write boundary is near but the real logic is still hidden by a shell, move to `recover`.
3. If the sink and shell boundary are already clear but browser and local execution diverge, move to `runtime`.
4. If the main work is checkpoint proof or final consistency proof, move to `validation`.
5. If the user explicitly wants to avoid environment patching, treat `runtime` as a last-mile consistency check, not the main path.

### RS Priority Override

Treat the task as RS-high-priority as soon as you see any of these clues:

- `412`, `403`, challenge page, or `204` landing page
- inline `$_ts`
- `meta[r=m]`
- `r2mKa`
- `$_ts.l__`
- `hasDebug`
- `basearr`
- first-hop / second-hop cookie consumption

When RS clues exist:

- start from `locate` unless the sink and shell boundary are already proven
- read the RS-specific reference for the current phase before broadening to generic references

### Reference Routing

Read references deliberately. Do not bulk-load everything.

#### Locate

Read these first:

- `references/locate-workflow.md`
- `references/request-chain-recording.md`

Then add one targeted locate reference:

- `references/crypto-entry-locating.md` for `sign`, `token`, dynamic header, encrypted parameter, or request-side crypto entry
- `references/rs-collection-and-two-hop-routing.md` for `412`, `403`, `204`, inline `$_ts`, `meta[r=m]`, `r2mKa`, `$_ts.l__`, or first-hop / second-hop behavior
- `references/hook-and-boundary-patterns.md` for hooks, breakpoints, initiator tracing, or boundary observation

#### Recover

Read this first:

- `references/recover-strategy.md`

Then add the smallest matching recovery reference:

- `references/jsvmp-and-ast.md` for `JSVMP`, dispatcher loops, flattening, or AST-heavy shells
- `references/ast-deobfuscation-playbook.md` for string-table recovery, helper inlining, AST transforms, or bundle unpacking
- `references/wasm-worker-webpack.md` for `worker`, `wasm`, `webpack/runtime`, bootstrap, or loader logic
- `references/protocol-and-long-connection.md` for WebSocket, protobuf, SSE, heartbeat, ack, or renewal state
- `references/rs-recovery-anchors.md` for `r2mKa`, `cp0/cp2/cp6`, `cp3 -> keys`, or `$_ts.l__ appcode`

#### Runtime

Read these first:

- `references/runtime-diagnosis.md`
- `references/minimal-env-design.md`

Then add the smallest matching runtime reference:

- `references/anti-debug-and-risk-branches.md` for anti-debugging or branch flips under inspection
- `references/sdenv-fit-check-and-routing.md` for lifecycle-produced state, navigation-produced state, offline replay, or `sdenv` / jsdom routes
- `references/rs-runtime-and-basearr-fit.md` for `hasDebug`, `basearr`, `encryptLens`, `lastWord`, `flag`, fixed runtime facts, or second-hop state consumption

#### Validation

Read:

- `references/equivalence-and-validation.md`

### Fast Triage Table

| Symptom | Next phase | Read now |
|---|---|---|
| Target cookie, header, body field, or message source is unknown | `locate` | `locate-workflow.md`, `request-chain-recording.md` |
| `sign`, `token`, or encrypted request field source is unknown | `locate` | `crypto-entry-locating.md` |
| `412 -> cookie -> 200` or RS first-hop / second-hop behavior | `locate` | `rs-collection-and-two-hop-routing.md` |
| Sink is near but code is hidden by dispatcher, AST shell, or `JSVMP` | `recover` | `recover-strategy.md`, `jsvmp-and-ast.md` |
| Main blocker is `worker`, `wasm`, or `webpack/runtime` shell | `recover` | `wasm-worker-webpack.md` |
| Main blocker is protocol envelope, ack, or renewal | `recover` | `protocol-and-long-connection.md` |
| Browser works, local load fails, and sink plus shell boundary are already known | `runtime` | `runtime-diagnosis.md`, `minimal-env-design.md` |
| Debugging flips behavior or branch | `runtime` | `anti-debug-and-risk-branches.md` |
| RS local load fails on `hasDebug` or `basearr` differences | `runtime` | `rs-runtime-and-basearr-fit.md` |
| Main work is checkpoint proof only | `validation` | `equivalence-and-validation.md` |

### Terminology

- phase: `locate` / `recover` / `runtime` / `validation`
- gate: Init Gate (request-chain first)
- record: `reverse-records/请求链路.md`
- handoff: Request Chain handoff block at file end

### Consistency Rules

- If Init Gate triggers, output Request Chain Judgment before the routing block.
- Only repeat the routing block when the phase changes or the request chain updates.
- Only reference `jsr-reverse/references/*`.

## Examples

```text
Request Chain Judgment:
- Target request: /api/verify
- Trigger: submit login form
- Evidence: only guessed, no real sample

Current phase: locate
Read now: references/request-chain-recording.md
Do not enter: recover
Switch when: request chain recorded and upstream dependency chain is real
```

## Guidelines

### Phase Exit Rules

- Leave `locate` only when the sink and upstream state chain are real.
- Leave `recover` only when the shell has been reduced enough for downstream work to continue.
- Leave `runtime` only when the first divergence point and minimum dependency set are real.
- Leave `validation` only when the compared checkpoints are concrete and defensible.

### Guardrails

- Do not start from broad source grep when a live request and initiator chain already exist.
- Do not jump into runtime patching while the write boundary is still guessed.
- Do not fully decompile a shell when a bridge contract or operator slice is enough.
- Do not treat RS first-hop material as complete until second-hop consumption is checked.
- Do not treat a final output match as sufficient when intermediate checkpoints disagree.
- Update `reverse-records/请求链路.md` immediately after each request-chain capture or change (see `references/request-chain-recording.md`).

```text
Request Chain handoff:
Record: reverse-records/请求链路.md
Request Chain Judgment:
```
