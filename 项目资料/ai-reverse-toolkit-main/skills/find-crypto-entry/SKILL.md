---
name: find-crypto-entry
description: 定位 JS 中参数的生成入口。当用户问"xxx 参数在哪生成"、"找加密入口"、"定位签名函数"、"请求参数怎么加密的"时使用
argument-hint: [参数名]
---

# find-crypto-entry

定位加密参数 **$ARGUMENTS** 的生成入口。

**输出目标**：入口位置（脚本URL + 行号/列号 + 函数名）

---

## 执行流程

### Step 0: 网络请求定位（首选）⭐

最高效路径，直接获取已发生请求的调用栈：

1. `list_network_requests({ resourceTypes: ["xhr", "fetch"] })` - 列出请求
2. `get_network_request(reqid)` - 确认 **$ARGUMENTS** 参数位置（URL/Header/Body）
3. `get_request_initiator(requestId)` - **直接获取 JS 调用栈**

**结果判断**：
- ✅ 调用栈有效 → 跳到 **Step 3**
- ❌ 调用栈为空或无意义 → 继续 **Step 1**

---

### Step 1: 静态搜索

当 Step 0 无法定位时，进行静态分析：

1. `search_in_sources({ query: "$ARGUMENTS" })` - 搜索加密参数名

2. **分流逻辑**：
   - 结果 ≤ 50：检查赋值语句（如 `headers.$ARGUMENTS = ...`）
   - 结果 > 50：转向搜索拦截器特征：
     - `interceptors.request.use`
     - `XMLHttpRequest.prototype.send`
     - `window.fetch =`

3. `find_in_script(scriptId, query)` - 获取精确行号列号

**结果判断**：
- ✅ 找到明确赋值位置 → 跳到 **Step 4**
- ❌ 结果太多或无法确定 → 继续 **Step 2**

---

### Step 2: 动态断点

静态搜索无法锁定时，设置断点：

**方案 A**（推荐）：
```
set_breakpoint_on_text({ text: "$ARGUMENTS", urlFilter: "main" })
```

**方案 B**：
```
break_on_xhr({ url: "api关键词" })
```

⚠️ 提示用户：**请在浏览器中触发包含 $ARGUMENTS 参数的请求**

**结果判断**：
- ✅ 断点命中 → 继续 **Step 3**
- ❌ 断点未命中 → 检查断点条件是否正确，或尝试其他方案

---

### Step 3: 堆栈分析

获取调用栈后，执行灰名单过滤：

```
get_paused_info({ includeScopes: true })
```

**过滤规则**：

| 级别 | 特征 | 动作 |
|-----|------|------|
| Level 1 跳过 | `axios`, `react-dom`, `vue`, `jquery`, `webpack/runtime` | 框架噪声，跳过 |
| Level 2 检查 | 含 `security`, `encrypt`, `auth`, `fingerprint` 的 node_modules | 可疑安全SDK，检查 |
| Level 3 优先 | 非 node_modules（`/src/`, `/app/`） | 业务代码，优先检查 |

**结果判断**：
- ✅ 找到可疑帧 → 继续 **Step 4**
- ❌ 全是框架代码 → 返回 **Step 2** 尝试其他断点位置

---

### Step 4: 确认入口

在可疑帧上验证：

```
evaluate_on_callframe({
  expression: "arguments",
  frameIndex: 0
})
```

寻找加密特征：
- 位运算：`^`, `&`, `|`, `>>>`
- 魔法常量：`0x67452301`(MD5), `0x6a09e667`(SHA256)

**结果判断**：
- ✅ 确认是加密入口 → 输出结果
- ❌ 不是加密逻辑 → 检查调用栈上一帧，或返回 **Step 3** 检查其他帧

---

## 输出格式

找到入口后，输出：

```
入口位置：
- 参数：$ARGUMENTS
- 脚本：https://example.com/static/js/main.abc123.js
- 位置：第 1 行，第 45678 列
- 函数：anonymous (或具体函数名)
- 调用路径：request → addSign → encrypt
```

---

## 注意事项

1. **优先使用 `get_request_initiator`** - 无需断点，最高效
2. **优先使用 `set_breakpoint_on_text`** - 对压缩代码友好
3. **只找入口，不做算法还原** - 保持 skill 单一职责
4. **每个 Step 失败后有明确跳转** - 避免卡住
