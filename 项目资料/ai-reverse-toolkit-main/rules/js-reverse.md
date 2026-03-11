# JS 逆向分析指南

本文档提供 JS 逆向分析的详细流程和技术参考。

---

## 一、分析流程

### 阶段 1: 请求分析

**目标**: 找到包含加密参数的请求

**步骤**:
1. 使用 `list_network_requests` 查看网络请求
2. 筛选 XHR/Fetch 请求
3. 识别加密参数（常见：x-sign, x-token, signature, _signature）
4. 记录请求 URL、方法、参数结构

**产出**: 在 PROGRESS.md 记录目标请求信息

---

### 阶段 2: 入口定位

**目标**: 找到加密函数的入口点

**方法 A: XHR 断点（推荐）**
```
1. break_on_xhr(url_pattern)     # 设置 XHR 断点
2. 触发请求
3. get_paused_info()             # 获取调用栈
4. 分析调用栈找到加密函数
```

**方法 B: 源码搜索**
```
1. search_in_sources(参数名)     # 如 "x-sign"
2. 分析搜索结果
3. 设置断点验证
```

**方法 C: Hook 拦截**
```
1. hook_function("XMLHttpRequest.prototype.setRequestHeader")
2. 观察参数设置位置
3. 追溯调用栈
```

**产出**: 记录入口函数名、文件、行号

---

### 阶段 3: 代码分析

**目标**: 理解代码结构和混淆类型

**混淆类型识别**:

| 特征 | 混淆类型 |
|------|---------|
| `_0x` 前缀变量 | OB 混淆器 |
| 大型字符串数组 + 索引访问 | 字符串混淆 |
| `while(true) + switch` | 控制流平坦化 |
| 多层 `eval` | 代码加密 |
| `jsjiami.com` 标记 | sojson 混淆 |
| WebAssembly 调用 | WASM 保护 |
| 自定义字节码数组 | VM 保护 |

**加密算法识别**:

| 特征 | 算法类型 |
|------|---------|
| 输出 32 位 hex | MD5 |
| 输出 40 位 hex | SHA1 |
| 输出 64 位 hex | SHA256 |
| `0x67452301` 等常量 | MD5/SHA 系列 |
| S-box (`0x63, 0x7c...`) | AES |
| `ipad/opad` 或 `0x36/0x5c` | HMAC |
| 大数运算、RSA 关键字 | RSA |

**产出**: 记录混淆类型、算法类型、关键函数列表

---

### 阶段 4: 解混淆

**目标**: 还原可读代码

**工具**: Babel AST (@babel/parser + @babel/traverse + @babel/generator)

**常用操作**:

1. **字符串数组还原**
   - 提取字符串数组
   - 替换所有索引访问为实际字符串

2. **常量折叠**
   - 计算可求值的表达式
   - `1 + 2 + 3` → `6`

3. **控制流还原**
   - 分析 switch-case 状态机
   - 按执行顺序重排代码块

4. **死代码移除**
   - 删除永远不执行的分支
   - 删除无用变量

**脚本保存**: `scripts/deobfuscate_{目标}.js`
**产出保存**: `source/deobfuscated/{文件名}_deobf.js`

---

### 阶段 5: 算法还原

**目标**: 用 Python 实现加密逻辑

**JS → Python 关键差异**:

| JS | Python |
|----|--------|
| `str.charCodeAt(i)` | `ord(str[i])` |
| `String.fromCharCode(n)` | `chr(n)` |
| `arr.join('')` | `''.join(arr)` |
| `parseInt(s, 16)` | `int(s, 16)` |
| `x >>> n` (无符号右移) | `(x & 0xFFFFFFFF) >> n` |

**32位整数处理**:
```python
def to_int32(x):
    x = x & 0xFFFFFFFF
    return x if x < 0x80000000 else x - 0x100000000
```

**标准库对应**:
- MD5: `hashlib.md5()`
- SHA: `hashlib.sha1/sha256()`
- HMAC: `hmac.new()`
- AES: `pycryptodome` 或 `cryptography`
- Base64: `base64.b64encode/b64decode()`

**产出保存**: `output/sign.py`

---

### 阶段 6: 验证测试

**目标**: 确认 Python 实现正确

**验证方法**:
1. 使用相同输入，对比 JS 和 Python 输出
2. 测试多组数据
3. 测试边界情况

**验证通过标准**:
- 至少 3 组不同输入产出一致
- 实际请求测试成功

**产出**: 在 PROGRESS.md 记录验证结果

---

## 二、高级场景

### VM 保护分析

**识别特征**:
- 大型数字/字符串数组（字节码）
- 解释器循环（while + switch）
- 虚拟寄存器/栈操作

**分析步骤**:
1. 定位字节码数组和解释器
2. Hook switch 分支，映射操作码
3. 构建操作码表
4. 反汇编字节码
5. 还原高级逻辑

---

### WASM 分析

**工具链**:
- `wasm2wat`: 转文本格式
- `wasm-objdump`: 查看结构
- `wasm-decompile`: 反编译
- ghidra-mcp: 深度分析

**分析步骤**:
1. 提取 .wasm 文件
2. 查看导出函数
3. 分析 JS 如何调用 WASM
4. 反编译关键函数
5. 还原算法或直接调用 WASM

**Python 调用 WASM**:
```python
import wasmer
store = wasmer.Store()
module = wasmer.Module(store, wasm_bytes)
instance = wasmer.Instance(module)
result = instance.exports.encrypt(data)
```

---

### 环境检测/指纹

**常见检测项**:
- Navigator: userAgent, platform, plugins
- Screen: width, height, colorDepth
- Canvas: toDataURL 指纹
- WebGL: 渲染器信息
- Audio: AudioContext 指纹
- 字体: 文本宽度测量

**分析方法**:
1. Hook 关键 API 观察调用
2. 识别指纹生成函数
3. 分析各检测项的组合方式
4. 确定绕过/模拟策略

---

## 三、MCP 工具速查

### js-reverse MCP

| 功能 | 命令 |
|------|------|
| 查看请求 | `list_network_requests()` |
| 请求详情 | `get_network_request(reqid)` |
| 搜索代码 | `search_in_sources(query)` |
| 获取源码 | `get_script_source(scriptId)` |
| XHR 断点 | `break_on_xhr(url)` |
| 代码断点 | `set_breakpoint(url, line)` |
| 文本断点 | `set_breakpoint_on_text(text)` |
| 暂停信息 | `get_paused_info()` |
| 单步执行 | `step_over()` / `step_into()` / `step_out()` |
| 继续执行 | `resume()` |
| Hook 函数 | `hook_function(target)` |
| 执行脚本 | `evaluate_script(function)` |

### ghidra-mcp

| 功能 | 命令 |
|------|------|
| 函数列表 | `list_functions()` |
| 反编译 | `decompile_function(name)` |
| 字符串 | `list_strings()` |
| 交叉引用 | `get_xrefs_to(address)` |

---

## 四、常见问题

### Q: 找不到加密入口？
1. 尝试不同的搜索关键词
2. 使用 XHR 断点从请求倒推
3. Hook `XMLHttpRequest` 或 `fetch`

### Q: 代码混淆太重？
1. 先识别混淆类型
2. 使用对应的 AST 解混淆方案
3. 复杂情况考虑动态执行而非完全还原

### Q: Python 输出与 JS 不一致？
1. 检查整数溢出处理
2. 检查字符串编码（UTF-8 vs UTF-16）
3. 检查字节序（大端/小端）
4. 逐步对比中间值

### Q: 遇到 VM/WASM 保护？
1. 先评估是否值得深入分析
2. 考虑使用 Node.js 运行原始代码
3. 或使用 Python 调用 WASM
