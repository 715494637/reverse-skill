---
name: jsr-reverse
description: Use when a Web JS reverse task has unclear phase selection, mixed source-chain and shell blockers, runtime divergence, validation-only work, or RS/瑞数 clues such as 412, cookie hops, sign, token, JSVMP, worker, wasm, hasDebug, or basearr.
---

# JSR Reverse

## Role & Mission

`jsr-reverse` remains the default entry skill for Web JS reverse work.

Its mission is to run this workflow spine:

`intake -> evidence -> locate -> recover -> runtime -> validation -> handoff`

Use it to:

- choose the next step from the current project state, not from clue words alone
- keep `evidence` and `handoff` inside `jsr-reverse`, not as separate skills
- route only into `locate`, `recover`, `runtime`, or `validation`
- point to the smallest reference set needed right now

Clues such as `412`, `token`, `worker`, `basearr`, `protobuf`, `JSVMP`, `wasm`, or `hasDebug` can help choose supporting references, but they do not replace stage selection.

## Workflow Spine

1. `intake`: normalize the request, target, trigger, goal, and constraints.
2. `evidence`: prove the real request chain and update the project record before stage routing.
3. `locate`: prove the write boundary, sink, and upstream dependency chain.
4. `recover`: reduce the shell until the relevant logic contract is readable and operable.
5. `runtime`: explain browser/local divergence and fit the minimum runtime dependency set.
6. `validation`: prove equivalence, checkpoints, and final consistency.
7. `handoff`: output the current stage decision and required artifact update.

Fast triage is allowed, but only to accelerate stage choice inside this spine. It must not replace the spine.

## Intake Contract

Start from this block:

```text
URL or target page:
Target request / field / cookie / message:
Trigger action:
Current symptom:
Known evidence:
Goal:
Constraints:
```

### Complexity Grading

After intake, assign a complexity level to calibrate effort and expected stage coverage:

| Level | Label | Characteristics | Expected stages |
|---|---|---|---|
| **L1** | Transparent chain | Parameters are visible concatenations or plain mappings; no obfuscation; no environment dependency | locate → validation |
| **L2** | Single-layer shell | Simple obfuscation or webpack bundle wrapping; one crypto call; no environment checks | locate → recover → validation |
| **L3** | Multi-layer shell + env | JSVMP / wasm / worker bridge + environment-dependent branching; anti-debug present | Full spine: locate → recover → runtime → validation |
| **L4** | Adversarial protection | Multi-hop cookies + dynamic code generation + anti-debug + environment fingerprinting + risk branches (e.g., RS/瑞数, certain captcha SDKs) | Full spine with multiple iterations; expect stage regressions |

Rules:

- Grade at intake, but **revise upward** if later evidence reveals hidden complexity. Never revise downward without proof.
- L1/L2 tasks may use compact handoff cards and skip recover/runtime annotations in the artifact.
- L3/L4 tasks must use full handoff cards and full artifact lifecycle.
- The grade is a calibration signal, not a routing override. Stage selection still follows engineering state, not the grade.

After intake, summarize the engineering state in plain terms:

- Is the target request real and captured, or still guessed?
- Is the upstream dependency chain real, partial, or unknown?
- Is the write boundary proven, near-but-hidden, or not yet found?
- Is the main blocker shell reduction, runtime divergence, or checkpoint proof?
- What artifact must be updated next?

## Evidence Gate

Run this gate before routed stage selection whenever any of the following is true:

- the target request is not identified from a real sample
- the upstream dependency chain is still guessed
- the trigger action is known but the request evidence is not yet recorded
- the current task mixes multiple hypotheses but no request-chain record resolves them

This gate stays inside `jsr-reverse`, not as a separate skill.

When the gate runs, update `reverse-records/请求链路.md` before choosing a routed stage.

The exact Request Chain Judgment format and recording details belong to `references/request-chain-recording.md`.

## Stage Contracts

### `locate`

**Purpose**

Prove the real write boundary, sink, and upstream state chain for the target request, field, cookie, or message.

**Enter when**

- the target request or sink is still unproven
- the upstream dependency chain is incomplete
- the write boundary is guessed rather than observed
- current evidence says “we still do not know where or how the value is written”

**Do**

- confirm the live request chain and initiator path
- narrow to the smallest boundary that writes the target value
- identify which upstream state transitions matter and which do not
- update `reverse-records/请求链路.md` when the request chain becomes clearer

**Produce**

- a real target request sample
- a proven sink or write boundary
- an upstream dependency chain that is concrete enough for downstream work

**Exit when**

The sink and upstream chain are real enough that the next blocker is shell reduction, not request discovery.

**Do not enter if**

- the main blocker is already proven to be runtime divergence after the sink/shell boundary is clear
- the work is already reduced to equivalence proof only

**Do not do**

- broad deobfuscation before the write boundary is real
- environment patching while the sink is still guessed

### `recover`

**Purpose**

Reduce the shell around a proven boundary until the logic contract needed for continuation is readable, traceable, or callable.

**Enter when**

- the sink or write boundary is already near and real
- the next blocker is obfuscation, dispatcher structure, packed helpers, `worker`, `wasm`, webpack bootstrap, protocol envelope, or similar shell logic
- the project no longer needs request discovery first

**Do**

- strip or bypass only the shell layers that block downstream understanding
- recover helper, dispatcher, bridge, protocol, or loader contracts needed for continuation
- keep the reduction minimal and oriented around the proven boundary

**Produce**

- a reduced shell or recovered contract
- the smallest callable or inspectable logic slice needed for runtime or validation

**Exit when**

The shell is reduced enough that the next blocker is environment fit or consistency proof, not code hiding.

**Do not enter if**

- the real write boundary is still not proven
- the task is primarily about first divergence under browser/local execution

**Do not do**

- full decompilation when a bridge contract or operator slice is enough
- topic-driven recovery work that is not connected to the current boundary

### `runtime`

**Purpose**

Explain and close the first meaningful divergence between browser execution and local or controlled execution.

**Enter when**

- the sink and shell boundary are already clear enough
- browser and local execution diverge in state, timing, branch, or environment facts
- the next question is which minimum runtime facts must be fitted

**Do**

- identify the first real divergence point
- determine the minimum dependency set required to keep execution aligned
- distinguish lifecycle-produced facts from patchable surface facts
- treat runtime as last-mile fit when the user wants to avoid heavy environment patching

**Produce**

- a first-divergence explanation
- a minimum runtime dependency set
- a justified route for replay, patch, browser-assisted execution, or staged validation

**Exit when**

The runtime divergence is explained and the remaining work is equivalence proof or final consistency checking.

**Do not enter if**

- the sink or shell boundary is still guessed
- the task still needs request-chain proof or shell reduction first

**Do not do**

- blind patch stacking without proving the first divergence
- expanding runtime work into general reverse if a smaller fit is enough

### `validation`

**Purpose**

Prove that the recovered path, runtime fit, or reproduced output is defensible at the checkpoint and final-output levels.

**Enter when**

- the main blocker is no longer discovery, reduction, or runtime fit
- the work now needs checkpoint proof, equivalence proof, or final consistency proof
- the task is validation-only

**Do**

- compare concrete checkpoints, not just the last output
- prove where outputs match, diverge, or remain unproven
- define the artifact or evidence needed to close the remaining proof gap

**Produce**

- a defensible equivalence or non-equivalence statement
- concrete checkpoints and conclusions for handoff

**Exit when**

The proof is concrete enough for handoff and the next reader can see what is solved versus still open.

**Do not enter if**

- the project still lacks a real request chain, sink, shell reduction, or runtime explanation

**Do not do**

- accept final output similarity while intermediate checkpoints disagree
- hide uncertainty when the compared evidence is incomplete

## Routing Rules

Routing is always two-step.

### Step 1: choose the stage from engineering state

Pick the stage from the current project state:

- choose `locate` when request reality, sink, or upstream chain is still unproven
- choose `recover` when the boundary is proven but a shell still hides the usable logic contract
- choose `runtime` when boundary and shell are clear enough but execution diverges across environments
- choose `validation` when the remaining work is proof, comparison, or checkpoint closure

Quick examples:

- `412`, `403`, cookie hops, or `token` clues still route to `locate` if the real chain is not yet proven
- `worker`, `wasm`, `protobuf`, or `JSVMP` clues route to `recover` only if the task has already crossed the locate boundary
- `basearr` or `hasDebug` clues route to `runtime` only if the boundary is already clear and the issue is environment divergence

### Step 2: pick the smallest reference set for that stage

After the stage is chosen, read:

- exactly 1 core reference for the stage
- plus at most 1-2 topic references that match the current blocker

Do not reverse this order. Do not pick references first and infer the stage afterward.

If new evidence closes `locate` and the next blocker becomes shell reduction, helper contracts, dispatcher flow, or opaque object structure, switch to `recover` immediately in the same turn.

After every stage switch:

1. Output a handoff card per `references/stage-handoff-protocol.md` before the new stage's output contract.
2. Reload the new stage's core reference and topic references before proposing the next debugging action. References from the previous stage do not satisfy the new stage.

## Topic Mount Rules

Choose topic references after the stage is selected. Use the evidence artifact reference separately when the evidence gate runs.

### Core references by stage

- `locate` core: `references/locate-workflow.md`
- `recover` core: `references/recover-strategy.md`
- `runtime` core: `references/runtime-diagnosis.md`
- `validation` core: `references/equivalence-and-validation.md`

### Evidence artifact support

- `references/request-chain-recording.md` when the evidence gate runs or `reverse-records/请求链路.md` must be updated. This is the evidence artifact reference, not a topic mount.

### Cross-stage references

- `references/stage-handoff-protocol.md` at every stage boundary crossing — mandatory, not optional
- `references/anti-patterns.md` when a wrong-path pattern is suspected or as a pre-check before committing to an investigation direction

### Topic mount policy

Read the core ref first, then add at most 1-2 topic refs that match the current blocker:

- `references/crypto-entry-locating.md` for `sign`, `token`, dynamic headers, or encrypted request fields during `locate`
- `references/hook-and-boundary-patterns.md` for hook, breakpoint, initiator, or boundary observation during `locate`
- `references/jsvmp-and-ast.md` for `JSVMP`, dispatcher loops, flattening, or AST-heavy shells during `recover`
- `references/ast-deobfuscation-playbook.md` for string-table recovery, helper inlining, AST transforms, or bundle unpacking during `recover`
- `references/wasm-worker-webpack.md` for `worker`, `wasm`, `webpack/runtime`, bootstrap, or loader logic during `recover`
- `references/protocol-and-long-connection.md` for WebSocket, protobuf, SSE, heartbeat, ack, or renewal as a cross-stage topic after stage selection
- `references/anti-debug-and-risk-branches.md` for anti-debugging or branch flips during `runtime`
- `references/minimal-env-design.md` for minimum environment design during `runtime`
- `references/sdenv-fit-check-and-routing.md` for lifecycle-produced state, navigation-produced state, or replay routing during `runtime`

Breakpoint-hit inspection belongs to `locate` only while the team is still proving the real write boundary. Once the active chain is already real and the next move is a targeted step-into across helpers such as `_$jR -> _$cg` to recover `_$_U`, `_$$j`, dispatcher, or bridge contracts, restage to `recover` first and mount `references/recover-strategy.md`, then the matching topic reference.

### RS / 瑞数 mount policy

RS clues do not replace stage selection.

- `412`, `403`, challenge pages, `meta[r=m]`, `r2mKa`, `$_ts`, `$_ts.l__`, first-hop / second-hop cookies, `hasDebug`, and `basearr` are signals for choosing a supporting ref
- after the stage is chosen, add the smallest RS reference that fits that stage:
  - `references/rs-collection-and-two-hop-routing.md` during `locate`
  - `references/rs-recovery-anchors.md` during `recover`
  - `references/rs-runtime-and-basearr-fit.md` during `runtime`

Protocol can appear in more than one stage. Add its reference only after the stage is already selected.

## Record & Handoff Rules

- If the evidence gate runs, update `reverse-records/请求链路.md` before routed-stage output.
- At every stage switch, output a handoff card per `references/stage-handoff-protocol.md`. L1/L2 tasks may use compact mode; L3/L4 must use full format.
- Repeat the stage output only when the stage changes or the request evidence materially changes.
- If a topic mount changes the current investigation path, repeat the stage output and update the current artifact before handoff.
- Current artifact: `reverse-records/请求链路.md`.
- Keep the handoff tied to the current artifact, not to a clue list.
- Only reference `jsr-reverse/references/*`.

## Output Contract

Always output this block after routing:

```text
Complexity: L{1-4}
Current stage:
Why this stage now:
Read now:
Required artifact:
Exit condition:
```

Requirements:

- `Complexity` must be assigned at intake and revised upward if later evidence reveals hidden complexity.
- `Why this stage now` must explain the engineering state, not just clue words.
- `Read now` must contain exactly 1 core reference plus at most 1-2 topic references.
- `Required artifact` must point to the artifact or stage output that must be updated next.
- If the evidence gate ran, keep `Required artifact` as `reverse-records/请求链路.md` and append the current stage conclusion there.

## Examples

```text
Current stage: locate
Why this stage now: The target request is still partly guessed, the upstream cookie dependency is not yet proven from a real capture, and the team does not have a stable write boundary for the token field.
Read now: references/locate-workflow.md + references/request-chain-recording.md + references/crypto-entry-locating.md
Required artifact: reverse-records/请求链路.md
Exit condition: The target request, upstream dependency chain, and token write boundary are all proven from real evidence.
```

```text
Current stage: recover
Why this stage now: The request chain and write boundary are already real, but the usable logic is still hidden behind a worker bootstrap and packed helper layer, so the next blocker is shell reduction rather than runtime fit.
Read now: references/recover-strategy.md + references/wasm-worker-webpack.md
Required artifact: recovered worker/bootstrap contract for the target boundary
Exit condition: The shell is reduced enough that the next blocker is runtime fit or validation, not hidden control flow.
```

```text
Current stage: runtime
Why this stage now: The sink and shell boundary are already clear, but local execution diverges at a fixed environment-dependent branch after browser lifecycle state is consumed.
Read now: references/runtime-diagnosis.md + references/minimal-env-design.md + references/rs-runtime-and-basearr-fit.md
Required artifact: first-divergence note and minimum runtime dependency set
Exit condition: The first divergence and minimum fit set are concrete enough to move into validation.
```

## Guardrails

- Do not start from broad source grep when a live request and initiator chain already exist.
- Do not skip the evidence gate when the real request chain is still guessed.
- Do not let `412`, `token`, `worker`, `basearr`, `protobuf`, or other clue words choose the stage by themselves.
- Do not jump into runtime patching while the write boundary is still unproven.
- Do not fully decompile a shell when a bridge contract or operator slice is enough.
- Do not treat RS first-hop material as complete until second-hop consumption is checked.
- Do not treat a final output match as sufficient when intermediate checkpoints disagree.
- Do not continue targeted step-into, helper-contract recovery, or object-structure补全 under a `locate` frame once the boundary is already proven; restage to `recover` first.
- Update `reverse-records/请求链路.md` immediately after each request-chain capture or material change.
- Keep topic refs minimal; do not turn this skill into a reference encyclopedia.
