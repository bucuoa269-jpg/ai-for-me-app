import type { Opportunity } from '../types';

// 机会分 = 可信度 25% + 付款信号 25% + 可执行性 20% + 时效性 15% + 风险可控 10% + 学习价值 5%
// 各维度输入为 1-5，归一化到 100。评分仅作辅助，不构成收益承诺。
export const scoreWeights = {
  confidence: 0.25, // 可信度
  payment: 0.25, // 付款信号（用 earningPotential 近似）
  executable: 0.2, // 可执行性（难度反向）
  urgency: 0.15, // 时效性
  riskControl: 0.1, // 风险可控（启动成本反向近似）
  learning: 0.05, // 学习价值
};

function to100(v: number) {
  // 1-5 -> 20-100
  return Math.max(0, Math.min(5, v)) * 20;
}

export function computeOpportunityScore(o: Opportunity): number {
  const executable = 6 - o.difficulty; // 难度越低越可执行
  const riskControl = 6 - o.cost; // 启动成本越低风险越可控（近似）
  const learning = o.relatedLearning && o.relatedLearning.length > 0 ? 5 : 3;

  const raw =
    to100(o.confidence) * scoreWeights.confidence +
    to100(o.earningPotential) * scoreWeights.payment +
    to100(executable) * scoreWeights.executable +
    to100(o.urgency) * scoreWeights.urgency +
    to100(riskControl) * scoreWeights.riskControl +
    to100(learning) * scoreWeights.learning;

  return Math.round(raw);
}

/** 优先取人工覆盖分，否则计算 */
export function getScore(o: Opportunity): number {
  return o.opportunityScore ?? computeOpportunityScore(o);
}

export function scoreTone(score: number): { label: string; className: string } {
  if (score >= 80) return { label: '高潜', className: 'text-emerald-700' };
  if (score >= 65) return { label: '可试', className: 'text-iris-700' };
  if (score >= 50) return { label: '观察', className: 'text-amber-700' };
  return { label: '谨慎', className: 'text-ink-mute' };
}
