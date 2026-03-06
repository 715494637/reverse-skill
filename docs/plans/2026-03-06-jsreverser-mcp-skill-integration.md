# JSReverser-MCP Skill Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate `JSReverser-MCP` into the active `jsr-*` skill system without adding a new broad skill or bloating the current skills.

**Architecture:** Keep the current 5-skill taxonomy unchanged. Add a thin `Preferred JSReverser-MCP Path` section to each active skill so the skill tells the model which MCP tools to prefer, when to escalate from Hook to breakpoint, and what evidence satisfies the skill's exit gate. Keep the guidance self-contained and concise rather than copying full MCP tool docs into the skills.

**Tech Stack:** Markdown skills, local repo docs, Codex runtime skill copies, JSReverser-MCP tool vocabulary.

---

### Task 1: Add explicit MCP routing to the 5 repo skills

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-trace-and-locate\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime-stabilization\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-deobfuscation-and-lifting\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-signature-and-replay\SKILL.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-transport-and-protocol\SKILL.md`

**Step 1:** Insert a `## Preferred JSReverser-MCP Path` section into each file.

**Step 2:** Keep each section to 3 parts only:
- default entry tools
- escalation rule
- required evidence before handoff or completion

**Step 3:** Keep the guidance specific to that skill's job rather than repeating generic MCP documentation.

### Task 2: Mirror the same changes into the runtime skill copies

**Files:**
- Modify: `C:\Users\dypbi\.codex\skills\jsr-trace-and-locate\SKILL.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-runtime-stabilization\SKILL.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-deobfuscation-and-lifting\SKILL.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-signature-and-replay\SKILL.md`
- Modify: `C:\Users\dypbi\.codex\skills\jsr-transport-and-protocol\SKILL.md`

**Step 1:** Copy the exact same routing sections into the runtime-loaded skills.

**Step 2:** Re-check repo/runtime parity so the repo remains the readable source and the runtime copy remains current.

### Task 3: Validate the integration

**Files:**
- Inspect: `E:\ai code web\AI reverse\reverse-skill\JSReverser-MCP\README.md`
- Inspect: `E:\ai code web\AI reverse\reverse-skill\JSReverser-MCP\docs\reverse-task-index.md`
- Inspect: `E:\ai code web\AI reverse\reverse-skill\JSReverser-MCP\docs\tool-reference.md`

**Step 1:** Confirm each skill now points to real MCP capabilities that exist.

**Step 2:** Verify the edited skills still remain concise and role-pure.

**Step 3:** Confirm the 5 runtime skill files and 5 repo skill files are identical after the update.
