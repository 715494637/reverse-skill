# JSReverser-MCP Routing

## Default Entry Rules
- Unknown page state or request chain: start with `analyze_target` before manual narrowing.
- Static understanding before transforms: use `collect_code`, `search_in_sources`, `get_script_source`, and `understand_code` before `deobfuscate_code`.
- Login-gated or challenge-gated targets: prefer `save_session_state` and `restore_session_state` before rebuilding browser state from scratch.
- WebSocket targets: use `list_websocket_connections` -> `analyze_websocket_messages` -> `get_websocket_messages` before reading raw frame detail.

## Observation Priority
- Default to `create_hook` + `inject_hook` + `get_hook_data`, or `hook_function` and `trace_function`, before breakpoints.
- Use `inspect_object` after hook evidence when the remaining question is object ownership, wrapper structure, or builder carrier shape.
- Escalate to `break_on_xhr`, `set_breakpoint_on_text`, or `evaluate_on_callframe` only when hook evidence cannot prove dependencies or hidden locals still matter.
- Trigger one business action, capture one stable trace, then narrow scope; do not collect noisy full-session dumps first.

## Early Instrumentation
- Use `inject_preload_script` only when the key observation point or runtime mismatch happens before normal page-side hooks can be installed.
- Treat preload instrumentation as an escalation path for document-start observation, not as a default patching step.

## Evidence and Reports
- Prefer explicit evidence packages, stage notes, and validation summaries over automation-oriented outputs.
- If browser state is required, name the issued-state dependency and capture path explicitly instead of hiding it inside setup code.
- Use `record_reverse_evidence` when a skill reaches a stable boundary, owner, or dependency conclusion that later skills should reuse.
- Use `export_session_report` when a session needs to be handed off, reviewed, or compared later.

## Avoid First
- Do not keyword-search crypto before proving the writer boundary.
- Do not pile on stealth and environment patches before naming one concrete mismatch.
- Do not inspect raw WebSocket payloads before classifying message groups.
- Do not use `get_websocket_message` as the first WebSocket read step.
- Do not start with `deobfuscate_code` before the outer container and critical entry are narrowed.
- Do not treat breakpoint tools, `inject_stealth`, or `set_user_agent` as default entry tools.

## Completion Layers
- Locate layer: writer, owner, stage class, or protocol layer is explicit.
- Semantic layer: boundaries, dependencies, state transitions, or runtime mismatches are explained.
- Verification layer: only when explicitly needed, add controlled validation notes or sample-based consistency checks.
