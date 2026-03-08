# Protocol and Long-Connection Recovery

## 1. The First Packet Is Not Enough

The common protocol mistake in long connections, protocol shells, and `protobuf` tasks is to infer the whole protocol from a single packet.

At minimum, inspect:

- handshake
- first business packet
- heartbeat
- sequence and ack
- renewal
- error packet or retry packet

## Record Path

Protocol and long-connection tasks should additionally write:

```text
reverse-records/协议状态.md
```

Recommended contents:

- handshake request and response
- first-packet type
- heartbeat interval
- sequence and ack rules
- renewal conditions
- state-transition map
- message families
- target-message type and payload structure

## 2. Separate Envelope Layer Before Payload Layer

### Envelope layer

Focus on:

- message type
- length
- sequence
- time window
- session identifier
- compression or encryption flag

### Payload layer

Then inspect:

- field order
- encoding method
- `protobuf` mapping
- decompressed body
- real business fields

### Message families

At least separate:

- handshake / authentication
- heartbeat / keepalive
- business request
- ack / retry / error
- renewal / refresh

Without message-family separation, do not treat one message as the main protocol chain.

## 3. Protocol Recording Template

```markdown
连接：
握手请求：
握手响应：
心跳周期：
序号规则：
ack 规则：
续期条件：
消息族：
目标消息类型：
载荷结构：
```

Write this block into `reverse-records/协议状态.md`.

## 4. State Transition Must Be Recorded Separately

```markdown
未连接 -> 握手中 -> 已认证 -> 心跳维持 -> 续期 -> 失效
```

Without state transition, renewal failures are easy to misjudge as algorithm errors.

## 5. Write the Connection State Chain as a Traceable Chain

Recommended form:

```text
握手包 -> 握手响应(session) -> 已认证
已认证 -> 心跳包(seq) -> ack
ack 超时 -> 重传 / 降级
token 临期 -> 续期包 -> 新 session
续期失败 -> 失效 / 风控 / 强制重连
```

If the target message depends on prior `session`, `ack`, or renewal state, do not replay the target packet alone.

## 6. Common Misjudgments

- Observing only the first packet and ignoring later ack or heartbeat traffic
- Treating envelope fields as business fields
- Jumping directly to message schema as soon as `protobuf` is found, while ignoring the state machine
- Misclassifying renewal failure, sequence drift, or missing ack as payload algorithm failure

## 7. Completion Standard

- Envelope layer is known.
- State transition is known.
- Message families are known.
- The real boundary and dependencies of the target message are known.

