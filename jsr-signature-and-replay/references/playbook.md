# Playbook

## Precondition Classification
- Pure local stage: can be recomputed from explicit inputs every run.
- Server-issued state: comes from prior response, challenge bootstrap, key issue, or verify endpoint.
- Chain-coupled field: valid only when a prior request, token, or renewal step happened in the right order.
- Renewal-sensitive field: expires, rotates, or becomes single-use across attempts.

## Stage Capture Anchors
- Issued-state values before local transformation.
- Canonical object before serialization.
- Canonical string after normalization or concatenation.
- Raw bytes before crypto.
- Encoded output after crypto.
- Final write sink in header, cookie, query, or body assembly.

## Replay Build Order
1. Freeze one golden request chain.
2. Capture the issued-state dependencies separately from pure local stages.
3. Rebuild each local stage as a pure function.
4. Inject time, random, and environment providers explicitly.
5. Model refresh or renewal triggers where the chain requires them.
6. Verify baseline and variant vectors stage by stage.

## Failure Smells
- Matching crypto output but rejected submit often means chain coupling, not crypto failure.
- Divergence before crypto means normalization or serialization is wrong.
- Browser-only success after correct staging means runtime or issued-state dependencies are still unresolved.
- Header or cookie-only mismatches often mean the true sink was missed and should be traced at the writer boundary.
- First request passes but the second fails often means renewal, expiry, or single-use logic is missing.