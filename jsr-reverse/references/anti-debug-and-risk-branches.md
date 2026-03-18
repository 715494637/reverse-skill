# Anti-Debugging and Risk Branches

## When to Use

Use this file only as a `runtime` mounted refinement.

Mount it when the current runtime blocker is one of the following:

- debugging changes the observed path or output
- a suspected risk branch changes the chain, intermediate values, or final response
- fingerprint differences may be consumed by a real risk decision
- a minimal anti-debug handling choice is needed before first-divergence comparison can continue

This is not a second runtime workflow.

## Owns

This file owns only the runtime-specific refinement below:

- separating debug friction from a real risk branch
- drawing the normal / risk fork map
- deciding whether a fingerprint difference has a real consumer
- applying the minimal handling principle so observation can continue without broad logic rewrites

## Does Not Own

This file does not own:

- global runtime routing
- generic request-chain collection
- shell recovery or deobfuscation depth
- full environment artifact design
- validation proof

If the real blocker is hidden shell logic rather than runtime divergence, hand off to recover instead of expanding this file.

## Method inside this stage

### 1. Separate debug friction from real risk branch

Start by separating:

- `debug friction`: makes observation harder but does not necessarily change business values
- `real risk branch`: changes the chain, intermediate values, or final response

Do not call every debugger symptom anti-debugging, and do not call every abnormal result a risk branch.

### 2. Prove the fork instead of naming it loosely

The following signals mean a real risk branch is plausible:

- fallback happens before the target request is sent
- same input, browser is normal, local replay always follows another path
- missing one upstream request immediately causes `403`, empty payload, challenge, or escalation
- the target value is produced but the server never accepts it

When that happens, stop widening patches and produce a fork map.

### 3. Fork map is mandatory

Record:

- fork starting point: which request, response, state gap, or debug event starts the split
- normal-state path: which builder / writer / response path normal execution follows
- risk-state path: which fallback / challenge / degraded path the risk route follows
- missing state: the exact state gap, not a vague “environment mismatch”

Minimal template:

```markdown
分叉起点：

正常态路径：

风控态路径：

缺失状态：
-
```

### 4. Fingerprint differences need a real consumer

For `deviceId`, `blackbox`, `sensor_data`, challenge, slider, or similar targets, continue only until you can state:

- which fingerprint surface diverges first
- which collector or aggregator consumes it
- which risk gate, challenge point, or fallback point starts the fork

Do not conclude from “one fingerprint value differs” alone.

### 5. Use the minimal handling principle

- remove only the debug friction that blocks observation
- do not rewrite broad business logic
- choose the narrowest matching anti-debug rule that changes the investigation path
- if a patch changes page state, record that fact and re-validate without the patch when feasible
- treat navigation or lifecycle listeners as anti-debug only when they actually create the fork

### 6. Minimal handoff signal

Use a simple handoff signal instead of old route-switch wording:

- if the fork is caused by missing upstream state, hand off with: `missing state proved; return to locate to close the chain`
- if the real logic remains hidden inside a shell layer, hand off with: `risk consumer hidden by shell; continue in recover`
- if the fork and consumer are already known, stay in runtime and fit only the minimum needed facts

## Stop / handoff rule

- Stop using this file when debug friction and real risk branch are already separated.
- Stop using this file when the fork starting point and missing state are concrete enough for the next runtime action.
- Hand off to `locate` when the real blocker is an upstream request / cookie / state gap.
- Hand off to `recover` when the real blocker is a hidden consumer or shell-protected branch.
- Stay in `runtime` only when the remaining work is minimum fact fitting around an already proven fork.
