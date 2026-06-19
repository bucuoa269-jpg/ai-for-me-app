import type { FilterState } from '../lib/filters';
import { buildFacets, defaultFilters, isActiveFilter } from '../lib/filters';
import type { Opportunity } from '../types';

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-ink-mute">
      <span className="hidden sm:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs text-ink-soft outline-none transition-colors hover:border-iris-200 focus:border-iris-300"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FilterBar({
  items,
  filters,
  onChange,
}: {
  items: Opportunity[];
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const facets = buildFacets(items);
  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select label="城市" value={filters.city} options={facets.cities} onChange={(v) => set({ city: v })} />
      <Select label="平台" value={filters.platform} options={facets.platforms} onChange={(v) => set({ platform: v })} />
      <Select label="方向" value={filters.category} options={facets.categories} onChange={(v) => set({ category: v })} />
      <Select label="适合" value={filters.suitableFor} options={facets.suitableFor} onChange={(v) => set({ suitableFor: v })} />
      <Select label="状态" value={filters.status} options={facets.statuses} onChange={(v) => set({ status: v as FilterState['status'] })} />
      <Select label="信源" value={filters.sourceLevel} options={facets.sourceLevels} onChange={(v) => set({ sourceLevel: v as FilterState['sourceLevel'] })} />
      <Select
        label="排序"
        value={filters.sort}
        options={['score', 'newest', 'urgency']}
        onChange={(v) => set({ sort: v as FilterState['sort'] })}
      />
      {isActiveFilter(filters) && (
        <button
          onClick={() => onChange({ ...defaultFilters, query: filters.query })}
          className="chip hover:border-rose-200 hover:text-rose-600"
        >
          清除筛选 ✕
        </button>
      )}
    </div>
  );
}

export const sortLabels: Record<FilterState['sort'], string> = {
  score: '机会分',
  newest: '最新采集',
  urgency: '时效性',
};
