# Recovery Strategy

## 1. Recovery Is Not Full Decompilation

The core deliverables of a recovery task are usually:

- which layers wrap the target field or target business path
- which bridge layer hides the real operator
- which input and output points can serve as validation anchors

## 2. Ask Three Questions First

1. Is the obscured layer the entry, dispatcher, bridge, state carrier, or operator?
2. Does the current task need only semantic explanation, or does it already need a minimal rebuild?
3. At which layer can recovery stop while still supporting downstream locate or replay work?

## 3. Three Recovery Targets

### 1. Semantic explanation

Only answer:

- which layer is responsible for what
- which path the target value follows
- which inputs control the output

Suitable when:

- locate work comes first and another skill will use the result next
- full replay is not required immediately

### 2. Key-operator extraction

Recover only what is necessary:

- critical `opcode`
- critical serialization shell
- critical bridge function

Suitable when:

- the builder is already located
- only the core operator remains opaque

### 3. Minimal rebuild

Reassemble the required path into a smallest verifiable fragment.

Suitable when:

- input and output boundaries are already known
- stable validation samples already exist

## 4. Deny Six Dependency Classes Before Pure-Compute Migration

Even after extracting a key operator, pure-compute migration is allowed only after excluding:

1. upstream response fields
2. `HttpOnly cookie`
3. one-time challenge, nonce, or ticket
4. browser-internal state
5. fingerprint collection result
6. time window, sequence, or renewal dependency

Rule:

- If any dependency class is still open, do not write “pure computation obtained”.

## 5. VMP Recovery-Level Selection

### Level A: extract only critical `opcode`

Suitable when:

- the write-back boundary is already known
- a few `opcode` semantics are enough to explain the target field

Deliverables:

- critical `opcode` cards
- input/output comparison
- target-field formation path

### Level B: recover dispatcher plus critical state carriers

Suitable when:

- `opcode` meaning depends on dispatcher, registers, stack, or context
- critical branches cannot be judged without state flow

Deliverables:

- dispatcher loop
- critical state carriers
- `opcode` families with state flow

### Level C: minimal decompilation or minimal interpreter

Suitable when:

- multiple paths must be replayed
- protocol rebuild, batch execution, or minimal executable rebuild is needed
- levels `A` and `B` cannot support downstream work

Deliverables:

- minimal decompiled result or minimal interpreter
- validation samples for the critical path

Rule:

- Start from `A` by default. Escalate only when evidence proves that the current level is insufficient.

## 6. Black-Box Reuse Boundary

For `webpack/runtime`, `worker`, and some `wasm` wrappers, black-box reuse is often better than decompilation.

Good signals for black-box reuse:

- input and output boundaries are known
- the target module or bridge entry is found
- the main difficulty is the container shell or bridge call rather than the business operator itself

Bad signals for black-box reuse:

- the target module depends on heavy implicit shared state
- replay is unstable without recovering the state carrier
- the module itself is another `jsvmp` or deep protocol shell

Recording template:

```markdown
模块 / 桥接入口：
直接依赖模块：
runtime helper：
环境桩：
输入契约：
输出契约：
版本锚点（hash / bundle / moduleId）：
是否适合黑盒复用：是 / 否
```

## 7. Which Layer to Open First

| Symptom | First layer to open |
|---|---|
| Cannot even find the real entry | outer container |
| Large switch tables or state machines | dispatcher layer |
| Calls are visible but parameters are strange | state carrier |
| Logic appears only after worker, wasm, or lazy module callback | bridge layer |
| Write-back point is known but the algorithm is opaque | core operator |

## 8. When to Stop

Stop when any of the following becomes true:

- the target field formation path is already explained
- the bridge contract and key operator are already sufficient for downstream work
- the current recovery level already supports locate or replay work
- going deeper adds code volume without increasing conclusion quality

## 9. Completion Standard

- The current layer’s responsibility is explicit.
- Stable validation anchors exist.
- The stopping level among `A / B / C` is justified.
- For bridge and runtime shells, black-box reusability and boundary are known.
- It is clear whether the next step should return to `$jsr-locate` or `$jsr-runtime`.

