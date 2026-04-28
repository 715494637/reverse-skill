# Anti-Patterns in JS Reverse

## Purpose

Record common wrong-path patterns in Web JS reverse work. Each entry describes the mistake, why it fails, the correct alternative, and how to recover if you already made the mistake. Severity levels help prioritize which anti-patterns to check first.

Severity key:
- **CRITICAL** — causes all downstream work to be wasted; must be caught immediately
- **HIGH** — wastes significant effort or produces silently wrong results
- **MODERATE** — wastes time but does not necessarily invalidate conclusions

## Locate Stage Anti-Patterns

### AP-L1: Keyword-first global search — CRITICAL

**Mistake**: See a field name like `sign`, `token`, or `_signature` and immediately search it across all sources.

**Why it fails**: Common names match hundreds of unrelated locations. Time is spent reading irrelevant code while the real write point stays hidden.

**Correct path**: Start from the actual network request, trace the initiator stack backward to the frame that writes the value. Search is a fallback when the initiator path is missing or unhelpful.

**Recovery**: Stop the search immediately. Go to the network panel, find the target request, pull its initiator stack. Discard all search results — they are not evidence.

---

### AP-L2: Crypto-function-first approach — HIGH

**Mistake**: See an encrypted or hashed field and immediately search for crypto function names (`MD5`, `SHA`, `AES`, `encrypt`).

**Why it fails**: The crypto call is often wrapped in multiple layers. Finding the crypto function does not prove which caller uses it for the target field, or what the input arguments are.

**Correct path**: Prove the write boundary first. The crypto function is an implementation detail inside the boundary — reach it by tracing from the sink inward, not by searching outward.

**Recovery**: Note the crypto function locations but do not build conclusions on them. Return to the request's initiator stack and trace the write boundary. The crypto functions become relevant only after the write chain is proven.

---

### AP-L3: Confusing similar values with proven linkage — HIGH

**Mistake**: Find a variable that looks like the target value (same length, similar format) and assume it is the source.

**Why it fails**: Many intermediate values share format characteristics. Without proving the data flow path, the "similar" value may be a parallel computation, a decoy, or a stale copy.

**Correct path**: Prove linkage through argument passing, assignment chain, or return value flow — not through value similarity.

**Recovery**: Verify the suspected linkage with a breakpoint at the assignment point. If the variable is not on the same call stack as the target write, it is not the source. Remove the false linkage from your notes.

---

### AP-L4: Treating the first request as the target request — CRITICAL

**Mistake**: The user says "I need to reverse the login API" and work begins on the first `/login` request visible in the network panel.

**Why it fails**: The actual target may be a pre-request that generates a required token, or a second-hop request after a challenge. The visible "login" request may depend on upstream state that is the real reverse target.

**Correct path**: Capture the full request chain first. Identify which request contains the unknown dynamic field that actually needs to be reversed.

**Recovery**: Re-run the evidence gate. List all requests in the chain, identify dependencies, and re-select the real target. All work done on the wrong request must be discarded or re-verified against the real target.

## Recover Stage Anti-Patterns

### AP-R1: Full decompilation before boundary confirmation — HIGH

**Mistake**: Encounter obfuscated code and begin full deobfuscation or decompilation of the entire file.

**Why it fails**: Most of the file is irrelevant to the target boundary. Full decompilation wastes effort and produces noise that obscures the actual logic.

**Correct path**: Recover only the slice connected to the proven boundary. Expand outward only when a dependency is confirmed, not speculatively.

**Recovery**: Stop the decompilation. Identify which functions are actually on the target write chain (use the locate conclusions). Discard recovery work that is not connected to those functions.

---

### AP-R2: Name-guessing in minified code — MODERATE

**Mistake**: See minified variable names like `_$a3`, `_$cg`, `t` and try to guess their meaning from the name or from nearby string literals.

**Why it fails**: Minified names are arbitrary. String literals near a variable may belong to a different branch or a dead-code path.

**Correct path**: Determine variable roles from data flow: what writes to it, what reads from it, what its value is at runtime. Role follows from behavior, not from naming.

**Recovery**: Remove all name-based assumptions from your notes. Set a breakpoint where the variable is assigned, observe its actual value and data flow, and re-classify based on behavior.

---

### AP-R3: Recovering dispatcher internals when a bridge contract is enough — HIGH

**Mistake**: Encounter a JSVMP dispatcher or worker bridge and begin recovering the full internal opcode table or message protocol.

**Why it fails**: If the goal is to call the function or replay the computation, understanding every internal opcode is unnecessary. The input-output contract at the bridge boundary is often sufficient.

**Correct path**: First try black-box reuse at the bridge boundary. Only escalate into internals when the bridge contract is insufficient (e.g., environment-dependent branching inside the dispatcher).

**Recovery**: Check whether your current recovery work can already produce a usable bridge contract. If the input/output boundary is clear, stop internal recovery and test the contract directly.

## Runtime Stage Anti-Patterns

### AP-RT1: Blind patch stacking — CRITICAL

**Mistake**: Execution fails locally, so patches are added one by one — mock `navigator`, add `document.createElement`, fake `window.innerWidth` — without diagnosing the first divergence.

**Why it fails**: Each patch may introduce new side effects. Without knowing the first divergence point, patches may fix symptoms while missing the root cause, or create a fragile stack that breaks on the next update.

**Correct path**: Compare browser and local execution step by step to find the **first** point of divergence. Fix that one point, then re-test. Iterate from the first divergence, not from the last symptom.

**Recovery**: Remove all patches. Build a first-divergence comparison table (see `runtime-diagnosis.md`). Re-add patches one at a time, starting from the first confirmed divergence point. Verify after each addition.

---

### AP-RT2: Removing debugger statements without classification — HIGH

**Mistake**: Find `debugger` statements or anti-debug checks and immediately hook or remove all of them.

**Why it fails**: Some `debugger` traps are pure friction (slow down observation but don't affect values). Others are **risk branches** — their detection result feeds into the computation and changes the output. Removing a risk branch without understanding it produces wrong results silently.

**Correct path**: Classify each anti-debug check as friction or risk branch. Remove only friction. For risk branches, understand the normal-path value and ensure it is preserved.

**Recovery**: Re-examine each removed debugger statement. For each one, check: does the code after it use the detection result in a computation or branch? If yes, it is a risk branch — restore it and instead ensure the detection returns the normal-path value.

---

### AP-RT3: Treating page-load completion as validation — HIGH

**Mistake**: The page loads successfully in a headless browser or local environment, so the runtime is considered "fitted."

**Why it fails**: Page load does not prove that the target computation produces the correct value. Environment-dependent branches may silently take the wrong path and produce a plausible but incorrect result.

**Correct path**: Validate by comparing concrete intermediate checkpoints between browser and local execution, not by checking whether the page loads.

**Recovery**: Add checkpoint comparisons at key intermediate points. If any checkpoint diverges, the runtime is not yet fitted even though the page loads.

## Validation Stage Anti-Patterns

### AP-V1: Final-output-only comparison — CRITICAL

**Mistake**: Compare only the final output (e.g., the generated token) between browser and local execution. If they match once, declare success.

**Why it fails**: A single match may be coincidental (e.g., a time-dependent value that happened to align). Intermediate checkpoints may diverge, meaning the next run will fail.

**Correct path**: Compare at multiple intermediate checkpoints. A valid equivalence proof requires that intermediate states also match, not just the final output.

**Recovery**: Add intermediate checkpoints immediately. Fix time and randomness, then re-run the comparison. If intermediates diverge, the final-output match was coincidental.

---

### AP-V2: Ignoring time and randomness sensitivity — HIGH

**Mistake**: Validation passes with one sample but fails intermittently. The conclusion is "it mostly works."

**Why it fails**: The computation likely depends on timestamp, random seed, or session state that was not frozen during validation.

**Correct path**: Freeze time and randomness sources during validation. If the result is still unstable, there is an unidentified environmental dependency.

**Recovery**: Identify all time and randomness sources in the target chain. Freeze each one, re-run validation. If stability improves, record the frozen sources as required dependencies.

## Cross-Stage Anti-Patterns

### AP-X1: Skipping the evidence gate — CRITICAL

**Mistake**: The user provides a URL and a field name, and work jumps directly to locate or recover without confirming the real request chain.

**Why it fails**: The assumed request may not be the real target. Without evidence-gate confirmation, all downstream work may be built on a wrong foundation.

**Correct path**: Always run the evidence gate when the target request is not yet confirmed from a real captured sample.

**Recovery**: Stop all current work. Run the evidence gate checklist. If the target request was wrong, all downstream work must be re-evaluated from the correct target.

---

### AP-X2: Stage regression without invalidation — HIGH

**Mistake**: Discover during runtime that the write boundary was wrong, but continue patching instead of going back to locate.

**Why it fails**: All recover and runtime work was built on a wrong boundary. Patching on top of a wrong foundation compounds errors.

**Correct path**: Explicitly invalidate the wrong conclusion, output a handoff card with the invalidation, and regress to the correct stage.

**Recovery**: Output a handoff card with the invalidated assumption. Update the artifact. All work built on the wrong boundary must be re-verified or discarded.

## Observation Judgment Flow

This 5-step judgment process applies whenever an observation point (breakpoint, hook, trace, or MCP tool result) fires. It is a **cross-stage thinking tool**, not limited to locate.

### Step 1: Am I on the target chain?

Read the call stack from top to bottom:

- Does the stack pass through the known trigger path?
- Does the stack reach the known sink or write boundary?
- If neither: this hit is likely noise. Record it as "off-chain" and move the observation point.

### Step 2: What role does this location play?

| Role | Signal | Next move |
|---|---|---|
| **Write point** (sink) | Target value is being assigned or sent | Confirm value matches. This may be the boundary. |
| **Builder** | Target value is being assembled from parts | Identify which parts are known, which need tracing. |
| **Entry** | A caller dispatches into the target chain | Note arguments — they reveal what the caller knows. |
| **Relay** | Value passes through unchanged | Skip — move to the caller or callee. |
| **Irrelevant** | No connection to target value | Re-evaluate observation point. |

### Step 3: What do the scope variables tell me?

- **Arguments**: Do any match known upstream values?
- **Local state**: Are there intermediate computation results in known formats?
- **Closure variables**: Is there captured state from an outer scope?
- **Return value**: Does it appear in the final request?

Determine role from **value and data flow**, not from minified variable names.

### Step 4: Decide the next direction

| Finding | Direction |
|---|---|
| At write point, value is complete | **Step out** — trace where the complete value came from |
| At builder, some inputs unknown | **Step into** the unknown input's source |
| At entry, arguments reveal the picture | **Record and move on** |
| At relay, value passes through | **Move observation** to a more meaningful layer |
| Hit is off-chain | **Relocate** the observation point |

### Step 5: Record the conclusion

```text
Location: {file/function or description}
Role: write point / builder / entry / relay / irrelevant
Key observation: {what was learned}
Next action: step into X / step out / move observation to Y / record and continue
```

### Judgment Traps

- **Trap**: First hit contains a crypto function → but the function is called from many paths. Always confirm via call stack.
- **Trap**: Variable holds a value that looks like the target → but it was computed in a previous invocation. Check if the value is fresh or stale.
- **Trap**: Stepping into a deep call chain and losing track → Before each step-into, state what you expect to learn. If the answer is vague, step out instead.

## Severity Summary

| Severity | Anti-patterns |
|---|---|
| **CRITICAL** | AP-L1, AP-L4, AP-RT1, AP-V1, AP-X1 |
| **HIGH** | AP-L2, AP-L3, AP-R1, AP-R3, AP-RT2, AP-RT3, AP-V2, AP-X2 |
| **MODERATE** | AP-R2 |
