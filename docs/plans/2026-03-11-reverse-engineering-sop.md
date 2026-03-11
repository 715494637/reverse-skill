# Reverse Engineering SOP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a professional reverse-engineering SOP and evidence-only template set under `docs/sop/reverse-engineering/`.

**Architecture:** Add one main workflow document, one routing matrix, and six stage templates. Keep scope documentation-only, isolate responsibilities by file, and enforce the approved rule that no file may contain generic theory or model-inferable filler.

**Tech Stack:** Markdown documentation, PowerShell verification commands, existing `jsr-locate`, `jsr-runtime`, and `jsr-recover` methodology

---

### Task 1: Create the SOP document skeleton

**Files:**
- Create: `docs/sop/reverse-engineering/README.md`
- Create: `docs/sop/reverse-engineering/decision-matrix.md`
- Create: `docs/sop/reverse-engineering/templates/任务卡.md`
- Create: `docs/sop/reverse-engineering/templates/请求链路.md`
- Create: `docs/sop/reverse-engineering/templates/运行态清单.md`
- Create: `docs/sop/reverse-engineering/templates/恢复记录.md`
- Create: `docs/sop/reverse-engineering/templates/验证记录.md`
- Create: `docs/sop/reverse-engineering/templates/交付清单.md`

**Step 1: Write the explicit acceptance checklist**

Add these constraints to the top of the working notes before drafting:

- one canonical workflow only
- one routing matrix only
- one responsibility per template
- no theory sections
- no summary sections
- no weak judgment fields

**Step 2: Create the minimal file skeleton**

Each file should contain only:

- title
- purpose
- required fields
- fill rules

**Step 3: Verify the skeleton exists**

Run:

```powershell
Get-ChildItem -Path 'E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering' -Recurse | Select-Object FullName
```

Expected: all eight files exist under the planned tree.

### Task 2: Write the main workflow SOP

**Files:**
- Modify: `docs/sop/reverse-engineering/README.md`

**Step 1: Draft the failing expectation**

Expected after change:

- one exact workflow from intake to delivery
- one exact definition for `partial`, `failed`, `blocked`, and `no-go`
- no target-generic reverse-engineering explanations

**Step 2: Write the minimal implementation**

Document only:

- workflow order
- stage gate definition
- stop rules
- delivery prerequisites

**Step 3: Verify the workflow is concise**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\README.md' -Pattern '原理|背景|总结|思路|可能'
```

Expected: no matches.

### Task 3: Write the routing matrix

**Files:**
- Modify: `docs/sop/reverse-engineering/decision-matrix.md`

**Step 1: Draft the failing expectation**

Expected after change:

- exact route to `locate`
- exact route to `runtime`
- exact route to `recover`
- explicit hold or stop conditions

**Step 2: Write the minimal implementation**

Use a decision table with:

- symptom
- first route
- escalate when
- stop when

**Step 3: Verify route coverage**

Run:

```powershell
Get-Content -Path 'E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\decision-matrix.md'
```

Expected: the table covers locate, runtime, recover, partial, and no-go.

### Task 4: Write intake and request-chain templates

**Files:**
- Modify: `docs/sop/reverse-engineering/templates/任务卡.md`
- Modify: `docs/sop/reverse-engineering/templates/请求链路.md`

**Step 1: Draft the failing expectation**

Expected after change:

- `任务卡.md` captures only target, sample, trigger, constraints, and success criteria
- `请求链路.md` captures only boundary, dependency, branch, and evidence fields

**Step 2: Write the minimal implementation**

For each file:

- add required fields
- add one-line fill rule per field
- remove any explanatory paragraph longer than two lines

**Step 3: Verify banned filler is absent**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\templates\任务卡.md','E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\templates\请求链路.md' -Pattern '原理|教程|例如|总结'
```

Expected: no matches.

### Task 5: Write runtime, recovery, and validation templates

**Files:**
- Modify: `docs/sop/reverse-engineering/templates/运行态清单.md`
- Modify: `docs/sop/reverse-engineering/templates/恢复记录.md`
- Modify: `docs/sop/reverse-engineering/templates/验证记录.md`

**Step 1: Draft the failing expectation**

Expected after change:

- runtime template records only missing dependencies and minimal patch decisions
- recovery template records only semantic boundary and unrecovered gaps
- validation template records only baseline, comparison, tolerance, and conclusion

**Step 2: Write the minimal implementation**

For each file:

- define required fields
- bind every conclusion field to a sample id and evidence id
- keep field descriptions imperative and short

**Step 3: Verify target-specific bias**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\templates\运行态清单.md','E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\templates\恢复记录.md','E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\templates\验证记录.md' -Pattern '通用|通常|一般|建议'
```

Expected: no matches.

### Task 6: Write the delivery template and final consistency pass

**Files:**
- Modify: `docs/sop/reverse-engineering/templates/交付清单.md`
- Modify: `docs/sop/reverse-engineering/README.md`
- Modify: `docs/sop/reverse-engineering/decision-matrix.md`

**Step 1: Draft the failing expectation**

Expected after change:

- delivery template can explicitly allow or forbid `JSRPC`, `Flask`, `Burp`, `sdenv`, or local replay outputs
- the main SOP and routing matrix both point to validation as the prerequisite for delivery

**Step 2: Write the minimal implementation**

- add delivery decision fields
- add residual risk fields
- cross-link the delivery prerequisite from the main SOP and decision matrix

**Step 3: Verify cross-file consistency**

Run:

```powershell
Select-String -Path 'E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\README.md','E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\decision-matrix.md','E:\ai code web\AI reverse\reverse-skill\docs\sop\reverse-engineering\templates\交付清单.md' -Pattern '验证'
```

Expected: all three files reference validation as a delivery gate.

### Task 7: Run final documentation checks

**Files:**
- Test: `docs/sop/reverse-engineering/**`

**Step 1: Check patch hygiene**

Run:

```powershell
git diff --check -- docs/sop/reverse-engineering docs/plans/2026-03-11-reverse-engineering-sop-design.md docs/plans/2026-03-11-reverse-engineering-sop.md
```

Expected: no whitespace or conflict-marker errors.

**Step 2: Inspect final diff**

Run:

```powershell
git diff -- docs/sop/reverse-engineering docs/plans/2026-03-11-reverse-engineering-sop-design.md docs/plans/2026-03-11-reverse-engineering-sop.md
```

Expected: only the planned SOP and planning documents changed.

**Step 3: Commit**

If requested later:

```bash
git add docs/sop/reverse-engineering docs/plans/2026-03-11-reverse-engineering-sop-design.md docs/plans/2026-03-11-reverse-engineering-sop.md
git commit -m "docs: add reverse engineering sop plan"
```
