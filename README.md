# reverse-skill

面向 Web JS 逆向的AI技能库

## 当前技能

| Skill | 用途 | 典型触发场景 |
|---|---|---|
| `jsr-trace-and-locate` | 在未知链路下定位 `sign/token/cookie/header` 的真实写入边界 | 只知道字段出现在请求里，但不知道是谁写进去的 |
| `jsr-runtime-stabilization` | 处理补环境、反调试、浏览器差异、运行时缺失与风控面 | 浏览器能过，本地脚本跑不通；一开 DevTools 就死 |
| `jsr-deobfuscation-and-lifting` | 拆混淆、恢复 webpack/worker/wasm/jsvmp 外层结构并提升语义可读性 | 看不清真实逻辑，入口被包装层或 VM/WASM 吃掉 |
| `jsr-signature-and-replay` | 重建签名/令牌生成链，并交付可验证的离线调用脚本 | 已找到算法位置，但离线重放不稳定，或存在 challenge / issued state 依赖 |
| `jsr-transport-and-protocol` | 分析 WebSocket / protobuf / 握手 / 心跳 / 续期 / 重连 的协议状态机 | 第一包能过，后续全挂；状态迁移条件不明 |

## Skill x JSReverser-MCP 映射

| Skill | MCP 默认入口 | 需要升级时 | 交付焦点 |
|---|---|---|---|
| `jsr-trace-and-locate` | `analyze_target` -> `create_hook` / `inject_hook` / `get_hook_data` | `hook_function` / `trace_function` 仍不足时，再上 `break_on_xhr` / `get_request_initiator` / `set_breakpoint_on_text` | 写入边界、builder 链、可复现定位证据 |
| `jsr-runtime-stabilization` | `check_browser_health` -> `list_console_messages` / `get_storage` / `evaluate_script` | 明确存在浏览器差异时，再上 `inject_stealth` / `set_user_agent` / 会话态恢复 | 最小补环境清单、反调试拆法、稳定复跑证据 |
| `jsr-deobfuscation-and-lifting` | `collect_code` -> `search_in_sources` / `get_script_source` / `understand_code` | 静态阅读不够时，再上 `deobfuscate_code` / `trace_function` / `hook_function` | 入口恢复、语义阶段、等价性证据 |
| `jsr-signature-and-replay` | `analyze_target` -> Hook 采样 -> `list_network_requests` / `get_network_request` | challenge / renewal / 登录态耦合时，再上 `save_session_state` / `restore_session_state` | 可运行的 Python 重放脚本，明确 issued state 与纯算边界 |
| `jsr-transport-and-protocol` | `list_websocket_connections` -> `analyze_websocket_messages` -> `get_websocket_messages` | 只看帧仍不够时，再上 `create_hook` / `hook_function` / 断点看序列化边界 | 握手规则、消息分组、持续交互可重放证据 |

## 安装方式

### 前置准备

在你的工具中安装[JSReverser-MCP](https://github.com/NoOne-hub/JSReverser-MCP)

### 目录位置

将 5 个 `jsr-*` skill 目录放入以下位置之一：

- `Codex`: `%USERPROFILE%\.codex\skills\`
- `Claude Code`: `%USERPROFILE%\.claude\skills\`

最简单的方式是直接复制目录。

![安装示例](image.png)

## 使用方式

### 1. 全程自动模式

这是最省心、也最适合真实逆向交付的方式。你直接描述目标和交付要求，让模型使用 `JS Reverse MCP` 贯穿探索、分析、交付、审查四个阶段。

推荐模板：

```text
使用：jsreverse mcp
探索：<目标 URL / 页面入口 / 是否已有登录态>
分析：<目标请求、动态字段、怀疑点、希望拿到的结果>
方式：全程自动完成页面探索、链路定位、Hook/断点、补环境或纯算判定、最小复现、脚本交付与请求验证
交付：输出可运行的 Python 脚本。若可纯算，则本地实现加密函数；若必须依赖浏览器运行时，则交付补环境模式，必要时允许配合 execjs 调用 JS
审查：脚本必须实际调用本地加密逻辑并发起请求；允许从其他请求或响应中提取 challenge / token / nonce 等前置参数；最终在终端打印响应结果，不能只停留在“理论可行”
```

建议你直接像下面这样下任务：

```text
使用：jsreverse mcp
探索：https://example.com/login
分析：定位 login 请求中的 x-sign、x-token 与 cookie 写入链，确认是否存在 challenge / renewal 依赖，并判断能否做成本地纯算
方式：全程自动分析，优先定位 writer boundary；若能脱离浏览器则做纯算；若不能则做最小补环境
交付：输出可运行的 Python 脚本，能生成请求参数并请求接口；必要时允许 execjs 调用拆出的 JS
审查：脚本必须在终端实际请求并打印响应
```

这类任务的理想交付不是“告诉你大概在哪”，而是：

- 定位清楚真实生成边界
- 判断是纯算、补环境还是混合模式
- 交付能直接调用的本地脚本
- 实际跑通请求并给出响应证据

### 2. 症状驱动模式

如果你不想先判断属于哪一类问题，直接描述症状即可，让模型自动选择 skill。

示例：

```text
这个站点的 sign 在哪里生成，我只知道请求头里有它。
```

```text
浏览器里能跑，本地 Node 一跑就缺 window 和 navigator，还会无限 debugger。
```

```text
WebSocket 第一条消息能过，后面消息都失败，怀疑有 heartbeat 或 sequence 校验。
```

这种方式适合日常探索与快速起手。

### 3. 显式指定 skill

当你已经知道问题落在哪一层时，直接点名 skill，模型会按该方向推进。

```text
$jsr-trace-and-locate 帮我定位这个 header 里的 x-sign 写入点，不要先钻 crypto helper。
```

```text
$jsr-runtime-stabilization 这个 case 浏览器能过、脚本跑不通，帮我做最小补环境并拆掉 anti-debug。
```

```text
$jsr-deobfuscation-and-lifting 这个 wasm + worker + jsvmp 的入口在哪，先帮我恢复外层容器和桥接关系。
```

```text
$jsr-signature-and-replay 这个 token 不是单纯本地算法，帮我拆开 challenge、issued state 和本地计算段。
```

```text
$jsr-transport-and-protocol 这个 websocket 首包通过、后续失败，按协议状态机帮我分析 heartbeat、renewal 和 counter drift。
```

### 4. 组合使用方式

真实任务往往不是单层问题，常见组合如下：

1. `trace-and-locate -> signature-and-replay`
   先找到真实写入边界，再做离线重放。
2. `trace-and-locate -> runtime-stabilization -> signature-and-replay`
   先定生成链，再最小补环境，最后交付可跑脚本。
3. `deobfuscation-and-lifting -> signature-and-replay`
   先恢复入口和真实语义，再抽取可调用算法。
4. `transport-and-protocol -> runtime-stabilization`
   先拆协议状态机，再补齐长连接相关运行时差异。

## 使用案例

### 案例 1：请求头里有动态 `x-sign`

推荐 skill：`jsr-trace-and-locate`

```text
这个接口的 x-sign 在请求头里，按 writer boundary 去定位真实写入点，不要先停在 crypto helper 名称层。
```

### 案例 2：浏览器成功，Node 失败

推荐 skill：`jsr-runtime-stabilization`

```text
浏览器里可以登录，本地脚本缺 navigator、crypto，而且一开调试就触发 anti-debug。帮我做最小补环境，不要一上来就全量伪造浏览器。
```

### 案例 3：`worker + wasm + jsvmp`

推荐 skill：`jsr-deobfuscation-and-lifting`

```text
这个 case 外层是 webpack，里面有 worker、wasm 和 jsvmp。先恢复入口、桥接层和真正的执行边界，再判断算法在哪一层。
```

### 案例 4：token 依赖 challenge / verify

推荐 skill：`jsr-signature-and-replay`

```text
这个 token 不是纯本地计算，要先 challenge 再 verify，最后才能 submit。帮我拆开远端 issued state 和本地计算段，并交付能调用的脚本。
```

### 案例 5：WebSocket 首包通过，后续失败

推荐 skill：`jsr-transport-and-protocol`

```text
这个 websocket 握手后第一条业务消息能过，第二条开始失败。怀疑 heartbeat、renewal 或 sequence/counter 有状态约束，按协议状态机分析。
```

## 当前知识库状态

统计口径：仅按 `knowledge.md` 章节数计算，不包含临时文件、链接汇总和中间产物。

- `狗都不学爬虫`: 63 章
- `语雀-js逆向`: 33 章
- `逆向百例`: 66 章
- `合计`: 162 章

## 仓库结构

```text
reverse-skill/
├─ jsr-trace-and-locate/
├─ jsr-runtime-stabilization/
├─ jsr-deobfuscation-and-lifting/
├─ jsr-signature-and-replay/
├─ jsr-transport-and-protocol/
├─ JSReverser-MCP/
└─ js逆向/
   ├─ 狗都不学爬虫/
   ├─ 语雀-js逆向/
   └─ 逆向百例/
```

## 知识沉淀准则

### 收什么

skill 里只保留这些高价值内容：

- 可跨站迁移的判断标准
- 能指导路径选择的矩阵与判据
- Hook 面选择、writer boundary 定位、entry recovery、state machine 拆解这类可复用结构
- 纯算 / 补环境 / 混合模式的判定方法
- 影响脚本可交付性的稳定性条件与验证口径

### 不收什么

以下内容通常不应进入 skill：

- 案例叙事、截图讲解、过程性流水账
- 强依赖单站命名、单站目录结构的死操作
- 低信息密度的“照着点哪里”步骤
- 通用工程常识或模型本就稳定掌握的基础内容
- 没有验证口径、不能指导交付的经验句子

### 新知识入库标准流程

1. 阅读对应案例的 `knowledge.md`
2. 判断其主要归属的核心 skill
3. 只提取可迁移、可复用、可验证的逆向知识
4. 合并进对应 skill 的 `references/*.md`
5. 不保留 case-corpus 式堆积，不保留站点故事
6. 更新后重新做 skill 校验

### 优先沉淀的知识类型

- Hook 面与探针选择策略
- writer boundary / setter boundary / header writer 判定
- anti-debug / anti-devtools / 环境校验拆法
- 补环境最小化与浏览器差异修补
- webpack / worker / wasm / jsvmp 入口恢复
- challenge / issued state / renewal / nonce 依赖拆解
- WebSocket / protobuf / heartbeat / reconnect / counter drift 稳定性分析
