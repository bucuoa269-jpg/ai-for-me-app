import type { SourceLevel } from '../types';

/** 信源等级公开规则（与 /about 页面展示一致） */
export const sourceLevelRules: { level: SourceLevel; label: string; desc: string }[] = [
  { level: 'S', label: '一手权威', desc: '官方 / 平台规则 / 政府高校园区 / 比赛官网 / 一手数据' },
  { level: 'A', label: '权威交叉', desc: '权威媒体 / 公开访谈 / 平台官方公告 / 多源交叉验证案例' },
  { level: 'B', label: '可交叉案例', desc: '多条可交叉验证的真实内容 / 高质量社群共识' },
  { level: 'C', label: '单一弱验证', desc: '单一社交平台案例 / 社群聊天 / 朋友经验 / 未充分验证' },
  { level: 'D', label: '弱信号灵感', desc: '待核验 / 弱信号 / 仅供灵感' },
  { level: 'Risk', label: '高风险避坑', desc: '高风险 / 争议 / 不建议执行，只做避坑' },
  { level: 'Expired', label: '已过期', desc: '过期 / 失效，仅作历史参考' },
];

export const sourceLevelStyles: Record<
  SourceLevel,
  { text: string; bg: string; ring: string; label: string }
> = {
  S: { text: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-200', label: '一手权威' },
  A: { text: 'text-iris-700', bg: 'bg-iris-50', ring: 'ring-iris-200', label: '权威交叉' },
  B: { text: 'text-sky-700', bg: 'bg-sky-50', ring: 'ring-sky-200', label: '可交叉案例' },
  C: { text: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200', label: '单一弱验证' },
  D: { text: 'text-ink-mute', bg: 'bg-black/[0.04]', ring: 'ring-black/10', label: '弱信号灵感' },
  Risk: { text: 'text-rose-700', bg: 'bg-rose-50', ring: 'ring-rose-200', label: '高风险避坑' },
  Expired: { text: 'text-ink-mute', bg: 'bg-black/[0.03]', ring: 'ring-black/10', label: '已过期' },
};

export function sourceLevelStyle(level: SourceLevel) {
  return sourceLevelStyles[level] ?? sourceLevelStyles.D;
}
