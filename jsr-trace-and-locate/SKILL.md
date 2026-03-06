---
name: jsr-trace-and-locate
description: Use when token/cookie/sign generation location is unknown and tasks require hook probes, breakpoints, call-stack tracing, or request trigger chain mapping.
---

# JSR Trace and Locate

## Overview
Find where dynamic fields are born. Classify the sink, choose the least-distorting observation mode, and map the real generation chain from writer boundary back to builder cause.

## Scope Boundary
This skill owns discovery of the request trigger path, writer boundary, assignment point, builder path, and crypto boundary.
It does not own runtime patching, large-scale deobfuscation, replay delivery, or protocol maintenance after the source-of-truth function is proven.

## Workflow
1. Classify the target field by sink class: body, header, cookie, storage, frame, or worker-returned value.
2. Choose the observation mode: local breakpoint, injected hook, or remote CDP-style instrumentation.
3. Hook the nearest writer boundary before diving into crypto internals.
4. Walk the stack upward until the builder and dependency sources are explicit.
5. Confirm the source-of-truth function with minimal reproducible evidence.

## Exit Gate
- The final writer boundary and builder function are both proven.
- The call chain from request entry to assignment is mapped.
- The chosen observation mode no longer changes conclusions.
- The next skill can start from named target functions without redoing locate work.

## Output Contract
- Call-chain map: entry -> builder -> writer
- Verified function signatures
- Writer-boundary choice with reason
- Minimal reproducible trace evidence

## Read Next
- Read [references/playbook.md](references/playbook.md).
- Read [references/writer-boundary-matrix.md](references/writer-boundary-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).