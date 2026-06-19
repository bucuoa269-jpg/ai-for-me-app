import PageHeader from '../components/PageHeader';
import CityMapGrid from '../components/CityMapGrid';
import { cities } from '../data/cities';

export default function CitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="🗺️ 城市地图"
        title="城市机会地图"
        desc="同城活动、创业沙龙、高校与园区资源、第一客户地图。各条目均为 demo / 待核验，请以官方报名页与政府/高校通知为准。"
      />
      <div className="mb-5 flex items-start gap-2 rounded-xl border border-rose-200/70 bg-rose-50/60 px-3 py-2 text-xs text-rose-700">
        <span aria-hidden>🛡️</span>
        <span>
          参加任何线下活动都请注意人身与财产安全：核实主办方、告知亲友行程、警惕收割局。女性与学生用户尤其注意，必要时结伴前往。
        </span>
      </div>
      <CityMapGrid cities={cities} />
    </div>
  );
}
