# JSReverser-MCP Routing

## Default Entry Rules
- Unknown page state or request chain: start with `analyze_target` before manual narrowing.
- Static understanding before transforms: use `collect_code`, `search_in_sources`, `get_script_source`, and `understand_code` before `deobfuscate_code`.
- Login-gated or challenge-gated targets: prefer `save_session_state` and `restore_session_state` before rebuilding browser state from scratch.
- WebSocket targets: use `list_websocket_connections` -> `analyze_websocket_messages` -> `get_websocket_messages` before reading raw frame detail.

## Observation Priority
- Default to `create_hook` + `inject_hook` + `get_hook_data`, or `hook_function` and `trace_function`, before breakpoints.
- Escalate to `break_on_xhr`, `set_breakpoint_on_text`, or `evaluate_on_callframe` only when hook evidence cannot prove dependencies or hidden locals still matter.
- Trigger one business action, capture one stable trace, then narrow scope; do not collect noisy full-session dumps first.

## Delivery Rule
- Prefer a pure local artifact when the chain allows it.
- If browser state is required, name the issued-state dependency and capture path explicitly instead of hiding it inside setup code.
- Final proof is a real request with a printed response, not a theoretical reconstruction.

## High-Value Avoidances
- Do not keyword-search crypto before proving the writer boundary.
- Do not pile on stealth and environment patches before naming one concrete mismatch.
- Do not inspect raw WebSocket payloads before classifying message groups.
- Do not call a case solved until the delivered script reruns under explicit preconditions.
