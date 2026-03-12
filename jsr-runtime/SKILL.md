---
name: jsr-runtime
description: Use when browser execution and local execution diverge because of missing objects, missing state, anti-debugging, unstable sources, risk-branch conditions, page-lifecycle-produced state, or RS/瑞数 hasDebug and basearr differences.
---

# JSR Runtime

## Role

Use this skill only when the sink and shell boundary are already clear enough, but browser execution and local execution still diverge.

Use it when the blocker is:

- missing object
- missing state
- anti-debugging
- unstable sources such as time, randomness, or seed drift
- risk-branch conditions
- lifecycle-produced or navigation-produced state
- RS-specific `hasDebug`, `basearr`, or second-hop state consumption

Do not use it when the sink is still guessed or the shell itself is still unreadable.

If the phase is still unclear, start with `$jsr-reverse`.

## Intake

Start from this block:

```text
Target chain or function:
Browser behavior:
Local behavior:
Current blocker:
Known sink:
Known shell boundary:
Known evidence:
Goal:
Constraints:
```

## Read In This Order

### 1. Always read these two files first

- `references/runtime-diagnosis.md`
- `references/minimal-env-design.md`

### 2. Then read the smallest matching runtime reference

- `references/anti-debug-and-risk-branches.md` for anti-debugging or branch flips under inspection
- `references/sdenv-fit-check-and-routing.md` for lifecycle-produced state, navigation-produced state, offline HTML replay, or remote jsdom / `sdenv` style execution
- `references/rs-runtime-and-basearr-fit.md` for `hasDebug`, `basearr`, `encryptLens`, `lastWord`, `flag`, fixed runtime facts, or second-hop state consumption

### 3. Route out as soon as runtime is no longer the real blocker

- hand off to `$jsr-locate` when the sink or state dependency chain is still unproven
- hand off to `$jsr-recover` when the divergence is caused by hidden shell semantics instead of runtime conditions

## Runtime Must Prove

- the first real divergence point
- runtime class: object / state / anti-debug / unstable source / risk branch
- the minimum dependency set
- the chosen execution route when route selection matters
- whether pure-compute migration is allowed

## Guardrails

- Do not start runtime work before the sink and shell boundary are real.
- Patch state before patching objects whenever possible.
- Choose the narrowest anti-debug rule first.
- Do not claim RS closure before `hasDebug`, `basearr`, fixed runtime facts, and second-hop validation are checked.
- Do not call a route pure-compute until upstream response, `HttpOnly`, challenge, browser state, fingerprint, and time-window dependencies are closed.

## Exit Criteria

Leave runtime only when the divergence class and minimum dependency set are defensible enough for replay or final validation.
