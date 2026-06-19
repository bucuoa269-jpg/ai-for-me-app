import type { City } from '../types';

// ============================================================
// 城市机会地图 —— 各板块条目均为 demo / 待核验，不含真实链接。
// 线下活动统一附人身安全提醒（尤其女性与学生用户）。
// ============================================================

const safety =
  '线下活动请核实主办方与场地，告知亲友行程，保管好财物，警惕以社交/合作为名的收割局。女性与学生用户尤其注意人身安全，必要时结伴前往。';

export const cities: City[] = [
  {
    id: 'chengdu',
    name: '成都',
    emoji: '🐼',
    tagline: '生活成本友好、社群活跃，适合低成本试水内容与本地服务。',
    status: '待核验',
    sections: [
      {
        title: '同城 AI 活动',
        items: [
          { label: 'AI / 独立开发 Meetup', note: 'demo：以各活动官方报名页为准（待核验）' },
          { label: '创作者线下交流', note: 'demo：注意甄别含金量（待核验）' },
        ],
      },
      {
        title: '创业沙龙 / 社群',
        items: [{ label: '本地创业沙龙', note: 'demo：自行核验主办方（待核验）' }],
      },
      {
        title: '高校 / 园区资源',
        items: [
          { label: '高校创业学院 / 双创基地', note: '以各高校官方通知为准（待核验）' },
          { label: '产业园区政策', note: '以园区/政府官网为准（待核验）' },
        ],
      },
      {
        title: '第一客户地图',
        items: [
          { label: '本地餐饮 / 美业海报与短视频', note: 'demo 机会方向（灵感池）' },
          { label: '校园 PPT / 答辩美化', note: 'demo 机会方向（灵感池）' },
        ],
      },
    ],
    safetyNote: safety,
  },
  {
    id: 'hangzhou',
    name: '杭州',
    emoji: '🌊',
    tagline: '电商与内容产业密集，AI 设计/视频与电商服务需求方多。',
    status: '待核验',
    sections: [
      {
        title: '同城 AI 活动',
        items: [
          { label: 'AI 应用 / 出海 Meetup', note: 'demo：以官方报名页为准（待核验）' },
          { label: '电商 + AI 交流', note: 'demo（待核验）' },
        ],
      },
      {
        title: '创业沙龙 / 社群',
        items: [{ label: '独立开发 / 出海社群', note: 'demo：自行核验（待核验）' }],
      },
      {
        title: '高校 / 园区资源',
        items: [
          { label: '高校创业资源', note: '以官方通知为准（待核验）' },
          { label: '互联网产业园政策', note: '以园区官网为准（待核验）' },
        ],
      },
      {
        title: '第一客户地图',
        items: [
          { label: '电商主图 / 详情页', note: 'demo 机会方向（灵感池）' },
          { label: '中小卖家短视频代运营', note: 'demo 机会方向（灵感池）' },
        ],
      },
    ],
    safetyNote: safety,
  },
  {
    id: 'shenzhen',
    name: '深圳',
    emoji: '⚡',
    tagline: '硬件与供应链 + 创业氛围，适合硬件结合、出海与快速试错。',
    status: '待核验',
    sections: [
      {
        title: '同城 AI 活动',
        items: [
          { label: 'AI 硬件 / 创客活动', note: 'demo：以官方报名页为准（待核验）' },
          { label: '黑客松', note: 'demo：以比赛官网为准（待核验）' },
        ],
      },
      {
        title: '创业沙龙 / 社群',
        items: [{ label: '创业者 / 出海社群', note: 'demo：自行核验（待核验）' }],
      },
      {
        title: '高校 / 园区资源',
        items: [
          { label: '高校与科技园孵化', note: '以官方通知为准（待核验）' },
          { label: '创业扶持政策', note: '以政府官网为准（待核验）' },
        ],
      },
      {
        title: '第一客户地图',
        items: [
          { label: 'AI 图片转 3D 打印周边', note: 'demo 机会方向（灵感池）' },
          { label: '电商 / 跨境内容服务', note: 'demo 机会方向（灵感池）' },
        ],
      },
    ],
    safetyNote: safety,
  },
  {
    id: 'shanghai',
    name: '上海',
    emoji: '🏙️',
    tagline: '品牌与商业资源集中，适合更高客单的内容、设计与咨询服务。',
    status: '待核验',
    sections: [
      {
        title: '同城 AI 活动',
        items: [
          { label: 'AI 行业大会 / Meetup', note: 'demo：以官方报名页为准（待核验）' },
          { label: '创意 / 设计社群活动', note: 'demo（待核验）' },
        ],
      },
      {
        title: '创业沙龙 / 社群',
        items: [{ label: '投融资 / 创业社群', note: 'demo：自行核验（待核验）' }],
      },
      {
        title: '高校 / 园区资源',
        items: [
          { label: '高校创业孵化', note: '以官方通知为准（待核验）' },
          { label: '文创 / 科技园政策', note: '以园区官网为准（待核验）' },
        ],
      },
      {
        title: '第一客户地图',
        items: [
          { label: '品牌 / 活动视觉与短视频', note: 'demo 机会方向（灵感池）' },
          { label: '中小企业 AI 提效咨询', note: 'demo 机会方向（灵感池）' },
        ],
      },
    ],
    safetyNote: safety,
  },
  {
    id: 'beijing',
    name: '北京',
    emoji: '🏯',
    tagline: '高校与 AI 研究/媒体资源密集，适合深度内容、教育与技术方向。',
    status: '待核验',
    sections: [
      {
        title: '同城 AI 活动',
        items: [
          { label: 'AI 技术 / 学术分享', note: 'demo：以官方报名页为准（待核验）' },
          { label: '创业者 Meetup', note: 'demo（待核验）' },
        ],
      },
      {
        title: '创业沙龙 / 社群',
        items: [{ label: '高校 + 创投社群', note: 'demo：自行核验（待核验）' }],
      },
      {
        title: '高校 / 园区资源',
        items: [
          { label: '高校创业与科研转化', note: '以官方通知为准（待核验）' },
          { label: '中关村等园区政策', note: '以政府/园区官网为准（待核验）' },
        ],
      },
      {
        title: '第一客户地图',
        items: [
          { label: '教育 / 知识付费内容', note: 'demo 机会方向（灵感池）' },
          { label: 'AI 技术科普与课程整理', note: 'demo 机会方向（灵感池）' },
        ],
      },
    ],
    safetyNote: safety,
  },
];
