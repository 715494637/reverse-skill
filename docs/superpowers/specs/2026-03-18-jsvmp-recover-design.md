# JSVMP Recover Enhancement Design

> **For agentic workers:** This spec defines how to strengthen JSVMP handling inside the existing single-entry `jsr-reverse` architecture. Do not introduce a new skill, a new workflow spine, or a JSVMP-specific top-level stage.

**Goal:** Strengthen the current `recover`-stage JSVMP methodology so the agent produces stable artifacts, explicit escalation decisions, and defensible handoff checkpoints instead of only general recovery advice.

**Architecture:** Keep `jsr-reverse` as the only entrypoint and keep the `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff` spine unchanged. JSVMP remains a `recover` topic reference mounted only after `recover` is chosen and its core reference is read. Enhance `jsvmp-and-ast.md` into a stronger engineering contract that defines required artifacts, `A / B / C` escalation rules, and stage transition criteria into `locate`, `runtime`, or `validation`.

**Tech Stack:** Markdown skill docs, existing `jsr-reverse` / `zh/jsr-reverse` reference structure, `docs/skill-tests` validation assets.

---

## 1. Context

The repository already has the right top-level architecture:

- `jsr-reverse/SKILL.md` routes by engineering state rather than clue words.
- the workflow spine is already `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff`.
- `recover` already owns shell reduction and enforces minimum opening depth.
- `jsvmp-and-ast.md` already defines a useful `A / B / C` ladder.

However, the current JSVMP reference is still closer to a good outline than a hard engineering contract. It tells the agent what general order to follow, but it does not yet force the agent to produce enough structured output for reliable handoff, review, or phase transition.

The current gaps are:

1. no JSVMP-specific artifact contract
2. no hard escalation triggers for `A -> B -> C`
3. no explicit `recover -> runtime` or `recover -> validation` transition criteria for JSVMP cases
4. no fixed checkpoint table that prevents “final output looks similar” reasoning

This design fills those gaps without changing the overall single-skill architecture or altering the existing `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff` spine.

## 2. Non-Goals

This change must **not**:

- add a new skill
- add a JSVMP-only top-level workflow
- add any new routed stage beyond `locate / recover / runtime / validation`; existing `intake / evidence / handoff` remain inside the single-entry `jsr-reverse` spine and are unchanged
- turn the reference into a site-specific playbook
- encourage full decompilation as the default opening move
- duplicate material that already belongs in `recover-strategy.md`

## 3. Recommended Approach

### Approach A — Strengthen the existing JSVMP topic reference (Recommended)

Modify the existing `jsvmp-and-ast.md` files so they become a stronger recover-stage engineering contract.

**Why this is recommended**

- preserves the clean `entry + references` architecture
- keeps JSVMP subordinate to stage routing instead of letting clue words dominate routing
- adds discipline without increasing the number of references the agent must choose from
- matches the repository’s current direction: workflow-first, topic-second

### Approach B — Add a second JSVMP playbook reference

Keep `jsvmp-and-ast.md` short and move all engineering detail into a new deep-dive reference.

**Why not recommended**

- increases routing complexity
- makes topic selection heavier for no strong architectural gain
- risks rebuilding the old “many docs per symptom” sprawl

### Approach C — Clarify documentation only

Update README and tests without strengthening the JSVMP reference itself.

**Why not recommended**

- improves wording, not method
- leaves the core engineering gap unresolved

## 4. Design

### 4.1 Architectural Boundary

JSVMP remains a `recover` topic, not a standalone workflow.

`recover-strategy.md` remains the recover core reference. `jsvmp-and-ast.md` remains a mounted topic reference and must not become an alternative entrypoint or a parallel core workflow.

The required routing behavior remains:

1. enter through `jsr-reverse`
2. keep the `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff` spine unchanged
3. choose the stage from engineering state
4. read the recover core reference first after `recover` is chosen
5. only then mount `jsvmp-and-ast.md` as the JSVMP topic reference

This preserves the current guardrail:

- JSVMP clues cannot bypass `locate`
- JSVMP clues cannot justify runtime work before the recover boundary is real
- JSVMP clues cannot turn into “full decompile first” behavior

### 4.2 JSVMP Artifact Contract

These cards are recover-stage artifacts for handoff and later validation. They must fit inside the existing `jsr-reverse` output and artifact model, and they do not introduce a new standalone report type, record directory, or workflow layer.

The strengthened JSVMP reference must require four artifact classes.

#### A. Entry Card

Must state:

- bytecode source
- dispatcher entry
- interpreter / execution function
- relation to the target field or target write-back path
- strongest observed anchor or evidence

Purpose: prove that recovery starts from the actual VM boundary, not from generic deobfuscation.

#### B. State Carrier Card

Must state:

- register arrays
- stack objects
- context objects
- constant pool / string table
- which carriers materially affect the target field
- which carriers only transport state without affecting the decision

Purpose: force separation between critical state and background machinery.

#### C. Critical Opcode / Branch Card

Each card must state:

- input
- output
- state mutation
- dependency
- evidence
- relation to target field / hashing / encryption / serialization / packet assembly

Purpose: keep recovery focused on the minimal opaque slice that blocks downstream work.

#### D. Recovery-Level Decision Card

Must state:

- current level: `A` / `B` / `C`
- why the current level is sufficient
- why a shallower stop depth is insufficient
- why deeper opening is not yet justified, or why it has become necessary

Purpose: make escalation reviewable instead of intuitive.

### 4.3 Escalation Rules

The reference must upgrade the existing `A / B / C` ladder from “good practice” to “hard rule”.

#### Default rule

- Start from `A`.
- Never jump to `C` only because the code is ugly, flattened, or full of string tables.

#### `A -> B`

Allowed only when one or more of the following is proven:

- a critical `opcode` cannot be interpreted without dispatcher semantics
- target-field explanation depends on register / stack / context flow
- key branches cannot be judged without state-carrier recovery

#### `B -> C`

Allowed only when one or more of the following is proven:

- downstream work requires replay of multiple execution paths
- protocol rebuild or batch execution requires a minimal executable fragment
- levels `A` and `B` still cannot support runtime fit or validation checkpoints

### 4.4 Stage Transition Criteria

#### `recover -> locate`

The strengthened JSVMP reference must explicitly tell the agent to stop deeper VM recovery and route the remaining blocker back to `locate` when:

- the dispatcher entry cannot yet be proven to be relevant to the target field or target write-back path
- the supposed VM entry is still a guess rather than an observed boundary anchor
- the relation between the recovered VM slice and the real target write-back path is still unproven
- deeper VM work would continue on an unproven boundary instead of closing evidence

This preserves the existing architecture where recover can hand work back to locate when the boundary turns out not to be real enough.

#### `recover -> runtime`

The JSVMP reference must explicitly tell the agent to stop deeper VM recovery and route the remaining blocker to `runtime` when:

- the bridge contract is already clear
- the critical operator or `opcode` family is already sufficient to explain the algorithm boundary
- the remaining divergence is caused by environment facts, lifecycle state, timing, or risk branches
- deeper VM work would add code volume without explaining the execution divergence

This prevents “keep digging the VM forever” behavior when the real issue is runtime fit.

#### `recover -> validation`

The JSVMP reference must explicitly tell the agent to stop recovery and route to `validation` when:

- dispatcher entry is known
- state carriers are known
- critical `opcode` / branches related to the target field are extracted
- the chosen stop level among `A / B / C` is justified
- fixed samples exist for checkpoint comparison

This prevents recovery from swallowing proof work.

### 4.5 JSVMP Checkpoint Contract

The strengthened reference must define a fixed checkpoint set for validation-oriented handoff.

Suggested checkpoints:

1. dispatcher entry state
2. critical state-carrier transition
3. critical `opcode` input / output
4. pre-write-back intermediate result
5. final target field

For each checkpoint, the agent must be able to state:

- fixed input sample
- browser-side evidence
- recovered / local-side evidence
- conclusion: match / diverge / unproven
- remaining gap

This prevents “looks similar” claims with no intermediate proof.

### 4.6 Misjudgment / Forbidden Moves

The updated reference should add stronger prohibitions against these mistakes:

- treating dispatcher recovery as completion by itself
- treating string-table recovery as algorithm recovery
- selecting level `C` because the code style is unpleasant
- continuing deeper VM recovery when the remaining blocker is clearly runtime divergence
- claiming “pure algorithm” before state and runtime dependencies are actually excluded

## 5. File-Level Changes

### 5.1 `jsr-reverse/references/jsvmp-and-ast.md`

Primary change target.

Do not define a new top-level document workflow, standalone report type, or record directory for JSVMP cards.

Add or strengthen:

- purpose / use boundary
- required artifact contract
- explicit `A / B / C` escalation triggers
- `recover -> runtime` criteria
- `recover -> validation` criteria
- checkpoint handoff table
- stronger misjudgment / forbidden-move section

Keep the file focused on JSVMP / AST recover. Do not duplicate generic recover ownership that already belongs in `recover-strategy.md` except where needed to anchor the JSVMP-specific behavior.

### 5.2 `zh/jsr-reverse/references/jsvmp-and-ast.md`

Mirror the English structure.

The Chinese version should preserve the same engineering constraints and handoff discipline, not become a looser explanatory paraphrase.

### 5.3 `docs/skill-tests/jsr-recover-shell.md`

Strengthen the expected skilled behavior so the test validates more than “agent entered recover”.

Expected behavior after this change:

- read `jsr-reverse/SKILL.md`
- read `jsr-reverse/references/recover-strategy.md`
- read `jsr-reverse/references/jsvmp-and-ast.md`
- state a current recovery level decision (`A / B / C`)
- output required artifacts or checkpoints, not only generic prose
- justify when the remaining blocker should move to `runtime`
- justify when checkpoint readiness is sufficient to move to `validation`
- preserve the possibility of returning to `locate` when VM entry relevance or write-back relation is still unproven

## 6. Acceptance Criteria

The change is successful when all of the following are true:

1. The existing `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff` spine remains unchanged.
2. JSVMP is still routed only after `recover` is selected from engineering state.
3. The JSVMP reference is mounted only after `recover` is chosen, and only after the recover core reference is read; it does not become an alternative entrypoint or parallel core workflow.
4. The JSVMP reference explicitly requires entry/state/opcode/level-decision artifacts.
5. The JSVMP reference has hard escalation triggers for `A -> B -> C`.
6. The JSVMP reference explicitly preserves the ability to route back to `locate` when VM entry relevance or target write-back relation is not yet proven.
7. The JSVMP reference explicitly states when to stop recovery and move to `runtime`.
8. The JSVMP reference explicitly states when to stop recovery and move to `validation`.
9. `docs/skill-tests/jsr-recover-shell.md` explicitly checks for an `A / B / C` level decision.
10. The skill test explicitly checks for artifact/checkpoint output, not just recover-stage wording.
11. The skill test explicitly checks that runtime transition is justified by divergence type, validation transition is justified by checkpoint readiness, and fallback to `locate` remains possible when the boundary is unproven.
12. No new skill or new workflow spine is introduced.

## 7. Test Strategy

### Manual doc validation

Read the updated English and Chinese references and verify that each contains:

- artifact contract
- escalation criteria
- runtime handoff criteria
- validation handoff criteria
- checkpoint contract

### Skill-test validation

Use `docs/skill-tests/jsr-recover-shell.md` and verify that its pass/fail criteria explicitly require a skilled run to:

- route to `recover`
- read the recover core reference first
- mount the JSVMP topic reference second
- output an `A / B / C` decision
- output concrete artifacts/checkpoints for handoff
- justify when the remaining blocker should move to `runtime`
- justify when checkpoint readiness is sufficient to move to `validation`
- preserve the possibility of falling back to `locate` when VM entry relevance or write-back relation is still unproven

## 8. Risks and Controls

### Risk: overgrowing the JSVMP reference

Control:

- keep generic recover rules in `recover-strategy.md`
- put only JSVMP-specific constraints in `jsvmp-and-ast.md`

### Risk: accidentally creating a parallel workflow

Control:

- repeat in the reference that JSVMP is a mounted recover topic only
- do not add independent intake, evidence, or routing sections

### Risk: agents still skip to deep decompilation

Control:

- make `A` the explicit default
- make `C` require positive evidence, not discomfort with the code

## 9. Implementation Handoff

When implementation begins, keep the work narrowly scoped to these files:

- `jsr-reverse/references/jsvmp-and-ast.md`
- `zh/jsr-reverse/references/jsvmp-and-ast.md`
- `docs/skill-tests/jsr-recover-shell.md`

Do not expand the change into additional files unless a separate architecture review explicitly requires it.
