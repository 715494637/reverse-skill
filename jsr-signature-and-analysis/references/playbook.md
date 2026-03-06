# Playbook

## Default MCP Chain
1. Freeze one known sample chain with `analyze_target` instead of chasing one final token in isolation.
2. Use `create_hook` + `inject_hook`, `hook_function`, `list_network_requests`, and `get_network_request` to capture stage boundaries.
3. Split issued browser state from pure local computation before rewriting anything.
4. If login, challenge, or renewal state is required, persist it with `save_session_state` and `restore_session_state` before extracting local stages.
5. Use `inspect_object` when staged inputs or builder carriers remain unclear.
6. Use `record_reverse_evidence` when stage boundaries and dependency lists are already stable.

## Stage Capture Matrix
- Issued-state value before local transformation.
- Canonical object before serialization.
- Canonical string after normalization or concatenation.
- Raw bytes before crypto.
- Encoded output after crypto.
- Final write sink in header, cookie, query, or body assembly.

## Escalation Rule
- Treat rejection after correct crypto as chain coupling until disproven.
- Rebuild local stages as pure functions with declared inputs before patching runtime.
- Use `inject_preload_script` only when stage dependencies are created before normal page hooks can observe them.
- Use breakpoints only when issued state and local stages remain entangled after hook sampling.
- Keep verification tied to baseline and variant samples, not one lucky request.

## Done Criteria
- The issued-state dependency list is explicit.
- Pure local stages are callable with declared inputs.
- Baseline and variant samples are both explained.
- Validation notes describe stage consistency and remaining assumptions.
