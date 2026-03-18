# Recovery Strategy

## Purpose / Use Boundary

`recover` is the stage that reduces shell layers around a proven boundary until the next work can proceed with a readable, callable, or testable logic contract.

Use this reference only after `locate` has already made the target request, write boundary, sink, or upstream dependency chain concrete enough for reduction work.

`recover` is not a second global workflow. It is a stage method for deciding what to open, how deep to open it, and where to stop.

## What Recover Owns

`recover` owns only the reduction work needed to make downstream work possible:

- identify the recovery target for the current boundary
- decide which layer to open first
- choose the minimum recovery level `A / B / C`
- preserve the black-box reuse boundary when decompilation is unnecessary
- record the proof that the current stop depth is already sufficient

## Default Working Model

Start from three questions:

1. Which obscured layer currently blocks progress: outer container, dispatcher, state carrier, bridge, or core operator?
2. Does the task need only semantic explanation, a key-operator slice, or a minimal rebuild?
3. At which layer can recovery stop while still supporting downstream runtime or validation work?

Default order for choosing the first opening layer:

| Symptom | First layer to open |
|---|---|
| Cannot find the real callable path yet | outer container |
| Large switch tables or VM-style flow | dispatcher layer |
| Calls are visible but parameters/state are opaque | state carrier |
| Logic appears only after `worker`, `wasm`, or loader callback | bridge layer |
| Write-back point is known but algorithm is opaque | core operator |

## Recovery Targets

Choose one target before going deeper:

### 1. Semantic explanation

Own only enough structure to answer:

- which layer is responsible for what
- which path the target value follows
- which inputs control the output

Use when downstream work needs boundary semantics, not an executable rebuild.

### 2. Key-operator extraction

Recover only the minimal opaque unit that still blocks progress, such as:

- critical `opcode`
- critical serialization shell
- critical bridge function

Use when the builder is already known and only the core operator remains hidden.

### 3. Minimal rebuild

Reassemble the required path into the smallest verifiable fragment.

Use only when input/output boundaries are already known and stable validation samples exist.

## Recovery Levels

Start from level `A` by default. Escalate only when evidence shows the current level cannot support the next stage.

### Level A: extract only critical `opcode`

Use when:

- the write-back boundary is already known
- a few `opcode` semantics are enough to explain the target field

Deliverables:

- critical `opcode` cards
- input/output comparison
- target-field formation path

### Level B: recover dispatcher plus critical state carriers

Use when:

- `opcode` meaning depends on dispatcher, registers, stack, or context
- critical branches cannot be judged without state flow

Deliverables:

- dispatcher loop
- critical state carriers
- `opcode` families with state flow

### Level C: minimal decompilation or minimal interpreter

Use when:

- multiple paths must be replayed
- protocol rebuild, batch execution, or minimal executable rebuild is required
- levels `A` and `B` cannot support downstream work

Deliverables:

- minimal decompiled result or minimal interpreter
- validation samples for the critical path

## Black-Box Reuse Boundary

For `webpack/runtime`, `worker`, and some `wasm` wrappers, black-box reuse is often better than deeper decompilation.

Good signals for black-box reuse:

- input and output boundaries are known
- the target module or bridge entry is found
- the main difficulty is the container shell or bridge call rather than the business operator itself

Bad signals for black-box reuse:

- the target module depends on heavy implicit shared state
- replay is unstable without recovering the state carrier
- the module itself is another `jsvmp` or deep protocol shell

Record the decision in compact form:

```markdown
- 复用方式：black-box reuse / deeper recovery
- 复用边界：
- 已知输入：
- 已知输出：
- 仍依赖的状态载体：
- 不继续下钻的理由：
```

## Stop / Completion Standard

`recover` can stop when one of the following is already true:

- the target-field formation path is explained well enough for downstream proof
- the bridge contract and key operator are already sufficient for runtime fit or validation
- the current recovery level already supports the next task without deeper opening
- going deeper would add code volume but not improve the conclusion

Proof is sufficient to stop only when the record can show all of the following:

- the current layer responsibility is explicit
- stable anchors exist for input, output, or bridge transition
- the chosen stop depth among `A / B / C` is justified
- black-box reuse is either ruled in or ruled out with boundary evidence
- the remaining gap is stated as a downstream runtime or validation problem, not hidden inside recovery

## Does Not Own

`recover` does not own:

- proving the real request chain from scratch
- re-running global stage routing
- classifying browser/local divergence
- defining the runtime artifact format
- claiming equivalence without checkpoint proof
- calling a path pure computation before runtime dependencies are excluded

Before claiming a pure-compute migration, the following dependency classes must already be denied elsewhere or explicitly closed in current evidence:

1. upstream response fields
2. `HttpOnly cookie`
3. one-time challenge, nonce, or ticket
4. browser-internal state
5. fingerprint collection result
6. time window, sequence, or renewal dependency
