import type { Opportunity, OpportunityStatus, SourceLevel } from '../types';
import { getScore } from './scoring';

export interface FilterState {
  query: string;
  city: string; // '全部' | 具体城市
  platform: string;
  category: string;
  suitableFor: string;
  status: OpportunityStatus | '全部';
  sourceLevel: SourceLevel | '全部';
  sort: 'score' | 'newest' | 'urgency';
}

export const defaultFilters: FilterState = {
  query: '',
  city: '全部',
  platform: '全部',
  category: '全部',
  suitableFor: '全部',
  status: '全部',
  sourceLevel: '全部',
  sort: 'score',
};

function uniqSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'zh'));
}

/** 从数据集中抽取筛选选项 */
export function buildFacets(items: Opportunity[]) {
  return {
    cities: ['全部', ...uniqSorted(items.flatMap((i) => i.city))],
    platforms: ['全部', ...uniqSorted(items.flatMap((i) => i.platform))],
    categories: ['全部', ...uniqSorted(items.flatMap((i) => i.category))],
    suitableFor: ['全部', ...uniqSorted(items.flatMap((i) => i.suitableFor))],
    statuses: ['全部', '新鲜', '待核验', '灵感池', '风险榜', '已过期'] as const,
    sourceLevels: ['全部', 'S', 'A', 'B', 'C', 'D', 'Risk', 'Expired'] as const,
  };
}

function matchesQuery(o: Opportunity, q: string): boolean {
  if (!q.trim()) return true;
  const hay = [
    o.title,
    o.summary,
    o.payer,
    o.deliverable,
    ...o.category,
    ...o.platform,
    ...o.city,
    ...o.tags,
    ...o.suitableFor,
  ]
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => hay.includes(token));
}

export function applyFilters(items: Opportunity[], f: FilterState): Opportunity[] {
  const filtered = items.filter((o) => {
    if (!matchesQuery(o, f.query)) return false;
    if (f.city !== '全部' && !o.city.includes(f.city)) return false;
    if (f.platform !== '全部' && !o.platform.includes(f.platform)) return false;
    if (f.category !== '全部' && !o.category.includes(f.category)) return false;
    if (f.suitableFor !== '全部' && !o.suitableFor.includes(f.suitableFor)) return false;
    if (f.status !== '全部' && o.status !== f.status) return false;
    if (f.sourceLevel !== '全部' && o.sourceLevel !== f.sourceLevel) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (f.sort) {
    case 'newest':
      sorted.sort((a, b) => b.collectedAt.localeCompare(a.collectedAt));
      break;
    case 'urgency':
      sorted.sort((a, b) => b.urgency - a.urgency);
      break;
    case 'score':
    default:
      sorted.sort((a, b) => getScore(b) - getScore(a));
      break;
  }
  return sorted;
}

export function isActiveFilter(f: FilterState): boolean {
  return (
    f.query.trim() !== '' ||
    f.city !== '全部' ||
    f.platform !== '全部' ||
    f.category !== '全部' ||
    f.suitableFor !== '全部' ||
    f.status !== '全部' ||
    f.sourceLevel !== '全部'
  );
}
