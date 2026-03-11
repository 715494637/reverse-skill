# Record Template Style Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the reverse-record Markdown templates cleaner and more compact with summary-first layout, status emoji, and tighter tables.

**Architecture:** Update the canonical reference files that define the generated record skeletons. Keep semantics unchanged, but replace verbose layouts with summary blocks, compact tables, and a shared visual status vocabulary.

**Tech Stack:** Markdown references, skill templates

---

### Task 1: Refresh Request-Chain Templates

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-locate\references\request-chain-recording.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-locate\references\request-chain-recording.md`

**Step 1: Rewrite top summary block**

Add compact header fields and status display guidance.

**Step 2: Convert request metadata to tables**

Use `接口 / 触发方式 / 上游请求 / 响应结果` two-column tables.

**Step 3: Convert field sections to compact tables**

Preserve `状态 / 来源 / 去向 / 证据`.

**Step 4: Run format check**

Run: `git diff --check -- jsr-locate/references/request-chain-recording.md zh/jsr-locate/references/request-chain-recording.md`
Expected: no content-format errors

### Task 2: Refresh Runtime Templates

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime\references\minimal-env-design.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-runtime\references\minimal-env-design.md`

**Step 1: Add summary-first runtime skeleton**

Add `当前状态 / 目标链路 / 执行模式 / 浏览器画像 / 下一步`.

**Step 2: Convert dependency areas to compact tables**

Reshape `必需对象`, `必需状态`, `固定源`, and `纯算迁移前检查`.

**Step 3: Compress optional runtime sections**

Keep anti-debug, fingerprint, risk branch, removable items, and validation linkage concise.

**Step 4: Run format check**

Run: `git diff --check -- jsr-runtime/references/minimal-env-design.md zh/jsr-runtime/references/minimal-env-design.md`
Expected: no content-format errors

### Task 3: Refresh Recovery Templates

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-recover\references\equivalence-and-validation.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-recover\references\equivalence-and-validation.md`

**Step 1: Add summary-first recovery skeleton**

Add `当前状态 / 遮蔽层类型 / 恢复级别 / 当前结论 / 下一恢复点`.

**Step 2: Compress structure cards**

Convert structural fields into compact tables without dropping mandatory proof anchors.

**Step 3: Keep key-function cards concrete**

Retain `输入 / 输出 / 副作用 / 依赖 / 证据`.

**Step 4: Run format check**

Run: `git diff --check -- jsr-recover/references/equivalence-and-validation.md zh/jsr-recover/references/equivalence-and-validation.md`
Expected: no content-format errors

### Task 4: Refresh Overview and Validation Templates

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-locate\references\record-overview-and-validation.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-runtime\references\record-overview-and-validation.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\jsr-recover\references\record-overview-and-validation.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-locate\references\record-overview-and-validation.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-runtime\references\record-overview-and-validation.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\zh\jsr-recover\references\record-overview-and-validation.md`

**Step 1: Replace old status blocks with summary-first display**

Keep normalized status semantics, but show them as `✅ / 🟡 / ⛔ / 🔍 / ➡️`.

**Step 2: Rebuild validation skeletons**

Use compact proof-card layout with fixed-input tables and concise result tables.

**Step 3: Keep stage-specific routing rules**

Preserve locate/runtime/recover differences without creating a second visual system.

**Step 4: Run format check**

Run: `git diff --check -- jsr-locate/references/record-overview-and-validation.md jsr-runtime/references/record-overview-and-validation.md jsr-recover/references/record-overview-and-validation.md zh/jsr-locate/references/record-overview-and-validation.md zh/jsr-runtime/references/record-overview-and-validation.md zh/jsr-recover/references/record-overview-and-validation.md`
Expected: no content-format errors

### Task 5: Verify Consistency

**Files:**
- Modify: `E:\ai code web\AI reverse\reverse-skill\docs\plans\2026-03-11-record-template-style-refresh-design.md`
- Modify: `E:\ai code web\AI reverse\reverse-skill\docs\plans\2026-03-11-record-template-style-refresh.md`

**Step 1: Verify no HTML-only styling is introduced**

Run: `Select-String -Path jsr-locate/references/*.md,jsr-runtime/references/*.md,jsr-recover/references/*.md,zh/jsr-locate/references/*.md,zh/jsr-runtime/references/*.md,zh/jsr-recover/references/*.md -Pattern '<details|<span|style='`
Expected: no matches

**Step 2: Verify emoji status markers are wired**

Run: `Select-String -Path jsr-locate/references/*.md,jsr-runtime/references/*.md,jsr-recover/references/*.md,zh/jsr-locate/references/*.md,zh/jsr-runtime/references/*.md,zh/jsr-recover/references/*.md -Pattern '✅|🟡|⛔|🔍|➡️'`
Expected: matches in the refreshed template files

**Step 3: Verify repository diff shape**

Run: `git diff --stat -- docs/plans/2026-03-11-record-template-style-refresh-design.md docs/plans/2026-03-11-record-template-style-refresh.md jsr-locate/references jsr-runtime/references jsr-recover/references zh/jsr-locate/references zh/jsr-runtime/references zh/jsr-recover/references`
Expected: only the planned reference/template files changed
