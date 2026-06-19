import { siteConfig } from '../data/siteConfig';

// 克制的风险提示条：小黄/橙色，不打断阅读体验。
export default function RiskNotice({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl border border-amber-200/70 bg-amber-50/70 px-3 py-2 text-xs text-amber-800 ${className}`}
    >
      <span aria-hidden className="mt-px">⚠️</span>
      <span>{siteConfig.riskLine}</span>
    </div>
  );
}
