import { useEffect, useRef, useState } from 'react';
import { getSearchHistory, pushSearchHistory, clearSearchHistory } from '../lib/storage';

export default function SearchBox({
  value,
  onChange,
  placeholder = '搜索机会、平台、城市、技能…',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, [focused]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const commit = (q: string) => {
    onChange(q);
    pushSearchHistory(q);
    setHistory(getSearchHistory());
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-4 py-2 shadow-soft focus-within:border-iris-300">
        <span aria-hidden className="text-ink-mute">🔍</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) commit(value.trim());
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-mute"
          aria-label="搜索"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="text-ink-mute hover:text-ink"
            aria-label="清空搜索"
          >
            ✕
          </button>
        )}
      </div>

      {focused && history.length > 0 && (
        <div className="absolute z-30 mt-2 w-full rounded-2xl border border-black/[0.08] bg-white p-2 shadow-lift">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-[11px] text-ink-mute">历史搜索</span>
            <button
              className="text-[11px] text-ink-mute hover:text-ink"
              onClick={() => {
                clearSearchHistory();
                setHistory([]);
              }}
            >
              清除
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 p-1">
            {history.map((h) => (
              <button
                key={h}
                onClick={() => {
                  commit(h);
                  setFocused(false);
                }}
                className="chip hover:border-iris-200 hover:text-ink"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
