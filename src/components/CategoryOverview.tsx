import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Opportunity, SourceLevel, OpportunityStatus } from '../types';
import { aggregate } from '../lib/taxonomy';
import { sourceLevelStyle } from '../lib/sourceLevel';

const statusTone: Record<string, string> = {
  新鲜: 'text-emerald-700',
  待核验: 'text-amber-700',
  灵感池: 'text-iris-700',
  风险榜: 'text-rose-600',
  已过期: 'text-ink-mute',
};

export default function CategoryOverview({
  items,
  activeTrack,
  onSelectTrack,
}: {
  items: Opportunity[];
  activeTrack: string;
  onSelectTrack: (trackId: string) => void;
}) {
  const agg = useMemo(() => aggregate(items), [items]);

  return (
    <section className="card p-4 sm:p-5">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink">📊 线索分类汇总</h3>
          <p className="mt-0.5 text-xs text-ink-mute">
            共 <span className="font-semibold text-ink">{agg.total}</span> 条 · 点赛道可快速筛选
          </p>
        </div>
        {activeTrack !== '全部' && (
          <button
            onClick={() => onSelectTrack('全部')}
            className="text-xs text-iris-700 hover:underline"
          >
            显示全部赛道
          </button>
        )}
      </div>

      {/* 赛道卡片 */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        <TrackCard
          emoji="🗂️"
          label="全部赛道"
          desc="不限赛道"
          count={agg.total}
          active={activeTrack === '全部'}
          onClick={() => onSelectTrack('全部')}
        />
        {agg.trackStats.map((s) => (
          <TrackCard
            key={s.track.id}
            emoji={s.track.emoji}
            label={s.track.label}
            desc={`${s.track.desc} · 均分 ${s.avgScore}`}
            count={s.count}
            active={activeTrack === s.track.id}
            onClick={() => onSelectTrack(s.track.id)}
          />
        ))}
      </div>

      {/* 信源 / 状态分布 */}
      <div className="mt-4 grid gap-3 border-t border-black/[0.06] pt-3 sm:grid-cols-2">
        <div>
          <h4 className="text-[11px] font-semibold text-ink-mute">信源等级分布</h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {(['S', 'A', 'B', 'C', 'D', 'Risk', 'Expired'] as SourceLevel[])
              .filter((lv) => agg.bySourceLevel[lv])
              .map((lv) => {
                const st = sourceLevelStyle(lv);
                return (
                  <span
                    key={lv}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] ring-1 ${st.bg} ${st.text} ${st.ring}`}
                  >
                    <b>{lv}</b> {agg.bySourceLevel[lv]}
                  </span>
                );
              })}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold text-ink-mute">状态分布</h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {(['新鲜', '待核验', '灵感池', '风险榜', '已过期'] as OpportunityStatus[])
              .filter((s) => agg.byStatus[s])
              .map((s) => (
                <span key={s} className={`chip ${statusTone[s] ?? ''}`}>
                  {s} {agg.byStatus[s]}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackCard({
  emoji,
  label,
  desc,
  count,
  active,
  onClick,
}: {
  emoji: string;
  label: string;
  desc: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col gap-1 rounded-xl border p-3 text-left transition-all ${
        active
          ? 'border-iris-300 bg-iris-50/70 ring-1 ring-iris-200'
          : 'border-black/[0.06] bg-white/70 hover:border-iris-200 hover:bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg">{emoji}</span>
        <span className={`text-lg font-semibold ${active ? 'text-iris-700' : 'text-ink'}`}>
          {count}
        </span>
      </div>
      <span className="text-xs font-medium text-ink">{label}</span>
      <span className="line-clamp-1 text-[11px] text-ink-mute">{desc}</span>
    </motion.button>
  );
}
