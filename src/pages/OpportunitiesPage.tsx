import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import OpportunityExplorer from '../components/OpportunityExplorer';
import OpportunityList from '../components/OpportunityList';
import RiskNotice from '../components/RiskNotice';
import { opportunities } from '../data/opportunities';
import { useFavorites } from '../lib/storage';

export default function OpportunitiesPage() {
  const [tab, setTab] = useState<'all' | 'fav'>('all');
  const { favorites } = useFavorites();

  const favItems = useMemo(
    () => opportunities.filter((o) => favorites.includes(o.id)),
    [favorites],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="🎯 今日线索"
        title="机会线索库"
        desc="每条线索都带付款人、交付物、原始信源、7 天动作与风险。全部为 demo / 待核验 / 灵感池，不构成收益承诺，请自行验证。"
      />

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setTab('all')}
          className={tab === 'all' ? 'btn-primary text-xs' : 'btn-ghost text-xs'}
        >
          全部线索（{opportunities.length}）
        </button>
        <button
          onClick={() => setTab('fav')}
          className={tab === 'fav' ? 'btn-primary text-xs' : 'btn-ghost text-xs'}
        >
          ★ 我的收藏（{favorites.length}）
        </button>
      </div>

      {tab === 'all' ? (
        <OpportunityExplorer items={opportunities} showFilters />
      ) : (
        <OpportunityList
          items={favItems}
          emptyHint="还没有收藏。点击线索右下角的 ☆ 即可收藏，数据仅存在本地浏览器。"
        />
      )}

      <RiskNotice className="mt-6" />
      <p className="mt-3 text-[11px] text-ink-mute">
        提示：收藏与状态仅保存在你当前浏览器（localStorage），清理浏览器数据后会消失。
      </p>
    </div>
  );
}
