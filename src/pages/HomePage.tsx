import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import DailyDashboard from '../components/DailyDashboard';
import OpportunityExplorer from '../components/OpportunityExplorer';
import InterviewCard from '../components/InterviewCard';
import SubmitLeadCTA from '../components/SubmitLeadCTA';
import RiskNotice from '../components/RiskNotice';
import { opportunities } from '../data/opportunities';
import { interviews } from '../data/interviews';
import { cities } from '../data/cities';
import { learningResources } from '../data/learning';
import linkLibrary from '../data/linkLibrary.json';

const quickEntries = [
  { to: '/submit', emoji: '✍️', label: '提交线索' },
  { to: '/opportunities', emoji: '🎯', label: '生成验证计划' },
  { to: '/learning', emoji: '🌱', label: 'AI 小白 7 天路线' },
  { to: '/risk-radar', emoji: '🛡️', label: '风险榜 / 避坑' },
];

export default function HomePage() {
  const riskCount =
    opportunities.filter((o) => o.status === '风险榜').length +
    interviews.filter((i) => i.isFailureCase).length;
  const feed = opportunities.filter((o) => o.status !== '风险榜');

  const stats = [
    { label: '机会线索', value: opportunities.length, to: '/opportunities', emoji: '📈', tone: 'text-ink' },
    { label: '深访矿脉', value: interviews.length, to: '/interviews', emoji: '🎙️', tone: 'text-iris-700' },
    { label: '城市地图', value: cities.length, to: '/cities', emoji: '🗺️', tone: 'text-emerald-700' },
    { label: '学习资源', value: learningResources.length, to: '/learning', emoji: '📚', tone: 'text-sky-700' },
    { label: '风险提醒', value: riskCount, to: '/risk-radar', emoji: '⚠️', tone: 'text-rose-600' },
    { label: '核验链接', value: linkLibrary.length, to: '/links', emoji: '🔗', tone: 'text-gold-600' },
  ];

  return (
    <div className="pb-8">
      <Hero />

      <DailyDashboard stats={stats} />

      {/* 快速入口 */}
      <section className="mx-auto mt-5 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {quickEntries.map((q) => (
            <Link key={q.label} to={q.to} className="btn-ghost">
              <span>{q.emoji}</span> {q.label}
            </Link>
          ))}
        </div>
      </section>

      {/* 今日机会任务板 */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="section-title">今日机会任务板</h2>
            <p className="mt-1 text-sm text-ink-mute">一条一条看，点开有付款人、信源、风险与 7 天动作。</p>
          </div>
          <Link to="/opportunities" className="hidden text-sm text-iris-700 hover:underline sm:inline">
            全部线索 →
          </Link>
        </div>
        <OpportunityExplorer items={feed} limit={6} showFilters />
      </section>

      {/* 深访预览 */}
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="section-title">深访矿脉</h2>
            <p className="mt-1 text-sm text-ink-mute">从访谈与复盘里，提炼可复制的机会与第一行动。</p>
          </div>
          <Link to="/interviews" className="hidden text-sm text-iris-700 hover:underline sm:inline">
            更多深访 →
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {interviews.slice(0, 2).map((it) => (
            <InterviewCard key={it.id} interview={it} />
          ))}
        </div>
      </section>

      {/* 投稿 CTA */}
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <SubmitLeadCTA />
        <RiskNotice className="mt-4" />
      </section>
    </div>
  );
}
