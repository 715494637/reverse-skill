# JSVMP Recover Enhancement Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen `jsr-reverse` JSVMP recover guidance so the skill emits explicit recovery artifacts, `A / B / C` escalation decisions, and defensible stage-transition criteria without changing the single-entry workflow spine.

**Architecture:** Keep `jsr-reverse` as the only entrypoint and keep the existing `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff` spine unchanged. Strengthen only the JSVMP topic references plus the JSVMP-oriented recover skill test: the recover core remains `recover-strategy.md`, and `jsvmp-and-ast.md` remains a mounted topic reference read after `recover` is chosen.

**Tech Stack:** Markdown documentation, `jsr-reverse` references, `zh/jsr-reverse` references, `docs/skill-tests`

---

## File Structure (locked before tasks)

**Modify:**
- `jsr-reverse/references/jsvmp-and-ast.md` — strengthen the English JSVMP topic contract
- `zh/jsr-reverse/references/jsvmp-and-ast.md` — mirror the English contract in Chinese
- `docs/skill-tests/jsr-recover-shell.md` — lock the new recover expectations into the skill test

**Do not modify:**
- `jsr-reverse/SKILL.md`
- `jsr-reverse/references/recover-strategy.md`
- `README.md`
- Any other `docs/skill-tests/*.md`

---

### Task 1: Tighten the JSVMP recover skill test first

**Files:**
- Modify: `docs/skill-tests/jsr-recover-shell.md`
- Test: `docs/skill-tests/jsr-recover-shell.md`

- [ ] **Step 1: Snapshot the current skill test**

Run: `git diff -- docs/skill-tests/jsr-recover-shell.md`
Expected: either no diff or only the current baseline text for this test file.

- [ ] **Step 2: Rewrite the skilled-run expectations to lock the new contract**

Update `### 预期正确行为`, `## 失败判据`, and `## 通过判据` so they explicitly require all of the following:

```markdown
- 先确认 skilled run 会先读 `jsr-reverse/SKILL.md`
- 先确认当前阶段是 `recover`
- 先读 `jsr-reverse/references/recover-strategy.md`，再挂 `jsr-reverse/references/jsvmp-and-ast.md`
- 输出当前恢复级别 `A / B / C`，并说明为什么停在当前级别
- 输出至少一类 recover 工件（artifact）或 checkpoint，而不是只给泛泛 prose
- 说明什么条件下转去 `runtime`
- 说明什么条件下转去 `validation`
- 说明在 VM 入口相关性或写回关系未证实时，必须回退 `locate`
```

Keep the optional worker / wasm / RS topic mounts intact if they still fit the scenario.

- [ ] **Step 3: Verify the test now checks the new behavior**

Run: `git diff -- docs/skill-tests/jsr-recover-shell.md`
Expected: the diff explicitly shows `jsr-reverse/SKILL.md`, `A / B / C`, artifact/checkpoint wording, `runtime`, `validation`, and `locate` fallback expectations.

- [ ] **Step 4: Do not commit or stage yet**

Keep this file unstaged in the working tree. Cross-file verification later relies on checking the complete unstaged change set before the single final commit.

### Task 2: Strengthen the English JSVMP recover contract

**Files:**
- Modify: `jsr-reverse/references/jsvmp-and-ast.md`
- Test: `docs/skill-tests/jsr-recover-shell.md`

- [ ] **Step 1: Snapshot the current English reference**

Run: `git diff -- jsr-reverse/references/jsvmp-and-ast.md`
Expected: baseline reference content only.

- [ ] **Step 2: Replace the JSVMP opening with a hard use-boundary and artifact contract**

Rewrite the JSVMP portion so it includes these exact subsections, in this order, before the existing AST guidance:

```markdown
## Purpose / Use Boundary
## Recovery Levels
## JSVMP Artifact Contract
### Entry Card
### State Carrier Card
### Critical Opcode / Branch Card
### Recovery-Level Decision Card
## Stage Transition Criteria
## Checkpoint Contract
## Common Misjudgments
## Completion Standard
```

Keep the existing AST / control-flow-flattening material after the JSVMP contract unless a small wording edit is needed for coherence. Do not turn the file into a second recover core reference.

- [ ] **Step 3: Fill the new artifact contract with exact required fields**

Ensure the new subsections contain these field requirements verbatim or near-verbatim:

```markdown
### Entry Card
- bytecode source
- dispatcher entry
- interpreter / execution function
- relation to the target field or target write-back path
- strongest observed anchor or evidence

### State Carrier Card
- register arrays
- stack objects
- context objects
- constant pool / string table
- which carriers materially affect the target field
- which carriers only transport state without affecting the decision

### Critical Opcode / Branch Card
- input
- output
- state mutation
- dependency
- evidence
- relation to target field / hashing / encryption / serialization / packet assembly

### Recovery-Level Decision Card
- current level: `A` / `B` / `C`
- why the current level is sufficient
- why a shallower stop depth is insufficient
- why deeper opening is not yet justified, or why it has become necessary
```

Also fix the corrupted line in the current Level A bullet so the target-field write-back sentence is valid UTF-8 English again.

- [ ] **Step 4: Add hard escalation and stage-transition rules**

Insert these rules into the JSVMP section:

```markdown
#### Default rule
- Start from `A`.
- Never jump to `C` only because the code is ugly, flattened, or full of string tables.

#### `A -> B`
- a critical `opcode` cannot be interpreted without dispatcher semantics
- target-field explanation depends on register / stack / context flow
- key branches cannot be judged without state-carrier recovery

#### `B -> C`
- downstream work requires replay of multiple execution paths
- protocol rebuild or batch execution requires a minimal executable fragment
- levels `A` and `B` still cannot support runtime fit or validation checkpoints

#### `recover -> locate`
- dispatcher entry relevance is still unproven
- supposed VM entry is still guessed rather than observed
- recovered VM slice still cannot be tied to the real target write-back path
- deeper VM work would continue on an unproven boundary instead of closing evidence

#### `recover -> runtime`
- bridge contract is already clear
- critical operator / `opcode` family already explains the algorithm boundary
- remaining divergence is caused by environment facts, lifecycle state, timing, or risk branches
- deeper VM work would add code volume without explaining the execution divergence

#### `recover -> validation`
- dispatcher entry is known
- state carriers are known
- critical `opcode` / branches related to the target field are extracted
- the chosen stop level is justified
- fixed samples exist for checkpoint comparison
```

- [ ] **Step 5: Add a fixed checkpoint contract and stronger stop rules**

Ensure the JSVMP section explicitly names these checkpoints:

```markdown
1. dispatcher entry state
2. critical state-carrier transition
3. critical `opcode` input / output
4. pre-write-back intermediate result
5. final target field
```

For each checkpoint, require:

```markdown
- fixed input sample
- browser-side evidence
- recovered / local-side evidence
- conclusion: match / diverge / unproven
- remaining gap
```

Keep the completion standard tied to: proven stop depth, explicit artifacts, and a clear handoff to `locate`, `runtime`, or `validation`.

- [ ] **Step 6: Write the exact Common Misjudgments / forbidden-move items**

Ensure the English file explicitly includes these five lines semantically, not just a generic heading:

```markdown
- treating dispatcher recovery as completion by itself
- treating string-table recovery as algorithm recovery
- selecting level `C` because the code style is unpleasant
- continuing deeper VM recovery when the remaining blocker is clearly runtime divergence
- claiming “pure algorithm” before state and runtime dependencies are actually excluded
```

- [ ] **Step 7: Verify the English diff is narrowly scoped**

Run: `git diff -- jsr-reverse/references/jsvmp-and-ast.md`
Expected: the diff adds use-boundary, artifact-contract, escalation, transition, checkpoint, and stop-condition language without rewriting unrelated AST material.

- [ ] **Step 8: Do not commit or stage yet**

Keep the English reference unstaged in the working tree. Cross-file verification later relies on checking the complete unstaged change set before the single final commit.

### Task 3: Mirror the contract in the Chinese JSVMP reference

**Files:**
- Modify: `zh/jsr-reverse/references/jsvmp-and-ast.md`
- Test: `docs/skill-tests/jsr-recover-shell.md`

- [ ] **Step 1: Snapshot the current Chinese reference**

Run: `git diff -- zh/jsr-reverse/references/jsvmp-and-ast.md`
Expected: baseline reference content only.

- [ ] **Step 2: Mirror the English structure in Chinese, without loosening the rules**

Restructure the Chinese JSVMP section to mirror the English contract. The Chinese headings should be explicit and engineering-oriented, for example:

```markdown
## 使用边界
## 恢复级别
## JSVMP 专项工件
### 入口卡
### 状态载体卡
### 关键 `opcode` / 分支卡
### 恢复级别决策卡
## 阶段切换判据
## 检查点合同
## 常见误判
## 完成标准
```

Do not translate this into a looser explanatory article. Keep it as a hard recover-stage contract.

- [ ] **Step 3: Translate the English artifact, escalation, and transition rules semantically line-for-line**

Make sure the Chinese file preserves all of the English-side constraints, including the extra fallback and stop-depth guardrails:

```markdown
- 默认从 `A` 开始
- 不能因为代码脏或字符串表复杂就直接跳 `C`
- 允许 `recover -> locate`
- 允许 `recover -> runtime`
- 允许 `recover -> validation`
- deeper VM work would continue on an unproven boundary instead of closing evidence 的语义必须保留
- deeper VM work would add code volume without explaining the execution divergence 的语义必须保留
- 必须输出入口卡 / 状态载体卡 / 关键 `opcode` / 分支卡 / 恢复级别决策卡
- 必须按检查点收口，而不是只看最终结果
```

- [ ] **Step 4: Mirror the Common Misjudgments section in Chinese**

Ensure the Chinese file explicitly includes semantic equivalents of these five English-side prohibitions:

```markdown
- 不要把 dispatcher 恢复本身当作完成
- 不要把字符串表恢复当作算法恢复完成
- 不要因为代码风格脏乱就直接跳到 `C`
- 当剩余阻塞已经明显是 runtime 分歧时，不要继续深挖 VM
- 在状态与运行时依赖尚未排除前，不要宣称“纯算法”
```

- [ ] **Step 5: Verify the Chinese file still mirrors the English contract**

Run: `git diff -- zh/jsr-reverse/references/jsvmp-and-ast.md`
Expected: the diff shows the same contract structure and constraints as the English file, expressed in Chinese rather than paraphrased away.

- [ ] **Step 6: Do not commit or stage yet**

Keep the Chinese reference unstaged in the working tree. Cross-file verification later relies on checking the complete unstaged change set before the single final commit.

### Task 4: Run cross-file verification and tighten any final wording drift

**Files:**
- Modify: `jsr-reverse/references/jsvmp-and-ast.md` (only if final wording drift is found)
- Modify: `zh/jsr-reverse/references/jsvmp-and-ast.md` (only if final wording drift is found)
- Modify: `docs/skill-tests/jsr-recover-shell.md` (only if final wording drift is found)
- Test: `jsr-reverse/references/jsvmp-and-ast.md`
- Test: `zh/jsr-reverse/references/jsvmp-and-ast.md`
- Test: `docs/skill-tests/jsr-recover-shell.md`

- [ ] **Step 1: Run a basic keyword-level sanity check across all three files**

Run:

```bash
python - <<'PY'
from pathlib import Path

checks = {
    "jsr-reverse/references/jsvmp-and-ast.md": [
        "Entry Card",
        "State Carrier Card",
        "Critical Opcode / Branch Card",
        "Recovery-Level Decision Card",
        "Checkpoint Contract",
        "treating dispatcher recovery as completion by itself",
        "treating string-table recovery as algorithm recovery",
        "selecting level `C` because the code style is unpleasant",
        "continuing deeper VM recovery when the remaining blocker is clearly runtime divergence",
        "claiming “pure algorithm” before state and runtime dependencies are actually excluded",
        "`recover -> locate`",
        "`recover -> runtime`",
        "`recover -> validation`",
    ],
    "zh/jsr-reverse/references/jsvmp-and-ast.md": [
        "入口卡",
        "状态载体卡",
        "关键 `opcode` / 分支卡",
        "恢复级别决策卡",
        "检查点",
        "不要把 dispatcher 恢复本身当作完成",
        "不要把字符串表恢复当作算法恢复完成",
        "不要因为代码风格脏乱就直接跳到 `C`",
        "当剩余阻塞已经明显是 runtime 分歧时，不要继续深挖 VM",
        "在状态与运行时依赖尚未排除前，不要宣称“纯算法”",
        "`recover -> locate`",
        "`recover -> runtime`",
        "`recover -> validation`",
    ],
    "docs/skill-tests/jsr-recover-shell.md": [
        "jsr-reverse/SKILL.md",
        "`A / B / C`",
        "artifact",
        "checkpoint",
        "`runtime`",
        "`validation`",
        "`locate`",
    ],
}

missing = []
for rel, needles in checks.items():
    text = Path(rel).read_text(encoding="utf-8")
    for needle in needles:
        if needle not in text:
            missing.append(f"{rel}: {needle}")

if missing:
    print("MISSING")
    print("\n".join(missing))
    raise SystemExit(1)

print("OK")
PY
```

Expected: `OK`. This is only a basic sanity check for obvious wording drift, not a full proof of spec compliance.

- [ ] **Step 2: Verify the changed-file set is still tightly scoped**

Run:

```bash
git diff --name-only
```

Expected: only these three file paths appear:
- `jsr-reverse/references/jsvmp-and-ast.md`
- `zh/jsr-reverse/references/jsvmp-and-ast.md`
- `docs/skill-tests/jsr-recover-shell.md`

- [ ] **Step 3: Re-read the spec and compare it against the final diff**

Re-read: `docs/superpowers/specs/2026-03-18-jsvmp-recover-design.md`

Confirm the final diff still satisfies all required points:
- no new skill
- no new workflow spine
- recover core first, JSVMP topic second
- `recover -> locate / runtime / validation` all remain explicit
- artifacts and checkpoints are mandatory

- [ ] **Step 4: Create one final commit for the complete change set**

```bash
git add jsr-reverse/references/jsvmp-and-ast.md zh/jsr-reverse/references/jsvmp-and-ast.md docs/skill-tests/jsr-recover-shell.md
git commit -m "$(cat <<'EOF'
docs: harden JSVMP recover contract and skill test
EOF
)"
```

---

## End-to-End Verification Recipe

1. Open `docs/skill-tests/jsr-recover-shell.md`.
2. Run the baseline prompt and confirm the listed bad behaviors still describe the undesired response shape.
3. Run the skilled prompt and confirm the expected behavior now requires:
   - `recover` as the first stage
   - `recover-strategy.md` before `jsvmp-and-ast.md`
   - an `A / B / C` decision
   - artifact/checkpoint output
   - justified routing to `runtime` / `validation`
   - justified fallback to `locate` when the boundary is not proven
4. Read both updated reference files and confirm the English and Chinese contracts are structurally aligned.

## Review Handoff

After implementation, request review against:
- `docs/superpowers/specs/2026-03-18-jsvmp-recover-design.md`
- `docs/skill-tests/jsr-recover-shell.md`
- `jsr-reverse/references/jsvmp-and-ast.md`
- `zh/jsr-reverse/references/jsvmp-and-ast.md`
