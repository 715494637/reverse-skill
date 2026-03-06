# Matrix Trimming and README Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the matrix layer so it contains only high-value discriminators, add the missing protocol matrix, and align the README with the now-stable four-layer skill structure.

**Architecture:** Keep `jsr-shared-references/jsr-mcp-routing.md` as the cross-skill routing layer, `playbook.md` as the execution layer, `knowledge-distilled.md` as the judgment layer, and `*-matrix.md` as the boundary-selection layer. Rewrite matrices into denser tables or bullet blocks with anchor, proves, and common misread only. Add `protocol-state-matrix.md` so transport matches the other four skills.

**Tech Stack:** Markdown docs, repo/runtime skill trees, JSReverser-MCP workflow vocabulary.

---

### Task 1: Tighten the matrix layer

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-trace-and-locate\references\writer-boundary-matrix.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime-stabilization\references\anti-bot-surface-matrix.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-deobfuscation-and-lifting\references\entry-recovery-matrix.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-signature-and-replay\references\challenge-state-matrix.md`
- Create: `E:\ai code web\AI reverse\reverse-skill\jsr-transport-and-protocol\references\protocol-state-matrix.md`

**Step 1:** Remove explanatory filler and keep only selection-critical content.

**Step 2:** Normalize each matrix to short anchor-focused entries.

**Step 3:** Make protocol match the same density and style.

### Task 2: Align README and skill references

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\README.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-transport-and-protocol\SKILL.md`

**Step 1:** Add one compact section explaining the 4-layer structure: shared routing, playbook, distilled knowledge, matrix.

**Step 2:** Add the new protocol matrix to transport skill `Read Next`.

### Task 3: Mirror runtime copies and verify

**Files:**
- Mirror touched skill/reference files into `C:\Users\dypbi\.codex\skills\...`

**Step 1:** Keep repo/runtime parity for all touched files.

**Step 2:** Verify new files exist, links are present, and matrix layer is now concise and consistent.
