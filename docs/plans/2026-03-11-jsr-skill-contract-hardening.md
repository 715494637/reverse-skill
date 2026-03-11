# JSR Skill Contract Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make `jsr-locate`, `jsr-runtime`, and `jsr-recover` more deterministic by adding missing record contracts, failure-state gates, and tighter trigger/input guidance.

**Architecture:** Keep the release shape unchanged by editing only files inside each `jsr-*` directory. Add thin contract references for missing record files, reduce ambiguity in the main `SKILL.md` files, and tighten `agents/openai.yaml` prompts so invocation starts with structured inputs instead of free-form guesses.

**Tech Stack:** Markdown skill docs, YAML agent descriptors, GitHub Actions packaging constraints

---

### Task 1: Capture the baseline failures

**Files:**
- Modify: `docs/plans/2026-03-11-jsr-skill-contract-hardening.md`
- Test: subagent baseline scenarios already run in-session

**Step 1: Record the failing behaviors**

- Missing exact `总览.md` template for all three skills
- Missing exact `验证记录.md` contract for locate and runtime
- Missing exact failure-state structure for blocked runtime work
- Missing exact minimum input block for recover startup

**Step 2: Verify RED**

Expected: current docs force best-guess answers instead of one exact structure.

**Step 3: Keep scope minimal**

- Fix only the missing contracts and trigger/input gaps
- Do not redesign the analytical method itself

### Task 2: Add missing record contracts

**Files:**
- Create: `jsr-locate/references/record-overview-and-validation.md`
- Create: `jsr-runtime/references/record-overview-and-validation.md`
- Create: `jsr-recover/references/record-overview-and-validation.md`
- Modify: `jsr-locate/SKILL.md`
- Modify: `jsr-runtime/SKILL.md`
- Modify: `jsr-recover/SKILL.md`

**Step 1: Write the failing expectation**

Expected after change:
- Each skill points to one exact `总览.md` skeleton
- Each skill points to one exact `验证记录.md` skeleton when validation is required

**Step 2: Implement minimal documentation**

- Add one new reference file per skill with:
  - `总览.md` exact sections
  - `验证记录.md` exact sections
  - where fork maps, blockers, and validation checkpoints belong
- Update each `SKILL.md` to require loading the new reference before long-running work
- Shorten repeated record-management prose in each `SKILL.md`

**Step 3: Verify**

Run: targeted reads of the updated files
Expected: no required record file remains unspecified

### Task 3: Add failure-state gates and fix schema ambiguity

**Files:**
- Modify: `jsr-locate/SKILL.md`
- Modify: `jsr-runtime/SKILL.md`
- Modify: `jsr-recover/SKILL.md`
- Modify: `jsr-locate/references/request-chain-recording.md`

**Step 1: Write the failing expectation**

Expected after change:
- Each skill defines a blocked/partial report structure
- Each skill states when to stop versus continue
- `request-chain-recording.md` uses one consistent field schema

**Step 2: Implement minimal documentation**

- Add a small `Failure Output` section to each `SKILL.md`
- Define a flat structure such as:
  - `status`
  - `stage`
  - `summary`
  - `evidence`
  - `impact`
  - `next_action`
- Fix `响应输出` field wording in `request-chain-recording.md`

**Step 3: Verify**

Run: targeted reads of the updated files
Expected: blocked tasks can be reported without ad hoc prose

### Task 4: Tighten trigger text and startup input contracts

**Files:**
- Modify: `jsr-locate/SKILL.md`
- Modify: `jsr-runtime/SKILL.md`
- Modify: `jsr-recover/SKILL.md`
- Modify: `jsr-locate/agents/openai.yaml`
- Modify: `jsr-runtime/agents/openai.yaml`
- Modify: `jsr-recover/agents/openai.yaml`
- Modify: `zh/jsr-locate/SKILL.md`
- Modify: `zh/jsr-runtime/SKILL.md`
- Modify: `zh/jsr-recover/SKILL.md`

**Step 1: Write the failing expectation**

Expected after change:
- Frontmatter descriptions stay trigger-only
- Agent prompts require exact minimum input blocks

**Step 2: Implement minimal documentation**

- Rewrite descriptions to remove workflow summary language
- Add a `Minimum Input` section to each main `SKILL.md`
- Update each `openai.yaml` default prompt to ask for:
  - target
  - artifact or request
  - trigger or current state
  - known evidence
  - constraints

**Step 3: Verify**

Run: targeted reads of main skill docs and YAML files
Expected: startup ambiguity is materially reduced

### Task 5: Re-run targeted scenarios and inspect diffs

**Files:**
- Test: `jsr-locate/**`
- Test: `jsr-runtime/**`
- Test: `jsr-recover/**`
- Test: `zh/jsr-*/**`

**Step 1: Re-run the three baseline scenarios**

Expected:
- locate scenario can point to exact `总览.md` and `验证记录.md` references
- runtime scenario can produce one exact failure-state structure
- recover scenario can produce one exact minimum input block

**Step 2: Inspect the final diff**

Run: `git diff -- jsr-locate jsr-runtime jsr-recover zh`
Expected: only planned documentation and prompt changes

**Step 3: Commit**

If requested later:
`git add docs/plans/2026-03-11-jsr-skill-contract-hardening.md jsr-locate jsr-runtime jsr-recover zh`
