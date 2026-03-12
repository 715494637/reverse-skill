---
name: jsr-recover
description: Use when real business logic is hidden by JSVMP, AST transforms, control-flow flattening, worker, wasm, webpack/runtime bootstrap shells, protocol wrappers, or RS/瑞数 r2mKa and cp/appcode shells.
---

# JSR Recover

## Role

Use this skill only when the write boundary is already near enough, but the real logic is still hidden by a shell.

Use it when the blocker is:

- `JSVMP`, flattening, dispatcher loops, or AST-heavy obfuscation
- `worker`, `wasm`, `webpack/runtime`, or loader-driven shells
- protocol envelopes, WebSocket codecs, or long-connection renewal state
- RS anchors such as `r2mKa`, `cp0/cp2/cp6`, `cp3 -> keys`, or `$_ts.l__`

Do not use it when the sink or upstream dependency chain is still guessed.

If the phase is still unclear, start with `$jsr-reverse`.

## Intake

Start from this block:

```text
Target:
Artifact or file:
Known sink or bridge boundary:
Observed shell type:
Current blocker:
Known anchors:
Validation sample:
Goal:
Constraints:
```

## Read In This Order

### 1. Always read this file first

- `references/recover-strategy.md`

### 2. Then read the smallest matching shell reference

- `references/jsvmp-and-ast.md` for `JSVMP`, flattening, dispatcher loops, or AST-driven shells
- `references/ast-deobfuscation-playbook.md` for string-table recovery, helper inlining, AST transforms, or bundle unpacking
- `references/wasm-worker-webpack.md` for `worker`, `wasm`, `webpack/runtime`, bootstrap, or loader logic
- `references/protocol-and-long-connection.md` for protocol envelope, ack, heartbeat, renewal, SSE, or WebSocket state
- `references/rs-recovery-anchors.md` for `r2mKa`, `cp0/cp2/cp6`, `cp3 -> keys`, or `$_ts.l__ appcode`

### 3. Read validation guidance once a bridge or operator candidate exists

- `references/equivalence-and-validation.md`

### 4. Route out as soon as recovery is no longer the real blocker

- hand off to `$jsr-locate` when the sink or upstream dependency chain is still guessed
- hand off to `$jsr-runtime` when the operator is visible but local execution still diverges because of runtime state, anti-debugging, or branch conditions

## Recover Must Prove

- obscuring-layer type
- bridge boundary
- state carrier
- key operator or minimum useful operator slice
- minimum sufficient recovery depth, not maximal deobfuscation

## Guardrails

- Do not fully decompile a shell when a bridge contract or operator slice is enough.
- Do not widen from level A to B or C unless the current level cannot support the task.
- Do not treat RS page code as the main target when the useful anchors are `r2mKa`, `cp`, keys path, or `$_ts.l__`.
- Do not claim pure-compute migration before upstream response, browser state, and time-window dependencies are rechecked.

## Exit Criteria

Leave recover only when downstream locate, replay, or validation can continue without reopening the same shell.
