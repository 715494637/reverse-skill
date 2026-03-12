# Runtime Diagnosis

## 1. Classify Before Patching

Runtime problems fall into at least five classes:

- `missing object`
- `missing state`
- `anti-debugging`
- `unstable source`
- `risk branch`

Most runtime failures are combinations of these classes rather than one missing object.

For `deviceId`, `blackbox`, `sensor_data`, challenge, slider, or risk-cookie targets, add one more layer:

- which fingerprint surfaces are collected
- which surfaces are actually consumed by the aggregator
- which consumed surfaces finally affect the risk branch or target field

## 2. Recognition Signals for the Five Classes

| Class | Common symptom | What must be verified |
|---|---|---|
| Missing object | Errors such as undefined `window`, `document`, `navigator`, or `crypto` | Whether the current chain really touches that object |
| Missing state | No crash, but request always fails or always enters risk state | Whether `cookie`, storage, upstream response, or challenge state is missing |
| Anti-debugging | Breakpoints freeze execution, endless `debugger`, output changes when console opens | Whether debug friction, integrity checks, or stack probes exist |
| Unstable source | Different output on every run | Whether time, randomness, performance time, or device seed is part of the input |
| Risk branch | Browser sometimes works, local replay or debugging always takes another path | Whether normal state and risk state have already diverged |

## 3. Browser Normal State vs Local Failure Comparison

Start with a comparison table:

```markdown
| Item | Browser normal state | Local execution | Difference |
|---|---|---|---|
| Input parameters | same | same | no |
| cookie / storage | complete | missing | yes |
| Date.now | real-time | real-time | maybe |
| Math.random | random | random | maybe |
| Intermediate value 1 | normal | normal | no |
| Intermediate value 2 | normal | abnormal | yes |
| Final response | normal data | risk state | yes |
```

This table is used to shrink the problem to the first layer where divergence appears.

## 4. Do Not Mix Missing Objects with Missing State

### Missing object

Classification rule:

- the current chain really accesses that object
- removing it reproduces the same failure point consistently

### Missing state

Classification rule:

- even with all objects present, the chain still cannot reach normal state
- once upstream responses, `cookie`, storage, or challenge state is restored, the outcome improves clearly

Common misclassification:

- seeing incomplete `document.cookie` and starting full browser simulation, while the real gap is an upstream `HttpOnly` cookie

## 5. Fingerprint Problems Are Not Just 闁炽儲鍙慽ssing Environment闁?
Split fingerprint problems into at least five layers:

```text
surface -> collector -> aggregator -> consumer -> target field or risk branch
```

Example:

```text
canvas / webgl / fonts / audio / timezone
-> collectFingerprint()
-> buildDeviceProfile()
-> riskGate() / buildBlackbox()
-> deviceId / blackbox / sensor_data / challenge branch
```

Diagnostic rules:

- Do not patch a surface before proving it is consumed.
- Do not list a dependency as mandatory before proving that aggregator output affects the target field.
- If the consumer belongs to a risk branch instead of the target builder, the problem is not a pure algorithm gap.

## 6. Fix Unstable Sources First

If these inputs are not stabilized first, later comparisons are weak:

- `Date.now()`
- `performance.now()`
- `Math.random()`
- device seed, fingerprint seed, install time, session sequence

Stabilize first, then compare intermediate values.

## 7. When the Main Problem Is Not Runtime

Runtime is not the main contradiction when:

- browser normal state and local execution both reach the same layer, but internal semantics are still unclear
- the sink is clear but the builder is hidden inside `jsvmp`, `worker`, or `wasm`
- the remaining work is to recover protocol envelope, bytecode dispatcher, or bridge semantics

Switch to `$jsr-recover` in these cases.

## 8. Completion Standard

- The problem class is clearly identified.
- The first layer where divergence appears is known.
- For fingerprint problems, consumed surfaces and removable surfaces are known.
- It is clear whether the next action is patching state, patching objects, stabilizing sources, or handling a risk branch.
