# Playbook

## Default MCP Chain
1. Start with `analyze_target` when page state, request trigger, or dynamic field location is still unclear.
2. Hook the nearest writer surface with `create_hook` + `inject_hook` + `get_hook_data`, or use `hook_function` if the writer function is already named.
3. Trigger one business action and capture one stable trace before drilling inward.
4. Use `trace_function`, `inspect_object`, or `get_request_initiator` to walk from trigger to builder to writer.
5. Use `record_reverse_evidence` when the writer boundary and builder path are stable enough for reuse.

## Writer Boundary Matrix
- Header field: `XMLHttpRequest.prototype.setRequestHeader`, `Headers.prototype.set`, or the fetch wrapper that materializes `init.headers`.
- JSON body: canonical object builder, `JSON.stringify`, or body assignment helper.
- Form or query field: `FormData.prototype.append` or `URLSearchParams.prototype.append`.
- Cookie or storage relay: `document.cookie` setter, `localStorage.setItem`, or `sessionStorage.setItem`.
- Binary or frame payload: `WebSocket.send`, buffer builder, or protobuf encode boundary.

## Escalation Rule
- Hook the nearest writer boundary before searching crypto helper names.
- Prefer `hook_function`, `trace_function`, or `inspect_object` before any breakpoint.
- Escalate to `break_on_xhr`, `set_breakpoint_on_text`, or `evaluate_on_callframe` only when hook evidence still cannot prove explicit builder dependencies.
- If observation must begin before page scripts initialize, use `inject_preload_script` before falling back to breakpoints.
- If local DevTools changes timing, stay in hook or remote-style observation.

## Done Criteria
- One stable request fingerprint is frozen.
- One stack from trigger to writer boundary is verified.
- One builder function with explicit dependencies is named.
- The next skill can start without redoing locate work.
