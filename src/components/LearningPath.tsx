import type { LearningPathData } from '../types';

export default function LearningPath({ path }: { path: LearningPathData }) {
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-ink">🗺️ {path.title}</h3>
        <span className="chip">适合：{path.audience}</span>
      </div>

      <ol className="mt-4 space-y-3">
        {path.days.map((d) => (
          <li key={d.day} className="relative pl-9">
            <span className="absolute left-0 top-0 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-iris-500 to-iris-700 text-xs font-semibold text-white">
              {d.day}
            </span>
            <div className="rounded-2xl border border-black/[0.06] bg-white/70 p-3">
              <h4 className="text-sm font-semibold text-ink">{d.title}</h4>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-ink-soft">
                {d.tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
              <p className="mt-2 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                ✅ 今日交付：{d.deliverable}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
