// ============================================================
// 站点配置 —— 创作者署名与联系方式
// 脱敏协议：仅保留昵称「链屿」；所有联系方式一律占位符，
// 严禁写入任何真实微信号 / 手机号 / 二维码 / 私人社群链接。
// 上线时由部署者在后台 / 环境变量中替换占位符。
// ============================================================

export const siteConfig = {
  name: 'AI For Me',
  zhName: 'AI For Me｜为我而生的 AI 时代',
  slogan: 'AI For Me，时代为我而来。',
  subSlogan: '把 AI 信息提纯成可执行的机会。',
  creator: '链屿',

  // —— 联系方式：全部为占位符，请勿填入真实信息 ——
  contact: {
    officialAccountQR: '公众号二维码占位',
    contactPlaceholder: '联系方式占位',
    cooperationEntry: '合作入口占位',
    submitFormUrl: '', // 投稿表单/Issue 链接占位，上线后配置
  },

  // 固定风险提示语（收益相关内容统一引用）
  riskLine: '不保证收益｜请自行验证｜以官方页面为准｜注意合同、资金与人身安全',

  disclaimer:
    '本线索仅供信息参考，不构成投资、就业、创业或收益承诺。本站不保证任何收益。请以官方页面为准，并结合自身情况判断风险。',

  version: 'v1.1.0',
} as const;

export type SiteConfig = typeof siteConfig;
