# Toolkit Absorption Design

**Goal:** Absorb the judgment-heavy parts of `ai-reverse-toolkit-main` into the existing reverse skills without bloating `jsr-locate` or `jsr-recover`.

**Scope:** Update `jsr-locate`, `jsr-recover`, and their `zh/` mirrors. Add two new focused references and wire them into the matching skills. Do not modify `jsr-runtime`.

**Non-Goals:**
- Do not import the toolkit repository wholesale.
- Do not copy generic crypto tables, JS/Python syntax mappings, MCP command cheatsheets, or FAQ material.
- Do not create new standalone skills in this phase.
- Do not redesign the current `reverse-records` contract.

## Design Principles

- Absorb techniques, not narrative.
- Keep the main `SKILL.md` thin and trigger-oriented.
- Put specialized procedures into dedicated references.
- Preserve current skill boundaries: locate owns entry proof, recover owns semantic recovery, runtime remains unchanged.
- Prefer evidence-bearing instructions over generic reverse-engineering background.

## What Gets Absorbed

### Into `jsr-locate`

Source:
- `项目资料/ai-reverse-toolkit-main/skills/find-crypto-entry/SKILL.md`

Absorbed content:
- live-request-first locating order
- `request -> initiator/call stack -> candidate frame -> argument proof`
- fallback order when initiator is unavailable
- stack filtering between framework noise, security SDKs, and business frames
- explicit stop rule: locating the entry is enough; do not drift into full algorithm recovery

Target files:
- `jsr-locate/SKILL.md`
- `zh/jsr-locate/SKILL.md`
- `jsr-locate/references/crypto-entry-locating.md`
- `zh/jsr-locate/references/crypto-entry-locating.md`

### Into `jsr-recover`

Source:
- `项目资料/ai-reverse-toolkit-main/skills/ast-deobfuscate/SKILL.md`

Absorbed content:
- obfuscation fingerprinting before transform selection
- ordered AST recovery path
- bundle unpacking as a pre-recovery move when required
- transform ledger discipline: each step needs input, output, preserved invariant, and validation evidence
- stop rules against beautify-only completion

Target files:
- `jsr-recover/SKILL.md`
- `zh/jsr-recover/SKILL.md`
- `jsr-recover/references/ast-deobfuscation-playbook.md`
- `zh/jsr-recover/references/ast-deobfuscation-playbook.md`

## What Stays Out

These toolkit parts remain outside the skills:

- generic algorithm-identification tables from `rules/js-reverse.md`
- JS-to-Python syntax mapping
- MCP command tables
- tutorial-style FAQ blocks
- project-local workflow details that assume `source/`, `scripts/`, or `intermediate/` folders

## Integration Shape

### `jsr-locate/SKILL.md`

Add:
- one new core-principle bullet for live-request-first entry locating
- one new reference-loading bullet for `crypto-entry-locating.md`
- one short operating-order bullet that points entry-location tasks to the new reference

### `jsr-recover/SKILL.md`

Add:
- one new core-principle bullet for transform ordering and per-step validation
- one new reference-loading bullet for `ast-deobfuscation-playbook.md`
- one short default-order bullet that points AST-heavy recovery tasks to the new reference

### New Reference: `crypto-entry-locating.md`

Must cover:
- when to use it
- preferred path: request -> initiator -> stack -> frame -> argument proof
- fallback path: static search -> targeted breakpoint -> hook confirmation
- stack triage rules
- completion standard
- common missteps

### New Reference: `ast-deobfuscation-playbook.md`

Must cover:
- when to use it
- fingerprint-first triage
- ordered transform path
- bundle-unpack decision
- transform ledger fields
- completion standard
- common missteps

## Acceptance Criteria

The absorption is complete only if:

- the main `SKILL.md` files stay thin
- the new content is discoverable from trigger text and reference-loading rules
- the new references are focused and non-overlapping
- no generic reverse-engineering filler from the toolkit is copied into the skills
- `zh/` mirrors match the same structure and decisions

## Verification Strategy

- inspect the final diff for only the intended eight files
- check that `jsr-runtime` remains untouched
- verify the new references can answer one pressure scenario each:
  - find a signature/header/token entry from a live request
  - recover an AST-obfuscated shell with ordered transforms and checkpoints
