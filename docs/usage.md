# Usage

这里是详细使用说明。README 只负责入口与安装，这里负责把 skill 和 `JSReverser-MCP` 组合成稳定的逆向交付流程。

## 最快方式：全程自动模式

这是最省心、也最贴近真实交付的默认方式。你不需要先判断属于哪一个 skill，只需要把目标、请求、约束和交付要求一次说清楚。

推荐模板：

```text
使用：jsreverse mcp
探索：<目标 URL / 页面入口 / 是否已有登录态>
分析：<目标请求、动态字段、怀疑点、希望拿到的结果>
方式：全程自动完成页面探索、链路定位、Hook 或断点选择、纯算或补环境判定、最小复现、脚本交付与请求验证
交付：输出可运行的 Python 脚本。若可纯算，则本地实现加密函数；若必须依赖浏览器运行时，则交付补环境模式，必要时允许 execjs 调用 JS
审查：脚本必须实际调用本地加密逻辑并发起请求；允许从其他请求或响应中提取 challenge、token、nonce 等前置参数；最终在终端打印响应结果
```

示例：

```text
使用：jsreverse mcp
探索：https://example.com/login
分析：定位 login 请求中的 x-sign、x-token 与 cookie 写入链，确认是否存在 challenge 或 renewal 依赖，并判断能否做成本地纯算
方式：全程自动分析，优先定位 writer boundary；若能脱离浏览器则做纯算；若不能则做最小补环境
交付：输出可运行的 Python 脚本，能生成请求参数并请求接口；必要时允许 execjs 调用拆出的 JS
审查：脚本必须在终端实际请求并打印响应
```

全程自动模式下，模型的默认执行原则应该是：

- 先定 writer boundary，不先停在加密函数名或关键字搜索
- 优先 Hook，再在必要时升级到 breakpoint
- 先拆分 issued state 与本地可计算阶段，再谈 replay
- 最终必须交付脚本，并实际请求验证

## 选型速查

如果你不想写完整模板，也可以直接按症状描述。下面这张表对应最常见的五类入口。

| 症状 | 主 skill | 你可以这样下任务 |
|---|---|---|
| 只知道请求头、请求体或 `cookie` 里有动态字段 | `jsr-trace-and-locate` | 这个接口里有 `x-sign`，按 writer boundary 定位真实生成链，不要先停在 crypto helper 名称层 |
| 浏览器里能跑，本地 `Node` 缺 `window`、`navigator`、`crypto`，或一调试就触发反调试 | `jsr-runtime-stabilization` | 这个 case 浏览器成功、本地失败，先做最小补环境和反调试稳定化，不要一上来全量伪造浏览器 |
| 逻辑被包在 `webpack`、`worker`、`wasm`、`jsvmp` 里，入口不清晰 | `jsr-deobfuscation-and-lifting` | 先恢复外层执行容器和桥接边界，再判断关键算法在哪一层 |
| `token`、`sign` 或 `cookie` 依赖 challenge、verify、renewal 这类前置状态 | `jsr-signature-and-replay` | 先拆 issued state 与本地纯算阶段，再输出可调用脚本 |
| `WebSocket` 首包通过，后续消息失败，或怀疑有 `protobuf`、心跳、序号、续期状态 | `jsr-transport-and-protocol` | 按协议状态机分析，不要只验证第一条消息 |

## 显式指定 Skill

当你已经知道问题落在哪一层时，直接点名 skill，模型会更快进入正确路径。

```text
$jsr-trace-and-locate 这个接口的 x-sign 在请求头里，按 writer boundary 定位真实生成链，确认 entry、builder、writer 三层，并给出最小复现证据。
```

```text
$jsr-runtime-stabilization 这个 case 浏览器能跑，本地脚本一开调试就触发无限 debugger，而且缺 navigator 与 crypto。做最小补环境，不要全量伪造浏览器。
```

```text
$jsr-deobfuscation-and-lifting 外层是 webpack，里面有 worker、wasm 和 jsvmp。先恢复入口、桥接层和真正执行边界，再判断 replay 关键逻辑在哪一层。
```

```text
$jsr-signature-and-replay 这个 token 不是纯本地计算，要先 challenge 再 verify，最后才能 submit。拆开 issued state 与本地计算段，并交付可调用脚本。
```

```text
$jsr-transport-and-protocol 这个 websocket 握手后第一条业务消息能过，第二条开始失败。怀疑 heartbeat、renewal 或 sequence 有状态约束，按协议状态机分析。
```

## 常见组合方式

1. `jsr-trace-and-locate -> jsr-signature-and-replay`
   先证明真实生成边界，再把它重建成稳定脚本。
2. `jsr-trace-and-locate -> jsr-runtime-stabilization -> jsr-signature-and-replay`
   先定链路，再做最小补环境，最后交付可跑 replay。
3. `jsr-trace-and-locate -> jsr-deobfuscation-and-lifting -> jsr-signature-and-replay`
   先锁定真实入口，再 lift 关键语义，最后抽取本地可调用算法。
4. `jsr-transport-and-protocol -> jsr-runtime-stabilization`
   先拆协议状态机，再补齐长连接相关运行时差异。
5. `jsr-deobfuscation-and-lifting -> jsr-transport-and-protocol`
   当序列化、反序列化或协议解析器被藏在 `worker`、`wasm`、`vm` 内时，先恢复桥接入口，再分析协议层。

## 交付标准

真正的完成，不是“分析到大概位置”，而是至少交付以下一种可运行结果：

- 纯算模式：本地可调用的加密或签名函数，加上请求脚本
- 补环境模式：最小补环境脚本，加上请求脚本
- 混合模式：明确列出 issued state、浏览器态依赖、本地可计算阶段，以及最终请求脚本
- 协议模式：握手规则、状态迁移、可持续交互的 replay 或验证脚本

## 审查标准

以下条件没有满足，就不算真正交付完成：

- 脚本必须实际发起请求，而不是停留在理论分析
- 终端中必须打印真实响应，而不是只打印中间参数
- 如果依赖 challenge、issued state、cookie、renewal 等前置状态，必须明确说明获取路径
- 如果使用 `execjs` 调用 JS，必须说明为什么不能直接纯 Python 重建
- 如果只能补环境，必须说明为什么当前不能做成纯算
- 如果是协议场景，必须证明不只是第一条消息通过，而是状态机能持续运行

## 四层结构

当前 5 个 active skill 都按同一套 4 层结构组织，职责固定，不再混写案例叙事。

| 层 | 文件 | 作用 |
|---|---|---|
| 1 | `jsr-shared-references/jsr-mcp-routing.md` | 规定默认起手工具、Hook 与 breakpoint 的升级条件、什么才算真正交付 |
| 2 | `references/playbook.md` | 给出该类问题的标准执行顺序 |
| 3 | `references/knowledge-distilled.md` | 收敛核心判断、常见误判与证据标准 |
| 4 | `references/*-matrix.md` | 解决优先看哪一层、先钩哪里、什么 anchor 最值钱 |

推荐阅读顺序：

1. `jsr-shared-references/jsr-mcp-routing.md`
   先确定默认 MCP 路由与升级条件。
2. `references/playbook.md`
   再确定这一类问题按什么顺序推进。
3. `references/knowledge-distilled.md`
   再解决判断分叉与证据标准。
4. `references/*-matrix.md`
   最后在复杂场景里缩小真正值得跟的边界。

## 提问建议

如果你想让模型尽量少走弯路，建议一次给全以下信息：

- 目标 URL 或页面入口
- 目标请求或目标动态字段
- 当前已知症状
- 是否已有登录态
- 更偏向纯算，还是允许补环境与 `execjs`
- 最终要的交付物，是“定位结论”还是“可运行脚本加真实响应”

最不推荐的说法是只给一句“帮我看看这个怎么加密”。这种描述会让模型先花时间补上下文，而不是直接进入最短交付路径。
