# reverse-skill

面向 Web JS 逆向的三核技能仓库，核心目标不是教模型“套固定工具方案”，而是让模型具备三种真正关键的能力：

- `locate`：会定位，会设计定位路径，会展开请求依赖链
- `runtime`：会分辨环境、状态、反调试、风控分支，不乱补环境
- `recover`：会拆 `jsvmp / ast / worker / wasm / 协议壳`，恢复真实语义而不是只会美化代码

## 当前结构

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

## 设计取向

- 不写“大、泛、空”的逆向说明
- 不重复模型本来就会的常识
- 不把 skill 写成固定工具菜单
- 主 `SKILL.md` 负责触发、原则、切换条件、交付要求
- `references/` 只放真正高价值的逆向难点与中文记录模板
- 所有过程记录统一使用中文

## 工作目录记录

三核 skill 默认要求把过程记录真正写进当前任务工作目录，而不是只停留在对话里。

默认记录根目录：

```text
<当前任务工作目录>/reverse-records/
```

默认文件：

- `总览.md`：任务目标、当前阶段、已确认、卡点、下一步、风险、结论摘要
- `请求链路.md`：请求参数、请求头、`cookie`、`HttpOnly`、上游依赖、正常态/风控态对照
- `运行时依赖.md`：最小环境清单、状态依赖、时间/随机源、反调试、风控分支
- `恢复记录.md`：`jsvmp`、`ast`、`worker`、`wasm`、协议壳、关键函数卡片、桥接边界
- `验证记录.md`：等价性验证、回放验证、关键中间值、最终对照结果
- `协议状态.md`：仅在 `WebSocket`、`protobuf`、长连接、心跳、序号、续期场景下创建

写入原则：

- 没有用户另行指定路径时，一律写到 `reverse-records/`
- 文件不存在就创建，存在就追加或更新
- 所有记录都用中文
- 每次推进后至少更新 `总览.md`
- 需要复现接口时，优先更新 `请求链路.md`

## 三个主 skill 分工

### `jsr-locate`

负责：

- 写入边界定位
- `entry -> builder -> writer` 梳理
- 参数来源证明
- 请求链路与前置依赖展开
- `HttpOnly cookie`、响应获取字段、风控态/正常态链路区分

适合：

- `sign`、`token`、`cookie`、请求头、请求体字段不知道从哪来
- 已知目标请求，但不知道它依赖哪些前置请求和响应
- 需要把整条链展开到正常态，而不是只找到一个函数名

### `jsr-runtime`

负责：

- 补环境诊断
- 最小环境设计
- 状态依赖判断
- 反调试与风控分支区分
- 时间源、随机源、种子稳定化

适合：

- 浏览器内正常，本地执行异常
- 一调试就变值、卡死、跳风控
- 不确定是缺对象、缺状态、反调试还是风控分支

### `jsr-recover`

负责：

- `jsvmp`
- `ast` 与控制流平坦化
- `worker`
- `wasm`
- `webpack/runtime` 包装
- `protobuf`、`WebSocket`、长连接状态迁移等协议壳

适合：

- 逻辑被多层壳遮住，看得到写回点但看不透中间语义
- 需要先恢复桥接层、调度层、状态载体，再讨论业务算子
- 不想陷入整包美化和低价值还原

## references 的作用

每个 skill 都保留少量 `references/`，只承载真正高价值内容：

- 难点分层
- 逆向设计方法
- 过程记录模板
- 切换条件
- 完成标准

不是资料库，不是案例堆，也不是工具手册。

## 安装

把下面三个目录复制到技能根目录：

- `jsr-locate`
- `jsr-runtime`
- `jsr-recover`

常见位置：

- `Codex`：`%USERPROFILE%\.codex\skills\`
- `Claude Code`：`%USERPROFILE%\.claude\skills\`

## 使用示例

```text
使用 $jsr-locate 梳理请求 A 的写入边界、参数来源、上游依赖和 HttpOnly cookie 链路。
```

```text
使用 $jsr-runtime 判断这个 case 是缺状态、缺对象、反调试还是风控分支，并给出最小环境清单。
```

```text
使用 $jsr-recover 恢复这个 jsvmp + worker + wasm 组合壳，先给出分层语义、桥接边界和等价性检查点。
```
