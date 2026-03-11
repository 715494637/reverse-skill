# Chinese Contract Unification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify Chinese-facing reverse-engineering contracts so the central SOP templates are canonical, Chinese field labels are consistent, and stage references no longer define competing record schemas.

**Architecture:** First fix the central contract layer in `docs/sop/reverse-engineering`, then align locate/runtime/recover references to that contract, then update skill entry/record ownership language so every stage points to the same files and field vocabulary.

**Tech Stack:** Markdown documentation, skill contracts, SOP templates

---

### Task 1: Record the new canonical contract

**Files:**
- Create: `docs/plans/2026-03-11-chinese-contract-unification-design.md`
- Create: `docs/plans/2026-03-11-chinese-contract-unification.md`

**Step 1: Write the design document**

Document:
- central-template authority
- Chinese field-name policy
- runtime filename unification
- request/runtime/recovery template upgrades

**Step 2: Verify both plan files exist**

Run: `Get-ChildItem docs/plans/2026-03-11-chinese-contract-unification*`
Expected: both files listed

### Task 2: Make the central SOP and templates canonical

**Files:**
- Modify: `docs/sop/reverse-engineering/README.md`
- Modify: `docs/sop/reverse-engineering/decision-matrix.md`
- Modify: `docs/sop/reverse-engineering/templates/任务卡.md`
- Modify: `docs/sop/reverse-engineering/templates/请求链路.md`
- Modify: `docs/sop/reverse-engineering/templates/运行态清单.md`
- Modify: `docs/sop/reverse-engineering/templates/恢复记录.md`
- Modify: `docs/sop/reverse-engineering/templates/验证记录.md`
- Modify: `docs/sop/reverse-engineering/templates/交付清单.md`

**Step 1: Convert Chinese-facing fields and enums**

Update:
- stage names
- status enums
- status-block fields
- failure-object fields
- table headers

**Step 2: Strengthen the canonical templates**

Update:
- `请求链路.md` to full request-block form
- `运行态清单.md` to include route, removability, and pure-compute checks
- `恢复记录.md` to include recovery level and stop reason
- `验证记录.md` to be the single canonical validation template

**Step 3: Reconcile SOP wording with the stronger templates**

Ensure:
- central templates are named as the canonical schema source
- runtime filename is only `运行态清单.md`
- stage gates and file ownership refer to the strengthened artifacts

### Task 3: Remove competing schemas from locate/runtime/recover references

**Files:**
- Modify: `jsr-locate/references/request-chain-recording.md`
- Modify: `jsr-locate/references/record-overview-and-validation.md`
- Modify: `jsr-runtime/references/minimal-env-design.md`
- Modify: `jsr-runtime/references/record-overview-and-validation.md`
- Modify: `jsr-recover/references/record-overview-and-validation.md`
- Modify: `zh/jsr-locate/references/request-chain-recording.md`
- Modify: `zh/jsr-locate/references/record-overview-and-validation.md`
- Modify: `zh/jsr-runtime/references/minimal-env-design.md`
- Modify: `zh/jsr-runtime/references/record-overview-and-validation.md`
- Modify: `zh/jsr-recover/references/record-overview-and-validation.md`

**Step 1: Point references to central templates**

Replace “exact skeleton” language with:
- central template path
- file ownership
- mandatory sections
- stage-specific quality checks

**Step 2: Remove duplicate validation or runtime skeletons**

Keep:
- overview ownership
- route-specific rules
- stage-specific required sections

Remove:
- second competing canonical layouts

### Task 4: Align skill files with the unified contract

**Files:**
- Modify: `jsr-locate/SKILL.md`
- Modify: `jsr-runtime/SKILL.md`
- Modify: `jsr-recover/SKILL.md`
- Modify: `zh/jsr-locate/SKILL.md`
- Modify: `zh/jsr-runtime/SKILL.md`
- Modify: `zh/jsr-recover/SKILL.md`

**Step 1: Update record ownership language**

Ensure each skill:
- names the same canonical file
- points to central templates for schema
- keeps only stage-specific write rules

**Step 2: Remove Chinese-side English field leakage where the skill body defines user-filled blocks**

Update:
- minimum input labels
- failure-output labels
- record-file bullets

### Task 5: Verify convergence

**Files:**
- Check the modified files above

**Step 1: Scan for stale contract conflicts**

Run searches for:
- `运行时依赖.md`
- `精确骨架`
- English status-block fields inside Chinese-facing docs
- duplicate validation skeleton phrases

**Step 2: Run whitespace and diff checks**

Run:
- `git diff --check`
- targeted `Select-String` checks for Chinese field vocabulary and runtime filename

**Step 3: Summarize residual risks**

Call out any still-English technical proper nouns that were intentionally kept and any unconverted English-only documents that are not Chinese-facing.
