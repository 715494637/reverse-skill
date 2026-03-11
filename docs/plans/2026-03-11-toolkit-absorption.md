# Toolkit Absorption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Absorb the reusable `find-crypto-entry` and `ast-deobfuscate` methods from `ai-reverse-toolkit-main` into `jsr-locate` and `jsr-recover`, plus the `zh/` mirrors, without importing generic toolkit filler.

**Architecture:** Add two new reference files, one under `jsr-locate/references/` and one under `jsr-recover/references/`, then wire each into the matching English and Chinese `SKILL.md`. Keep the main skill docs thin and let the new references own the specialized playbooks.

**Tech Stack:** Markdown skill docs, localized mirror docs, repository-local planning docs

---

### Task 1: Add the locate-side entry-locating reference

**Files:**
- Create: `jsr-locate/references/crypto-entry-locating.md`
- Create: `zh/jsr-locate/references/crypto-entry-locating.md`

**Step 1: Write the failing expectation**

Expected after change:

- locate has one exact place for live-request-first crypto/signature entry locating
- the reference stays inside locate scope and does not drift into algorithm recovery

**Step 2: Write the minimal implementation**

Cover only:

- triggering conditions
- preferred locating path
- fallback path
- stack triage
- completion standard
- common missteps

**Step 3: Verify scope stays narrow**

Run:

```powershell
Get-Content -Path 'E:\ai code web\AI reverse\reverse-skill\.worktrees\codex-toolkit-absorption\jsr-locate\references\crypto-entry-locating.md'
```

Expected: no algorithm-restoration, Python-porting, or generic FAQ content appears.

### Task 2: Wire the locate skill to the new reference

**Files:**
- Modify: `jsr-locate/SKILL.md`
- Modify: `zh/jsr-locate/SKILL.md`

**Step 1: Write the failing expectation**

Expected after change:

- `jsr-locate` explicitly routes entry-location tasks to the new reference
- the main skill stays thin and trigger-oriented

**Step 2: Write the minimal implementation**

- add one core-principle bullet
- add one required-reference-loading bullet
- add one short operating-order bullet

**Step 3: Verify discoverability**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\.worktrees\codex-toolkit-absorption\jsr-locate\SKILL.md','E:\ai code web\AI reverse\reverse-skill\.worktrees\codex-toolkit-absorption\zh\jsr-locate\SKILL.md' -Pattern 'crypto-entry-locating'
```

Expected: both files point to the new reference.

### Task 3: Add the recover-side AST playbook

**Files:**
- Create: `jsr-recover/references/ast-deobfuscation-playbook.md`
- Create: `zh/jsr-recover/references/ast-deobfuscation-playbook.md`

**Step 1: Write the failing expectation**

Expected after change:

- recover has one exact place for ordered AST deobfuscation and transform-ledger discipline
- the reference avoids project-local folder conventions and generic Babel setup prose

**Step 2: Write the minimal implementation**

Cover only:

- triggering conditions
- fingerprint-first triage
- ordered transform path
- bundle-unpack decision
- transform ledger fields
- completion standard
- common missteps

**Step 3: Verify no toolkit filler leaked in**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\.worktrees\codex-toolkit-absorption\jsr-recover\references\ast-deobfuscation-playbook.md' -Pattern 'npm install|source/original|scripts/|intermediate/'
```

Expected: no matches.

### Task 4: Wire the recover skill to the new playbook

**Files:**
- Modify: `jsr-recover/SKILL.md`
- Modify: `zh/jsr-recover/SKILL.md`

**Step 1: Write the failing expectation**

Expected after change:

- `jsr-recover` explicitly routes AST-heavy recovery to the new playbook
- the main skill stays focused on level selection and semantic boundaries

**Step 2: Write the minimal implementation**

- add one core-principle bullet
- add one required-reference-loading bullet
- add one short default-order bullet

**Step 3: Verify discoverability**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\.worktrees\codex-toolkit-absorption\jsr-recover\SKILL.md','E:\ai code web\AI reverse\reverse-skill\.worktrees\codex-toolkit-absorption\zh\jsr-recover\SKILL.md' -Pattern 'ast-deobfuscation-playbook'
```

Expected: both files point to the new reference.

### Task 5: Run targeted documentation checks

**Files:**
- Test: `jsr-locate/**`
- Test: `jsr-recover/**`
- Test: `zh/jsr-locate/**`
- Test: `zh/jsr-recover/**`

**Step 1: Check patch hygiene**

Run:

```powershell
git diff --check -- docs/plans/2026-03-11-toolkit-absorption-design.md docs/plans/2026-03-11-toolkit-absorption.md jsr-locate jsr-recover zh/jsr-locate zh/jsr-recover
```

Expected: no whitespace or conflict-marker errors.

**Step 2: Inspect scope**

Run:

```powershell
git diff --stat -- docs/plans/2026-03-11-toolkit-absorption-design.md docs/plans/2026-03-11-toolkit-absorption.md jsr-locate jsr-recover zh/jsr-locate zh/jsr-recover
```

Expected: only the planned skill files and new references changed.

**Step 3: Commit**

If requested later:

```bash
git add docs/plans/2026-03-11-toolkit-absorption-design.md docs/plans/2026-03-11-toolkit-absorption.md jsr-locate jsr-recover zh/jsr-locate zh/jsr-recover
git commit -m "docs: absorb toolkit reverse playbooks"
```
