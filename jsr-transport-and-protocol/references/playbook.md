# Playbook

## Default MCP Chain
1. Start with `list_websocket_connections` and run `analyze_websocket_messages` before opening raw payload detail.
2. Use `get_websocket_messages` to group frame types and separate handshake, heartbeat, renewal, and business traffic.
3. Use `list_network_requests` and `get_network_request` to recover the HTTP-side handshake and header contract.
4. Use `create_hook` on `websocket`, `fetch`, or `xhr`, plus `hook_function` or `inspect_object` around serializer or parser boundaries, before stepping through frame logic.
5. Use `record_reverse_evidence` when handshake rules and layer boundaries are already stable.

## Protocol Boundary Matrix
- Handshake contract: URL, query, headers, cookies, negotiated ids, subprotocol, and bootstrap responses.
- Connection state: heartbeat, renewal, reconnect, expiry, counter drift, and idempotency markers.
- Envelope layer: opcode, type id, wrapper fields, compression, checksum, or outer sign.
- Business payload: protobuf field numbers, message schema, and decoded body semantics.
- Hidden owner: bundled module, worker, parser, or serializer that actually owns the frame boundary.

## Escalation Rule
- Classify message groups before inspecting full payload content.
- Read a single frame with `get_websocket_message` only after the target group and frame index are explicit.
- Prove serializer and parser boundaries before stepping through frame locals.
- Use `inject_preload_script` only when websocket wrappers or parser bootstrap happen before normal hooks.
- Escalate to breakpoints only when message fields still depend on hidden locals or opaque binary transforms.
- Do not treat one accepted first frame as protocol understanding.

## Done Criteria
- Handshake rules are explicit.
- Message groups or frame families are classified.
- Serialization boundaries are mapped.
- Sustained behavior is explained beyond the first accepted message.
