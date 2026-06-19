import { changelog } from '../data/changelog';

export default function Changelog() {
  return (
    <div className="space-y-4">
      {changelog.map((entry) => (
        <div key={entry.version} className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink">{entry.version}</h3>
            <span className="text-xs text-ink-mute">{entry.date}</span>
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-ink-soft">
            {entry.changes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
