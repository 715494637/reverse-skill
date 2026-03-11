# JS Reverse Automation Method Absorption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Absorb the highest-value stage-control and runtime-discipline methods from `js-reverse-automation` into the existing reverse skills and SOP without importing its code-generation workflow.

**Architecture:** Update the current skill and SOP contracts in place. Use the existing Markdown record system as the canonical handoff medium, add a normalized status/failure structure, and strengthen runtime anti-debug selection rules where they matter.

**Tech Stack:** Markdown skills, Markdown SOP/templates, Git worktree verification

---

### Task 1: Add design-backed SOP contract updates

**Files:**
- Modify: `docs/sop/reverse-engineering/README.md`
- Modify: `docs/sop/reverse-engineering/decision-matrix.md`

**Step 1: Add the stage-gate contract**

Add explicit definitions for:

- entry condition
- required artifact
- exit condition
- failure output
- continue rule

**Step 2: Add the canonical status and failure blocks**

Add one normalized status block and one normalized failure block that fit the current Markdown workflow.

**Step 3: Preserve current scope discipline**

Do not add generator-specific fields or code-delivery details outside the existing delivery gate.

### Task 2: Tighten the SOP templates

**Files:**
- Modify: `docs/sop/reverse-engineering/templates/任务卡.md`
- Modify: `docs/sop/reverse-engineering/templates/请求链路.md`
- Modify: `docs/sop/reverse-engineering/templates/运行态清单.md`
- Modify: `docs/sop/reverse-engineering/templates/恢复记录.md`
- Modify: `docs/sop/reverse-engineering/templates/验证记录.md`
- Modify: `docs/sop/reverse-engineering/templates/交付清单.md`

**Step 1: Add status snapshot fields**

Make each template carry only the stage-specific fields needed for handoff and validation.

**Step 2: Add flat failure-object fields**

Use the same `phase / code / summary / evidence / impact / next_action` structure where failure or partial output is relevant.

**Step 3: Keep templates strict**

Do not add background sections, principle summaries, or generic reverse-engineering explanations.

### Task 3: Tighten the English skills

**Files:**
- Modify: `jsr-locate/SKILL.md`
- Modify: `jsr-runtime/SKILL.md`
- Modify: `jsr-recover/SKILL.md`
- Modify if needed: `jsr-runtime/references/anti-debug-and-risk-branches.md`

**Step 1: Update failure output blocks**

Add `code` to the current flat status block and align wording with stage-gate behavior.

**Step 2: Add runtime rule-selection discipline**

Explicitly require narrow anti-debug rule choice and re-validation after navigation/lifecycle patches when the patch changes page state.

**Step 3: Add resolver-risk discipline where appropriate**

Document wrapper-chain, resolver-trigger, minimum runtime preconditions, and residual risk as required record items when static paths are unstable.

### Task 4: Sync the Chinese mirrors

**Files:**
- Modify: `zh/jsr-locate/SKILL.md`
- Modify: `zh/jsr-runtime/SKILL.md`
- Modify: `zh/jsr-recover/SKILL.md`

**Step 1: Mirror the English contract changes**

Add the same stage/failure/runtime wording in Chinese, using the repository’s established terminology.

**Step 2: Keep structure aligned**

Make sure the changes land in the formal sections, not only in ad-hoc supplements.

### Task 5: Verify and hand back

**Files:**
- Review only

**Step 1: Run diff and content verification**

Run:

- `git diff --check -- docs/sop/reverse-engineering jsr-locate jsr-runtime jsr-recover zh/jsr-locate zh/jsr-runtime zh/jsr-recover docs/plans/2026-03-11-jsra-method-absorption-design.md docs/plans/2026-03-11-jsra-method-absorption.md`
- targeted `Select-String` checks for new contract phrases

**Step 2: Confirm scope**

Verify that no product-generator or unrelated files were changed.

**Step 3: Sync back to main workspace**

Copy only the approved changed files from the worktree to the main workspace.
