import PageHeader from '../components/PageHeader';
import SourceBadge from '../components/SourceBadge';
import Disclaimer from '../components/Disclaimer';
import { sourceLevelRules } from '../lib/sourceLevel';
import { people } from '../data/people';
import { siteConfig } from '../data/siteConfig';

const values = [
  { t: '信息平权', d: 'AI 做了技术平权，我们做信息差与认知差的平权。' },
  { t: '反焦虑', d: '不制造焦虑，而是减少 AI、搞钱、职业、学习与时代焦虑。' },
  { t: '反割韭菜', d: '不卖夸张承诺，不包装灰色项目，不做课程分销站。' },
  { t: '真实付款信号优先', d: '机会不是「看起来很热」，而是有付款人、有交付物、有原始链接。' },
  { t: '行动优先', d: '每条线索都回答：我 7 天内能做什么。' },
  { t: '温暖陪伴', d: '不是被盯着，而是被温柔陪着，知道还有人在认真解决问题。' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="ℹ️ 关于"
        title="关于 AI For Me"
        desc="把 AI 时代分散、混乱、真假难辨的信息，提纯成普通人能看懂、能判断、能行动的机会地图。"
      />

      {/* 价值观 */}
      <section className="mb-10">
        <h2 className="section-title mb-3">我们相信</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.t} className="card p-4">
              <h3 className="text-sm font-semibold text-ink">{v.t}</h3>
              <p className="mt-1 text-sm text-ink-mute">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 信源规则 */}
      <section className="mb-10">
        <h2 className="section-title mb-3">信源等级规则（公开透明）</h2>
        <div className="card divide-y divide-black/[0.06] overflow-hidden">
          {sourceLevelRules.map((r) => (
            <div key={r.level} className="flex items-start gap-3 p-3.5">
              <SourceBadge level={r.level} showLabel={false} />
              <div>
                <span className="text-sm font-semibold text-ink">{r.label}</span>
                <p className="text-xs text-ink-mute">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-mute">
          每条线索都展示来源数量、原始链接、信源等级、反方证据与「可能怎么失败」。当证据不足时，我们宁可写「当前无法判断」，也不强行给结论。
        </p>
      </section>

      {/* 人物索引（脱敏：方向示例） */}
      <section className="mb-10">
        <h2 className="section-title mb-1">人物 / 方向索引</h2>
        <p className="mb-3 text-xs text-ink-mute">
          不做饭圈、不做崇拜。为避免伪造真人数据，公开版以「方向示例 / 角色画像」呈现，不指名真实个人、不编造链接与观点。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {people.map((p) => (
            <div key={p.id} className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-ink">{p.name}</h3>
                <SourceBadge level={p.sourceLevel} showLabel={false} />
              </div>
              <p className="mt-1 text-xs text-ink-mute">方向：{p.direction}</p>
              <p className="mt-2 text-xs text-ink-soft">可学习：{p.learnFrom}</p>
              <p className="mt-1 text-xs text-ink-mute">不可盲目复制：{p.doNotCopy}</p>
              <p className="mt-1 text-xs text-amber-700">⚠️ {p.risk}</p>
              <p className="mt-2 text-[11px] text-ink-mute">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 脱敏与免责 */}
      <section className="mb-6">
        <h2 className="section-title mb-3">脱敏与内容治理</h2>
        <div className="card space-y-2 p-5 text-sm text-ink-soft">
          <p>· 本站为脱敏公开版：不写入任何私人联系方式、隐私经历、真实收入或商业机密。</p>
          <p>· 联系方式一律占位符（{siteConfig.contact.contactPlaceholder} / {siteConfig.contact.officialAccountQR}），上线由部署者配置。</p>
          <p>· 案例数据均为 demo / 待核验 / 灵感池，没有公开可核验链接的线索不会伪装成真实案例。</p>
          <p>· 收益相关内容固定展示风险提示，用户投稿一律人工审核。</p>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="text-sm font-semibold text-ink">免责声明</h2>
        <Disclaimer className="mt-2" />
        <p className="mt-3 text-xs text-amber-700">{siteConfig.riskLine}</p>
        <p className="mt-4 text-xs text-ink-mute">Created by {siteConfig.creator} · {siteConfig.version}</p>
      </section>
    </div>
  );
}
