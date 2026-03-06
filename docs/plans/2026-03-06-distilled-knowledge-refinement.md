# Distilled Knowledge Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the 5 `knowledge-distilled.md` files into compact, high-value judgment references and extract repeated JSReverser-MCP routing rules into one shared reference.

**Architecture:** Keep `playbook.md` as the execution layer and rewrite `knowledge-distilled.md` as the judgment layer. Each distilled file should focus on non-obvious decisions, common misreads, and evidence standards. Shared MCP routing rules that repeat across skills should move into one `jsr-shared-references/jsr-mcp-routing.md` file and be linked from the active skills.

**Tech Stack:** Markdown skill references, active `jsr-*` skills, shared repo/runtime skill trees, JSReverser-MCP tool vocabulary.

---

### Task 1: Rewrite the distilled knowledge files

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-trace-and-locate\references\knowledge-distilled.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime-stabilization\references\knowledge-distilled.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-deobfuscation-and-lifting\references\knowledge-distilled.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-signature-and-replay\references\knowledge-distilled.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-transport-and-protocol\references\knowledge-distilled.md`

**Step 1:** Replace verbose "fifteen principles" style content with 3 concise sections:
- core judgments
- common misreads
- evidence standard

**Step 2:** Keep each file specific to that skill's decision mistakes.

**Step 3:** Remove generic phrases that the model already knows.

### Task 2: Add one shared JSReverser-MCP routing reference

**Files:**
- Create: `E:\ai code web\AI reverse\reverse-skill\jsr-shared-references\jsr-mcp-routing.md`

**Step 1:** Capture only the cross-skill routing rules that are repeated and stable.

**Step 2:** Cover default entry, hook-vs-breakpoint priority, login-state reuse, WebSocket grouping, and delivery verification.

### Task 3: Link the shared reference from active skills and mirror runtime copies

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-trace-and-locate\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime-stabilization\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-deobfuscation-and-lifting\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-signature-and-replay\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-transport-and-protocol\SKILL.md`
- Mirror the same files under: `C:\Users\dypbi\.codex\skills\...`

**Step 1:** Add the shared routing reference to each skill's `Read Next` section.

**Step 2:** Copy the new shared reference and rewritten distilled files into the runtime skill tree.

### Task 4: Verify parity and structure

**Step 1:** Confirm repo/runtime copies match for all touched files.

**Step 2:** Confirm each distilled file now has the intended three-section structure.

**Step 3:** Confirm the shared routing reference exists in both trees.
