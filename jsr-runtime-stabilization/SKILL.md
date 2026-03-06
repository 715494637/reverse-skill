---
name: jsr-runtime-stabilization
description: Use when reverse code fails outside browser-native context due to anti-debugging, environment checks, headless mismatch, or missing runtime objects.
---

# JSR Runtime Stabilization

## Overview
Stabilize execution outside the native browser path by removing anti-debug friction and adding only the runtime pieces that the proven call stack actually needs.

## Scope Boundary
This skill owns anti-debug neutralization, minimal environment shims, deterministic providers, and anti-bot surface stabilization.
It does not own locating unknown algorithms, deobfuscating whole bundles, or designing the final replay pipeline beyond making the chain execute correctly.

## Workflow
1. Classify the failure: anti-debug, missing object, fingerprint mismatch, challenge-state mismatch, or non-determinism.
2. Neutralize blocking anti-debug loops before adding environment shims.
3. Add the smallest required shims such as `window`, `document`, `navigator`, `crypto`, storage, or event surfaces based on observed failures.
4. Freeze time, random, and device-like identifiers before comparing outputs.
5. Remove non-essential patches and verify that the core chain still runs.

## Exit Gate
- Anti-debug blockers no longer prevent observation or execution.
- The core path runs under a minimal environment manifest.
- Fixed inputs produce stable intermediate outputs.
- Anti-bot state surfaces are explained rather than blindly spoofed.

## Output Contract
- Patch inventory with toggle flags
- Environment manifest
- Evidence-to-patch mapping
- Stable rerun proof

## Read Next
- Read [references/playbook.md](references/playbook.md).
- Read [references/anti-bot-surface-matrix.md](references/anti-bot-surface-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).