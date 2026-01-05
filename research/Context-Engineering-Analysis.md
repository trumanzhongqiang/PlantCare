# Context Engineering 思想分析：如何应用到 Flora

> 基于 Manus 的《AI代理的上下文工程：构建Manus的经验教训》文章分析

## 一、文章核心思想总结

### 1.1 核心原则：Less structure, more intelligence

Manus 团队的核心观点是：**通过更好的上下文工程，用更少的结构化信息，获得更多的智能**。这意味着：

- **优化上下文管理**比增加更多工具更重要
- **提高 KV 缓存命中率**可以显著降低成本和延迟
- **上下文稳定性**是高效 AI 代理的关键

### 1.2 关键经验教训

#### 1. 围绕 KV 缓存进行设计
- **问题**：每次请求都重新计算整个上下文，成本高、延迟大
- **解决方案**：设计稳定的提示词前缀，提高缓存命中率
- **实践**：
  - 避免在系统提示中包含精确时间戳
  - 保持上下文的追加性（append-only）
  - 不修改之前的操作或观察结果

#### 2. 遮蔽，而非移除（Masking, not Removing）
- **问题**：动态添加/移除工具会导致上下文不稳定
- **解决方案**：使用状态机管理工具可用性，通过遮蔽而非移除来控制
- **实践**：
  - 在解码过程中遮蔽特定技能的选择
  - 保持工具列表的稳定性
  - 使用上下文感知的状态机

#### 3. 使用文件系统作为上下文
- **问题**：大量数据无法全部放入上下文窗口
- **解决方案**：将文件系统视为外部长期记忆
- **实践**：
  - 按需写入和读取文件
  - 存储重要信息到文件，而非上下文
  - 通过文件引用而非完整内容传递信息

#### 4. 通过复述操控注意力
- **问题**：复杂任务中容易偏离目标
- **解决方案**：不断更新和复述任务目标
- **实践**：
  - 将全局计划推入模型的近期注意力范围
  - 保持任务的连贯性
  - 减少偏离主题的风险

---

## 二、Flora 中的应用策略

### 2.1 KV 缓存优化设计

#### 问题分析
Flora 当前的系统提示词设计可能存在以下问题：
- 包含动态时间戳
- 用户画像数据频繁变化
- 对话历史不断增长

#### 优化方案

```typescript
// ❌ 不好的设计：包含动态时间戳
const badPrompt = `
你是 Flora，当前时间是 ${new Date().toISOString()}。
用户知识水平：${userProfile.knowledgeLevel}
...
`;

// ✅ 好的设计：稳定的前缀 + 动态后缀
const goodPrompt = `
你是 Flora，一个专业的植物护理助手。

**核心原则：**
1. 专业性：提供准确、实用的植物护理建议
2. 友好但不过度：语气友好、鼓励，但不暗示情感依赖关系
3. 个性化：根据用户的知识水平、偏好和历史记录调整回复风格
4. 安全性：所有建议都基于最佳实践，并包含适当的免责声明

**当前会话上下文：**
${generateDynamicContext(userProfile, conversationHistory)}
`;
```

**实现要点：**
1. **稳定的系统提示词前缀**：核心人格定义不变
2. **动态上下文分离**：用户画像、对话历史作为动态部分
3. **追加式上下文**：只追加新信息，不修改历史
4. **时间戳处理**：使用相对时间（如"今天"、"昨天"）而非绝对时间

```typescript
interface StablePromptPrefix {
  // 这部分内容稳定，可以缓存
  coreIdentity: string;
  corePrinciples: string[];
  communicationStyle: string;
  prohibitedBehaviors: string[];
}

interface DynamicPromptSuffix {
  // 这部分动态变化，不缓存
  userProfile: UserProfile;
  conversationHistory: Message[];
  currentContext: ConversationContext;
}

function generatePrompt(prefix: StablePromptPrefix, suffix: DynamicPromptSuffix): string {
  // 前缀部分可以 KV 缓存
  const cachedPrefix = getCachedPrefix(prefix);
  
  // 后缀部分动态生成
  const dynamicSuffix = formatDynamicContext(suffix);
  
  return `${cachedPrefix}\n\n${dynamicSuffix}`;
}
```

### 2.2 技能遮蔽机制（Masking Skills）

#### 问题分析
随着 Flora 功能扩展，技能数量增加可能导致：
- LLM 决策混乱
- 上下文过长
- 技能选择不准确

#### 优化方案：上下文感知的技能遮蔽

```typescript
interface SkillMaskingStrategy {
  // 基于上下文的技能可用性
  getAvailableSkills(context: SkillContext): Skill[];
  
  // 遮蔽不可用技能，而非移除
  maskSkills(skills: Skill[], context: SkillContext): MaskedSkill[];
}

class ContextAwareSkillMasker {
  // 使用状态机管理技能可用性
  private stateMachine: SkillStateMachine;
  
  maskSkills(skills: Skill[], context: SkillContext): MaskedSkill[] {
    return skills.map(skill => {
      const isAvailable = this.stateMachine.isSkillAvailable(skill.id, context);
      
      return {
        ...skill,
        available: isAvailable,
        // 遮蔽而非移除：技能定义仍在上下文中，但标记为不可用
        masked: !isAvailable
      };
    });
  }
}
```

**实现要点：**
1. **技能列表稳定**：所有技能定义始终在上下文中
2. **可用性标记**：通过 `available: true/false` 标记可用性
3. **上下文感知**：基于当前上下文（用户意图、植物状态等）决定可用性
4. **状态机管理**：使用状态机管理技能的启用/禁用逻辑

**示例：技能遮蔽规则**

```typescript
const skillMaskingRules = {
  // 植物识别：只有在用户上传图片或询问"这是什么"时可用
  'plant-identification': (context: SkillContext) => {
    const lastMessage = context.conversationHistory[context.conversationHistory.length - 1];
    return lastMessage.hasImage || 
           lastMessage.text.includes('识别') || 
           lastMessage.text.includes('这是什么');
  },
  
  // 浇水提醒：只有在用户有植物且询问浇水相关问题时可用
  'watering-reminder': (context: SkillContext) => {
    return context.plants.length > 0 && 
           context.currentIntent.includes('浇水');
  },
  
  // 环境分析：只有在用户询问环境相关问题时可用
  'environment-analysis': (context: SkillContext) => {
    return context.currentIntent.includes('环境') || 
           context.currentIntent.includes('推荐');
  }
};
```

### 2.3 文件系统作为长期记忆

#### 问题分析
Flora 需要存储大量数据：
- 用户历史交互（可能数千条）
- 植物知识库（数百种植物信息）
- 用户画像（持续更新）
- 成功案例和模式

#### 优化方案：分层存储策略

```typescript
interface MemoryStorageStrategy {
  // 短期记忆：当前对话上下文（放入 LLM 上下文窗口）
  shortTermMemory: ConversationContext;
  
  // 中期记忆：最近交互（存储在内存/缓存）
  mediumTermMemory: RecentInteractions;
  
  // 长期记忆：历史数据（存储在文件系统/数据库）
  longTermMemory: FileSystemStorage;
}

class FloraMemoryManager {
  // 将用户画像存储到文件
  async saveUserProfile(userId: string, profile: UserProfile): Promise<void> {
    const filePath = `profiles/${userId}.json`;
    await writeFile(filePath, JSON.stringify(profile));
  }
  
  // 从文件加载用户画像
  async loadUserProfile(userId: string): Promise<UserProfile> {
    const filePath = `profiles/${userId}.json`;
    const content = await readFile(filePath);
    return JSON.parse(content);
  }
  
  // 在上下文中只引用文件，而非完整内容
  generateProfileReference(userId: string): string {
    return `用户画像已加载（参考文件：profiles/${userId}.json）。关键信息：${this.extractKeyInfo(userId)}`;
  }
  
  // 提取关键信息用于上下文
  private extractKeyInfo(userId: string): string {
    const profile = this.loadUserProfile(userId);
    return `
      - 知识水平：${profile.knowledgeLevel}
      - 养护风格：${profile.careStyle}
      - 最近成功案例：${profile.successfulCases.slice(0, 3).join(', ')}
    `;
  }
}
```

**实现要点：**
1. **分层存储**：
   - 短期：当前对话（LLM 上下文）
   - 中期：最近 10-20 条交互（内存缓存）
   - 长期：历史数据（文件系统）

2. **按需加载**：只加载当前需要的用户画像片段
3. **文件引用**：在上下文中使用文件引用而非完整内容
4. **增量更新**：只更新变化的部分，而非整个文件

**知识库存储示例：**

```typescript
// 植物知识库存储在文件中
const plantKnowledgeBase = {
  // 文件结构
  structure: {
    'plants/monstera.json': PlantInfo,
    'plants/sansevieria.json': PlantInfo,
    'plants/ficus.json': PlantInfo,
    // ...
  },
  
  // 在上下文中只引用需要的植物
  getPlantReference(species: string): string {
    return `植物信息已从知识库加载（文件：plants/${species}.json）。关键信息：${this.getKeyInfo(species)}`;
  }
};
```

### 2.4 通过复述操控注意力

#### 问题分析
在复杂的植物护理任务中，Flora 可能：
- 偏离主要目标
- 忘记之前的计划
- 在多个子任务间切换时失去连贯性

#### 优化方案：任务目标复述机制

```typescript
interface TaskRepetitionStrategy {
  // 全局任务目标
  globalGoal: string;
  
  // 当前子任务
  currentSubTask: string;
  
  // 任务进度
  progress: TaskProgress;
  
  // 复述任务目标
  reiterateGoal(): string;
}

class FloraTaskManager {
  private globalGoal: string;
  private subTasks: string[];
  private currentStep: number = 0;
  
  // 在每次 Skill 调用前复述目标
  beforeSkillExecution(context: SkillContext): string {
    return `
      当前任务目标：${this.globalGoal}
      已完成步骤：${this.subTasks.slice(0, this.currentStep).join(' → ')}
      当前步骤：${this.subTasks[this.currentStep]}
      下一步：${this.subTasks[this.currentStep + 1] || '完成任务'}
      
      请专注于当前步骤，不要偏离任务目标。
    `;
  }
  
  // 在对话中定期复述
  duringConversation(context: ConversationContext): string {
    if (this.shouldReiterate(context)) {
      return `提醒：我们正在${this.globalGoal}。当前进展：${this.getProgressSummary()}`;
    }
    return '';
  }
  
  // 判断是否需要复述
  private shouldReiterate(context: ConversationContext): boolean {
    // 如果对话偏离主题，需要复述
    const lastMessages = context.conversationHistory.slice(-3);
    const relevance = this.calculateRelevance(lastMessages, this.globalGoal);
    return relevance < 0.5; // 相关性低于 50% 时复述
  }
}
```

**实现要点：**
1. **明确任务目标**：在任务开始时明确全局目标
2. **步骤化执行**：将复杂任务分解为子步骤
3. **定期复述**：在关键节点复述目标和进度
4. **偏离检测**：检测对话是否偏离主题，及时纠正

**示例：复杂诊断任务**

```typescript
// 用户："我的植物叶子黄了，帮我诊断一下"
const diagnosisTask = {
  globalGoal: '诊断植物问题并提供解决方案',
  subTasks: [
    '收集症状信息',
    '分析可能原因',
    '提供诊断结果',
    '给出解决方案',
    '制定恢复计划'
  ],
  
  // 在执行每个步骤前复述
  beforeStep(stepIndex: number): string {
    return `
      任务目标：诊断植物问题并提供解决方案
      当前步骤 ${stepIndex + 1}/5：${this.subTasks[stepIndex]}
      请专注于收集和分析症状信息，不要跳到解决方案。
    `;
  }
};
```

---

## 三、Flora 上下文工程架构设计

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│              Flora Context Engineering Layer              │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Stable Prompt Cache (KV Cache)         │   │
│  │  - Core identity & principles                    │   │
│  │  - Skill definitions (stable)                  │   │
│  │  - System instructions                           │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                 │
│                        ▼                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │      Dynamic Context Assembler                  │   │
│  │  - User profile (key info only)                 │   │
│  │  - Recent conversation (last N messages)         │   │
│  │  - Current context (plant, intent)              │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                 │
│                        ▼                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Skill Masking Engine                    │   │
│  │  - Context-aware skill availability             │   │
│  │  - Masking (not removing)                       │   │
│  │  - State machine management                     │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                 │
│                        ▼                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │      Memory Management Layer                    │   │
│  │  - Short-term: LLM context                      │   │
│  │  - Medium-term: In-memory cache                 │   │
│  │  - Long-term: File system                       │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                 │
│                        ▼                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │      Task Repetition Manager                     │   │
│  │  - Global goal tracking                         │   │
│  │  - Progress monitoring                           │   │
│  │  - Attention control                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 3.2 上下文组装流程

```typescript
class FloraContextEngine {
  async assembleContext(request: UserRequest): Promise<AssembledContext> {
    // 1. 加载稳定的提示词前缀（从 KV 缓存）
    const stablePrefix = await this.getStablePromptPrefix();
    
    // 2. 加载用户画像（从文件系统，只提取关键信息）
    const userProfile = await this.loadUserProfileKeyInfo(request.userId);
    
    // 3. 加载最近的对话历史（从内存缓存）
    const recentHistory = await this.getRecentConversation(request.sessionId, limit: 10);
    
    // 4. 获取当前上下文（当前植物、意图等）
    const currentContext = await this.getCurrentContext(request);
    
    // 5. 遮蔽技能（基于上下文）
    const maskedSkills = this.maskSkills(this.allSkills, currentContext);
    
    // 6. 生成任务复述（如果有进行中的任务）
    const taskReminder = await this.getTaskReminder(request.sessionId);
    
    // 7. 组装最终上下文
    return {
      stablePrefix,        // 可缓存
      userProfile,         // 动态，但只包含关键信息
      recentHistory,       // 动态，最近 N 条
      currentContext,      // 动态
      maskedSkills,        // 动态，但技能定义稳定
      taskReminder         // 动态
    };
  }
}
```

### 3.3 缓存策略

```typescript
interface CacheStrategy {
  // KV 缓存：稳定的提示词前缀
  kvCache: {
    key: 'flora:prompt:prefix:v1',
    ttl: Infinity, // 永久缓存（除非版本更新）
    content: StablePromptPrefix
  };
  
  // 内存缓存：用户画像关键信息
  memoryCache: {
    key: `flora:profile:${userId}:summary`,
    ttl: 3600, // 1 小时
    content: UserProfileSummary
  };
  
  // 文件系统：完整用户数据
  fileSystem: {
    path: `profiles/${userId}.json`,
    content: FullUserProfile
  };
}
```

---

## 四、实施优先级

### Phase 1: KV 缓存优化（高优先级）
- **目标**：提高缓存命中率，降低成本和延迟
- **实施**：
  1. 重构系统提示词，分离稳定前缀和动态后缀
  2. 移除动态时间戳
  3. 实现追加式上下文
- **预期效果**：缓存命中率 > 80%，成本降低 60%+

### Phase 2: 技能遮蔽机制（中优先级）
- **目标**：提高技能选择准确性，减少上下文长度
- **实施**：
  1. 实现上下文感知的技能遮蔽
  2. 使用状态机管理技能可用性
  3. 保持技能定义稳定
- **预期效果**：技能选择准确率提升 20%+

### Phase 3: 文件系统存储（中优先级）
- **目标**：支持大规模用户数据，不增加上下文长度
- **实施**：
  1. 实现分层存储（短期/中期/长期）
  2. 按需加载用户画像
  3. 使用文件引用而非完整内容
- **预期效果**：支持无限历史数据，上下文长度减少 50%+

### Phase 4: 任务复述机制（低优先级）
- **目标**：提高复杂任务的完成率和准确性
- **实施**：
  1. 实现任务目标跟踪
  2. 定期复述机制
  3. 偏离检测和纠正
- **预期效果**：复杂任务完成率提升 15%+

---

## 五、关键指标

### 5.1 性能指标
- **KV 缓存命中率**：目标 > 80%
- **上下文长度**：目标减少 30-50%
- **响应延迟**：目标减少 40%+
- **API 成本**：目标降低 60%+

### 5.2 质量指标
- **技能选择准确率**：目标提升 20%+
- **任务完成率**：目标提升 15%+
- **用户满意度**：目标提升 10%+

---

## 六、总结

通过应用 Manus 的上下文工程经验，Flora 可以实现：

1. **更低的成本**：通过 KV 缓存优化，大幅降低 API 调用成本
2. **更快的响应**：减少上下文长度和计算量，提高响应速度
3. **更好的质量**：通过技能遮蔽和任务复述，提高准确性和连贯性
4. **更强的扩展性**：通过文件系统存储，支持大规模用户和数据

这些优化将使 Flora 成为一个更智能、更高效、更经济的 AI 植物护理助手。

