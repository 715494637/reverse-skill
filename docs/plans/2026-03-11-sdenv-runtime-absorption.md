# Sdenv Runtime Absorption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `sdenv`-specific runtime routing, fit-check, and validation rules to `jsr-runtime` and the reverse-engineering SOP.

**Architecture:** Keep `jsr-runtime` as the thin entrypoint, move `sdenv`-specific rules into a new runtime reference, and expose only the routing and acceptance contract in the SOP. Update the runtime and delivery templates so records can hold the new fit-check and state-close evidence.

**Tech Stack:** Markdown documentation, skill references, SOP templates

---

### Task 1: Write the sdenv absorption design artifacts

**Files:**
- Create: `docs/plans/2026-03-11-sdenv-runtime-absorption-design.md`
- Create: `docs/plans/2026-03-11-sdenv-runtime-absorption.md`

**Step 1: Record scope and boundaries**

Write the design doc with:
- absorption targets
- file targets
- design decisions
- acceptance criteria

**Step 2: Record implementation steps**

Write this plan with exact file paths and verification steps.

**Step 3: Verify both plan files exist**

Run: `Get-ChildItem docs/plans/2026-03-11-sdenv-runtime-absorption*`
Expected: both files listed

### Task 2: Update the runtime skill contract

**Files:**
- Modify: `jsr-runtime/SKILL.md`
- Modify: `zh/jsr-runtime/SKILL.md`

**Step 1: Add sdenv trigger and reference loading**

Require the new runtime reference when the task involves:
- 瑞数-like state generation
- `sdenv` fit checks
- offline html/js/ts replay
- remote passive or active jsdom execution

**Step 2: Extend default order and deliverables**

Add:
- runtime fit check before route selection
- explicit execution-mode classification
- state-close signal and second-hop validation in deliverables

**Step 3: Verify the new sections are wired**

Run: `Select-String -Path jsr-runtime/SKILL.md,zh/jsr-runtime/SKILL.md -Pattern 'sdenv-fit-check-and-routing','fit check','执行模式','second-hop','二跳验证'`
Expected: both files contain the new triggers and deliverables

### Task 3: Add and wire the sdenv runtime reference

**Files:**
- Create: `jsr-runtime/references/sdenv-fit-check-and-routing.md`
- Create: `zh/jsr-runtime/references/sdenv-fit-check-and-routing.md`
- Modify: `jsr-runtime/references/minimal-env-design.md`
- Modify: `zh/jsr-runtime/references/minimal-env-design.md`
- Modify: `jsr-runtime/references/anti-debug-and-risk-branches.md`
- Modify: `zh/jsr-runtime/references/anti-debug-and-risk-branches.md`
- Modify: `jsr-runtime/references/record-overview-and-validation.md`
- Modify: `zh/jsr-runtime/references/record-overview-and-validation.md`

**Step 1: Write the dedicated sdenv reference**

Cover:
- fit-check signals
- route selection
- injection point
- state-close signal
- second-hop validation
- high-fidelity profile rule

**Step 2: Update shared runtime references**

Add only the pieces that belong in shared runtime contracts:
- `minimal-env-design.md`: route and fit-check fields
- `anti-debug-and-risk-branches.md`: lifecycle patch re-validation remains explicit
- `record-overview-and-validation.md`: status or validation skeleton supports fit-check and state-close evidence

**Step 3: Verify reference wiring**

Run: `Select-String -Path jsr-runtime/references/*.md,zh/jsr-runtime/references/*.md -Pattern 'fit check','执行模式','state-close','状态闭合','sdenv'`
Expected: the new reference exists and the shared references expose only the intended contract fields

### Task 4: Update the reverse-engineering SOP and templates

**Files:**
- Modify: `docs/sop/reverse-engineering/README.md`
- Modify: `docs/sop/reverse-engineering/decision-matrix.md`
- Modify: `docs/sop/reverse-engineering/templates/运行态清单.md`
- Modify: `docs/sop/reverse-engineering/templates/交付清单.md`

**Step 1: Update SOP routing**

Make the SOP recognize:
- `sdenv` fit-check as part of runtime entry
- runtime route split between local / remote passive / remote active
- delivery block until fit-check and second-hop validation are complete

**Step 2: Update templates**

Add only these new runtime fields:
- fit-check
- execution mode
- injection point
- state-close signal
- second-hop validation

Add delivery preconditions for `sdenv` artifacts only when relevant.

**Step 3: Verify SOP keywords**

Run: `Select-String -Path docs/sop/reverse-engineering/README.md,docs/sop/reverse-engineering/decision-matrix.md,docs/sop/reverse-engineering/templates/运行态清单.md,docs/sop/reverse-engineering/templates/交付清单.md -Pattern 'sdenv','fit check','执行模式','状态闭合','二跳验证'`
Expected: all relevant files mention only the intended runtime-specific fields

### Task 5: Validate and sync

**Files:**
- Modify: only the files above

**Step 1: Run whitespace and patch checks**

Run: `git diff --check -- docs/plans/2026-03-11-sdenv-runtime-absorption-design.md docs/plans/2026-03-11-sdenv-runtime-absorption.md docs/sop/reverse-engineering jsr-runtime zh/jsr-runtime`
Expected: no whitespace or conflict errors

**Step 2: Run a documentation quality scan**

Run a keyword scan for unwanted low-signal sections such as:
- `原理`
- `教程`
- `背景介绍`
- `可能是`

Expected: no new tutorial-style filler introduced in the touched files.

**Step 3: Compare worktree changes before sync**

Run: `git status --short`
Expected: only the planned files are changed or added

**Step 4: Sync touched files back to the main workspace**

Copy only the touched files from the worktree into the main workspace, preserving unrelated dirty files.
