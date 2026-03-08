# 请求链路记录

## 一、记录原则

- 所有记录使用中文。
- 不只记录目标请求，必须记录它依赖的上游请求。
- 每个参数、请求头、`cookie` 都要标状态标签。
- `HttpOnly` cookie 必须单独标出，不得归入 `document.cookie` 可读范围。
- 只要发现响应字段、`Set-Cookie`、challenge、session、device state 依赖，就必须先写状态链，再讨论纯算。
- 记录要能回答“现在做到哪了、卡在哪、下一步是什么”。

## 落盘路径

默认写到当前任务工作目录：

```text
reverse-records/总览.md
reverse-records/请求链路.md
reverse-records/验证记录.md
reverse-records/协议状态.md（仅协议 / 长连接场景）
```

其中：

- `总览.md` 记录任务级进度与结论摘要
- `请求链路.md` 记录完整请求链、参数、依赖、正常态/风控态对照
- `验证记录.md` 记录删除上游依赖、切换状态、对照样本后的验证结果
- `协议状态.md` 记录连接状态链、消息族、序号 / ack / 心跳 / 续期规则

## 二、状态标签规范

统一用数组叠加，至少从下面标签中选择：

- `未知`
- `已知`
- `固定`
- `动态`
- `明文`
- `加密`
- `本地计算`
- `响应获取`
- `环境产生`
- `会话相关`
- `风控相关`
- `时序相关`
- `一次性`
- `可复用`
- `HttpOnly`

示例：

```json
["动态", "加密", "响应获取", "会话相关"]
```

```json
["动态", "响应获取", "HttpOnly", "会话相关"]
```

## 三、状态链是强制项

只要目标请求依赖下面任一来源，就必须先写状态链：

- 上游响应字段
- `Set-Cookie` / `HttpOnly cookie`
- challenge / token / session
- `device_id` / 指纹结果 / 浏览器内部状态

状态链模板：

```text
请求 B.response.token ----------> 会话状态.token ----------> 请求 A.builder.x-token ----------> 请求 A.header.x-token
请求 B.Set-Cookie.guest_id -----> cookie jar(HttpOnly) -----> 请求 A 自动携带 cookie -----------> 请求 A 正常态
请求 C.response.challenge ------> 挑战状态.challenge -------> 请求 A.builder.challenge --------> 请求 A.body.challenge
```

规则：

- 没写出状态链，不允许先下结论说目标值是纯算。
- 状态链必须一直展开到“目标请求拿到正常响应而不是风控态”为止。

## 四、目标请求记录模板

```markdown
目标请求：A
目标地址：
目标动作：页面初始化 / 点击按钮 / 表单提交 / 滑块通过 / 心跳续期
目标状态：正常态 / 风控态 / 未知
目标字段：

### 请求 A 参数总览
| 位置 | 名称 | 值摘要 | 状态标签 | 直接来源 | 证据 | 备注 |
|---|---|---|---|---|---|---|
| query | sign | 32位摘要 | ["动态","加密","本地计算"] | builder.sign() | 提交前对照 | 最终写入值 |
| header | x-token | 省略 | ["动态","响应获取","会话相关"] | 请求 B 响应 | 响应映射 | 上游依赖 |
| cookie | guest_id | 省略 | ["动态","响应获取","HttpOnly","会话相关"] | 请求 B Set-Cookie | 抓包 | 不能从 document.cookie 读 |
| body | scene | login | ["固定","明文"] | 页面固定值 | 请求体 | 固定参数 |
```

## 五、依赖链展开模板

如果请求 A 依赖 B、C，不得仅记录“依赖上游”这一结论，必须展开依赖链：

```markdown
### 依赖链
- A.header.x-token <- B.response.token
- A.cookie.guest_id <- B.Set-Cookie.guest_id
- A.body.challenge <- C.response.challenge

### 请求 B
触发动作：页面初始化
请求结果：正常返回 token 与 HttpOnly cookie

| 位置 | 名称 | 值摘要 | 状态标签 | 直接来源 | 证据 | 备注 |
|---|---|---|---|---|---|---|
| body | device_id | 省略 | ["动态","环境产生"] | 浏览器状态 | 初始化阶段 | 非用户输入 |

### 请求 C
触发动作：点击验证
请求结果：返回 challenge

| 位置 | 名称 | 值摘要 | 状态标签 | 直接来源 | 证据 | 备注 |
|---|---|---|---|---|---|---|
| response | challenge | 省略 | ["动态","响应获取","一次性"] | 服务端 | 响应包 | 挑战态输入 |
```

## 六、协议 / 长连接场景必须补连接状态链

如果目标是 `WebSocket`、`protobuf`、长连接、SSE、心跳、续期类请求，除了普通依赖链，还必须补“连接状态链”：

```markdown
连接：ws-1

### 连接状态链
未连接 -> 握手中 -> 已认证 -> 订阅完成 -> 心跳维持 -> 续期 -> 失效

### 消息族
| 消息族 | 方向 | 作用 | 当前状态 | 关键字段 | 备注 |
|---|---|---|---|---|---|
| 握手包 | sent | 建链 | 握手中 | token / nonce | 首包 |
| 握手响应 | recv | 下发会话 | 已认证 | session / ack | 状态切换点 |
| 心跳包 | sent | 保活 | 心跳维持 | seq / ts | 周期发送 |
| 业务包 A | sent | 目标消息 | 已认证 | payload / sign | 目标写入边界 |
| ack 包 | recv | 确认序号 | 已认证 | ack / seq | 与重放相关 |
| 续期包 | recv/sent | 延长会话 | 续期 | refresh_token | 失效前更新 |
```

规则：

- 没写出连接状态链，不允许把协议问题简化成“某个 payload 加密”。
- 没写出消息族，不允许只凭单条消息推断全部链路。

## 七、美观展示依赖链

如果链路比较长，用树状展示：

```text
请求 B（初始化）
├─ response.token ---------> 请求 A.header.x-token
└─ Set-Cookie.guest_id ---> 请求 A.cookie.guest_id (HttpOnly)

请求 C（挑战）
└─ response.challenge ----> 请求 A.body.challenge

请求 A（目标请求）
└─ 拿到正常响应
```

要求一直展开到“能拿到正常响应而不是风控态”为止。

## 八、正常态 / 风控态分叉图是必交付

除了对照表，还必须补一份分叉图，至少写清：

- 分叉起点
- 正常态构建路径
- 风控态 fallback / challenge 路径
- 缺失状态

模板：

```markdown
分叉起点：请求 B 未返回 token / 未下发 HttpOnly cookie

正常态构建路径：
B.response.token -> A.builder_main() -> A.writer.header.x-token -> A 正常响应

风控态路径：
B 失败 / 状态缺失 -> A.fallback_sign() -> A 风控响应 / challenge

缺失状态：
- token
- guest_id(HttpOnly)
```

## 九、正常态 / 风控态对照模板

```markdown
| 项目 | 正常态 | 风控态 | 结论 |
|---|---|---|---|
| 上游请求 B | 有 token + HttpOnly cookie | 无 cookie | A 依赖 B |
| 目标请求 A 响应 | 正常数据 | 风控页 / 403 / 空包 | 当前链路未闭合 |
| x-sign 写入点 | builder.sign() | fallback.sign() | 风控态有诱饵分支 |
```

没写出“分叉起点”和“缺失状态”，这份记录就不算完成。

## 十、进度记录模板

```markdown
当前阶段：定位写入边界 / 展开依赖链 / 复核正常态 / 对照风控态

已确认：
- 
- 

当前卡点：
- 

下一步：
- 

风险：
- 

待验证：
- 
```

这段内容默认写入：`reverse-records/总览.md`

## 十一、证据记录模板

```markdown
证据编号：E-01
观察点：提交前请求头
观察现象：x-token 在发送前被写入
直接结论：x-token 写入发生在 writer 层，不在网络返回后追加
仍未证明：x-token 的上游来源是否来自请求 B 响应
```

这段内容可以写在：`reverse-records/验证记录.md`

## 十二、什么叫记录做对了

- 看记录的人不用重新抓包，就知道依赖链怎么走。
- 能一眼分清哪些字段是固定、哪些是动态、哪些来自响应、哪些来自环境。
- 能看出哪一步开始进入风控态。
- 能看出状态链是否闭合，是否还有 `HttpOnly`、challenge、session、device state 缺口。
- 协议场景下能看出连接处在哪个状态、目标消息属于哪一类消息族、为什么会续期失败或重放失败。
- 能看出当前做到哪、卡在哪、下一步该怎么推进。
