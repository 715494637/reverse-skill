# RS Runtime and Basearr Fit

## When to Use

Use this reference when the current task matches RS-style runtime behavior:

- generated cookies or tokens differ between browser and local execution
- the target appears to have an extra-debugger or `hasDebug` variant
- host-specific `basearr` differences are suspected
- output changes with time, randomness, or execution-window assumptions
- first-hop state is produced correctly but second-hop consumption still fails

Do not route here only because the target mentions cookies.

## Classify the RS Blocker First

Classify the current blocker into exactly one primary class before widening patch scope:

| Class | What must be proven |
| --- | --- |
| `hasDebug` branch | whether the current artifact set belongs to the extra-debugger route |
| `basearr` closure | whether host adaptation, array shape, and first-layer length are closed |
| fixed runtime facts | whether a small set of browser-shaped facts must be frozen before comparison |
| second-hop consumption | whether produced state is accepted only on the next request |

If the primary class is unclear, the route is still `partial`.

## Basearr Closure Items

For RS-style cookie generation, treat the following as closure items rather than optional notes:

- hostname adaptation route
- `encryptLens`
- cookie-key suffix such as `lastWord`
- per-host `flag`
- whether the current branch requires `hasDebug`

If any item remains open, do not claim stable cookie reproduction.

## Preferred Fixed Runtime Facts

Before broad browser-surface patching, first test the smaller RS-specific fact set:

| Runtime fact | Why it matters |
| --- | --- |
| `window.name` | RS state and identifier carry-over |
| `navigator.maxTouchPoints` | fingerprint branch selection |
| `navigator.battery` | browser-shaped state contract |
| `navigator.connection` | browser-shaped state contract |
| `currentTime` / `runTime` / `startTime` | time-window and encoded-time relations |
| `random` | encoded randomness and branch stability |
| execution-window or loop-count surrogate | timing-derived encoded fields |

This list is a first pass, not permission to ignore other dependencies.

## Acceptance Rules

- no stable RS cookie claim without frozen time and randomness
- no stable RS cookie claim without recorded `basearr` closure state
- no RS route acceptance without second-hop validation when produced state is later consumed
- if output length or encrypted-array length fluctuates, classify it as a `basearr` or fixed-source problem before widening patch scope
- treat extra-debugger variants as a route fork, not generic anti-debug noise

## Partial Conditions

Keep runtime at `partial` when:

- `hasDebug` branch is still unresolved
- `basearr`, `encryptLens`, `lastWord`, or `flag` is still unresolved
- fixed runtime facts have not been frozen for comparison
- second-hop validation is missing while produced state is consumed later
