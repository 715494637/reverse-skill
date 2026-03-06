---
name: jsr-transport-and-protocol
description: Use when reverse tasks focus on request/response protocol layers, WebSocket frames, protobuf payloads, header contracts, or handshake logic.
---

# JSR Transport and Protocol

## Overview
Reverse protocol-level contracts beyond simple HTTP fields, including WebSocket frames, protobuf payloads, connection state, and header choreography.

## Scope Boundary
This skill owns transport layering, handshake recovery, envelope and payload separation, sequencing rules, and parser or builder reconstruction.
It does not own generic sign replay once the protocol contract is already stable, or broad runtime hardening except where transport state depends on it.

## Workflow
1. Extract the transport contract: handshake, frame schema, heartbeat, retry, and renewal rules.
2. Separate connection, session, envelope, and business payload layers.
3. Locate serialization and deserialization boundaries.
4. Rebuild parser and builder logic against captured traffic.
5. Verify a protocol-compliant replay sequence, not just a single accepted frame.

## Exit Gate
- Handshake rules are explicit and pass.
- Sustained business interaction works beyond the first message.
- Remaining failures can be localized to a single protocol layer.

## Output Contract
- Protocol contract table
- Frame or message schema map
- Serialization boundary map
- Replay sequence proof

## Read Next
- Read [references/playbook.md](references/playbook.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).