import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import LearningPath from '../components/LearningPath';
import SourceBadge from '../components/SourceBadge';
import { learningResources, sevenDayBeginnerPath } from '../data/learning';

export default function LearningPage() {
  const categories = ['全部', ...Array.from(new Set(learningResources.map((r) => r.category)))];
  const [cat, setCat] = useState('全部');
  const list = cat === '全部' ? learningResources : learningResources.filter((r) => r.category === cat);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="📚 AI 学习"
        title="AI 学习路线"
        desc="学习不是终点，变现才是。每条学习资源都连接一个变现方向。外部链接必须真实核验后填入，未核验一律标注「待核验」。"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(320px,420px)]">
        {/* 资源库 */}
        <section>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={c === cat ? 'btn-primary text-xs' : 'btn-ghost text-xs'}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {list.map((r) => (
              <article key={r.id} className="card card-hover p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="chip">{r.category}</span>
                  <SourceBadge level={r.sourceLevel} showLabel={false} />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-ink">{r.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-mute">{r.summary}</p>
                <p className="mt-2 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                  💰 变现方向：{r.monetization}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-mute">
                  <span className="chip">{r.link.type}</span>
                  {r.link.title}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 7 天路线 */}
        <aside>
          <LearningPath path={sevenDayBeginnerPath} />
        </aside>
      </div>
    </div>
  );
}
