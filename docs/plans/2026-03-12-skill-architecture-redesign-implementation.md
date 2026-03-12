# Skill Architecture Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the reverse-skill package into a `1 + 3` architecture with one default entry skill (`jsr-reverse`) and three thin phase skills (`jsr-locate`, `jsr-recover`, `jsr-runtime`), while adding repeatable validation assets for skill behavior.

**Architecture:** Keep `jsr-reverse` as the only default front-door skill. Keep the three phase skills, but trim them down so they only handle phase-specific routing, required references, handoff rules, and guardrails. Move skill verification out of ad hoc plan prose into dedicated pressure-scenario assets so the package follows the `skill-creator` and `writing-skills` standards.

**Tech Stack:** Markdown skills, local references, Codex skill metadata, Git-based docs repo, PowerShell validation commands.

---

### Task 1: Lock the chosen architecture in repo docs

**Files:**
- Modify: `E:/ai code web/AI reverse/reverse-skill/README.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/docs/plans/2026-03-12-skill-architecture-redesign-blueprint.md`

**Step 1: Update README to state the package mode explicitly**

Edit `README.md` so it says:
- `jsr-reverse` is the default entry
- `jsr-locate / jsr-recover / jsr-runtime` are phase-specific direct-entry skills
- records are optional outputs, not the center of the workflow

**Step 2: Remove contradictory wording**

Delete any remaining wording that implies:
- users should pick among the three phase skills by default
- records are required before useful work starts
- the package is still deciding between `3` and `1+3`

**Step 3: Re-read the two changed docs**

Run:

```powershell
Get-Content 'E:/ai code web/AI reverse/reverse-skill/README.md' -TotalCount 220
Get-Content 'E:/ai code web/AI reverse/reverse-skill/docs/plans/2026-03-12-skill-architecture-redesign-blueprint.md' -TotalCount 260
```

Expected:
- `README.md` and the blueprint describe the same `1+3` structure

**Step 4: Commit**

```powershell
git add README.md docs/plans/2026-03-12-skill-architecture-redesign-blueprint.md
git commit -m "docs: lock 1+3 skill architecture"
```

### Task 2: Fix the frontmatter descriptions to follow skill standards

**Files:**
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-reverse/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-locate/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-recover/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-runtime/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-reverse/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-locate/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-recover/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-runtime/SKILL.md`

**Step 1: Rewrite `description:` fields**

Make every `description:` follow this rule:
- starts with `Use when...`
- describes triggering conditions only
- does not summarize workflow
- does not mention implementation steps such as “routes”, “decides”, “loads”

**Step 2: Keep keyword coverage**

Preserve the search terms that matter for discovery:
- `sign`
- `token`
- `cookie`
- `JSVMP`
- `worker`
- `wasm`
- `RS`
- `瑞数`
- `anti-debug`
- `basearr`

**Step 3: Verify the frontmatter lines only**

Run:

```powershell
$files = @(
  'E:/ai code web/AI reverse/reverse-skill/jsr-reverse/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/jsr-locate/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/jsr-recover/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/jsr-runtime/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/zh/jsr-reverse/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/zh/jsr-locate/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/zh/jsr-recover/SKILL.md',
  'E:/ai code web/AI reverse/reverse-skill/zh/jsr-runtime/SKILL.md'
)
$files | ForEach-Object { Get-Content $_ -TotalCount 6; '' }
```

Expected:
- every file shows a short trigger-only description

**Step 4: Commit**

```powershell
git add jsr-reverse/SKILL.md jsr-locate/SKILL.md jsr-recover/SKILL.md jsr-runtime/SKILL.md zh/jsr-reverse/SKILL.md zh/jsr-locate/SKILL.md zh/jsr-recover/SKILL.md zh/jsr-runtime/SKILL.md
git commit -m "docs: normalize skill trigger descriptions"
```

### Task 3: Trim the specialist skills down to phase routing only

**Files:**
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-locate/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-recover/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-runtime/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-locate/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-recover/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-runtime/SKILL.md`

**Step 1: Keep only these sections in each specialist skill**

Allowed content:
- Role / 角色
- When to use / When not to use
- Intake / 输入块
- Read in this order / 读取顺序
- Must prove / 必须证明
- Guardrails / 护栏
- Exit criteria / 退出条件

**Step 2: Remove or shrink low-priority sections**

Delete or compress:
- `Record Use`
- repeated reminders about `reverse-records/`
- any section that explains formatting instead of routing

**Step 3: Keep the route-out rules sharp**

Make sure each skill still explicitly says when to hand off to the other two.

**Step 4: Verify structure**

Run:

```powershell
Select-String -Path 'E:/ai code web/AI reverse/reverse-skill/jsr-locate/SKILL.md','E:/ai code web/AI reverse/reverse-skill/jsr-recover/SKILL.md','E:/ai code web/AI reverse/reverse-skill/jsr-runtime/SKILL.md' -Pattern 'Record Use|Read In This Order|Guardrails|Exit Criteria'
```

Expected:
- `Read In This Order`, `Guardrails`, `Exit Criteria` still exist
- `Record Use` is gone or reduced to one short line

**Step 5: Commit**

```powershell
git add jsr-locate/SKILL.md jsr-recover/SKILL.md jsr-runtime/SKILL.md zh/jsr-locate/SKILL.md zh/jsr-recover/SKILL.md zh/jsr-runtime/SKILL.md
git commit -m "docs: slim phase skills to routing rules"
```

### Task 4: Make `jsr-reverse` a stronger router instead of a mini-manual

**Files:**
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-reverse/SKILL.md`
- Modify: `E:/ai code web/AI reverse/reverse-skill/zh/jsr-reverse/SKILL.md`

**Step 1: Preserve only the high-value routing sections**

Keep:
- intake
- default routing rule
- reference routing
- fast triage table
- phase exit rules
- anti-patterns

**Step 2: Reduce secondary prose**

Shorten:
- broad explanation paragraphs
- record-related wording
- anything that duplicates what the phase skills already say

**Step 3: Add an explicit output format for routing**

Add one compact block like:

```text
当前阶段：
先读：
不要进入：
切换条件：
```

This should appear in both English and Chinese versions in the appropriate language.

**Step 4: Verify**

Run:

```powershell
Select-String -Path 'E:/ai code web/AI reverse/reverse-skill/jsr-reverse/SKILL.md','E:/ai code web/AI reverse/reverse-skill/zh/jsr-reverse/SKILL.md' -Pattern 'Default Routing Rule|Reference Routing|Fast Triage Table|Phase Exit Rules|当前阶段|Next phase'
```

Expected:
- router sections exist
- a compact routing output block exists

**Step 5: Commit**

```powershell
git add jsr-reverse/SKILL.md zh/jsr-reverse/SKILL.md
git commit -m "docs: harden jsr-reverse routing output"
```

### Task 5: Reorganize references only where it improves routing

**Files:**
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-reverse/references/*` as needed
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-locate/references/*` as needed
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-recover/references/*` as needed
- Modify: `E:/ai code web/AI reverse/reverse-skill/jsr-runtime/references/*` as needed
- Modify: Chinese mirror files under `E:/ai code web/AI reverse/reverse-skill/zh/`

**Step 1: Do not create deep nesting**

Keep all references one level deep from `SKILL.md`.

**Step 2: Remove duplication only when it is exact or near-exact**

Focus on:
- repeated record instructions
- repeated routing language
- repeated RS explanations that can live in one stage-specific file

Do not merge distinct technical references just to reduce file count.

**Step 3: Keep stage references and topic references legible**

The final set should still let the router point to:
- phase references
- one topic-specific reference

**Step 4: Verify file list**

Run:

```powershell
Get-ChildItem -Name 'E:/ai code web/AI reverse/reverse-skill/jsr-reverse/references'
Get-ChildItem -Name 'E:/ai code web/AI reverse/reverse-skill/jsr-locate/references'
Get-ChildItem -Name 'E:/ai code web/AI reverse/reverse-skill/jsr-recover/references'
Get-ChildItem -Name 'E:/ai code web/AI reverse/reverse-skill/jsr-runtime/references'
```

Expected:
- no nested subtrees
- reference names still map cleanly to symptoms

**Step 5: Commit**

```powershell
git add jsr-reverse/references jsr-locate/references jsr-recover/references jsr-runtime/references zh/jsr-reverse zh/jsr-locate zh/jsr-recover zh/jsr-runtime
git commit -m "docs: prune duplicated reverse references"
```

### Task 6: Add repeatable baseline and pressure-scenario assets

**Files:**
- Create: `E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/README.md`
- Create: `E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-reverse-routing.md`
- Create: `E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-locate-proof.md`
- Create: `E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-recover-shell.md`
- Create: `E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-runtime-divergence.md`
- Create: `E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-rs-two-hop.md`

**Step 1: Write one baseline scenario per major behavior**

Each file should include:
- prompt
- expected failure without the intended skill
- expected reference-loading behavior with the intended skill
- expected wrong behaviors to watch for

**Step 2: Cover at least these scenarios**

- route to locate for unknown `sign/token`
- route to recover for `jsvmp/worker/wasm`
- route to runtime only after sink and shell are known
- recognize RS `412 -> cookie -> 200`
- refuse to center records before routing

**Step 3: Add a runner-style README**

`docs/skill-tests/README.md` should explain:
- baseline first
- then with skill
- what counts as pass/fail

**Step 4: Verify**

Run:

```powershell
Get-ChildItem -Name 'E:/ai code web/AI reverse/reverse-skill/docs/skill-tests'
Get-Content 'E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/README.md' -TotalCount 200
```

Expected:
- scenario files exist
- README explains baseline and pressure flow

**Step 5: Commit**

```powershell
git add docs/skill-tests
git commit -m "docs: add reverse skill pressure scenarios"
```

### Task 7: Sync the final skill set to the live Codex skills directory

**Files:**
- Modify live copies under:
  - `C:/Users/dypbi/.codex/skills/jsr-reverse/`
  - `C:/Users/dypbi/.codex/skills/jsr-locate/`
  - `C:/Users/dypbi/.codex/skills/jsr-recover/`
  - `C:/Users/dypbi/.codex/skills/jsr-runtime/`

**Step 1: Copy repo versions into live skill folders**

Run:

```powershell
Copy-Item -Recurse -Force 'E:/ai code web/AI reverse/reverse-skill/jsr-reverse' 'C:/Users/dypbi/.codex/skills/'
Copy-Item -Force 'E:/ai code web/AI reverse/reverse-skill/jsr-locate/SKILL.md' 'C:/Users/dypbi/.codex/skills/jsr-locate/SKILL.md'
Copy-Item -Force 'E:/ai code web/AI reverse/reverse-skill/jsr-recover/SKILL.md' 'C:/Users/dypbi/.codex/skills/jsr-recover/SKILL.md'
Copy-Item -Force 'E:/ai code web/AI reverse/reverse-skill/jsr-runtime/SKILL.md' 'C:/Users/dypbi/.codex/skills/jsr-runtime/SKILL.md'
```

**Step 2: Spot-check the live copies**

Run:

```powershell
Get-Content 'C:/Users/dypbi/.codex/skills/jsr-reverse/SKILL.md' -TotalCount 120
Get-Content 'C:/Users/dypbi/.codex/skills/jsr-locate/SKILL.md' -TotalCount 120
Get-Content 'C:/Users/dypbi/.codex/skills/jsr-recover/SKILL.md' -TotalCount 120
Get-Content 'C:/Users/dypbi/.codex/skills/jsr-runtime/SKILL.md' -TotalCount 120
```

Expected:
- live files match the new routing-first design

**Step 3: Commit repo state**

```powershell
git add jsr-reverse jsr-locate/SKILL.md jsr-recover/SKILL.md jsr-runtime/SKILL.md zh/jsr-reverse zh/jsr-locate/SKILL.md zh/jsr-recover/SKILL.md zh/jsr-runtime/SKILL.md docs/skill-tests README.md
git commit -m "docs: redesign reverse skill architecture"
```

### Task 8: Run the final verification pass before any push

**Files:**
- Verify repository state only

**Step 1: Run structural checks**

```powershell
git diff --check
git status --short --branch
```

Expected:
- no patch-format errors
- only intentional modifications remain

**Step 2: Run standards-focused text checks**

```powershell
git grep -n -E "Required Record Files|The record skeletons below are canonical|Self-Contained Rule" -- jsr-reverse jsr-locate jsr-recover jsr-runtime zh/jsr-reverse zh/jsr-locate zh/jsr-recover zh/jsr-runtime
git grep -n -E "Use when .*route|Use when .*decides|Use when .*loads" -- jsr-reverse jsr-locate jsr-recover jsr-runtime zh/jsr-reverse zh/jsr-locate zh/jsr-recover zh/jsr-runtime
```

Expected:
- first command returns no matches
- second command returns no trigger descriptions that summarize workflow

**Step 3: Manual pass against the pressure scenarios**

Read:

```powershell
Get-Content 'E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-reverse-routing.md' -TotalCount 200
Get-Content 'E:/ai code web/AI reverse/reverse-skill/docs/skill-tests/jsr-rs-two-hop.md' -TotalCount 200
```

Confirm:
- the documented expected behavior matches the final skills

**Step 4: Commit verification notes if needed**

```powershell
git add docs/skill-tests
git commit -m "docs: finalize reverse skill verification assets"
```
