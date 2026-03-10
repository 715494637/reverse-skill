# reverse-skill

面向 Web JS逆向 ，（待开发）安卓逆向 任务的技能仓库。

## 安装

接入JSReverse MCP：

- [JSReverse MCP](https://github.com/NoOne-hub/JSReverser-MCP)

将以下目录复制到技能根目录：

- `jsr-locate`
- `jsr-runtime`
- `jsr-recover`

常见安装位置：

- `Codex`：`%USERPROFILE%\.codex\skills\`
- `Claude Code`：`%USERPROFILE%\.claude\skills\`

## 使用

按任务类型选择对应 skill：

- `jsr-locate`：用于定位动态字段的写入边界、来源链、请求依赖链、状态链和连接状态链
- `jsr-runtime`：用于诊断对象缺口、状态缺口、反调试、时间随机源、指纹归因与风控分支
- `jsr-recover`：用于恢复 `jsvmp`、`ast`、`worker`、`wasm`、`webpack/runtime`、协议壳等遮蔽层的真实语义

推荐最小输入：

- `(*) URL`
- `接口 / 需要的数据`
- `触发方式`

全自动示例：

```text
使用：JSReverse MCP
方式：在真实浏览器插桩采集完整的输入输出及中间态数据，与本地算法进行逻辑一致性和结果正确性对比分析。
URL: 【https://example.com】
目标：【接口 / 需要的数据】
触发方式: 【刷新页面】
cookie：【使用现有cookie / 如无或者非必要则可以不使用，若必须则需要完整模拟链路生成游客态】
约束：不使用playwright等浏览器自动化工具，不能联网搜索公开案例
必须纯算法实现，【能/不能】依赖补环境
交付：Node.js 生成加密参数，Python 负责调度和发送请求，运行后打印响应数据
```

定向调用示例：

```text
$jsr-locate 梳理请求 A 的写入边界、参数来源、上游依赖和 HttpOnly cookie 链路。
```

```text
$jsr-runtime 判断当前问题属于缺状态、缺对象、反调试还是风控分支，并给出最小环境清单。
```

```text
$jsr-recover 恢复当前 jsvmp + worker + wasm 组合壳，输出桥接边界、关键算子和等价性检查点。
```

## 技能概览

### `jsr-locate`

作用：

- 定位目标字段的最终写入边界
- 建立 `entry -> builder -> writer` 关系
- 证明参数、请求头、`cookie`、`HttpOnly cookie`、消息字段的来源
- 展开前置请求、响应依赖、状态链、正常态 / 风控态分叉
- 处理 `WebSocket`、`protobuf`、长连接场景下的连接状态链与消息族定位

适用场景：

- 不清楚 `sign`、`token`、`cookie`、请求头、请求体字段从何处写入
- 已知目标请求，但不清楚其依赖的前置请求、响应字段或状态
- 需要将链路展开到可获得正常响应的闭合状态

### `jsr-runtime`

作用：

- 区分对象缺失、状态缺失、反调试、不确定源、风控分支
- 设计最小环境并说明每项依赖的必要性
- 固定时间源、随机源、种子与会话状态
- 建立纯算迁移前检查与指纹归因矩阵
- 识别正常态 / 风控态分叉点与运行时消费点

适用场景：

- 浏览器内正常，本地执行异常
- 调试后值变化、执行卡死、链路跳入风控分支
- 不清楚问题属于环境对象、会话状态、指纹消费还是风险校验

### `jsr-recover`

作用：

- 判定遮蔽层类型与最低必要恢复级别
- 恢复 `jsvmp`、`ast`、控制流平坦化、`worker`、`wasm`、`webpack/runtime`、协议壳
- 提取桥接契约、状态载体、关键算子、模块闭包边界
- 支持协议包络、消息族、长连接状态迁移分析
- 输出等价性检查点与可复用的恢复记录

适用场景：

- 已定位写回边界，但中间语义被多层壳遮蔽
- 需要先恢复桥接层、调度层或状态载体，才能继续定位或复现
- 需要判断当前任务应停留在 `A / B / C` 哪一级恢复深度

## 工作目录记录

执行三类 skill 时，默认在当前任务工作目录维护中文记录：

```text
<当前任务工作目录>/reverse-records/
├─ 会话1/
│  ├─ 总览.md
│  ├─ 请求链路.md
│  ├─ 运行时依赖.md
│  ├─ 恢复记录.md
│  └─ 验证记录.md
├─ 会话2/
│  ├─ 总览.md
│  ├─ 请求链路.md
│  ├─ 运行时依赖.md
│  ├─ 恢复记录.md
│  └─ 验证记录.md
└─ ...
```

记录要求：

- 一个逆向会话只使用一个 `会话N/` 目录
- 用户指定 `会话N` 时，只读取和写入该目录
- 用户未指定时，创建下一个未占用的 `会话N` 并只写入该目录
- 不得覆盖、合并、重命名、清理其他 `会话N/` 目录中的记录
- 协议 / 长连接状态写入当前会话 `请求链路.md` 的专门章节，不再单独创建 `协议状态.md`
- 文件不存在时按需创建，存在时仅更新当前会话中的对应文件
- 每次推进后至少更新一次当前会话 `总览.md`
- 涉及接口复现、状态链、连接状态链时优先更新当前会话 `请求链路.md`

## 目录结构

```text
reverse-skill/
├─ jsr-locate/
│  ├─ SKILL.md
│  ├─ agents/
│  └─ references/
├─ jsr-runtime/
│  ├─ SKILL.md
│  ├─ agents/
│  └─ references/
├─ jsr-recover/
│  ├─ SKILL.md
│  ├─ agents/
│  └─ references/
├─ js逆向/
├─ JSReverser-MCP-main/
└─ README.md
```
