// ============================================================
// AI For Me — 全站类型定义
// 所有案例数据均为 demo / 待核验 / 灵感池，不构成真实案例或收益承诺。
// ============================================================

/** 信源等级：S/A/B/C/D + Risk + Expired */
export type SourceLevel = 'S' | 'A' | 'B' | 'C' | 'D' | 'Risk' | 'Expired';

/** 线索状态 */
export type OpportunityStatus =
  | '新鲜'
  | '待核验'
  | '已过期'
  | '灵感池'
  | '风险榜';

/** 来源链接 —— url 允许为空；未核验时 type 标注「待核验」，绝不伪装真实链接 */
export interface SourceLink {
  title: string;
  /** 公开可访问的真实链接；无法核验时留空字符串 */
  url: string;
  /** 例如：官方网站 / 平台规则页 / 待核验 / demo / 播客深访 */
  type: string;
}

export interface Opportunity {
  id: string;
  title: string;
  summary: string;
  category: string[];
  platform: string[];
  city: string[];
  sourceLevel: SourceLevel;
  sourceCount: number;
  sourceLinks: SourceLink[];
  publishedAt: string;
  collectedAt: string;
  /** 付款人是谁 */
  payer: string;
  /** 交付物 */
  deliverable: string;
  suitableFor: string[];
  /** 7 天动作（要点） */
  sevenDayAction: string[];
  risk: string[];
  /** 反方证据 / 不确定点 */
  counterEvidence: string;
  /** 可能怎么失败 */
  failureModes: string[];
  difficulty: number; // 1-5
  cost: number; // 1-5 启动成本
  earningPotential: number; // 1-5 收益可能性
  urgency: number; // 1-5 时效性
  confidence: number; // 1-5 可信度
  /** 机会分 0-100，可由 lib/scoring 计算，亦可人工覆盖 */
  opportunityScore?: number;
  status: OpportunityStatus;
  tags: string[];
  /** 关联学习资源 id */
  relatedLearning?: string[];
}

export interface Interview {
  id: string;
  title: string;
  /** 形式：播客 / 视频访谈 / 文字访谈 / 直播回放 / 创业复盘 / 失败复盘 */
  format: string;
  /** 一句话结论 */
  conclusion: string;
  replicable: string[]; // 可复制机会
  nonReplicable: string[]; // 不可复制条件
  suitableFor: string[];
  paymentSignal: string; // 付款信号
  dataFacts: string[]; // 数据事实
  risk: string[];
  firstAction: string; // 第一行动
  /** 精华摘要 300-500 字（支持展开） */
  digest: string;
  counterEvidence: string; // 反方证据 / 不确定点
  sourceLevel: SourceLevel;
  sourceLink: SourceLink;
  collectedAt: string;
  tags: string[];
  /** 是否失败复盘 / 避坑 */
  isFailureCase?: boolean;
}

export interface CityItem {
  label: string;
  note: string;
}

export interface City {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  /** 各板块：同城活动 / 创业沙龙 / 高校资源 / 园区政策 / 本地商家 / 招聘实习 / 黑客松 / 社群 / 第一客户地图 */
  sections: { title: string; items: CityItem[] }[];
  safetyNote: string;
  status: OpportunityStatus;
}

export interface LearningResource {
  id: string;
  title: string;
  category: string; // 零基础入门 / AI 工具 / 提示词 / AI 编程 ...
  summary: string;
  /** 对应变现方向 */
  monetization: string;
  sourceLevel: SourceLevel;
  link: SourceLink;
}

export interface LearningDay {
  day: number;
  title: string;
  tasks: string[];
  deliverable: string; // 每天对应一个可交付成果
}

export interface LearningPathData {
  id: string;
  title: string;
  audience: string;
  days: LearningDay[];
}

export interface Person {
  id: string;
  /** 公开版：方向示例为主，避免伪造真人观点与链接 */
  name: string;
  direction: string;
  publicLink: SourceLink;
  recentView: string; // 近期观点（仅在可核验时填写，否则标注待核验）
  learnFrom: string; // 可学习之处
  doNotCopy: string; // 不可盲目复制之处
  risk: string;
  sourceLevel: SourceLevel;
  note: string; // 例如「demo / 待核验，请以本人公开主页为准」
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

/** 用户本地收藏状态 */
export type UserActionStatus = '想做' | '已读' | '已行动' | '已放弃';

/** 联网采集 + 链接核验的线索链接库条目（内容未逐条人工核验，按域名信源分级） */
export interface LinkLibraryItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  media: string;
  sourceLevel: SourceLevel;
  track: string; // taxonomy track id
  kind: 'opportunity' | 'interview' | 'news';
  snippet: string;
  collectedAt: string;
}
