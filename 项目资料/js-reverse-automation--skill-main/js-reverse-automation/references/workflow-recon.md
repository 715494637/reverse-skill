# 工作流说明

本文档是 `SKILL.md` 背后的执行工作流。每个阶段都明确规定了输入、输出、成功门槛、失败门槛以及是否继续执行的规则。

## Phase 0: 输入校验与规范化
- 输入
  - 原始用户请求，包含 `Target URL`、`Parameters To Analyze`、`Environment Constraints`，以及 `Optional Fetch Example`。
- 输出
  - `artifacts/phase0_input.json`
- 成功条件
  - 必填字段存在。
  - URL 语法合法。
  - 参数列表在规范化后非空。
- 失败条件
  - 缺少必填字段。
  - URL 非法。
  - 参数列表为空。
- 是否继续
  - 只有 `scripts/check_inputs.py` 退出码为 `0` 时才继续。
- 失败处理
  - 立即停止工作流。
  - 输出结构化错误，包含 `phase=0`、`missing_fields` 和 `fix_hint`。

## Phase 1: 浏览器连接与链路复现
- 输入
  - `artifacts/phase0_input.json`
- 输出
  - `artifacts/phase1_trace.json`
- 成功条件
  - chrome-devtools-mcp 成功附着到真实浏览器标签页。
  - 目标页面成功加载。
  - 成功复现目标请求链路，或将 fetch 示例映射到真实请求。
- 失败条件
  - 浏览器连接失败。
  - 页面无法加载，或被环境限制阻断。
  - 请求链路无法复现。
- 是否继续
  - 只有存在针对目标参数的具体请求记录时才继续。
- 失败处理
  - 记录浏览器版本、标签页 URL、网络错误，以及代理或扩展限制是否阻断了本次执行。
  - 如果出现反调试症状，标注 `references/antidebug/` 中疑似对应的规则类别。

## Phase 2: 参数入口发现
- 输入
  - `artifacts/phase0_input.json`
  - `artifacts/phase1_trace.json`
- 输出
  - `artifacts/phase2_entrypoints.json`
- 成功条件
  - 每个目标参数至少找到一个候选入口。
  - 每个候选入口都带有证据，例如调用栈、源码文件、对象路径或 hook 输出。
- 失败条件
  - 没有找到候选入口。
  - 只有启发式关键词命中，没有运行时证据。
- 是否继续
  - 只有选出一个首选入口，或明确记录了歧义时才继续。
- 失败处理
  - 记录最后一个可观测的参数变更点。
  - 给出下一步探针建议，例如函数 hook、XHR/fetch 断点、加密库 hook 或反调试规则。

## Phase 3: 调用路径与依赖提取
- 输入
  - `artifacts/phase2_entrypoints.json`
- 输出
  - `artifacts/phase3_dependencies.json`
- 成功条件
  - 已识别可调用的函数路径或 resolver 策略。
  - 已枚举必要依赖，包括对象路径、`this` 绑定、异步行为、预加载全局对象、模块或编解码器。
  - 已知输入形态和输出形态。
- 失败条件
  - 找到了函数，但仍无法可靠调用。
  - 缺少必要运行时上下文。
  - 依赖链不完整。
- 是否继续
  - 只有当前数据足以生成确定性代码时才继续。
- 失败处理
  - 将该产物标记为 `partial`。
  - 记录尚未解决的运行时依赖。

## Phase 4: 生成 `analysis_result.json`
- 输入
  - `artifacts/phase0_input.json`
  - `artifacts/phase1_trace.json`
  - `artifacts/phase2_entrypoints.json`
  - `artifacts/phase3_dependencies.json`
- 输出
  - `analysis_result.json`
- 成功条件
  - 所有必需的顶层区块都存在。
  - 每个目标参数都映射到了首选入口。
  - 诊断、风险和校验目标都已填充。
- 失败条件
  - 缺少强制区块。
  - schema 非法，或 action 元数据不一致。
- 是否继续
  - 只有 `analysis_result.json` 通过 `scripts/validate_artifacts.py` 的 schema 检查后才继续。
- 失败处理
  - 停止后续生成阶段。
  - 输出包含 JSON pointer 路径的 schema 错误列表。

## Phase 5: 生成 JSRPC 注入代码
- 输入
  - `analysis_result.json`
- 输出
  - 生成的 JSRPC 注入文件
- 成功条件
  - action 注册存在。
  - 入口解析逻辑与分析结果一致。
  - 同步/异步处理和错误处理存在。
- 失败条件
  - 没有 action 注册。
  - 入口路径缺失，或与分析结果不一致。
  - 缺少必要的运行时 bootstrap 逻辑。
- 是否继续
  - 只有通过产物校验后才继续。
- 失败处理
  - 保留已生成文件。
  - 在校验结果中精确标出缺失项。

## Phase 6: 生成 Flask 代理代码
- 输入
  - `analysis_result.json`
- 输出
  - 生成的 Flask 代理文件
- 成功条件
  - Flask 应用能够成功编译。
  - 健康检查端点存在。
  - 编码端点会把输入转发给 JSRPC，并更新目标字段。
- 失败条件
  - 生成的 Python 语法无效。
  - 没有 encode 路由。
  - 目标字段没有正确回填到请求体中。
- 是否继续
  - 只有通过校验后才继续。
- 失败处理
  - 保留已生成文件，并输出编译错误或契约错误。

## Phase 7: 生成 Burp 对接文档
- 输入
  - `analysis_result.json`
- 输出
  - 生成的 Burp autoDecoder 文档
- 成功条件
  - 文档中包含代理 URL、HTTP 方法、请求表单字段和返回契约。
  - 文档中存在验证步骤和失败说明。
- 失败条件
  - 缺少端点，或缺少必需表单字段。
  - 没有验证步骤或排障章节。
- 是否继续
  - 只有文档通过校验后才继续。
- 失败处理
  - 保留已生成文档，并记录缺失章节。

## Phase 8: 校验与诊断
- 输入
  - `analysis_result.json`
  - 生成的 JSRPC 文件
  - 生成的 Flask 代理文件
  - 生成的 Burp 文档
- 输出
  - `artifacts/validation_report.json`
- 成功条件
  - 所有必需产物检查都通过。
  - 已记录警告、残余风险和测试命令。
- 失败条件
  - 任一必需检查失败。
- 是否继续
  - `no`
- 失败处理
  - 将校验报告作为最终状态对象返回。
  - 包含 phase id、失败文件、失败规则以及建议的下一步动作。
