import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Opportunity } from '../types';
import { applyFilters, defaultFilters, type FilterState } from '../lib/filters';
import SearchBox from './SearchBox';
import FilterBar from './FilterBar';
import OpportunityList from './OpportunityList';
import CategoryOverview from './CategoryOverview';

export default function OpportunityExplorer({
  items,
  limit,
  showFilters = true,
  showOverview = false,
  initialFilters,
}: {
  items: Opportunity[];
  /** 限制展示数量（首页用），并显示「查看全部」 */
  limit?: number;
  showFilters?: boolean;
  /** 是否显示「线索分类汇总」总览面板 */
  showOverview?: boolean;
  initialFilters?: Partial<FilterState>;
}) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const results = useMemo(() => applyFilters(items, filters), [items, filters]);
  const shown = limit ? results.slice(0, limit) : results;

  return (
    <div className="space-y-4">
      {showOverview && (
        <CategoryOverview
          items={items}
          activeTrack={filters.track}
          onSelectTrack={(track) => setFilters((f) => ({ ...f, track }))}
        />
      )}

      {showFilters && (
        <div className="space-y-3">
          <SearchBox value={filters.query} onChange={(q) => setFilters((f) => ({ ...f, query: q }))} />
          <FilterBar items={items} filters={filters} onChange={setFilters} />
        </div>
      )}

      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-ink-mute">
          共 <span className="font-semibold text-ink">{results.length}</span> 条线索
          {limit && results.length > limit ? `（展示前 ${limit} 条）` : ''}
        </p>
        {limit && (
          <Link to="/opportunities" className="text-xs text-iris-700 hover:underline">
            查看全部 →
          </Link>
        )}
      </div>

      <OpportunityList items={shown} />
    </div>
  );
}
