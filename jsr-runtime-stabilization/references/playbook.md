# Playbook

## Default MCP Chain
1. Run `check_browser_health` and inspect `list_console_messages` before patching anything.
2. Use `evaluate_script` and `get_storage` to classify missing globals, anti-debug branches, fingerprint reads, or session-state dependence.
3. If the target is login-gated or challenge-gated, persist state with `save_session_state` and resume with `restore_session_state`.
4. Apply only targeted runtime help such as `inject_stealth` or `set_user_agent` after one concrete mismatch is proven.

## Blocking Surface Matrix
- Anti-debug loop: dynamic `debugger`, timer trap, console probe, or DevTools-open check.
- Missing runtime object: `window`, `document`, `navigator`, `crypto`, storage, or event surfaces.
- Fingerprint mismatch: navigator, screen, timing, canvas, language, or headless markers.
- Session-state gap: cookie, storage, challenge token, nonce, or issued browser state.
- Non-determinism: time, random, device-like ids, or rotation counters.

## Escalation Rule
- Neutralize the blocking anti-debug path before broad environment spoofing.
- Patch one proven surface at a time; avoid whole-browser imitation.
- Prefer stealth injection, user-agent correction, or state restore before custom patch piles.
- Escalate to breakpoints only when hidden state mutation cannot be explained from console, hook, or runtime probes.

## Done Criteria
- The blocking path is neutralized.
- The minimal environment manifest is explicit.
- Fixed inputs now reproduce stable intermediate outputs.
- Overpatching has been trimmed back to the smallest working set.
