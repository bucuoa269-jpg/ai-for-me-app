import type { Opportunity } from '../types';

export interface PlanDay {
  day: number;
  title: string;
  detail: string;
}

// 本地模板生成「7 天验证计划」。第一版不接后端 AI，按线索字段填充模板。
// 后续可替换为调用 AI API 生成个性化计划。
export function generateSevenDayPlan(o: Opportunity): PlanDay[] {
  const payer = o.payer || '目标用户';
  const deliverable = o.deliverable || '最小交付物';
  const platform = o.platform[0] ?? '目标平台';

  return [
    {
      day: 1,
      title: '理解机会与目标用户',
      detail: `读懂这条机会：「${o.title}」。明确付款人是「${payer}」，他们当下的真实痛点与预算区间是什么。`,
    },
    {
      day: 2,
      title: '找 10 个对标案例 / 真实需求',
      detail: `在 ${platform} 等渠道找 10 个同方向账号或真实需求贴，记录他们的报价、交付物与差评点（差评点就是你的机会）。`,
    },
    {
      day: 3,
      title: '做最小交付物样板',
      detail: `做出 1-2 个「${deliverable}」样板，质量优先于数量。这是你触达客户时唯一的信任凭证。`,
    },
    {
      day: 4,
      title: '找 10 个潜在客户 / 渠道',
      detail: `列出 10 个可触达「${payer}」的渠道或具体客户，准备好一句话价值主张与样板链接。`,
    },
    {
      day: 5,
      title: '发出 20 次触达',
      detail: '真实发出 20 次触达（评论、私信、社群、熟人介绍）。重点是收集真实反馈，而非立刻成交。',
    },
    {
      day: 6,
      title: '复盘反馈与报价',
      detail: '统计询单率与拒绝理由，调整报价、话术、交付物。注意核实合同、资金安全，线下交易注意人身安全。',
    },
    {
      day: 7,
      title: '决定继续 / 调整 / 放弃',
      detail: `基于真实付款信号判断：是否有人愿意付钱？若无真实付款信号，果断调整方向或放弃，不沉没成本。风险点：${
        o.risk[0] ?? '同质化竞争'
      }。`,
    },
  ];
}

export function planToText(o: Opportunity, plan: PlanDay[]): string {
  const header = `【AI For Me · 7 天验证计划】\n机会：${o.title}\n（本计划仅供参考，不保证收益，请自行验证，注意合同/资金/人身安全）\n`;
  const body = plan.map((d) => `Day ${d.day} · ${d.title}\n  ${d.detail}`).join('\n');
  return `${header}\n${body}\n`;
}
