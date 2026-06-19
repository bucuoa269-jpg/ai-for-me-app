import { motion } from 'framer-motion';
import type { Opportunity, UserActionStatus } from '../types';
import { getScore } from '../lib/scoring';
import SourceBadge from './SourceBadge';
import StatusBadge from './StatusBadge';
import OpportunityScore from './OpportunityScore';

const actionOptions: UserActionStatus[] = ['想做', '已读', '已行动', '已放弃'];

export default function OpportunityRowCard({
  opportunity,
  onOpen,
  isFavorite,
  onToggleFavorite,
  status,
  onSetStatus,
}: {
  opportunity: Opportunity;
  onOpen: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  status?: UserActionStatus;
  onSetStatus: (s: UserActionStatus | null) => void;
}) {
  const score = getScore(opportunity);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card card-hover group p-4"
    >
      <div className="flex gap-4">
        <div className="hidden shrink-0 sm:block">
          <OpportunityScore score={score} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge status={opportunity.status} />
            <SourceBadge level={opportunity.sourceLevel} count={opportunity.sourceCount} />
            <span className="sm:hidden chip">机会分 {score}</span>
          </div>

          <button onClick={onOpen} className="mt-2 block text-left">
            <h3 className="text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-iris-700">
              {opportunity.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-mute">
              {opportunity.summary}
            </p>
          </button>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {opportunity.platform.slice(0, 2).map((p) => (
              <span key={p} className="chip">🏷️ {p}</span>
            ))}
            {opportunity.city.slice(0, 1).map((c) => (
              <span key={c} className="chip">📍 {c}</span>
            ))}
            {opportunity.tags.slice(0, 2).map((t) => (
              <span key={t} className="chip text-iris-700">#{t}</span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-ink-mute">
              <span>付款人：{opportunity.payer.slice(0, 14)}{opportunity.payer.length > 14 ? '…' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <select
                value={status ?? ''}
                onChange={(e) => onSetStatus((e.target.value || null) as UserActionStatus | null)}
                className="rounded-full border border-black/[0.08] bg-white px-2 py-1 text-[11px] text-ink-soft outline-none hover:border-iris-200"
                aria-label="设置状态"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="">标记状态</option>
                {actionOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <button
                onClick={onToggleFavorite}
                className={`btn h-8 w-8 rounded-full border ${
                  isFavorite
                    ? 'border-gold-400 bg-gold-50 text-gold-600'
                    : 'border-black/[0.08] bg-white text-ink-mute hover:border-gold-300'
                }`}
                aria-label={isFavorite ? '取消收藏' : '收藏'}
                title={isFavorite ? '取消收藏' : '收藏'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
              <button onClick={onOpen} className="btn-ghost text-xs">详情</button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
