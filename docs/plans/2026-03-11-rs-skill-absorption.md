# RS Skill Absorption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Absorb high-value RS-specific collection, runtime, and recovery patterns into the existing `jsr-locate`, `jsr-runtime`, and `jsr-recover` skills.

**Architecture:** Extend the three existing skills instead of creating a new RS-only skill. Add one RS-specific reference per stage, wire the new references into the stage `SKILL.md` files, and mirror the same structure under `zh/`.

**Tech Stack:** Markdown skills, Markdown references

---

### Task 1: Locate RS Artifact Routing

**Files:**
- Create: `E:\ai code web\AI reverse\reverse-skill\jsr-locate\references\rs-collection-and-two-hop-routing.md`
- Create: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-locate\references\rs-collection-and-two-hop-routing.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-locate\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-locate\SKILL.md`

1. Add an RS-specific locate reference covering `204 -> $_ts -> r2mKa -> $_ts.l__ -> second hop`.
2. Wire the reference into locate trigger conditions and required reference loading.
3. Add RS-specific locate stop conditions for incomplete first-hop or second-hop closure.

### Task 2: Runtime RS Branching and Basearr Fit

**Files:**
- Create: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime\references\rs-runtime-and-basearr-fit.md`
- Create: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-runtime\references\rs-runtime-and-basearr-fit.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-runtime\SKILL.md`

1. Add an RS runtime reference for `hasDebug`, `basearr`, `encryptLens`, `lastWord`, `flag`, fixed runtime facts, and second-hop validation.
2. Wire the reference into runtime trigger conditions and minimum input.
3. Add RS-specific `partial` rules for unresolved branch or basearr closure.

### Task 3: Recovery RS Anchors

**Files:**
- Create: `E:\ai code web\AI reverse\reverse-skill\jsr-recover\references\rs-recovery-anchors.md`
- Create: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-recover\references\rs-recovery-anchors.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-recover\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-recover\SKILL.md`

1. Add an RS recovery reference anchored on `r2mKa`, `cp0/cp2/cp6`, `cp3 -> dynamicTaskOffset -> keys`, and `$_ts.l__`.
2. Wire the reference into recovery trigger conditions and minimum input.
3. Add RS-specific handoff rules back to locate or runtime when artifact collection or runtime closure is still open.

### Task 4: Verification

**Files:**
- Verify only the files above

1. Check that all six new references are wired from the matching `SKILL.md`.
2. Run `git diff --check` on the touched files.
3. Confirm no README or unrelated user files were modified.
