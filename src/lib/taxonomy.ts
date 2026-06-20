import type { Opportunity, SourceLevel, OpportunityStatus } from '../types';
import { getScore } from './scoring';

// ============================================================
// 线索赛道分类与汇总聚合
// 把细分 category 聚合成少数几个「赛道」，便于分类导航与总览。
// ============================================================

export interface Track {
  id: string;
  label: string;
  emoji: string;
  /** 命中这些细分 category 即归入该赛道（按数组顺序优先匹配） */
  cats: string[];
  desc: string;
}

export const tracks: Track[] = [
  { id: 'design', label: '设计 / 图像 / PPT', emoji: '🎨', cats: ['AI PPT/设计', 'AI 设计', '实物制造'], desc: '出图、排版、海报、电商图、3D 周边' },
  { id: 'video', label: '视频 / 口播', emoji: '🎬', cats: ['AI 视频'], desc: '短视频、数字人、代运营' },
  { id: 'code', label: '编程 / 自动化', emoji: '⚙️', cats: ['AI 编程', 'AI 自动化'], desc: '脚本、小工具、MVP、流程自动化' },
  { id: 'content', label: '写作 / 内容 / 提示词', emoji: '✍️', cats: ['AI 写作', '内容变现', '提示词', 'AI 模板', '深访提炼'], desc: '文案、账号、模板、提示词包' },
  { id: 'local', label: '本地 / 城市', emoji: '📍', cats: ['本地服务', '城市机会'], desc: '本地商家、同城活动、第一客户' },
  { id: 'job', label: '求职 / 校园', emoji: '🎓', cats: ['AI 求职', '高校创业', '园区政策'], desc: '简历、作品集、校园与园区资源' },
  { id: 'event', label: '比赛 / 资源', emoji: '🏆', cats: ['比赛机会'], desc: '黑客松、创业赛、激励计划' },
  { id: 'risk', label: '风险 / 避坑', emoji: '🛡️', cats: ['风险避坑'], desc: '高风险与争议，仅作避坑' },
];

const otherTrack: Track = { id: 'other', label: '其他', emoji: '✨', cats: [], desc: '未归类' };

/** 取一条线索的主赛道 */
export function getTrack(o: Opportunity): Track {
  for (const t of tracks) {
    if (o.category.some((c) => t.cats.includes(c))) return t;
  }
  return otherTrack;
}

export function trackById(id: string): Track {
  return tracks.find((t) => t.id === id) ?? otherTrack;
}

function countBy<T extends string>(items: Opportunity[], key: (o: Opportunity) => T[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const o of items) for (const v of key(o)) m[v] = (m[v] ?? 0) + 1;
  return m;
}

export interface TrackStat {
  track: Track;
  count: number;
  avgScore: number;
}

export interface Aggregation {
  total: number;
  trackStats: TrackStat[];
  bySourceLevel: Record<SourceLevel, number>;
  byStatus: Record<OpportunityStatus, number>;
  byPlatform: Record<string, number>;
  byCity: Record<string, number>;
  freshCount: number;
}

/** 汇总聚合 */
export function aggregate(items: Opportunity[]): Aggregation {
  const trackStats: TrackStat[] = tracks
    .map((track) => {
      const inTrack = items.filter((o) => getTrack(o).id === track.id);
      const avgScore = inTrack.length
        ? Math.round(inTrack.reduce((s, o) => s + getScore(o), 0) / inTrack.length)
        : 0;
      return { track, count: inTrack.length, avgScore };
    })
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  const bySourceLevel = countBy(items, (o) => [o.sourceLevel]) as Record<SourceLevel, number>;
  const byStatus = countBy(items, (o) => [o.status]) as Record<OpportunityStatus, number>;

  return {
    total: items.length,
    trackStats,
    bySourceLevel,
    byStatus,
    byPlatform: countBy(items, (o) => o.platform),
    byCity: countBy(items, (o) => o.city),
    freshCount: items.filter((o) => o.status === '新鲜' || o.status === '待核验').length,
  };
}
