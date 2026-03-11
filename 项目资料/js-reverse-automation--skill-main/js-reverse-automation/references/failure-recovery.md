# 失败恢复

本文档定义了在不破坏主链路的前提下，如何诊断、记录并恢复失败。

## 失败记录格式

每个失败或警告都应使用如下结构：

```json
{
  "phase": 2,
  "code": "ENTRYPOINT_NOT_CONFIRMED",
  "summary": "Found keyword matches but no runtime evidence.",
  "evidence": [
    "XHR breakpoint hit after encryption but before request send"
  ],
  "impact": "Cannot generate a reliable JSRPC artifact.",
  "next_action": "Add hook output or stack-frame evidence for the candidate entrypoint."
}
```

## 分阶段恢复规则

### Phase 0
- 缺少必填字段
  - 立即停止。
  - 按输入契约的精确格式要求补齐字段。
- URL 非法
  - 立即停止。
  - 要求提供完整的 `http` 或 `https` URL。

### Phase 1
- 浏览器连接失败
  - 记录浏览器版本、MCP 附着错误，以及标签页是否可达。
  - 在确认目标浏览器实例已经打开后重试一次。
- 请求复现失败
  - 检查可选 fetch 示例是否可以手工复现。
  - 如果不能，捕获最接近的网络请求，并将 Phase 1 标记为失败。

### Phase 2
- 存在候选入口，但没有运行时证据
  - 标记为 `partial`。
  - 在未缩小到一个带证据的首选入口之前，不得继续。
- 检测到反调试
  - 从 `references/antidebug/` 中选择匹配范围最小的规则。
  - 记录风险和引用的精确文件。

### Phase 3
- 运行时上下文不完整
  - 记录缺失的全局对象、模块或 `this` 绑定。
  - 保持产物为 `partial`，并阻止继续生成代码。
- 异步行为未知
  - 视为阻断项。
  - 必须通过真实调用或 Promise 检查来确认。

### Phase 4-7
- 产物生成成功，但校验失败
  - 保留已生成文件。
  - 将校验报告标记为失败。
  - 输出文件级修复建议。

### Phase 8
- 校验检查失败
  - 返回 `status=failed`。
  - 包含扁平化的 `next_actions` 列表。

## 强制诊断信息

当任一阶段失败时，最终输出必须包含：
- failed phase id
- failure code
- summary
- evidence
- impact
- next action
- 下游生成是否被跳过，或是否带警告继续完成

## 反调试规则选择

将 `references/antidebug/` 视作规则文档，而不是嵌套 Skill：
- `debugger-loop.md`
  - 重复触发的 `debugger`、`eval`、`Function`、`constructor` 篡改
- `console-detect.md`
  - console 方法覆写、`console.clear`、`console.table`、日志抑制
- `timer-check.md`
  - 时间差检查、Promise 时序、性能探针
- `env-detect.md`
  - 窗口大小、devtools、webdriver、UA 检查
- `proxy-guard.md`
  - 因代理、扩展、history、close、redirect hook 导致的请求复现阻断
- `dynamic-alias.md`
  - 混淆别名、动态 resolver、加密包装器、异步间接层

只有当某条规则确实改变了调查路径或风险面时，才应引用它。
