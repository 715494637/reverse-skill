---
name: jsr-runtime-stabilization
description: Use when analyzed code behaves differently outside the native browser path due to runtime checks, missing objects, debug friction, or unstable environment assumptions.
---

# JSR Runtime Stabilization

## Overview
Stabilize execution outside the native browser path by identifying debug friction, clarifying environment assumptions, and adding only the runtime pieces that the proven call stack actually needs.

This skill is for authorized debugging, compatibility analysis, and runtime-difference diagnosis. It focuses on explaining why execution diverges rather than broadly simulating or disguising an environment.

## Scope Boundary
This skill owns debug-friction diagnosis, minimal environment manifests, deterministic providers, and runtime-difference analysis.
It does not own locating unknown algorithms, deobfuscating whole bundles, or designing a final automation pipeline beyond making the chain understandable and reproducible.

## Workflow
1. Classify the failure: debug friction, missing object, fingerprint mismatch, state mismatch, or non-determinism.
2. Isolate blocking debug loops or guard branches before adding environment support.
3. Add the smallest required runtime pieces such as `window`, `document`, `navigator`, `crypto`, storage, or event surfaces based on observed failures.
4. Freeze time, random, and device-like identifiers before comparing outputs.
5. Remove non-essential patches and verify that the core chain still runs.

## Preferred JSReverser-MCP Path
- Default entry: use `check_browser_health`, `list_console_messages`, `get_storage`, and `evaluate_script` to classify blockers before patching. If the target depends on prior browser state, record it with `save_session_state` and review it with `restore_session_state`.
- Escalate: prefer hook-based inspection, minimal runtime probes, or focused `set_user_agent` checks before broad environment simulation. Use breakpoints only when hidden state mutation or guard branches cannot be explained from hook or console evidence.
- Required evidence: the blocking path is explained, the minimal environment manifest is explicit, and fixed inputs now reproduce stable intermediate outputs.

## Exit Gate
- Debug blockers no longer prevent observation or execution.
- The core path runs under a minimal environment manifest.
- Fixed inputs produce stable intermediate outputs.
- Runtime-difference surfaces are explained rather than guessed.

## Output Contract
- Patch inventory with toggle flags
- Environment manifest
- Evidence-to-patch mapping
- Stable rerun proof

## Read Next
- Read [../jsr-shared-references/jsr-mcp-routing.md](../jsr-shared-references/jsr-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/anti-bot-surface-matrix.md](references/anti-bot-surface-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).
