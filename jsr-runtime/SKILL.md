---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, hidden browser state, anti-debugging, timing or randomness, fingerprint surfaces, or risk-control branching, and you need a minimal runtime manifest instead of broad simulation. Use for environment patching, anti-debugging, state dependencies, minimal environment design, and risk-branch analysis.
---

# JSR Runtime

## Overview

This skill identifies the minimal runtime gap of the current execution chain and produces a verifiable manifest of required objects, required state, fixed sources, and risk-branch conditions.

Runtime work is successful only when it can explain why the browser path works, why the local path diverges, and which smallest set of dependencies closes that gap.

## Core Principles

- Environment patching is subtraction, not accumulation.
- Missing objects and missing state must be classified separately.
- Stabilize time, randomness, and seeds before comparing outputs.
- A chain can be treated as pure computation only after the pre-migration dependency check is closed.
- For `deviceId`, `blackbox`, `sensor_data`, challenge, slider, or risk cookies, build a fingerprint-attribution matrix instead of calling everything “missing browser environment”.
- Every patch item must answer what breaks when it is removed.
- If the real obstacle is hidden inside `jsvmp`, `worker`, `wasm`, or a protocol shell, switch to `$jsr-recover`.
- If the final sink is not yet proven, step back to `$jsr-locate`.

## Required Reference Loading

- Never stop at `SKILL.md`. Before diagnosing the runtime gap, load at least one matching reference.
- Read `references/runtime-diagnosis.md` for runtime-problem classification.
- Read `references/minimal-env-design.md` when designing the minimal manifest, deciding patch scope, or checking whether pure-compute migration is allowed.
- Read `references/anti-debug-and-risk-branches.md` when anti-debugging, stack checks, fingerprint-triggered risk branches, or normal/risk divergence is involved.
- When the problem expands from one class to another, load the newly relevant reference before continuing.

## Default Order

1. Capture a browser normal-state sample before patching any local runtime.
2. Classify the failure: missing object, missing state, anti-debugging, unstable source, or risk branch.
3. Run the pure-compute precheck: upstream response fields, `HttpOnly` cookies, one-time challenge, browser-internal state, fingerprint collection, and time-window or sequence dependencies.
4. Only if all precheck items are closed may the current builder be classified as pure-compute migratable.
5. For fingerprint-sensitive targets, map `surface -> collector -> aggregator -> consumer -> target field or risk branch`.
6. Stabilize time and randomness before comparing intermediate values.
7. Patch state before patching objects; many apparent environment failures are actually unclosed session state.
8. After every new dependency, verify whether it truly affects the result.

## Deliverables

- The runtime-problem class of the current task.
- A minimal runtime manifest rather than a broad “maybe needed” list.
- The necessity, evidence, and removability of each patch item.
- A clear statement on whether pure-compute migration is allowed and which dependency blocks it if not.
- A fingerprint-attribution matrix for fingerprint or risk-control tasks.
- Stable reproduction conditions for time, randomness, state, and input sample.

## Record Files

All reverse records must be written in Chinese under the current task working directory `reverse-records/`.

- Required: `reverse-records/总览.md`
- Required: `reverse-records/运行时依赖.md`
- Add when validating: `reverse-records/验证记录.md`

Update rules:

- Refresh `总览.md` before the first runtime diagnosis step.
- Create or refresh `运行时依赖.md` as soon as dependencies, state gaps, anti-debug points, patch items, or fingerprint attribution are discussed.
- Refresh records immediately after any problem reclassification, dependency change, patch decision, anti-debug finding, normal/risk fork update, blocker change, next-step change, or validation result.
- Rewrite `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` on every record refresh.
- Do not continue long runtime analysis while `总览.md` or `运行时依赖.md` is stale.

## Completion Criteria

- The root cause class is known.
- The minimal runtime manifest is known.
- Intermediate values become stable under fixed input and fixed sources.
- The next stage does not need to re-diagnose the runtime gap.

