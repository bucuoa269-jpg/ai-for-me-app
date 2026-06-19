import { AnimatePresence, motion } from 'framer-motion';
import type { Opportunity, UserActionStatus } from '../types';
import { getScore } from '../lib/scoring';
import { learningResources } from '../data/learning';
import SourceBadge from './SourceBadge';
import StatusBadge from './StatusBadge';
import OpportunityScore from './OpportunityScore';
import SevenDayPlan from './SevenDayPlan';
import Disclaimer from './Disclaimer';
import RiskNotice from './RiskNotice';
import { useLockBody } from './Toast';

const actionOptions: UserActionStatus[] = ['想做', '已读', '已行动', '已放弃'];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-ink-mute">{label}</h4>
      <div className="mt-1 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-ink-mute">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-black/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-iris-400 to-iris-600"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function OpportunityDetailDrawer({
  opportunity,
  onClose,
  isFavorite,
  onToggleFavorite,
  status,
  onSetStatus,
}: {
  opportunity: Opportunity | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  status?: UserActionStatus;
  onSetStatus: (s: UserActionStatus | null) => void;
}) {
  useLockBody(!!opportunity);
  const o = opportunity;
  const related = o
    ? learningResources.filter((lr) => o.relatedLearning?.includes(lr.id))
    : [];

  return (
    <AnimatePresence>
      {o && (
        <>
          <motion.div
            className="fixed inset-0 z-[55] bg-ink/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[56] flex w-full max-w-xl flex-col bg-cream shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-label={o.title}
          >
            {/* 头部 */}
            <div className="flex items-start justify-between gap-3 border-b border-black/[0.06] bg-white/70 p-5">
              <div className="flex gap-3">
                <OpportunityScore score={getScore(o)} />
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <StatusBadge status={o.status} />
                    <SourceBadge level={o.sourceLevel} count={o.sourceCount} />
                  </div>
                  <h2 className="mt-2 text-lg font-semibold leading-snug text-ink">{o.title}</h2>
                </div>
              </div>
              <button onClick={onClose} className="btn-ghost h-8 w-8 rounded-full" aria-label="关闭">
                ✕
              </button>
            </div>

            {/* 内容 */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <p className="text-sm leading-relaxed text-ink-soft">{o.summary}</p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onToggleFavorite}
                  className={isFavorite ? 'btn bg-gold-50 text-gold-700 border border-gold-300' : 'btn-ghost'}
                >
                  {isFavorite ? '★ 已收藏' : '☆ 收藏'}
                </button>
                <select
                  value={status ?? ''}
                  onChange={(e) => onSetStatus((e.target.value || null) as UserActionStatus | null)}
                  className="rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-xs text-ink-soft outline-none hover:border-iris-200"
                  aria-label="设置状态"
                >
                  <option value="">标记状态</option>
                  {actionOptions.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </div>

              <SevenDayPlan opportunity={o} />

              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-black/[0.06] bg-white/70 p-4 sm:grid-cols-3">
                <Meter label="可信度" value={o.confidence} />
                <Meter label="收益可能" value={o.earningPotential} />
                <Meter label="时效性" value={o.urgency} />
                <Meter label="难度" value={o.difficulty} />
                <Meter label="启动成本" value={o.cost} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="付款人">{o.payer}</Field>
                <Field label="交付物">{o.deliverable}</Field>
                <Field label="适合人群">{o.suitableFor.join(' / ')}</Field>
                <Field label="平台 / 城市">
                  {o.platform.join('、')} · {o.city.join('、')}
                </Field>
                <Field label="发布 / 采集时间">
                  {o.publishedAt} · 采集 {o.collectedAt}
                </Field>
                <Field label="方向标签">{o.category.join('、')}</Field>
              </div>

              <Field label="7 天动作（要点）">
                <ul className="list-disc space-y-1 pl-4">
                  {o.sevenDayAction.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="⚠️ 风险">
                  <div className="flex flex-wrap gap-1.5">
                    {o.risk.map((r) => (
                      <span key={r} className="chip border-amber-200 text-amber-700">{r}</span>
                    ))}
                  </div>
                </Field>
                <Field label="可能怎么失败">
                  <ul className="list-disc space-y-1 pl-4 text-ink-mute">
                    {o.failureModes.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </Field>
              </div>

              <Field label="反方证据 / 当前无法判断">
                <p className="rounded-xl bg-black/[0.03] p-3 text-ink-mute">{o.counterEvidence}</p>
              </Field>

              <Field label="来源链接">
                <ul className="space-y-1.5">
                  {o.sourceLinks.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="chip">{s.type}</span>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-iris-700 underline-offset-2 hover:underline"
                        >
                          {s.title}
                        </a>
                      ) : (
                        <span className="text-ink-mute">{s.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-[11px] text-ink-mute">
                  无链接项为「待核验」，本站不伪装真实外链，请以官方页面为准。
                </p>
              </Field>

              {related.length > 0 && (
                <Field label="相关学习资源">
                  <div className="flex flex-wrap gap-1.5">
                    {related.map((lr) => (
                      <span key={lr.id} className="chip border-iris-200 text-iris-700">
                        📚 {lr.title}
                      </span>
                    ))}
                  </div>
                </Field>
              )}

              <RiskNotice />
              <Disclaimer />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
