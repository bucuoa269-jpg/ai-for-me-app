import type { LearningResource, LearningPathData } from '../types';

// ============================================================
// AI 学习路线 —— 资源链接一律 url 留空并标注「待核验」。
// 外部链接必须真实核验后再填入，否则不得伪装成真实链接。
// 每条学习资源都连接一个变现方向。
// ============================================================

const tbd = (title: string): LearningResource['link'] => ({
  title,
  url: '',
  type: '待核验',
});

export const learningResources: LearningResource[] = [
  {
    id: 'lr_zero_basic',
    title: '零基础：AI 到底能帮我做什么',
    category: '零基础入门',
    summary: '用人话理解大模型能做与不能做的事，建立「AI 是工具，人是决策者」的认知。',
    monetization: '为后续所有变现方向打底：先会用，再谈接单。',
    sourceLevel: 'D',
    link: tbd('零基础入门资料合集（待核验，请以公开课官方页面为准）'),
  },
  {
    id: 'lr_ai_tools',
    title: 'AI 工具地图：常用工具与选型',
    category: 'AI 工具',
    summary: '了解写作、出图、视频、表格、编程各类常用 AI 工具的定位与适用场景。',
    monetization: '工具熟练度直接决定接单效率与交付质量。',
    sourceLevel: 'D',
    link: tbd('AI 工具导航（待核验，请以各工具官网为准）'),
  },
  {
    id: 'lr_prompt_basic',
    title: '提示词基础：把需求讲清楚',
    category: '提示词',
    summary: '掌握结构化提示、给示例、给约束、迭代修正等基本功，稳定拿到可用结果。',
    monetization: '对应 AI 写作、PPT、文案、提示词包售卖等方向。',
    sourceLevel: 'D',
    link: tbd('提示词入门资料（待核验，请以公开教程为准）'),
  },
  {
    id: 'lr_ai_coding',
    title: 'AI 编程入门：从想法到能跑的小工具',
    category: 'AI 编程',
    summary: '用 AI 辅助快速做出小脚本、小网页、小程序 MVP，降低编程门槛。',
    monetization: '对应自动化脚本、小工具、MVP 接单、独立开发等方向。',
    sourceLevel: 'D',
    link: tbd('AI 编程入门资料（待核验，请以官方文档/开源项目为准）'),
  },
  {
    id: 'lr_ai_design',
    title: 'AI 设计：出图与排版的及格线',
    category: 'AI 设计',
    summary: '掌握 AI 出图 + 人工排版的工作流，做出可商用、可交付的海报/封面/电商图。',
    monetization: '对应海报、封面、电商图、漫画账号、3D 周边等方向。',
    sourceLevel: 'D',
    link: tbd('AI 设计教程（待核验，请以工具官方教程为准）'),
  },
  {
    id: 'lr_ai_video',
    title: 'AI 视频：脚本、配音、剪辑与数字人',
    category: 'AI 视频',
    summary: '了解 AI 辅助短视频的完整链路与各平台对 AI 内容的规则边界。',
    monetization: '对应短视频服务、数字人口播、本地代运营等方向。',
    sourceLevel: 'D',
    link: tbd('AI 视频教程（待核验，请以平台规则与工具官网为准）'),
  },
  {
    id: 'lr_ai_automation',
    title: 'AI 自动化：把重复劳动交给流程',
    category: 'AI 自动化',
    summary: '用工作流/脚本把重复任务自动化，理解什么该自动化、什么不该。',
    monetization: '对应表格自动化、脚本服务、社群运营助理等方向。',
    sourceLevel: 'D',
    link: tbd('AI 自动化资料（待核验，请以官方文档为准）'),
  },
  {
    id: 'lr_ai_business',
    title: 'AI 商业化：从能做到有人付钱',
    category: 'AI 商业化',
    summary: '理解需求验证、定价、获客、交付与复购，把技能变成可持续的小生意。',
    monetization: '为所有接单/产品方向提供商业闭环方法论。',
    sourceLevel: 'D',
    link: tbd('AI 商业化方法论（待核验）'),
  },
  {
    id: 'lr_ai_job',
    title: 'AI 求职：用 AI 提升求职竞争力',
    category: 'AI 求职',
    summary: '用 AI 优化简历、作品集与面试准备，同时识别岗位需求变化。',
    monetization: '对应简历优化、作品集制作、求职陪伴等方向。',
    sourceLevel: 'D',
    link: tbd('AI 求职资料（待核验）'),
  },
];

export const sevenDayBeginnerPath: LearningPathData = {
  id: 'path_beginner_7d',
  title: '7 天 AI 小白入门行动路线',
  audience: '完全没用过 AI、想做第一笔副业收入的人',
  days: [
    {
      day: 1,
      title: '认识 AI：先用起来',
      tasks: ['挑 1 个主流对话工具，连续提 10 个真实问题', '感受它擅长与不擅长的边界'],
      deliverable: '一份「我今天问 AI 的 10 个问题与它的表现」记录。',
    },
    {
      day: 2,
      title: '提示词基本功',
      tasks: ['学会给角色、给示例、给约束', '把一个模糊需求改写成清晰提示词'],
      deliverable: '同一任务「改写前 / 改写后」提示词对比一份。',
    },
    {
      day: 3,
      title: '选一个方向的工具',
      tasks: ['在写作/出图/视频/编程中选 1 个方向', '跑通该方向 1 个常用工具的基础流程'],
      deliverable: '用所选工具做出的第一个小作品（草稿即可）。',
    },
    {
      day: 4,
      title: '做一个最小交付物样板',
      tasks: ['围绕一个真实场景做 1 份可交付样板', '质量优先于数量'],
      deliverable: '1 份能拿给别人看的样板（如一页 PPT / 一张海报 / 一段视频）。',
    },
    {
      day: 5,
      title: '想清楚谁会为它付钱',
      tasks: ['写下 3 类可能的付款人', '找 10 个真实需求贴或对标账号'],
      deliverable: '一份「付款人 + 10 个真实需求」清单。',
    },
    {
      day: 6,
      title: '主动触达',
      tasks: ['准备一句话价值主张 + 样板', '真实发出 10-20 次触达'],
      deliverable: '触达记录与收到的真实反馈。',
    },
    {
      day: 7,
      title: '复盘与决定',
      tasks: ['统计反馈与询单', '决定继续 / 调整方向 / 暂停'],
      deliverable: '一页复盘：我学到了什么、下一步做什么。注意：本路线不保证收益，请自行验证。',
    },
  ],
};
