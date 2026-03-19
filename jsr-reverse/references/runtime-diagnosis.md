# Runtime Diagnosis

## Purpose / Use Boundary

`runtime` owns divergence classification for cases where the boundary and shell are already clear enough, but browser execution and local or controlled execution do not stay aligned.

Use this reference to classify the first meaningful divergence and decide the minimum runtime handoff signal for the next action.

This file is not the runtime workboard format and not a global routing matrix.

## What Runtime Owns

`runtime` owns only:

- classify the current runtime problem
- compare browser normal state with local execution and find the first divergence
- separate missing object from missing state
- stabilize unstable sources before later comparisons
- state the minimum handoff signal needed for patch, fit, or validation

## Default Diagnostic Model

Classify before patching.

Runtime problems fall into at least five classes:

- `missing object`
- `missing state`
- `anti-debugging`
- `unstable source`
- `risk branch`

Most failures are combinations of these classes rather than one missing object.

Start from a first-divergence comparison table:

```markdown
| Item | Browser normal state | Local execution | Difference |
|---|---|---|---|
| Input parameters | same | same | no |
| cookie / storage | complete | missing | yes |
| Date.now | fixed sample | fixed sample | no |
| Math.random | fixed sample | fixed sample | no |
| Intermediate value 1 | normal | normal | no |
| Intermediate value 2 | normal | abnormal | yes |
| Final response | normal data | risk state | yes |
```

Use the table to shrink the problem to the first layer where divergence appears. Do not start from broad patch lists.

## Divergence Classes

### Missing object

Common signal:

- errors such as undefined `window`, `document`, `navigator`, `crypto`, or other directly accessed object

Must verify:

- the current chain really touches that object
- removing or restoring it reproduces the same failure point consistently

### Missing state

Common signal:

- no crash, but the request always fails, produces wrong output, or always enters a risk state

Must verify:

- even with objects present, the chain still cannot reach normal state
- once upstream response, `cookie`, storage, or challenge state is restored, the outcome improves clearly

Do not confuse incomplete object surfaces with lifecycle-produced state. A missing `HttpOnly` cookie is a state gap, not an object gap.

### Anti-debugging

Common signal:

- breakpoints freeze execution
- endless `debugger`
- output changes when the console opens
- integrity checks or stack probes change branch behavior

Must verify:

- whether the observed divergence comes from debug friction itself or from another runtime dependency that only becomes visible under debugging

### Unstable source

Common signal:

- the same input still produces different intermediate values or outputs across runs

Stabilize first:

- `Date.now()`
- `performance.now()`
- `Math.random()`
- device seed, fingerprint seed, install time, session sequence

Without stabilization, later comparisons are weak.

### Risk branch

Common signal:

- browser sometimes works, but local replay or debugging consistently enters another branch

Must verify:

- where normal state and risk state first diverge
- whether the consumer belongs to a risk branch rather than the target builder

## Required Diagnosis Output

The diagnosis output must stay minimal and handoff-ready. It should include:

- problem class or combined classes
- first confirmed divergence point
- whether the blocker is `missing object`, `missing state`, `anti-debugging`, `unstable source`, or `risk branch`
- which facts must be carried into the `运行时补充` section inside `请求链路.md`
- what the next action is: patch objects, restore state, stabilize source, isolate anti-debug, or validate a branch difference

For fingerprint-heavy targets such as `deviceId`, `blackbox`, `sensor_data`, challenge, slider, or risk-cookie paths, keep the diagnosis compact but explicit:

- which fingerprint surfaces are collected
- which surfaces are actually consumed by the aggregator
- which consumed surfaces affect the target field or risk branch

Minimal handoff signals:

- `missing object` -> name the exact object and the proof that the current chain touches it
- `missing state` -> name the exact state carrier or upstream response that must be restored
- `anti-debugging` -> name the blocking probe or branch and the smallest neutralization target
- `unstable source` -> name the source that must be fixed before comparison continues
- `risk branch` -> name the first risk split and the state difference that triggers it

## Stop / Handoff Standard

`runtime` can stop when all of the following are true:

- the divergence class is explicit
- the first layer where browser and local execution diverge is known
- missing object and missing state are not mixed
- unstable sources are either stabilized or explicitly listed as the current blocker
- the next artifact update or validation action is clear

At that point, hand off by updating the `运行时补充` section inside `请求链路.md` with the confirmed runtime facts and marking any remaining proof gap in the same file.

## Does Not Own

`runtime` does not own:

- proving the request chain from scratch
- deeper shell recovery once the real blocker is still hidden logic
- defining the full template for the `运行时补充` section inside `请求链路.md`
- re-explaining the global stage routing from `SKILL.md`
- claiming equivalence based only on final output
