---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, AST transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protocol wrappers, or RS/瑞数-style r2mKa and cp/appcode shells.
---

# JSR Recover

## Overview

This skill identifies the obscuring layer around real business logic and determines the lowest recovery level and recovery order that are sufficient for the task.

Recovery is complete only when the current layer’s role, bridge boundary, state carrier, and key operator are clear enough for downstream locate or replay work to continue without reopening the shell.

## Core Principles

- Recover semantic boundaries before chasing readable appearance.
- Identify container, dispatcher, and bridge layers before diving into business operators.
- Classify the recovery level as `A / B / C` and start from the lowest effective level.
- For AST-heavy shells, fingerprint the obfuscation family first, then apply ordered transforms with a per-step ledger and validation checkpoint.
- For `worker`, `wasm`, `webpack/runtime`, and protocol shells, write the bridge-contract card before entering internals.
- For RS/瑞数-style shells, start from `r2mKa`, `cp0/cp2/cp6`, `cp3 -> dynamicTaskOffset -> keys`, and `$_ts.l__` appcode instead of from bulk beautified source.
- Treat `$_ts.l__` render or appcode wrappers as bridge artifacts that may carry business text or decrypted code, not as disposable page noise.
- Prefer black-box reuse when the module boundary and contract are stable enough; do not default to full decompilation.
- Recover only the slice required by the current problem.
- Every recovered layer must have an equivalence checkpoint.
- If the write-back point is still unclear, return to `$jsr-locate`; if replay remains unstable because of runtime state, switch to `$jsr-runtime`.

## Required Reference Loading

- Never stop at `SKILL.md`. Before serious recovery work, load at least one matching reference.
- Read `references/recover-strategy.md` for any task that needs level selection or recovery order.
- Read `references/jsvmp-and-ast.md` when `jsvmp`, AST transforms, or control-flow flattening is involved.
- Read `references/ast-deobfuscation-playbook.md` when the main recovery work is AST deobfuscation, string-table recovery, helper inlining, control-flow unflattening, or bundle unpacking.
- Read `references/wasm-worker-webpack.md` when the hiding layer includes `worker`, `wasm`, `webpack`, or runtime loaders.
- Read `references/protocol-and-long-connection.md` when the shell is a protocol envelope, `WebSocket`, `protobuf`, long connection, heartbeat, ack, or renewal chain.
- Read `references/rs-recovery-anchors.md` when RS/瑞数 indicators appear: `r2mKa`, `$_ts` cp fields, keys derivation paths, or `$_ts.l__` appcode.
- Read `references/equivalence-and-validation.md` whenever key functions, bridge contracts, or extracted operators need equivalence proof.
- Read `references/record-overview-and-validation.md` before creating or refreshing `总览.md` or `验证记录.md`.

## Minimum Input

Provide the smallest usable intake block before starting:

```text
Target:
Artifact:
Shell type (if known):
Recovery goal: semantic_explanation / key_operator_extraction / minimal_rebuild
Known anchor:
Validation sample:
Constraints:
```

Required fields:

- `Target`
- `Artifact`

Recommended fields:

- `Shell type`
- `Recovery goal`
- `Known anchor`
- `Validation sample`
- `Constraints` (use `none` if there are no extra constraints)

For known shell families, add the tightest available anchor:

- `worker`: message direction, bridge entry, shared state
- `wasm`: imports, exports, wrapper layer
- `webpack/runtime`: module entry, lazy-load point, module boundary
- `protocol`: handshake, business packet, renewal or ack evidence

For RS/瑞数-style shells, also add:

- `$_ts sample`
- `r2mKa anchor`
- `Appcode anchor`

## Six-Layer View

1. `outer container`: `webpack`, IIFE, loader, module bootstrap, lazy loading
2. `dispatcher layer`: dispatcher, state machine, bytecode loop, flattening switch
3. `state carrier`: registers, stacks, context objects, closure pools, tables, memory areas
4. `bridge layer`: `worker` message contract, `wasm` imports and exports, protocol codec shell
5. `core operator`: hash, signature, encryption, fingerprint collection, serialization, challenge logic
6. `write-back layer`: where the result is written into request, header, `cookie`, frame, or storage

## Default Order

1. Identify which layer is currently obscuring the business logic.
2. Select the current recovery level: `A` for key-opcode extraction, `B` for dispatcher plus critical state carriers, `C` for minimal decompilation or minimal interpreter.
3. For RS/瑞数-style shells, recover in this order unless evidence contradicts it: `r2mKa dispatcher -> cp decoding -> keys path -> $_ts.l__ appcode`.
4. When AST-heavy recovery dominates, follow `references/ast-deobfuscation-playbook.md` to fingerprint first, then unpack or transform in an evidence-preserving order.
5. Confirm entry, input, and output of the current layer before widening the scope.
6. For `worker`, `wasm`, `webpack`, and protocol shells, write the bridge-contract card and module-boundary note first.
7. Prove bridge contracts or dispatcher relations before extracting the core operator.
8. Before migrating an operator as pure computation, re-check upstream response, `HttpOnly` cookie, challenge, browser state, fingerprint, and time-window dependencies.
9. After each recovered layer, record the equivalence checkpoint.
10. If the sink is unclear, return to `$jsr-locate`; if the result is unstable because of runtime state, switch to `$jsr-runtime`.

## Deliverables

- The class of the current obscuring layer: `jsvmp`, `ast`, `worker`, `wasm`, protocol shell, or container wrapper.
- The chosen recovery level `A / B / C` and why it stops there.
- The entry, bridge boundary, state carrier, and key operator of the current layer.
- For RS/瑞数 tasks, stable anchors for `r2mKa`, `cp0/cp2/cp6`, the keys derivation path, and any `$_ts.l__` appcode that matters to downstream work.
- For `worker`, `wasm`, `webpack`, or protocol-shell tasks, a bridge-contract card and, when relevant, a module-closure boundary.
- Key-function cards and equivalence-validation records.
- Enough recovered structure that downstream work does not need to reopen the same shell.

## Failure Output

If recovery work stops, stays partial, or cannot yet justify the current level, return and record a flat status block:

```yaml
status: ready | partial | blocked
stage: recover
code:
summary:
evidence:
  - ...
impact:
next_action:
```

Use `partial` when the obscuring layer is classified but the bridge, state carrier, or key operator is still incomplete.
Use `blocked` when no stable entry, no boundary anchor, or no validation sample exists for the current level.
Use `partial` for RS/瑞数 tasks when `r2mKa`, `cp`, keys-path, or appcode anchors are known but not yet strong enough for downstream work.
Do not claim recovery closure until the stopping level `A / B / C` is justified and downstream work can continue directly.

## Record Files

All reverse records must be written in Chinese under the current task working directory `reverse-records/`.

- One reverse session must use exactly one `会话N/` folder.
- If the user names a session folder, read and write only that folder.
- If the user does not name one, create the next unused `会话N/` folder and use only that folder.
- Never overwrite, merge, rename, or clean another `会话N/` folder.
- Use `references/equivalence-and-validation.md` as the canonical schema for `恢复记录.md`, and use `references/record-overview-and-validation.md` as the canonical schema for `总览.md` and `验证记录.md`.
- `总览.md` stores stage snapshot, current recovery goal, blockers, next action, risk notes, and the current blocked or partial status block.
- `恢复记录.md` stores structure cards: obscuring layer, bridge boundary, state carrier, module note, and key-function cards.
- `验证记录.md` stores fixed inputs, checkpoints, equivalence results, and gap locations once validation begins.
- Refresh `总览.md` before the first recovery action, `恢复记录.md` as soon as the first layer or bridge finding is known, and `验证记录.md` when equivalence work begins.

## Completion Criteria

- The obscuring layer is classified.
- The key bridge boundary or dispatcher entry is known.
- Key-function cards and equivalence checkpoints exist.
- Downstream work can continue directly from the recovery result.
