# Distilled Reverse Knowledge: Signature and Replay

## Core Judgments
- An accepted token may encode issued state and request lineage, not just local algorithm output.
- Final-output comparison is too late; stage boundaries must be compared earlier.
- Issued fields, pure local stages, and chain-coupled fields must be separated explicitly.
- Renewal, expiry, challenge, and single-use semantics are algorithmic constraints, not flaky noise.
- Normalization, byte encoding, and serialization are part of the algorithm, not plumbing.
- Request assembly should stay separate from stage reconstruction.
- Replay is incomplete until it survives a baseline vector and a meaningful variant vector.

## Common Misreads
- Matching one final token and assuming the whole request can now replay.
- Treating browser-only success as proof of a pure local algorithm.
- Rebuilding crypto while leaving issued state and renewal rules implicit.
- Keeping hidden globals inside the replay function instead of declaring inputs.

## Evidence Standard
- One issued-state dependency list.
- One explicit local stage pipeline.
- One baseline vector and one variant vector that both pass.
- One runnable artifact that makes a real request and prints a real response.
