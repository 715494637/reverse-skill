# Hook and Boundary Selection

## 1. 先选边界，再选工具

工具只是次级选择。边界选择才是 locate 阶段的核心。

先问三个问题：

- 目标值最终写入在哪里
- 哪一层最接近最终写点
- 哪一层最不容易被伪装

## 2. 常见边界模式

| 场景 | 优先边界 | 原因 | 不好的起手式 |
|---|---|---|---|
| 动态请求体字段 | 序列化前的最终对象 | 最容易看到最终值 | 先搜 crypto |
| 动态请求头字段 | header 设置点或 writer | 能把 builder 与 writer 分开 | 先搜 header 名 |
| JS 写入 `cookie` | `cookie` 写点 | 能看清是谁改了值 | 只看 `document.cookie` 读取 |
| 响应 `Set-Cookie` | 网络响应 | 对 `HttpOnly` 尤其关键 | 在前端代码里搜 cookie 名 |
| `WebSocket` frame | send 前的 envelope 层 | 直接暴露包络、序号、心跳 | 只盯一条 payload |
| `worker` 生成值 | `postMessage` 契约 | 输入输出比内部更清楚 | 先钻 worker 内部 |
| 隐藏 DOM 字段 | 赋值点 + submit 动作 | 方便沿事件链回溯 | 先搜字段明文 |

## 3. 什么时候适合 hook

适合 hook 的情况：

- 大体 sink 已知，但真实 writer 还不清楚
- 必须证明调用顺序、参数或返回值
- 需要在稳定观察条件下比较多次请求

不适合 hook 的情况：

- 最终 sink 仍未知
- 当前样本已经明显是风控态诱饵链
- 任意 hook 都会立刻触发明显反调试；此时应先把它作为 runtime 分叉处理

## 4. 什么时候值得下断点

只有同时满足下面几点时，断点才值得使用：

- 被动观察拿不到必须看的局部变量
- 需要检查分支条件、闭包变量或临时对象
- 同名函数里存在多条候选路径，且只有一条真正写值

断点不是默认起手动作。

## 5. 各场景的优先观察顺序

### 请求 body 或请求 header

```text
writer -> builder -> entry -> source
```

### `cookie`

```text
先区分 JS 写入 cookie 与响应 Set-Cookie
JS 写入：writer -> builder -> entry
响应写入：response -> dependency request -> target request
```

### `WebSocket`

```text
send envelope -> message type -> state transition -> payload
```

### `worker`

```text
主线程 worker 构造 -> 输入 -> worker 输出 -> 最终写回
```

## 6. 边界选错的信号

- 眼前只有一堆疑似 crypto 函数，但最终写点仍说不清
- 找到了相似中间变量，但请求仍依赖无法解释的上游响应
- 某个字段值变了，却不清楚目标请求是否在同一层被写入
- 观察点太早，离真实发网仍很远

出现这些信号时，应退回到更靠近 sink 的边界。

## 7. 正确选边界后的最小输出

- 一个稳定写点
- 一条可复验调用顺序
- 一张字段状态标签表
- 一条完整依赖链记录
