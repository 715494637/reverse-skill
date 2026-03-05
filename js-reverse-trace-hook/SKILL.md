---
name: js-reverse-trace-hook
description: Locate parameter generation paths and request trigger chains in JavaScript reverse engineering. Use when tasks require packet analysis, call stack tracing, and XHR/fetch/WebSocket hook probes to identify where token, cookie, or sign values are created.
---

# JS Reverse Trace Hook

## Specialized Triggers
Use this skill with priority when tasks involve:
- Search cannot directly locate parameter generation code.
- Dynamic fields are spread across headers/cookies/body and share hidden dependencies.
- WebSocket or protocol payload chains require transport-to-builder tracing.
- Obfuscated or VM-like bundles need loader-first navigation before algorithm extraction.

## Workflow
1. Lock the target request first. Record URL, method, headers, body fields, and response markers.
2. Isolate dynamic fields. Mark which fields change per request and which fields stay static.
3. Trace the trigger entry. Break at request initiation (`fetch`, `XMLHttpRequest.send`, WebSocket send wrapper, axios adapter).
4. Backtrack the call chain. Walk upward from request code to argument builders and sign/encrypt functions.
5. Hook key functions minimally. Capture input/output of parameter builders without rewriting the whole bundle.
6. Confirm the final source of truth. Verify the exact function and upstream fields that decide the target parameter.
7. Deliver reproducible notes. Output a concise call-chain map and one verified extraction/replay snippet.

## Advanced Notes
- Use layered entry strategy: transport breakpoints -> DOM events -> serializer hooks -> cookie hooks.
- For loader-heavy bundles, recover module loader first, then chase target function.
- Gate instrumentation logs by target marker to avoid noise and false chain selection.

## Quick Hook Snippets
Use these snippets as temporary probes. Remove or gate them after locating the chain.

```js
// fetch hook
const _fetch = window.fetch;
window.fetch = async function(input, init) {
  console.log('[fetch]', input, init);
  return _fetch.apply(this, arguments);
};
```

```js
// xhr hook
const _open = XMLHttpRequest.prototype.open;
const _send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function(method, url) {
  this.__u = url; this.__m = method;
  return _open.apply(this, arguments);
};
XMLHttpRequest.prototype.send = function(body) {
  console.log('[xhr]', this.__m, this.__u, body);
  return _send.apply(this, arguments);
};
```

## Output Contract
Always produce these artifacts:
- Target request table: endpoint, target params, dynamic dependencies.
- Call chain: `request entry -> builder -> sign/encrypt -> final assignment`.
- Verified function signature: function name/module id, input schema, output schema.
- Minimal proof script: one runnable snippet that logs or reproduces the target param.

## Read Next
Read [references/playbook.md](references/playbook.md) for workflow rules.


