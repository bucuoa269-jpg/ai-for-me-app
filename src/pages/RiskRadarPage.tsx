import PageHeader from '../components/PageHeader';
import OpportunityList from '../components/OpportunityList';
import InterviewCard from '../components/InterviewCard';
import { opportunities } from '../data/opportunities';
import { interviews } from '../data/interviews';

const redFlags = [
  '承诺「学会就能月入过万」「躺赚」「稳赚不赔」',
  '靠拉人头分销、发展下线获利',
  '高价社群 / 课程，却拿不出真实交付与口碑',
  '只晒收入截图，不谈方法、不谈风险',
  '制造焦虑后立刻推付费产品',
  '要求先大额付费才「解锁机会」',
];

export default function RiskRadarPage() {
  const riskOpps = opportunities.filter((o) => o.status === '风险榜');
  const failCases = interviews.filter((i) => i.isFailureCase);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="🛡️ 风险雷达"
        title="风险雷达 / 避坑榜"
        desc="本站不做灰色、擦边、夸大项目。这里只客观标注高风险与争议，帮你避坑，不做诽谤。"
      />

      <section className="card mb-8 p-5">
        <h2 className="text-sm font-semibold text-ink">⚠️ 割韭菜常见信号</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {redFlags.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
              <span className="mt-0.5 text-rose-500">●</span>
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
          遇到以上信号，请保护好资金安全，核实师资与口碑，远离拉人头模式。不保证收益｜请自行验证｜以官方页面为准｜注意合同、资金与人身安全。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="section-title mb-3">风险榜线索</h2>
        <OpportunityList items={riskOpps} emptyHint="暂无风险榜线索。" />
      </section>

      <section>
        <h2 className="section-title mb-3">失败复盘 / 常见避雷</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {failCases.map((it) => (
            <InterviewCard key={it.id} interview={it} />
          ))}
        </div>
      </section>
    </div>
  );
}
