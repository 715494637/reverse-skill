# Chinese Contract Unification Design

**Goal:** Make Chinese-facing reverse-engineering documentation use Chinese field names consistently and converge record ownership on the central SOP templates.

**Scope:** Documentation only. Update the reverse-engineering SOP, central templates, selected skill files, and stage references for locate/runtime/recover.

**Non-Goals:**
- Do not redesign the three-skill stage model.
- Do not add new standalone skills.
- Do not rewrite English explanatory prose unless needed to remove contract conflicts.

## Problems To Fix

- Chinese-facing documents still mix English field names, stage names, and status enums.
- Central templates and stage references both define record skeletons, so agents can satisfy one contract while violating another.
- Runtime records use two filenames: `运行态清单.md` and `运行时依赖.md`.
- The canonical `请求链路.md` and `恢复记录.md` templates are weaker than the skill acceptance contracts.

## Design Decisions

### 1. Central templates become the single canonical record schema

`docs/sop/reverse-engineering/templates/` will define the only canonical schemas for:

- `任务卡.md`
- `请求链路.md`
- `运行态清单.md`
- `恢复记录.md`
- `验证记录.md`
- `交付清单.md`

Stage references may still define ownership, start timing, and mandatory sections, but they must not define a second competing skeleton.

### 2. Chinese-facing fields are fully Chinese

For Chinese-facing artifacts, convert field labels, stage names, and status enums to Chinese unless the term is a true product or protocol name such as `JSRPC`, `Flask`, `Burp`, `sdenv`, `jsdom`, `WASM`, or `HttpOnly`.

Examples of fields to convert:

- `status / stage / code / summary / evidence / impact / next_action`
- `phase`
- `Locate / Runtime / Recover / Validation / Delivery`
- `ready / partial / blocked / failed / no-go`
- `Sink`, `Item`, `Same chain`

### 3. Runtime filename is unified on `运行态清单.md`

All central templates, skills, and references will use `运行态清单.md` as the only runtime artifact filename.

`运行态清单.md` must absorb the high-signal runtime facts currently split across `运行时依赖.md` references:

- 适配检查
- 执行模式
- 浏览器画像
- 注入时机
- 状态闭合信号
- 必需对象
- 必需状态
- 纯算迁移前检查
- 可移除项
- 验证联动

### 4. `请求链路.md` becomes a full request-block schema

The central template must support:

- request blocks
- per-field `状态 / 来源 / 去向 / 证据`
- upstream expansion
- optional connection metadata

It must not store stage progress or summary state.

### 5. `恢复记录.md` must encode closure level

The canonical recovery template must include:

- `恢复级别`
- `停止理由`
- stage-specific structure cards

Without that, `jsr-recover` has no durable record of why recovery can stop.

### 6. Stage references keep routing, not duplicate templates

`record-overview-and-validation.md`, `request-chain-recording.md`, and `minimal-env-design.md` should point to central templates for canonical structure and only keep:

- file ownership
- mandatory sections
- routing rules
- validation trigger rules
- quality checks

## Acceptance Criteria

This unification is complete only if:

- no Chinese-facing SOP/template field label is left in English without a strong technical reason
- `请求链路.md`, `运行态清单.md`, `恢复记录.md`, and `验证记录.md` each have one canonical schema only
- `运行时依赖.md` no longer appears as the runtime canonical filename
- locate/runtime/recover references no longer define competing validation skeletons
- the central templates can encode all current stage acceptance facts without relying on hidden side references
