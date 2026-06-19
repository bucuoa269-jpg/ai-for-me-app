import type { Person } from '../types';

// ============================================================
// 人物与组织索引 —— 脱敏处理：
// 不做饭圈、不做崇拜，且为避免伪造真人观点与链接，
// 本公开版以「方向示例 / 角色画像」呈现，不指名真实个人、不编造链接与观点。
// 如需收录真实人物，必须以其本人公开主页为唯一来源、逐条核验后再填入。
// ============================================================

const tbd = (title: string): Person['publicLink'] => ({
  title,
  url: '',
  type: '待核验',
});

export const people: Person[] = [
  {
    id: 'arch_ai_news_explainer',
    name: 'AI 资讯解读型创作者（方向示例）',
    direction: '把前沿 AI 进展翻译成普通人能懂的解读',
    publicLink: tbd('请以创作者本人公开主页为准（待核验）'),
    recentView: '待核验：本公开版不转述未核验的个人观点。',
    learnFrom: '信息筛选、把复杂概念讲清楚的表达能力。',
    doNotCopy: '其更新节奏与影响力依赖长期积累，难以一蹴而就。',
    risk: '解读≠原始事实，仍需回到一手信源核对。',
    sourceLevel: 'D',
    note: 'demo / 方向示例，不指代特定个人。',
  },
  {
    id: 'arch_indie_builder',
    name: '独立开发者（方向示例）',
    direction: '一个人做产品 / 接单，公开分享构建过程',
    publicLink: tbd('请以开发者本人公开主页/仓库为准（待核验）'),
    recentView: '待核验。',
    learnFrom: '从真实需求出发、小步快跑、公开构建的习惯。',
    doNotCopy: '其技术积累与早期客户信任不可直接复制。',
    risk: '公开收入数据多为个案，存在幸存者偏差。',
    sourceLevel: 'D',
    note: 'demo / 方向示例，不指代特定个人。',
  },
  {
    id: 'arch_content_monetizer',
    name: '内容变现型创作者（方向示例）',
    direction: '靠垂直内容沉淀信任并实现多元变现',
    publicLink: tbd('请以创作者本人公开主页为准（待核验）'),
    recentView: '待核验。',
    learnFrom: '人设一致性、与粉丝建立信任、把流量导向成交。',
    doNotCopy: '平台红利窗口与个人独特经历难以复制。',
    risk: '变现高度依赖平台规则，存在不确定性。',
    sourceLevel: 'D',
    note: 'demo / 方向示例，不指代特定个人。',
  },
  {
    id: 'arch_community_host',
    name: '社群 / 活动主理人（方向示例）',
    direction: '组织线下/线上同好社群，连接资源',
    publicLink: tbd('请以主理人本人公开主页为准（待核验）'),
    recentView: '待核验。',
    learnFrom: '组织能力、价值设计、长期运营。',
    doNotCopy: '个人号召力与本地同好密度难以复制。',
    risk: '需警惕以社群之名行收割之实；线下注意安全。',
    sourceLevel: 'D',
    note: 'demo / 方向示例，不指代特定个人。',
  },
];
