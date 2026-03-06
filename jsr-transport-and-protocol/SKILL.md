---
name: jsr-transport-and-protocol
description: Use when analysis focuses on request/response protocol layers, WebSocket frames, protobuf payloads, header contracts, or handshake logic.
---

# JSR Transport and Protocol

## Overview
Analyze protocol-level contracts beyond simple HTTP fields, including WebSocket frames, protobuf payloads, connection state, and header choreography.

## Scope Boundary
This skill owns transport layering, handshake recovery, envelope and payload separation, sequencing rules, and parser or builder reconstruction.
It does not own generic request-stage analysis once the protocol contract is already stable, or broad runtime hardening except where transport state depends on it.

## Workflow
1. Extract the transport contract: handshake, frame schema, heartbeat, retry, and renewal rules.
2. Separate connection, session, envelope, and business payload layers.
3. Locate serialization and deserialization boundaries.
4. Rebuild parser and builder logic against captured traffic.
5. Verify protocol consistency across more than a single accepted frame.

## Preferred JSReverser-MCP Path
- Default entry: use `list_websocket_connections`, `analyze_websocket_messages`, `get_websocket_messages`, `list_network_requests`, and `get_network_request` to separate handshake, envelope, heartbeat, renewal, and business payload layers.
- Escalate: use `create_hook` on `websocket`, `fetch`, or `xhr`, plus `hook_function` or `inspect_object` around serializer or parser boundaries, before stepping through frame logic with breakpoints. Use `inject_preload_script` only when websocket wrappers or parser bootstrap happen before normal page hooks can attach. Read a single frame with `get_websocket_message` only after message groups and target indices are already explicit.
- Valuable add-ons: use `record_reverse_evidence` to preserve contract tables and layer boundaries, `export_session_report` for handoff or review, and `collection_diff` when state changes may load new parser or serializer code.
- Avoid first: do not start with raw single-frame inspection, breakpoint tools, or replay-oriented assumptions before handshake and message groups are classified.
- Required evidence: handshake rules are explicit, frame or message groups are classified, serialization boundaries are mapped, and sustained behavior can be explained beyond the first accepted message.

## Exit Gate
- Handshake rules are explicit and testable as analysis claims.
- Sustained business interaction is explained beyond the first message.
- Remaining failures can be localized to a single protocol layer.

## Output Contract
- Protocol contract table
- Frame or message schema map
- Serialization boundary map
- Sustained-behavior validation notes

## Read Next
- Read [../jsr-shared-references/jsr-mcp-routing.md](../jsr-shared-references/jsr-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/protocol-state-matrix.md](references/protocol-state-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).
