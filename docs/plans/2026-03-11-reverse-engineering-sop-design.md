# Reverse Engineering SOP Design

**Goal:** Add a professional, execution-first reverse-engineering SOP and template set that turns the repository's existing methodology into a repeatable workflow.

**Scope:** Documentation only. The design covers one main SOP, one decision matrix, and six stage templates. It does not change `jsr-locate`, `jsr-runtime`, or `jsr-recover` behavior.

**Non-Goals:**
- Do not restate generic reverse-engineering theory.
- Do not embed model-inferable knowledge or long-form explanation blocks.
- Do not add automation scripts, generated examples, or case-study content in this phase.

## Design Principles

- Professional first: every document must act as an operator tool, not a tutorial.
- No redundancy: keep each fact in one canonical location.
- Evidence only: record target-specific observations, not generic reasoning.
- Actionable fields only: every field must support routing, execution, or acceptance.
- Validation before delivery: no engineering artifact can be marked ready without explicit verification evidence.

## Output Structure

Create a new documentation subtree:

```text
docs/
  sop/
    reverse-engineering/
      README.md
      decision-matrix.md
      templates/
        任务卡.md
        请求链路.md
        运行态清单.md
        恢复记录.md
        验证记录.md
        交付清单.md
```

### `README.md`

Owns the single canonical workflow:

`目标归一化 -> 证据采集 -> locate -> runtime -> recover -> validation -> delivery`

It defines:
- stage order
- entry and exit rules
- when to stop at `partial`
- when delivery is forbidden

### `decision-matrix.md`

Owns routing rules only:
- when to start with `jsr-locate`
- when to escalate to `jsr-runtime`
- when to enter `jsr-recover`
- when to remain blocked
- when to stop and report `partial`

### Templates

Each template owns one stage artifact and must avoid overlap.

- `任务卡.md`
  Owns target object, sample id, trigger entry, success criteria, constraints, current stage.
- `请求链路.md`
  Owns sink, real write boundary, trigger action, upstream response dependency, cookie/state dependency, normal branch, risk branch, evidence references.
- `运行态清单.md`
  Owns missing objects, missing state, anti-debug points, time/randomness sources, fingerprint surfaces, minimal patch, validation result.
- `恢复记录.md`
  Owns obfuscation layer type, semantic boundary, bridge contract, key data structure, protocol semantics, unrecovered gaps.
- `验证记录.md`
  Owns browser baseline, comparison input, comparison output, allowed error, failed sample, validation conclusion.
- `交付清单.md`
  Owns allowed deliverables, forbidden deliverables, preconditions, coverage, residual risk, final delivery conclusion.

## Workflow Contract

Every stage must define the same four elements:

- `进入条件`
- `产出`
- `退出条件`
- `失败输出`

### Stage Gates

1. `任务归一化`
   - Output: `任务卡.md`
   - Failure: `blocked`
2. `证据采集`
   - Output: evidence package for one trusted normal-state sample
   - Failure: `partial` or `blocked`
3. `Locate`
   - Output: `请求链路.md`
   - Failure: `partial`
4. `Runtime`
   - Output: `运行态清单.md`
   - Failure: `partial`
5. `Recover`
   - Output: `恢复记录.md`
   - Failure: `partial`
6. `Validation`
   - Output: `验证记录.md`
   - Failure: `failed`
7. `Delivery`
   - Output: `交付清单.md`
   - Failure: `no-go`

## Authoring Constraints

These rules are hard requirements, not style suggestions.

- Only include target-specific, evidence-backed facts.
- Do not add background sections, theory sections, or generic reverse-engineering advice.
- Do not add free-form summary sections.
- Do not add weak fields such as `思路`, `猜测`, `可能原因`, or `原理说明`.
- Any judgment field must point to a concrete evidence source.
- Every template must include `样本编号` and `证据编号`.
- Every conclusion must be traceable to one of:
  - request capture
  - response capture
  - breakpoint
  - hook
  - controlled comparison

## Acceptance Criteria

The SOP is ready only if:

- the main workflow is described once and only once
- routing rules are isolated in `decision-matrix.md`
- each stage template has a non-overlapping responsibility
- no template contains model-inferable generic knowledge
- every template can be filled without adding essay-style prose
- delivery is explicitly blocked before validation

## Implementation Notes

- Keep the scope inside `docs/sop/reverse-engineering/`
- Do not modify root `README.md` in this phase
- Do not add example cases in this phase
- Prefer short Chinese labels because the user requested Chinese-first outputs
