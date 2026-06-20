import { useMemo, useState } from 'react';
import type { LinkLibraryItem, SourceLevel } from '../types';
import PageHeader from '../components/PageHeader';
import SearchBox from '../components/SearchBox';
import SourceBadge from '../components/SourceBadge';
import { trackById, tracks } from '../lib/taxonomy';
import rawLinks from '../data/linkLibrary.json';

const links = rawLinks as unknown as LinkLibraryItem[];

const kindLabel: Record<LinkLibraryItem['kind'], string> = {
  opportunity: '机会线索',
  interview: '深访 / 访谈',
  news: '新闻 / 趋势',
};

export default function LinksPage() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<'全部' | LinkLibraryItem['kind']>('全部');
  const [track, setTrack] = useState('全部');
  const [level, setLevel] = useState<'全部' | SourceLevel>('全部');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return links.filter((l) => {
      if (kind !== '全部' && l.kind !== kind) return false;
      if (track !== '全部' && l.track !== track) return false;
      if (level !== '全部' && l.sourceLevel !== level) return false;
      if (q) {
        const hay = `${l.title} ${l.snippet} ${l.media} ${l.domain}`.toLowerCase();
        if (!q.split(/\s+/).every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [query, kind, track, level]);

  const levelCounts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const l of links) m[l.sourceLevel] = (m[l.sourceLevel] ?? 0) + 1;
    return m;
  }, []);

  const usedTracks = tracks.filter((t) => links.some((l) => l.track === t.id));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="🔗 线索链接库"
        title={`联网核验的真实链接 · 共 ${links.length} 条`}
        desc="由「联网检索 → 去重 → 逐条核验链接可访问 → 按域名信源分级 → 过滤垃圾域名」自动汇集。链接均验证可打开，但内容未逐条人工核验，请自行判断，不构成收益承诺。"
      />

      <div className="mb-3 flex items-start gap-2 rounded-xl border border-amber-200/70 bg-amber-50/70 px-3 py-2 text-xs text-amber-800">
        <span aria-hidden>⚠️</span>
        <span>
          D 级为未知来源、仅通过「能打开」核验，内容更需自行甄别；可用下方「信源」筛选只看 A/B 级。不保证收益｜请自行验证｜以官方页面为准｜注意合同、资金与人身安全。
        </span>
      </div>

      {/* kind tabs */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {(['全部', 'opportunity', 'interview', 'news'] as const).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={kind === k ? 'btn-primary text-xs' : 'btn-ghost text-xs'}
          >
            {k === '全部' ? '全部' : kindLabel[k]}
            <span className="opacity-70">
              （{k === '全部' ? links.length : links.filter((l) => l.kind === k).length}）
            </span>
          </button>
        ))}
      </div>

      {/* filters */}
      <div className="mb-3 space-y-3">
        <SearchBox value={query} onChange={setQuery} placeholder="搜索标题、媒体、域名…" />
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs text-ink-soft outline-none hover:border-iris-200"
            aria-label="赛道"
          >
            <option value="全部">全部赛道</option>
            {usedTracks.map((t) => (
              <option key={t.id} value={t.id}>{t.emoji} {t.label}</option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as '全部' | SourceLevel)}
            className="rounded-full border border-black/[0.08] bg-white/80 px-3 py-1.5 text-xs text-ink-soft outline-none hover:border-iris-200"
            aria-label="信源等级"
          >
            <option value="全部">全部信源</option>
            {(['A', 'B', 'C', 'D'] as SourceLevel[])
              .filter((lv) => levelCounts[lv])
              .map((lv) => (
                <option key={lv} value={lv}>{lv} 级（{levelCounts[lv]}）</option>
              ))}
          </select>
          {(query || kind !== '全部' || track !== '全部' || level !== '全部') && (
            <button
              onClick={() => { setQuery(''); setKind('全部'); setTrack('全部'); setLevel('全部'); }}
              className="chip hover:border-rose-200 hover:text-rose-600"
            >
              清除筛选 ✕
            </button>
          )}
        </div>
      </div>

      <p className="mb-3 px-1 text-xs text-ink-mute">
        命中 <span className="font-semibold text-ink">{filtered.length}</span> 条
      </p>

      <div className="space-y-2.5">
        {filtered.map((l) => {
          const t = trackById(l.track);
          return (
            <article key={l.id} className="card card-hover p-3.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <SourceBadge level={l.sourceLevel} showLabel={false} />
                <span className="chip">{t.emoji} {t.label}</span>
                <span className="chip text-iris-700">{kindLabel[l.kind]}</span>
                {l.media && <span className="chip">{l.media}</span>}
              </div>
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 block text-[15px] font-semibold leading-snug text-ink hover:text-iris-700"
              >
                {l.title || l.url} ↗
              </a>
              {l.snippet && (
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-mute">{l.snippet}</p>
              )}
              <p className="mt-1.5 text-[11px] text-ink-mute">{l.domain}</p>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="card px-6 py-12 text-center text-sm text-ink-mute">
            没有命中的链接，换个筛选或关键词试试 🔭
          </div>
        )}
      </div>
    </div>
  );
}
