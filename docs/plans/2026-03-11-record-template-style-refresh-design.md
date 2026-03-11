# Record Template Style Refresh Design

**Goal:** Refresh the skill-generated reverse-record Markdown templates so they are compact, scan-friendly, and visually cleaner using pure Markdown plus light emoji status markers.

**Scope:** `请求链路.md`, `运行态清单.md`, `恢复记录.md`, `总览.md`, `验证记录.md`

**Non-Goals:**
- no HTML styling
- no color-dependent syntax
- no change to stage semantics or required evidence fields

## Visual Direction

Use one shared visual language across all generated records:

- `✅ 已确认` for proven facts
- `🟡 待确认` for open but actionable items
- `⛔ 阻塞` for current blockers
- `🔍 待验证` for proof items that must move into `验证记录.md`
- `➡️ 下一步` for the next concrete action only

The format should feel like an engineering workboard, not a tutorial or verbose report.

## Layout Rules

Every generated record should start with a short summary block instead of a large field dump.

Preferred structure:

1. top summary lines
2. one compact table or one short list per logical section
3. no long prose paragraphs
4. no deep nested bullets unless the artifact is a function card

## File-Specific Direction

### 总览.md

- replace broad stage-field dumps with a short summary block
- group body into `✅ 已确认 / 🟡 待确认 / ⛔ 风险或阻塞 / 🔍 待验证 / ➡️ 下一步`
- keep normal/risk comparison and fork map only when relevant

### 请求链路.md

- keep request-per-section structure
- change request metadata to a compact two-column table
- change field entries from nested bullets to compact tables
- preserve `状态 / 来源 / 去向 / 证据` semantics

### 运行态清单.md

- add a top route summary block
- use compact tables for `必需对象`, `必需状态`, `固定源`, and `纯算迁移前检查`
- move optional runtime areas into short, clearly labeled sections

### 恢复记录.md

- use a top summary block for layer, level, anchor, and stop reason
- convert structural facts into compact summary tables
- keep key-function cards, but compress surrounding prose

### 验证记录.md

- format each validation item as a small proof card
- show validation result as `✅ 一致 / 🟡 部分一致 / ⛔ 不一致 / 🔍 待验证`
- present fixed inputs and result fields in compact tables

## Compatibility Rules

- output must remain valid plain Markdown
- GitHub, Codex preview, and local editors should all read it cleanly
- canonical fields remain present, but layout becomes more compact
- emoji are status markers, not decoration
