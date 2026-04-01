# Anti-Patterns in JS Reverse

## Purpose

Record common wrong-path patterns in Web JS reverse work. Each entry describes the mistake, why it fails, and the correct alternative. These are experience-based traps that cannot be derived from general knowledge alone.

## Locate Stage Anti-Patterns

### AP-L1: Keyword-first global search

**Mistake**: See a field name like `sign`, `token`, or `_signature` and immediately search it across all sources.

**Why it fails**: Common names match hundreds of unrelated locations. Time is spent reading irrelevant code while the real write point stays hidden.

**Correct path**: Start from the actual network request, trace the initiator stack backward to the frame that writes the value. Search is a fallback when the initiator path is missing or unhelpful.

---

### AP-L2: Crypto-function-first approach

**Mistake**: See an encrypted or hashed field and immediately search for crypto function names (`MD5`, `SHA`, `AES`, `encrypt`).

**Why it fails**: The crypto call is often wrapped in multiple layers. Finding the crypto function does not prove which caller uses it for the target field, or what the input arguments are.

**Correct path**: Prove the write boundary first. The crypto function is an implementation detail inside the boundary — reach it by tracing from the sink inward, not by searching outward.

---

### AP-L3: Confusing similar values with proven linkage

**Mistake**: Find a variable that looks like the target value (same length, similar format) and assume it is the source.

**Why it fails**: Many intermediate values share format characteristics. Without proving the data flow path, the "similar" value may be a parallel computation, a decoy, or a stale copy.

**Correct path**: Prove linkage through argument passing, assignment chain, or return value flow — not through value similarity.

---

### AP-L4: Treating the first request as the target request

**Mistake**: The user says "I need to reverse the login API" and work begins on the first `/login` request visible in the network panel.

**Why it fails**: The actual target may be a pre-request that generates a required token, or a second-hop request after a challenge. The visible "login" request may depend on upstream state that is the real reverse target.

**Correct path**: Capture the full request chain first. Identify which request contains the unknown dynamic field that actually needs to be reversed.

## Recover Stage Anti-Patterns

### AP-R1: Full decompilation before boundary confirmation

**Mistake**: Encounter obfuscated code and begin full deobfuscation or decompilation of the entire file.

**Why it fails**: Most of the file is irrelevant to the target boundary. Full decompilation wastes effort and produces noise that obscures the actual logic.

**Correct path**: Recover only the slice connected to the proven boundary. Expand outward only when a dependency is confirmed, not speculatively.

---

### AP-R2: Name-guessing in minified code

**Mistake**: See minified variable names like `_$a3`, `_$cg`, `t` and try to guess their meaning from the name or from nearby string literals.

**Why it fails**: Minified names are arbitrary. String literals near a variable may belong to a different branch or a dead-code path.

**Correct path**: Determine variable roles from data flow: what writes to it, what reads from it, what its value is at runtime. Role follows from behavior, not from naming.

---

### AP-R3: Recovering dispatcher internals when a bridge contract is enough

**Mistake**: Encounter a JSVMP dispatcher or worker bridge and begin recovering the full internal opcode table or message protocol.

**Why it fails**: If the goal is to call the function or replay the computation, understanding every internal opcode is unnecessary. The input-output contract at the bridge boundary is often sufficient.

**Correct path**: First try black-box reuse at the bridge boundary. Only escalate into internals when the bridge contract is insufficient (e.g., environment-dependent branching inside the dispatcher).

## Runtime Stage Anti-Patterns

### AP-RT1: Blind patch stacking

**Mistake**: Execution fails locally, so patches are added one by one — mock `navigator`, add `document.createElement`, fake `window.innerWidth` — without diagnosing the first divergence.

**Why it fails**: Each patch may introduce new side effects. Without knowing the first divergence point, patches may fix symptoms while missing the root cause, or create a fragile stack that breaks on the next update.

**Correct path**: Compare browser and local execution step by step to find the **first** point of divergence. Fix that one point, then re-test. Iterate from the first divergence, not from the last symptom.

---

### AP-RT2: Removing debugger statements without classification

**Mistake**: Find `debugger` statements or anti-debug checks and immediately hook or remove all of them.

**Why it fails**: Some `debugger` traps are pure friction (slow down observation but don't affect values). Others are **risk branches** — their detection result feeds into the computation and changes the output. Removing a risk branch without understanding it produces wrong results silently.

**Correct path**: Classify each anti-debug check as friction or risk branch. Remove only friction. For risk branches, understand the normal-path value and ensure it is preserved.

---

### AP-RT3: Treating page-load completion as validation

**Mistake**: The page loads successfully in a headless browser or local environment, so the runtime is considered "fitted."

**Why it fails**: Page load does not prove that the target computation produces the correct value. Environment-dependent branches may silently take the wrong path and produce a plausible but incorrect result.

**Correct path**: Validate by comparing concrete intermediate checkpoints between browser and local execution, not by checking whether the page loads.

## Validation Stage Anti-Patterns

### AP-V1: Final-output-only comparison

**Mistake**: Compare only the final output (e.g., the generated token) between browser and local execution. If they match once, declare success.

**Why it fails**: A single match may be coincidental (e.g., a time-dependent value that happened to align). Intermediate checkpoints may diverge, meaning the next run will fail.

**Correct path**: Compare at multiple intermediate checkpoints. A valid equivalence proof requires that intermediate states also match, not just the final output.

---

### AP-V2: Ignoring time and randomness sensitivity

**Mistake**: Validation passes with one sample but fails intermittently. The conclusion is "it mostly works."

**Why it fails**: The computation likely depends on timestamp, random seed, or session state that was not frozen during validation.

**Correct path**: Freeze time and randomness sources during validation. If the result is still unstable, there is an unidentified environmental dependency.

## Cross-Stage Anti-Patterns

### AP-X1: Skipping the evidence gate

**Mistake**: The user provides a URL and a field name, and work jumps directly to locate or recover without confirming the real request chain.

**Why it fails**: The assumed request may not be the real target. Without evidence-gate confirmation, all downstream work may be built on a wrong foundation.

**Correct path**: Always run the evidence gate when the target request is not yet confirmed from a real captured sample.

---

### AP-X2: Stage regression without invalidation

**Mistake**: Discover during runtime that the write boundary was wrong, but continue patching instead of going back to locate.

**Why it fails**: All recover and runtime work was built on a wrong boundary. Patching on top of a wrong foundation compounds errors.

**Correct path**: Explicitly invalidate the wrong conclusion, output a handoff card with the invalidation, and regress to the correct stage.
