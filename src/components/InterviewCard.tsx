import { useState } from 'react';
import type { Interview } from '../types';
import SourceBadge from './SourceBadge';

export default function InterviewCard({ interview }: { interview: Interview }) {
  const [open, setOpen] = useState(false);
  const it = interview;

  return (
    <article className="card card-hover p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="chip">{it.format}</span>
        <SourceBadge level={it.sourceLevel} />
        {it.isFailureCase && (
          <span className="chip border-rose-200 text-rose-600">失败复盘 / 避坑</span>
        )}
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug text-ink">{it.title}</h3>
      <p className="mt-2 rounded-xl bg-iris-50/60 p-3 text-sm font-medium text-iris-800">
        💡 {it.conclusion}
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold text-ink-mute">可复制机会</h4>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-ink-soft">
            {it.replicable.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-ink-mute">不可复制条件</h4>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-ink-mute">
            {it.nonReplicable.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="chip">💰 付款信号：{it.paymentSignal}</span>
        <span className="chip text-emerald-700">👉 第一行动：{it.firstAction}</span>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t border-black/[0.06] pt-4">
          <div>
            <h4 className="text-xs font-semibold text-ink-mute">精华摘要</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{it.digest}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold text-ink-mute">数据事实</h4>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-ink-soft">
                {it.dataFacts.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-ink-mute">⚠️ 风险</h4>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {it.risk.map((r) => (
                  <span key={r} className="chip border-amber-200 text-amber-700">{r}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-ink-mute">反方证据 / 不确定点</h4>
            <p className="mt-1 rounded-xl bg-black/[0.03] p-3 text-sm text-ink-mute">
              {it.counterEvidence}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-mute">
            <span className="chip">{it.sourceLink.type}</span>
            {it.sourceLink.url ? (
              <a
                href={it.sourceLink.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-iris-700 underline-offset-2 hover:underline"
              >
                {it.sourceLink.title} ↗
              </a>
            ) : (
              <span>{it.sourceLink.title}</span>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {it.tags.map((t) => (
            <span key={t} className="chip text-iris-700">#{t}</span>
          ))}
        </div>
        <button onClick={() => setOpen((v) => !v)} className="btn-ghost text-xs">
          {open ? '收起' : '展开全文'}
        </button>
      </div>
    </article>
  );
}
