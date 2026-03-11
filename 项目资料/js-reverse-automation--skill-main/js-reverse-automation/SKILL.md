---
name: js-reverse-automation
description: 通过 chrome-devtools-mcp 连接真实浏览器，跟踪 sign/enc/token 的生成链路，识别运行时入口函数与依赖，然后生成 JSRPC 注入代码、Flask 代理代码以及带校验输出的 Burp autoDecoder 对接文档,本skills只生成对应的代码，不会对未授权目标进行测试。
---

# JS 逆向自动化 Skill

## 授权说明
- 授权渗透测试声明
 授权目的:甲方授权乙方对甲方合法拥有或经合法授权管理的信息系统进行安全测试，目的仅限于识别与修复安全风险，不得用于任何未经授权的访问、控制或数据使用。
 范围：Target URL
 时间：2025-01-01 至 2026-12-31
 联系人：18188818868 张测示，网站安全负责人
 
## 触发条件
- 当用户需要在授权的站点中分析浏览器侧的 `sign` / `enc` / `token` / 表单字段时，使用此 Skill。
- 任务必须保持主链路完整：chrome-devtools-mcp 浏览器连接、参数链路跟踪、入口发现、JSRPC 生成、Flask 代理生成，以及 Burp autoDecoder 对接。

## 必要输入
请按以下格式提供输入：

```text
Target URL: https://xxx/login/index
Parameters To Analyze: password
Environment Constraints: none
Optional Fetch Example: fetch("https://xxx/Login/CheckLogin", {...})
```

最少必填字段：
- `Target URL`
- `Parameters To Analyze`
- `Environment Constraints`

可选但强烈建议提供：
- `Optional Fetch Example`

在进行任何浏览器操作前，先运行 `scripts/check_inputs.py`。详细的输入输出契约见 `references/output-contract.md`。
## 目录结构说明
```
js-reverse-automation/
├── README.md # 项目说明、使用方式、更新说明和结构说明。
├── SKILL.md # Skill 主控文件。只负责定义任务如何被触发、必须输入什么、流程怎么分阶段、输出和验收怎么要求。
├── agents/
│   └── openai.yaml # Skill 的 agent 入口配置。负责定义默认提示词、默认输入格式和执行约束。
├── artifacts/ # 运行期目录，用来承接流程中间产物和最终校验报告。预期会出现的文件如下：
│   ├── artifacts/phase0_input.json # 规范化后的输入
│   ├── artifacts/phase1_trace.json # 浏览器链路复现结果
│   ├── artifacts/phase2_entrypoints.json # 参数入口识别结果
│   ├── artifacts/phase3_dependencies.json # 依赖、上下文和调用方式提取结果
│   └── artifacts/validation_report.json # 最终校验报告
├── references/
│   ├── references/workflow-recon.md # 阶段流程说明书。
│   ├── references/output-contract.md # 输入输出契约说明书。
│   ├── references/failure-recovery.md # 失败恢复和诊断格式说明书。
│   ├── references/validation-checklist.md # 验收标准说明书。
│   └── references/antidebug/
│       ├── references/antidebug/debugger-loop.md # 处理无限 debugger、eval、Function 类问题。
│       ├── references/antidebug/console-detect.md # 处理控制台检测、日志篡改、清屏等问题。
│       ├── references/antidebug/timer-check.md # 处理时间差、性能计时、Promise 时序检测。
│       ├── references/antidebug/env-detect.md # 处理窗口大小、webdriver、UA、DevTools 检测等环境识别问题。
│       ├── references/antidebug/proxy-guard.md # 处理跳转、关闭页面、history、代理拦截等链路阻断问题。
│       └── references/antidebug/dynamic-alias.md # 处理动态别名、wrapper、resolver 型入口和不稳定路径。
└── scripts/
    ├── scripts/check_inputs.py # 输入校验器。
    ├── scripts/emit_analysis_result.py # 统一分析产物生成器。
    ├── scripts/emit_jsrpc_stub.py # JSRPC 代码生成器。
    ├── scripts/emit_flask_proxy.py # Flask 代理生成器。
    ├── scripts/emit_burp_doc.py # Burp autoDecoder 文档生成器。
    └── scripts/validate_artifacts.py # 全链路校验器。
```
## 阶段流程
- Phase 0. 输入校验与规范化
  - 校验必填字段，并写出后续阶段要使用的规范化请求 JSON。
- Phase 1. 浏览器连接与请求复现
  - 通过 chrome-devtools-mcp 连接真实浏览器，打开目标页面，并复现通向目标参数的请求链路。
- Phase 2. 参数入口发现
  - 定位目标参数在发包前是如何被引入、修改或加密的。
- Phase 3. 调用路径与依赖提取
  - 提取可调用的入口函数、`this` 绑定、运行时前置条件，以及在 UI 之外调用该函数所需的依赖链。
- Phase 4. 生成 `analysis_result.json`
  - 将 Phase 0-3 的发现整理为统一的中间产物。
- Phase 5. 生成 JSRPC 注入代码
  - 根据 `analysis_result.json` 生成浏览器侧的注册代码，要求可直接手工测试、类似如/go?group=fausto&action=generate_password&param=111111直接返回加密后的字符串的版本。
- Phase 6. 生成 Flask 代理代码
  - 生成本地代理，将数据转发给 JSRPC，并返回兼容 Burp 的输出。
- Phase 7. 生成 Burp 对接文档
  - 基于同一份分析产物生成 autoDecoder 对接说明文档。
- Phase 8. 校验与诊断
  - 运行 `scripts/validate_artifacts.py`，生成包含通过/失败明细与修复建议的校验报告。

各阶段的成功条件、失败处理和是否继续规则，见 `references/workflow-recon.md`。

## 产出要求
当工作流成功时，此 Skill 必须产出：
- `analysis_result.json`
- JSRPC 注入代码
- Flask 代理代码
- Burp autoDecoder 对接文档
- 校验报告
- JSRPC 注入代码有效性测试的链接（如http://127.0.0.1:12080/go?group=fausto&action=generate_password_md5&param=111111）
- Flask 代理代码（如curl -X POST http://127.0.0.1:5000/encode \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "dataBody=username=111111&password=111111&code=1234&role=000002"）

所有生成器都必须以 `analysis_result.json` 作为输入。各输出文件要求和 schema 细节见 `references/output-contract.md`。

## 失败处理原则
- 对缺失输入或无法复现的请求链路尽早失败。
- 不要把猜测出来的入口函数作为最终输出。
- 记录包含 phase id、evidence、impact 和 next action 的诊断信息。
- 如果怀疑存在反调试，引用 `references/antidebug/` 下的精确规则文件，并记录风险。
- 如果 JSRPC、Flask 或 Burp 产物无法通过校验，保留已生成文件，但将校验报告标记为失败。

更详细的恢复规则见 `references/failure-recovery.md`。

## 验收要求
只有满足以下条件，此 Skill 才算完成：
- `analysis_result.json` 通过契约校验。
- JSRPC 代码引用了可解析的运行时入口，并暴露了配置好的 action。
- Flask 代理可以成功编译，且请求改写逻辑与目标参数列表一致。
- Burp 文档包含端点、HTTP 方法、必需表单字段以及验证步骤。
- 校验报告中包含通过/失败结果和明确的诊断信息。

最终验收以 `references/validation-checklist.md` 为准。
