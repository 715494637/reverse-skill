# JS Reverse Automation Method Absorption Design

## Goal

Absorb the highest-value engineering methods from `项目资料/js-reverse-automation--skill-main/js-reverse-automation` into the existing reverse skill system without importing its product-specific generator chain.

## Design Decision

Use method transfer, not artifact-chain transplant.

- Keep the existing `jsr-locate / jsr-runtime / jsr-recover` split.
- Keep the existing Markdown-based reverse records and SOP templates.
- Absorb only the hard methods that improve stage control, failure handling, and runtime discipline.
- Do not import JSRPC, Flask, Burp, or automation-specific generation contracts.

## Selected Absorptions

### 1. Unified Stage Gate Contract

Every reverse stage should be defined by:

- entry condition
- required artifact
- exit condition
- failure output
- continue rule

This will be added to the reverse-engineering SOP so the workflow is contract-based instead of prose-based.

### 2. Flat Failure Object

All stage failures and partial states should use one flat structure:

- `phase`
- `code`
- `summary`
- `evidence`
- `impact`
- `next_action`

This will be adapted into the current Markdown system rather than copied as JSON output.

### 3. Canonical Handoff Block

The existing Markdown records should gain one canonical status block that downstream stages can consume without reopening prior work. The repository will not adopt `analysis_result.json`, but it will adopt the same engineering idea:

- one normalized status snapshot
- one normalized failure block
- one normalized next-action field

### 4. Runtime Anti-Debug Rule Selection

The runtime skill should absorb two high-value constraints:

- choose the narrowest matching anti-debug rule instead of broad patching
- re-validate the request chain after navigation or lifecycle patches are removed

### 5. Resolver Stability Rule

Dynamic alias or resolver-based entrypoints are acceptable only if the record explicitly states:

- wrapper chain
- resolver trigger condition
- minimum runtime preconditions
- residual risk

This should be documented as a locate/runtime rule, not as a generator concern.

## Scope

### In Scope

- `jsr-locate/SKILL.md`
- `jsr-runtime/SKILL.md`
- `jsr-recover/SKILL.md`
- `zh/jsr-locate/SKILL.md`
- `zh/jsr-runtime/SKILL.md`
- `zh/jsr-recover/SKILL.md`
- `docs/sop/reverse-engineering/README.md`
- `docs/sop/reverse-engineering/decision-matrix.md`
- `docs/sop/reverse-engineering/templates/*`
- selective supporting reference updates under `jsr-runtime/references/`

### Out of Scope

- any JSRPC / Flask / Burp generation behavior
- any new script-based build pipeline
- any new JSON artifact requirement
- any changes to unrelated repository areas

## File Strategy

### Skills

- tighten `Failure Output` to include `code`
- add explicit partial-stop rules where current language is still soft
- add runtime guidance for narrow anti-debug rule selection
- add resolver-risk recording requirements where relevant

### SOP

- define the unified stage-gate contract
- define the canonical status block
- define the normalized failure block
- define delivery gating in terms of validated upstream stage state

### Templates

- add explicit status snapshot fields
- add explicit failure block fields
- add explicit evidence-id linkage
- avoid explanatory filler and keep fields execution-oriented

## Verification Strategy

Because the repository has no project-level automated test entrypoint, verification will rely on:

- `git diff --check`
- targeted `Select-String` checks for new contract terms
- confirming `jsr-runtime` is the only skill receiving anti-debug rule-selection wiring
- checking English and Chinese mirrors for matching structure
