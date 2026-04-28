# MCP Tool Integration

## Purpose

Map MCP browser-instrumentation tools to reverse stages. Use this reference to select the right tool combination for the current blocker instead of guessing or defaulting to broad search.

This file does not own stage routing. Mount it at any stage when browser instrumentation is the primary evidence source.

## Tool Inventory

| Tool | What it does | Primary use |
|---|---|---|
| `list_network_requests` | List captured network requests (newest first) | Evidence gate, locate |
| `list_network_requests` (reqid) | Full detail for one request (headers, body, response) | Evidence gate, locate |
| `get_request_initiator` | JS call stack that triggered a request | Locate |
| `set_breakpoint_on_text` | Set breakpoint by searching code text | Locate, recover |
| `get_paused_info` | Call stack + scope variables at breakpoint | Locate, recover, runtime |
| `step` (over/into/out) | Step execution at breakpoint | Locate, recover |
| `evaluate_script` | Run JS in page context (or paused frame) | All stages |
| `search_in_sources` | Search all loaded JS sources | Locate, recover |
| `get_script_source` | Read a script region by URL or ID | Recover |
| `save_script_source` | Save full script to local file | Recover |
| `list_scripts` | List all loaded JS files | Recover |
| `trace_function` | Log function calls without pausing | Locate, runtime |
| `break_on_xhr` | Break when XHR/Fetch URL matches pattern | Locate |
| `list_console_messages` | Read console output | Runtime |
| `get_websocket_messages` | Inspect WebSocket frames | Locate (protocol) |
| `take_screenshot` | Visual page state | Evidence, runtime |
| `inject_before_load` | Run JS before any page script | Runtime |
| `navigate_page` | Navigate / reload / back / forward | Evidence |

## Stage Playbooks

### Evidence Gate

**Goal**: Capture real request samples and prove the target request chain.

```text
Recommended sequence:
1. navigate_page           → load the target page
2. take_screenshot         → confirm visual state (normal vs. risk)
3. list_network_requests   → identify the target request
4. list_network_requests(reqid) → get full request detail (headers, body, cookies, response)
5. get_request_initiator   → get the JS call stack that triggered the request
```

**Key decisions**:
- If the target request is not visible → trigger the action first, then re-list
- If multiple requests look like candidates → compare response bodies to identify the real target
- If the request depends on upstream state → trace `Set-Cookie` / response fields back to earlier requests

### Locate

**Goal**: Prove the write boundary, sink, and upstream chain.

```text
Primary path (initiator-based):
1. list_network_requests(reqid)  → confirm the target request
2. get_request_initiator         → get the initiator call stack
3. get_paused_info               → inspect scope at candidate frame
   (or set_breakpoint_on_text + trigger → get_paused_info)
4. step (into/over/out)          → trace writer ← builder ← entry ← source
5. evaluate_script               → verify variable values at key points

Fallback path (when initiator is missing):
1. search_in_sources             → narrow search for the write pattern
2. set_breakpoint_on_text        → break at candidate write point
3. trigger action → get_paused_info → confirm via scope variables

Supporting tools:
- break_on_xhr          → catch the exact request send moment
- trace_function        → log call patterns without pausing
- get_websocket_messages → for WebSocket/protocol targets
```

**Decision rules**:
- Start from the request's initiator stack, not from broad source search
- Use breakpoints only when passive observation cannot reveal the required local variable
- Use `trace_function` when you need call frequency or argument patterns without pausing

### Recover

**Goal**: Reduce shell layers until the logic contract is readable.

```text
Recommended sequence:
1. list_scripts                  → identify which scripts contain the target code
2. search_in_sources             → find dispatcher, VM entry, or bridge functions
3. get_script_source             → read specific code regions around matches
4. save_script_source            → save large/minified files for offline analysis
5. set_breakpoint_on_text        → break inside dispatcher or bridge
6. get_paused_info               → inspect state carriers, registers, context
7. step (into)                   → trace opcode execution or helper chains
8. evaluate_script               → test recovered understanding by evaluating expressions
```

**Decision rules**:
- `save_script_source` for files > 1000 lines — read locally instead of repeated `get_script_source` calls
- Use `evaluate_script` to test hypotheses: `() => { return targetFunction(knownInput) }` to verify recovered contracts
- Step through dispatcher loops with `step(over)` to observe opcode patterns, then `step(into)` only for critical opcodes

### Runtime

**Goal**: Identify and close browser/local divergence.

```text
Recommended sequence:
1. evaluate_script (browser)     → capture browser-side values at key points
2. evaluate_script (local)       → compare with local execution results
3. inject_before_load            → inject environment patches before page scripts
4. navigate_page (reload)        → test with patches applied
5. list_console_messages         → check for errors or unexpected branches
6. take_screenshot               → verify visual state after patches

For anti-debug:
1. search_in_sources("debugger") → find debugger statements
2. set_breakpoint_on_text        → break before anti-debug check
3. get_paused_info               → classify as friction vs. risk branch
4. evaluate_script               → test branch with modified values
```

**Decision rules**:
- Build the first-divergence comparison table using `evaluate_script` on both sides
- Use `inject_before_load` for environment patches — it runs before any page script
- After patching, always re-verify with `list_network_requests` that the target request still fires correctly

### Validation

**Goal**: Prove checkpoint equivalence.

```text
Recommended sequence:
1. evaluate_script (browser)     → capture checkpoint values with fixed input
2. Compare with local computation results
3. evaluate_script               → test edge cases (different timestamps, sessions)
4. list_network_requests(reqid)  → compare final request against local reproduction
```

**Decision rules**:
- Fix time and randomness before capturing checkpoints: `inject_before_load` with `Date.now = () => FIXED_TS; Math.random = () => 0.5`
- Compare at every intermediate checkpoint, not just the final output
- Record divergences immediately in the validation supplement

## Anti-Pattern Avoidance

| Wrong move | Right move |
|---|---|
| `search_in_sources("sign")` as first action | `list_network_requests` → `get_request_initiator` first |
| Setting 10 breakpoints at once | One breakpoint at the closest known sink, then trace backward |
| `evaluate_script` to run full business logic | `evaluate_script` for one small hypothesis test at a time |
| `save_script_source` for every file | Only save files you need for offline recovery work |
| `inject_before_load` with 500 lines of patches | Inject the minimum patch for the first divergence only |

## Tool Combination Quick Reference

| Blocker | Tool combination |
|---|---|
| "Which request carries the target field?" | `list_network_requests` → `list_network_requests(reqid)` |
| "What code writes this field?" | `get_request_initiator` → `set_breakpoint_on_text` → `get_paused_info` |
| "What does this minified function do?" | `set_breakpoint_on_text` → `step(into)` → `evaluate_script` |
| "Why does local execution differ?" | `evaluate_script` (both sides) → build comparison table |
| "Is this anti-debug check a risk branch?" | `set_breakpoint_on_text` → `get_paused_info` → inspect branch condition |
| "What WebSocket messages carry the target?" | `get_websocket_messages(analyze=true)` → inspect by group |
| "How to fix the environment gap?" | `inject_before_load` → `navigate_page(reload)` → `list_network_requests` |
