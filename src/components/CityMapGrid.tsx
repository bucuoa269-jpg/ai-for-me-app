import { useState } from 'react';
import type { City } from '../types';
import StatusBadge from './StatusBadge';

function CityPanel({ city }: { city: City }) {
  return (
    <div className="space-y-4">
      {city.sections.map((sec) => (
        <div key={sec.title}>
          <h4 className="text-xs font-semibold text-ink-mute">{sec.title}</h4>
          <ul className="mt-1.5 space-y-1.5">
            {sec.items.map((it, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                <span className="font-medium text-ink">{it.label}</span>
                <span className="text-xs text-ink-mute">— {it.note}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex items-start gap-2 rounded-xl border border-rose-200/70 bg-rose-50/60 px-3 py-2 text-xs text-rose-700">
        <span aria-hidden>🛡️</span>
        <span>{city.safetyNote}</span>
      </div>
    </div>
  );
}

export default function CityMapGrid({ cities }: { cities: City[] }) {
  const [active, setActive] = useState(cities[0]?.id ?? '');
  const current = cities.find((c) => c.id === active) ?? cities[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      {/* 城市选择 */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {cities.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`card card-hover flex items-center gap-3 p-3 text-left ${
              c.id === active ? 'border-iris-300 ring-1 ring-iris-200' : ''
            }`}
          >
            <span className="text-2xl">{c.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-ink">{c.name}</span>
                <StatusBadge status={c.status} />
              </div>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-ink-mute">{c.tagline}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 当前城市详情 */}
      {current && (
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-3xl">{current.emoji}</span>
            <div>
              <h3 className="text-lg font-semibold text-ink">{current.name}</h3>
              <p className="text-xs text-ink-mute">{current.tagline}</p>
            </div>
          </div>
          <CityPanel city={current} />
        </div>
      )}
    </div>
  );
}
