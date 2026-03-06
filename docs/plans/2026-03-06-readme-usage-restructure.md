# README and Usage Guide Restructuring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the corrupted README section, move installation and recommended usage to the top, and split detailed operational guidance into a dedicated `docs/usage.md`.

**Architecture:** Replace the current README rather than patching the corrupted block in place. Keep README short and decision-oriented: what this repo is, how to install, how to use it in the recommended way, what skills exist, and where to read more. Move detailed templates, examples, delivery standards, review standards, and the 4-layer skill structure into `docs/usage.md`.

**Tech Stack:** Markdown docs, UTF-8 with BOM for Windows-friendly display, local repo docs only.

---

### Task 1: Rewrite README

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\README.md`

**Step 1:** Replace the entire file with fresh UTF-8 content.

**Step 2:** Put these sections first, in order:
- repository positioning
- installation
- recommended usage
- current skills

**Step 3:** Link to `docs/usage.md` for detailed guidance.

### Task 2: Create usage guide

**Files:**
- Create: `E:\ai code web\AI reverse\reverse-skill\docs\usage.md`

**Step 1:** Add the full automatic-mode template and example.

**Step 2:** Add explicit-skill mode, symptom-driven mode, combination patterns, and review criteria.

**Step 3:** Add the 4-layer skill structure explanation.

### Task 3: Verify encoding and readability

**Step 1:** Confirm `README.md` and `docs/usage.md` decode as UTF-8 with BOM.

**Step 2:** Confirm the corrupted `?` lines are gone from the README.

**Step 3:** Confirm the detailed content now lives in `docs/usage.md` rather than the README.
