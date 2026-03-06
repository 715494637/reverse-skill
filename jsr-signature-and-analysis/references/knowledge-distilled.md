# Distilled Reverse Knowledge: Signature and Analysis

## Core Judgments
- An accepted token may encode issued state and request lineage, not just local algorithm output.
- Final-output comparison is too late; stage boundaries must be compared earlier.
- Issued fields, pure local stages, and chain-coupled fields must be separated explicitly.
- Renewal, expiry, challenge, and single-use semantics are algorithmic constraints, not flaky noise.
- Normalization, byte encoding, and serialization are part of the algorithm, not plumbing.
- Request assembly should stay separate from stage reconstruction.
- Stage analysis is incomplete until it explains both a baseline sample and a meaningful variant sample.

## Common Misreads
- Matching one final token and assuming the whole request can now be explained.
- Treating browser-only success as proof of a pure local algorithm.
- Rebuilding crypto while leaving issued state and renewal rules implicit.
- Keeping hidden globals inside the stage function instead of declaring inputs.

## Evidence Standard
- One issued-state dependency list.
- One explicit local stage pipeline.
- One baseline sample and one variant sample that are both explained.
- One validation note set describing stage consistency and remaining assumptions.
