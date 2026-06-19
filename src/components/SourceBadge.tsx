import type { SourceLevel } from '../types';
import { sourceLevelStyle } from '../lib/sourceLevel';

export default function SourceBadge({
  level,
  count,
  showLabel = true,
}: {
  level: SourceLevel;
  count?: number;
  showLabel?: boolean;
}) {
  const s = sourceLevelStyle(level);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${s.bg} ${s.text} ${s.ring}`}
      title={`信源等级 ${level}：${s.label}`}
    >
      <span className="font-semibold">{level}</span>
      {showLabel && <span className="opacity-80">{s.label}</span>}
      {typeof count === 'number' && (
        <span className="opacity-70">· {count} 源</span>
      )}
    </span>
  );
}
