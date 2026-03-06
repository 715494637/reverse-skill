# Distilled Reverse Knowledge: Signature and Replay

## Fifteen Core Principles
1. Freeze one golden sample before touching replay code.
2. Not every accepted token is algorithmic; many are issued state plus local transformation.
3. Separate locally computable fields, server-issued fields, and chain-coupled fields early.
4. Decompose every algorithm into precondition, normalize, concat, crypto, and encode stages.
5. Make each local stage a pure function with explicit inputs.
6. Inject time, random, and environment dependencies; do not hide them in globals.
7. Compare stage outputs before comparing final outputs.
8. Treat byte encoding rules as first-class logic, not formatting details.
9. Keep request assembly separate from algorithm reconstruction.
10. Model challenge, issue, verify, and submit as state transitions when the server validates lineage.
11. Treat refresh, renewal, expiry, and single-use semantics as logic, not flaky noise.
12. Reject bundle cloning as a replay strategy when staged equivalence is possible.
13. Reject final-output-only validation because it destroys diagnosis speed.
14. Require at least one variant vector in addition to the baseline vector.
15. A replay artifact is complete only when it can be independently revalidated under explicit preconditions.

## Replay Capture Anchors
- Issued-state values: public keys, timestamps, request ids, challenge ids, verify ids, issue ids, nonce, iv, etag-like values
- Canonical object before serialization
- Canonical string after normalization or concatenation
- Raw bytes before crypto
- Encoded text after crypto
- Final write sink in header, cookie, query, or body assembly

## Replay Exit Gate
- Baseline vector passes.
- At least one variant vector passes.
- Issued-state dependencies are explicit.
- Request assembly can consume replay output without hidden state.