---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, ast transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protobuf envelopes, or protocol wrappers, and you need to recover semantic layers, bridge contracts, state carriers, or dispatcher behavior instead of only beautifying code. Use for semantic recovery, JSVMP, AST, WASM, worker, protocol semantics, and bridge recovery.
---

# JSR Recover

## Overview

This skill identifies the obscuring layer around real business logic and determines the lowest recovery level and recovery order that are sufficient for the task.

Recovery is complete only when the current layer’s role, bridge boundary, state carrier, and key operator are clear enough for downstream locate or replay work to continue without reopening the shell.

## Core Principles

- Recover semantic boundaries before chasing readable appearance.
- Identify container, dispatcher, and bridge layers before diving into business operators.
- Classify the recovery level as `A / B / C` and start from the lowest effective level.
- For `worker`, `wasm`, `webpack/runtime`, and protocol shells, write the bridge-contract card before entering internals.
- Prefer black-box reuse when the module boundary and contract are stable enough; do not default to full decompilation.
- Recover only the slice required by the current problem.
- Every recovered layer must have an equivalence checkpoint.
- If the write-back point is still unclear, return to `$jsr-locate`; if replay remains unstable because of runtime state, switch to `$jsr-runtime`.

## Required Reference Loading

- Never stop at `SKILL.md`. Before serious recovery work, load at least one matching reference.
- Read `references/recover-strategy.md` for any task that needs level selection or recovery order.
- Read `references/jsvmp-and-ast.md` when `jsvmp`, AST transforms, or control-flow flattening is involved.
- Read `references/wasm-worker-webpack.md` when the hiding layer includes `worker`, `wasm`, `webpack`, or runtime loaders.
- Read `references/protocol-and-long-connection.md` when the shell is a protocol envelope, `WebSocket`, `protobuf`, long connection, heartbeat, ack, or renewal chain.
- Read `references/equivalence-and-validation.md` whenever key functions, bridge contracts, or extracted operators need equivalence proof.

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
3. Confirm entry, input, and output of the current layer before widening the scope.
4. For `worker`, `wasm`, `webpack`, and protocol shells, write the bridge-contract card and module-boundary note first.
5. Prove bridge contracts or dispatcher relations before extracting the core operator.
6. Before migrating an operator as pure computation, re-check upstream response, `HttpOnly` cookie, challenge, browser state, fingerprint, and time-window dependencies.
7. After each recovered layer, record the equivalence checkpoint.
8. If the sink is unclear, return to `$jsr-locate`; if the result is unstable because of runtime state, switch to `$jsr-runtime`.

## Deliverables

- The class of the current obscuring layer: `jsvmp`, `ast`, `worker`, `wasm`, protocol shell, or container wrapper.
- The chosen recovery level `A / B / C` and why it stops there.
- The entry, bridge boundary, state carrier, and key operator of the current layer.
- For `worker`, `wasm`, `webpack`, or protocol-shell tasks, a bridge-contract card and, when relevant, a module-closure boundary.
- Key-function cards and equivalence-validation records.
- Enough recovered structure that downstream work does not need to reopen the same shell.

## Record Files

All reverse records must be written in Chinese under the current task working directory `reverse-records/`.

- Required: `reverse-records/总览.md`
- Required: `reverse-records/恢复记录.md`
- Required: `reverse-records/验证记录.md`
- Required for protocol or long-connection tasks: `reverse-records/协议状态.md`

Update rules:

- Refresh `总览.md` before the first recovery action.
- Create or refresh `恢复记录.md` as soon as the obscuring layer, bridge contract, key-function card, or module boundary is identified.
- Refresh records immediately after any recovery-level change, new bridge finding, state-carrier finding, key-operator extraction, equivalence result, blocker change, or next-step change.
- Rewrite `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` on every record refresh.
- Do not continue long recovery work while `总览.md`, `恢复记录.md`, or `验证记录.md` is stale.

## Completion Criteria

- The obscuring layer is classified.
- The key bridge boundary or dispatcher entry is known.
- Key-function cards and equivalence checkpoints exist.
- Downstream work can continue directly from the recovery result.

