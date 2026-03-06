# reverse-skill

面向 Web JS 逆向的 AI skills 仓库。

## 安装方式

### 1. 安装 JSReverser-MCP

[JSReverser-MCP](https://github.com/NoOne-hub/JSReverser-MCP)

### 2. 安装 jsr skills

将以下目录完整复制到客户端的 skills 根目录

- `jsr-trace-and-locate`
- `jsr-runtime-stabilization`
- `jsr-deobfuscation-and-lifting`
- `jsr-signature-and-replay`
- `jsr-transport-and-protocol`
- `jsr-shared-references`

客户端目录：

| 客户端 | 安装位置 |
|---|---|
| `Codex` | `%USERPROFILE%\.codex\skills\` |
| `Claude Code` | `%USERPROFILE%\.claude\skills\` |

![安装示例](image.png)

## 推荐使用方式
将这段话发给AI

```text
使用：jsreverse mcp
探索：<目标 URL / 页面入口 / 是否已有登录态>
分析：<目标请求、动态字段、怀疑点、希望拿到的结果>
方式：全程自动完成页面探索、链路定位、Hook 或断点选择、纯算或补环境判定、脚本交付与请求验证
交付：输出可运行的 Python 脚本。若可纯算，则本地实现加密函数；若必须依赖浏览器运行时，则交付补环境模式，必要时允许 execjs 调用 JS
审查：脚本必须实际发起请求并在终端打印响应；允许从其他请求或响应中提取 challenge、token、nonce 等前置参数
```

如果你已经知道问题归属，再显式点名 skill。

```text
$jsr-trace-and-locate 这个接口的 x-sign 在请求头里，按 writer boundary 定位真实生成链，确认 entry、builder、writer 三层。
```

更细的操作方式、显式 skill 模式、组合模式与交付标准见 [docs/usage.md](docs/usage.md)。

## 当前 Skills

| Skill | 用途 | 典型产出 |
|---|---|---|
| `jsr-trace-and-locate` | 定位 `sign`、`token`、`cookie`、`header` 等动态字段的真实生成链与写入边界 | `entry -> builder -> writer` 调用链、关键函数签名、最小复现证据 |
| `jsr-runtime-stabilization` | 处理无限 `debugger`、缺环境对象、指纹差异、登录态失配、浏览器与本地执行不一致 | 最小补环境清单、反调试处置、稳定重放证明 |
| `jsr-deobfuscation-and-lifting` | 处理 `webpack`、`worker`、`wasm`、`jsvmp`、AST 变换等导致的入口不可读与语义遮蔽 | 入口恢复、关键语义分层、等价性验证 |
| `jsr-signature-and-replay` | 把 `sign`、`token`、`cookie`、`header` 的生成逻辑重建为可调用脚本 | 分阶段 I/O、issued state 依赖清单、可验证的 replay 脚本 |
| `jsr-transport-and-protocol` | 处理 `WebSocket`、`protobuf`、握手、心跳、序号、协议状态迁移 | 协议契约表、消息分层、持续交互验证脚本 |

## Skill 与 JSReverser-MCP 的协同关系

| Skill | 默认起手工具 | 适合处理的问题 |
|---|---|---|
| `jsr-trace-and-locate` | `analyze_target`、`create_hook`、`inject_hook`、`get_hook_data` | 只知道动态字段存在，但还不知道它在哪里生成 |
| `jsr-runtime-stabilization` | `check_browser_health`、`list_console_messages`、`get_storage`、`evaluate_script` | 浏览器能跑、本地跑不动，或一调试就触发反调试 |
| `jsr-deobfuscation-and-lifting` | `collect_code`、`search_in_sources`、`get_script_source`、`understand_code` | 入口被打包、混淆、拆到 `worker` 或 `wasm` 里 |
| `jsr-signature-and-replay` | `analyze_target`、`hook_function`、`list_network_requests`、`get_network_request` | 需要把动态值做成稳定脚本，并区分本地计算与服务端发放状态 |
| `jsr-transport-and-protocol` | `list_websocket_connections`、`analyze_websocket_messages`、`get_websocket_messages` | 需要分析长连接、帧结构、心跳、续期、序号与协议状态 |

共享路由与起手原则集中在 [jsr-shared-references/jsr-mcp-routing.md](jsr-shared-references/jsr-mcp-routing.md)。

## 当前知识库状态

统计口径：仅按 `knowledge.md` 章节数统计，不包含临时文件、链接汇总和中间产物。

以下数字表示待提炼原料规模，不代表这些案例会原样进入 skill；skill 只吸收其中可迁移、可复用、可交付的知识。

- `狗都不学爬虫`：63 章
- `语雀-js逆向`：33 章
- `逆向百例`：66 章
- `合计`：162 章

## 仓库结构

```text
reverse-skill/
|- jsr-trace-and-locate/
|- jsr-runtime-stabilization/
|- jsr-deobfuscation-and-lifting/
|- jsr-signature-and-replay/
|- jsr-transport-and-protocol/
|- jsr-shared-references/
|- JSReverser-MCP/
|- docs/
|  |- usage.md
|  `- plans/
`- js逆向/
   |- 狗都不学爬虫/
   |- 语雀-js逆向/
   `- 逆向百例/
```
