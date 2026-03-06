# Playbook

## Default MCP Chain
1. Run `check_browser_health` and inspect `list_console_messages` before patching anything.
2. Use `evaluate_script`, `get_storage`, and `inspect_object` to classify missing globals, debug branches, fingerprint reads, or session-state dependence.
3. If the target is login-gated or challenge-gated, persist state with `save_session_state` and resume with `restore_session_state`.
4. If the mismatch starts before normal hooks can attach, use `inject_preload_script` for early instrumentation.
5. Use `record_reverse_evidence` when one mismatch and its minimal correction path are already explicit.

## Blocking Surface Matrix
- Debug friction: dynamic `debugger`, timer trap, console probe, or DevTools-open check.
- Missing runtime object: `window`, `document`, `navigator`, `crypto`, storage, or event surfaces.
- Fingerprint mismatch: navigator, screen, timing, canvas, language, or headless markers.
- Session-state gap: cookie, storage, challenge token, nonce, or issued browser state.
- Non-determinism: time, random, device-like ids, or rotation counters.

## Escalation Rule
- Isolate the blocking debug path before broad environment simulation.
- Patch one proven surface at a time; avoid whole-browser imitation.
- Prefer preload instrumentation, focused `set_user_agent` checks, or state restore only after one concrete mismatch is proven.
- Escalate to breakpoints only when hidden state mutation cannot be explained from console, hook, or runtime probes.

## Done Criteria
- The blocking path is explained and isolated.
- The minimal environment manifest is explicit.
- Fixed inputs now reproduce stable intermediate outputs.
- Overpatching has been trimmed back to the smallest working set.
