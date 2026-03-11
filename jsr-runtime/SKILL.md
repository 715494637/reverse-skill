---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, missing state, anti-debugging, unstable sources, risk-branch conditions, or page-lifecycle-produced state.
---

# JSR Runtime

## Overview

This skill identifies the minimal runtime gap of the current execution chain and produces a verifiable manifest of required objects, required state, fixed sources, and risk-branch conditions.

Runtime work is successful only when it can explain why the browser path works, why the local path diverges, and which smallest set of dependencies closes that gap.

## Core Principles

- Environment patching is subtraction, not accumulation.
- Missing objects and missing state must be classified separately.
- Run a fit check before committing to `sdenv`, remote jsdom, or any browser-profile migration route.
- When anti-debugging is present, choose the narrowest matching rule that changes the investigation path instead of applying broad patches.
- Stabilize time, randomness, and seeds before comparing outputs.
- A chain can be treated as pure computation only after the pre-migration dependency check is closed.
- For `deviceId`, `blackbox`, `sensor_data`, challenge, slider, or risk cookies, build a fingerprint-attribution matrix instead of calling everything “missing browser environment”.
- For fingerprint-sensitive targets, prefer one high-fidelity browser profile over broad multi-profile simulation.
- Every patch item must answer what breaks when it is removed.
- If runtime state is produced by page lifecycle or navigation, record the injection point, state-close signal, and produced state carrier explicitly.
- If a navigation or lifecycle patch changes page state, remove the patch and re-validate the request chain when feasible.
- If the real obstacle is hidden inside `jsvmp`, `worker`, `wasm`, or a protocol shell, switch to `$jsr-recover`.
- If the final sink is not yet proven, step back to `$jsr-locate`.

## Required Reference Loading

- Never stop at `SKILL.md`. Before diagnosing the runtime gap, load at least one matching reference.
- Read `references/runtime-diagnosis.md` for runtime-problem classification.
- Read `references/minimal-env-design.md` when designing the minimal manifest, deciding patch scope, or checking whether pure-compute migration is allowed.
- Read `references/anti-debug-and-risk-branches.md` when anti-debugging, stack checks, fingerprint-triggered risk branches, or normal/risk divergence is involved.
- Read `references/sdenv-fit-check-and-routing.md` when the target matches `sdenv`-style runtime work: offline `html/js/ts` replay, remote jsdom execution, page-lifecycle-produced state, or navigation-produced cookies or tokens.
- Read `references/record-overview-and-validation.md` before creating or refreshing `总览.md` or `验证记录.md`.
- When the problem expands from one class to another, load the newly relevant reference before continuing.

## Minimum Input

Provide the smallest usable intake block before starting:

```text
Target chain or function:
Browser behavior:
Local behavior:
Current blocker or symptom:
Known evidence:
Constraints:
```

Required fields:

- `Target chain or function`
- `Browser behavior`
- `Local behavior`
- `Current blocker or symptom`
- `Known evidence` (use `none` if nothing is known yet)
- `Constraints` (use `none` if there are no extra constraints)

If fingerprint, challenge, or risk branching is already suspected, also add:

- `Suspected consumer`
- `Suspected branch point`

If `sdenv`, remote jsdom, or page-lifecycle-produced state is already suspected, also add:

- `Candidate runtime route`
- `Known state-close signal`

## Default Order

1. Capture a browser normal-state sample before patching any local runtime.
2. Classify the failure: missing object, missing state, anti-debugging, unstable source, or risk branch.
3. If the target may fit `sdenv`, run a fit check before selecting any migration route.
4. If anti-debugging or lifecycle traps are present, choose the narrowest matching rule, record the exact hit surface, and do not widen the patch scope yet.
5. If the route depends on page lifecycle or navigation-produced state, classify exactly one execution mode: offline local replay, remote passive, or remote active.
6. Record the injection point, state-close signal, and produced state carrier before broad environment patching.
7. Run the pure-compute precheck: upstream response fields, `HttpOnly` cookies, one-time challenge, browser-internal state, fingerprint collection, and time-window or sequence dependencies.
8. Only if all precheck items are closed may the current builder be classified as pure-compute migratable.
9. For fingerprint-sensitive targets, map `surface -> collector -> aggregator -> consumer -> target field or risk branch`.
10. Stabilize time and randomness before comparing intermediate values.
11. Patch state before patching objects; many apparent environment failures are actually unclosed session state.
12. After every new dependency, verify whether it truly affects the result.
13. If the chosen route produces state through navigation, exit, or callback signals, validate the second hop with the produced state before accepting the route.
14. If a navigation or lifecycle patch was used, remove it and re-check whether the request chain still closes before accepting the diagnosis.

## Deliverables

- The runtime-problem class of the current task.
- A minimal runtime manifest rather than a broad “maybe needed” list.
- The necessity, evidence, and removability of each patch item.
- The fit-check result and the chosen execution mode when `sdenv`-style routing is involved.
- The selected anti-debug rule, its hit surface, and the re-validation result if a navigation or lifecycle patch was used.
- The injection point, state-close signal, produced state carrier, and second-hop validation result when runtime state is generated by page lifecycle or navigation.
- A clear statement on whether pure-compute migration is allowed and which dependency blocks it if not.
- A fingerprint-attribution matrix for fingerprint or risk-control tasks.
- Stable reproduction conditions for time, randomness, state, and input sample.

## Failure Output

If runtime work stops, stays partial, or cannot yet close the gap, return and record a flat status block:

```yaml
status: ready | partial | blocked
stage: runtime
code:
summary:
evidence:
  - ...
impact:
next_action:
```

Use `partial` when the runtime class is known but one or more blocking dependencies remain open.
Use `blocked` when there is no browser normal-state sample, no first divergence point, or no defensible runtime classification yet.
Do not claim a minimal manifest until object gaps, state gaps, and unstable sources have been separated clearly enough to test.

## Record Files

All reverse records must be written in Chinese under the current task working directory `reverse-records/`.

- One reverse session must use exactly one `会话N/` folder.
- If the user names a session folder, read and write only that folder.
- If the user does not name one, create the next unused `会话N/` folder and use only that folder.
- Never overwrite, merge, rename, or clean another `会话N/` folder.
- Use `references/minimal-env-design.md` as the canonical schema for `运行态清单.md`, and use `references/record-overview-and-validation.md` as the canonical schema for `总览.md` and `验证记录.md`.
- `总览.md` stores stage snapshot, problem class, blockers, next action, risk notes, and the current blocked or partial status block.
- `运行态清单.md` stores the fit check, execution mode, minimal manifest, pure-compute precheck, removable items, and only the runtime facts needed for the current chain.
- `验证记录.md` stores patch toggles, fixed inputs, state-close proof, second-hop validation, checkpoints, and pass/fail proof once validation begins.
- Refresh `总览.md` before the first runtime diagnosis step, `运行态清单.md` as soon as dependencies or patch items are discussed, and `验证记录.md` when validation begins.

## Completion Criteria

- The root cause class is known.
- The minimal runtime manifest is known.
- The route is justified when `sdenv` or remote jsdom is involved.
- Intermediate values become stable under fixed input and fixed sources.
- The next stage does not need to re-diagnose the runtime gap.
