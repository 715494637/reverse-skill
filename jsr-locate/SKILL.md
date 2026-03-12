---
name: jsr-locate
description: Use when a dynamic request field, sign, token, header, cookie, websocket frame, worker message, or RS/瑞数 two-hop artifact source is unknown and must be traced to a real write boundary and upstream state chain.
---

# JSR Locate

## Role

Use this skill only when the current blocker is source proof.

Use it when:

- the final write boundary is not proven
- the field source is still guessed
- upstream response or state dependencies are still open
- a first-hop / second-hop chain has not been closed

Do not use it when the sink is already proven and the real blocker is shell recovery or runtime divergence.

If the phase is still unclear, start with `$jsr-reverse`.

## Intake

Start from this block:

```text
URL or target page:
Target request:
Target field / cookie / message:
Trigger action:
Current symptom:
Known evidence:
Goal:
Constraints:
```

## Read In This Order

### 1. Always read these two files first

- `references/locate-workflow.md`
- `references/request-chain-recording.md`

### 2. Then read exactly one targeted locate reference

- `references/crypto-entry-locating.md` for `sign`, `token`, dynamic header, encrypted parameter, or request-side crypto entry
- `references/rs-collection-and-two-hop-routing.md` for `412`, `403`, challenge page, `204` landing page, inline `$_ts`, `meta[r=m]`, `r2mKa`, `$_ts.l__`, or first-hop / second-hop cookie behavior
- `references/hook-and-boundary-patterns.md` for hooks, breakpoints, initiator tracing, or boundary observation

### 3. Route out as soon as locate is no longer the real blocker

- hand off to `$jsr-recover` when the write boundary is near but the real logic is hidden by `JSVMP`, AST shell, `worker`, `wasm`, `webpack/runtime`, or protocol wrappers
- hand off to `$jsr-runtime` when the sink is already proven but browser and local execution diverge

## Locate Must Prove

- the final sink is real
- `entry -> builder -> writer`
- upstream response and state dependencies
- normal-state / risk-state fork when it exists
- RS second-hop consumption when the target uses first-hop artifacts

## Guardrails

- Do not start from broad grep when a real request and initiator chain already exist.
- Do not stop at a wrapper, SDK layer, or alias if the real writer is still unproven.
- Do not accept RS first-hop material as complete until second-hop consumption is checked.
- Do not jump into runtime patching before the sink and dependency chain are real.

## Exit Criteria

Leave locate only when downstream work no longer depends on source proof.
