# Equivalence Validation and Recovery Records

## 1. Recovery Output Must Be Verifiable

Recovery output must satisfy two requirements:

- the conclusion is based on checkpoints instead of appearance
- validation can be repeated instead of succeeding on one sample only

Therefore every recovery task must define checkpoints.

## Record Paths

Write records under the current task working directory:

```text
reverse-records/总览.md
reverse-records/恢复记录.md
reverse-records/验证记录.md
reverse-records/协议状态.md
```

- `恢复记录.md`: current obscuring layer, bridge layer, key-function cards, and recovery conclusions
- `验证记录.md`: equivalence checkpoints, input/output comparisons, and gap localization
- `协议状态.md`: handshake, heartbeat, sequence, renewal, and state transition for protocol tasks

## 2. How to Choose Checkpoints

Prefer:

- bridge-layer inputs
- bridge-layer outputs
- critical intermediate values
- final write-back value

Do not compare only the final output, or the missing layer will remain unclear.

## 3. Equivalence Template

```markdown
验证目标：
当前层：外层容器 / 调度层 / 状态载体 / 桥接层 / 核心算子 / 写回层

固定输入：
- 输入样本：
- 时间源：
- 随机源：
- 会话状态：

对照点：
- 检查点 1：
- 检查点 2：
- 检查点 3：

结果：
- 完全等价 / 部分等价 / 不等价

缺口位置：
- 在桥接层 / 在调度层 / 在状态载体 / 在上游状态
```

Write this block into `reverse-records/验证记录.md`.

## 4. Key-Function Card Template

```markdown
函数 / 片段：
所在层：
位置锚点：

输入：
- 

输出：
- 

副作用：
- 写请求 / 写头 / 写 cookie / 发消息 / 改状态

依赖：
- 上游状态：
- 环境要求：

证据：
- 调用前后值：
- 分支条件：
- 对照样本：
```

Write this block into `reverse-records/恢复记录.md`.

## 5. When Recovery Is Already Sufficient

- the target field formation path is explainable
- downstream locate or replay work can use the current output directly
- continuing recovery would increase code volume without increasing judgment quality

## 6. Completion Standard

- clear checkpoints exist
- the missing layer is known
- Chinese reverse records are current enough that downstream work does not need to reopen the same shell

