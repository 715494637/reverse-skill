# JSReverser-MCP README and Playbook Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten repository-facing documentation so the 5 active JS reverse skills pair cleanly with JSReverser-MCP in both onboarding and day-to-day execution.

**Architecture:** Keep the skill taxonomy unchanged. Add one compact mapping table to `README.md` so users can see which skill pairs with which MCP entry path, then rewrite each `references/playbook.md` so it stops at MCP-aligned default flows, escalation rules, and completion evidence instead of generic reverse prose.

**Tech Stack:** Markdown documentation, active `jsr-*` skill directories, JSReverser-MCP tool vocabulary.

---

### Task 1: Add README skill-to-MCP mapping

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\README.md`

**Step 1:** Insert a compact section after the current skill table.

**Step 2:** Add one table with columns for skill, MCP default entry, what to escalate to, and expected delivery focus.

**Step 3:** Keep the wording operational rather than explanatory.

### Task 2: Refine repo playbooks

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-trace-and-locate\references\playbook.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime-stabilization\references\playbook.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-deobfuscation-and-lifting\references\playbook.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-signature-and-replay\references\playbook.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-transport-and-protocol\references\playbook.md`

**Step 1:** Rewrite each playbook into 4 short blocks:
- default MCP chain
- boundary or capture matrix
- escalation rule
- done criteria

**Step 2:** Keep only tool references that exist in `JSReverser-MCP` docs.

**Step 3:** Avoid reintroducing case narration or generic reverse filler.

### Task 3: Mirror runtime copies and verify

**Files:**
- Modify: `C:\Users\dypbi\.codex\skills\jsr-trace-and-locate\references\playbook.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-runtime-stabilization\references\playbook.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-deobfuscation-and-lifting\references\playbook.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-signature-and-replay\references\playbook.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-transport-and-protocol\references\playbook.md`

**Step 1:** Copy the repo playbooks into the runtime skill directory.

**Step 2:** Verify repo/runtime parity for all edited files.

**Step 3:** Verify that referenced MCP tools exist and the README section is present.
