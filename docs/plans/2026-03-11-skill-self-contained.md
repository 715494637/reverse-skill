# Skill Self-Contained Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the three reverse skills usable when only `SKILL.md` is read.

**Architecture:** Rewrite the six skill entry files so that execution-critical knowledge lives in `SKILL.md`. References remain optional extensions, not execution dependencies.

**Tech Stack:** Markdown skills

---

### Task 1: Rebuild Locate Skill as Self-Contained

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-locate\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-locate\SKILL.md`

1. Add explicit self-contained execution rule.
2. Inline locate order, crypto-entry route, RS two-hop route, and handoff rules.
3. Inline compact skeletons for `总览.md`, `请求链路.md`, and `验证记录.md`.
4. Keep references optional only.

### Task 2: Rebuild Recover Skill as Self-Contained

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-recover\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-recover\SKILL.md`

1. Add explicit self-contained execution rule.
2. Inline recovery levels, six-layer view, RS anchor order, and bridge-card rules.
3. Inline compact skeletons for `总览.md`, `恢复记录.md`, and `验证记录.md`.
4. Keep references optional only.

### Task 3: Rebuild Runtime Skill as Self-Contained

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-runtime\SKILL.md`

1. Add explicit self-contained execution rule.
2. Inline runtime classification, pure-compute precheck, fit-check, RS closure items, and handoff rules.
3. Inline compact skeletons for `总览.md`, `运行态清单.md`, and `验证记录.md`.
4. Keep references optional only.

### Task 4: Verify Skill Entry Files

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\docs\plans\2026-03-11-skill-self-contained-design.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\docs\plans\2026-03-11-skill-self-contained.md`

1. Run `git diff --check -- jsr-locate/SKILL.md jsr-recover/SKILL.md jsr-runtime/SKILL.md zh/jsr-locate/SKILL.md zh/jsr-recover/SKILL.md zh/jsr-runtime/SKILL.md docs/plans/2026-03-11-skill-self-contained-design.md docs/plans/2026-03-11-skill-self-contained.md`
Expected: no content-format errors

2. Run `Select-String -Path 'jsr-locate/SKILL.md','jsr-recover/SKILL.md','jsr-runtime/SKILL.md','zh/jsr-locate/SKILL.md','zh/jsr-recover/SKILL.md','zh/jsr-runtime/SKILL.md' -Pattern 'references/'`
Expected: only optional-extension wording remains, never mandatory loading wording

3. Run `git diff --stat -- jsr-locate/SKILL.md jsr-recover/SKILL.md jsr-runtime/SKILL.md zh/jsr-locate/SKILL.md zh/jsr-recover/SKILL.md zh/jsr-runtime/SKILL.md docs/plans/2026-03-11-skill-self-contained-design.md docs/plans/2026-03-11-skill-self-contained.md`
Expected: only planned skill-entry and plan files changed
