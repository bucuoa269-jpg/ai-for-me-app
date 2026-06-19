import { Link } from 'react-router-dom';

interface Stat {
  label: string;
  value: number | string;
  to: string;
  emoji: string;
  tone: string;
}

export default function DailyDashboard({ stats }: { stats: Stat[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="card card-hover flex flex-col gap-1 p-4"
          >
            <span className="text-lg">{s.emoji}</span>
            <span className={`text-2xl font-semibold ${s.tone}`}>{s.value}</span>
            <span className="text-xs text-ink-mute">{s.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
