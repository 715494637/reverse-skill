# Sdenv Runtime Absorption Design

**Goal:** Absorb the high-value runtime-engineering patterns from `项目资料/sdenv-main` into `jsr-runtime` and the reverse-engineering SOP without importing tutorial material or model-inferable knowledge.

**Scope:** Documentation only. Update `jsr-runtime`, selected runtime references, the reverse-engineering SOP, and the runtime/delivery templates. Keep the change focused on runtime routing, fit checks, and runtime acceptance.

**Non-Goals:**
- Do not add a new standalone skill.
- Do not merge `sdenv` source code, examples, or generic browser-mocking advice into the skill.
- Do not expand into `jsr-locate` or `jsr-recover` in this phase.

## Absorption Targets

Only absorb the parts of `sdenv-main` that are specific, high-signal, and operational:

- runtime fit check before investing in migration
- pre-script injection order (`beforeParse`)
- route split between local replay, remote passive, and remote active execution
- navigation or exit event as the state-production completion signal
- second-hop validation using produced state
- single high-fidelity browser profile instead of broad multi-profile simulation
- surface-level fidelity checks for patched browser APIs

## File Targets

### Skill Layer

- `jsr-runtime/SKILL.md`
- `jsr-runtime/references/minimal-env-design.md`
- `jsr-runtime/references/anti-debug-and-risk-branches.md`
- `jsr-runtime/references/record-overview-and-validation.md`
- `jsr-runtime/references/sdenv-fit-check-and-routing.md` (new)
- Chinese mirrors under `zh/jsr-runtime/`

### SOP Layer

- `docs/sop/reverse-engineering/README.md`
- `docs/sop/reverse-engineering/decision-matrix.md`
- `docs/sop/reverse-engineering/templates/运行态清单.md`
- `docs/sop/reverse-engineering/templates/交付清单.md`

## Design Decisions

### 1. Add a dedicated `sdenv` runtime reference

Reason:
- `sdenv` contributes a distinct routing and validation model, not just more runtime examples.
- Merging these rules into the anti-debug reference would blur concerns and make future maintenance worse.

The new reference will own:
- fit-check signals
- route selection: local / remote passive / remote active
- injection-point recording
- state-close signal recording
- second-hop validation requirements
- delivery restrictions for `sdenv`-based artifacts

### 2. Keep `jsr-runtime` thin

`jsr-runtime/SKILL.md` should only:
- add the new trigger conditions
- require the new reference when the target matches the `sdenv` route
- make the new deliverables explicit

It should not embed example flows or long-form explanations.

### 3. Extend the SOP only at routing and acceptance points

The SOP should not become a `sdenv` playbook. It should only:
- recognize `sdenv`-shaped runtime problems
- require fit-check and route classification before runtime delivery
- require state-production validation before allowing `sdenv` output

### 4. Keep templates evidence-first

New runtime-template fields must support action or acceptance. Keep only fields for:
- fit-check result
- execution mode
- injection point
- state-close signal
- second-hop validation

Do not add theory, environment background, or generic browser notes.

## Acceptance Criteria

This absorption is successful only if:

- `jsr-runtime` can explicitly route `sdenv`-shaped tasks
- runtime records can capture local vs remote passive vs remote active execution
- runtime records can capture the exact state-production signal and second-hop validation
- the SOP blocks `sdenv` delivery until fit-check and validation are both present
- no added section reads like a tutorial or generic browser-environment primer
