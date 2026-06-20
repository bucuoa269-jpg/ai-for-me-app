import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/[0.06] bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-iris-500 to-gold-500 text-xs font-bold text-white">
                AI
              </span>
              <span className="text-sm font-semibold">{siteConfig.name}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-mute">
              {siteConfig.slogan}
              <br />
              {siteConfig.subSlogan}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-ink">逛一逛</h4>
            <ul className="mt-3 space-y-2 text-xs text-ink-mute">
              <li><Link to="/opportunities" className="hover:text-ink">机会线索库</Link></li>
              <li><Link to="/interviews" className="hover:text-ink">深访矿脉</Link></li>
              <li><Link to="/cities" className="hover:text-ink">城市地图</Link></li>
              <li><Link to="/learning" className="hover:text-ink">AI 学习路线</Link></li>
              <li><Link to="/links" className="hover:text-ink">线索链接库</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-ink">了解我们</h4>
            <ul className="mt-3 space-y-2 text-xs text-ink-mute">
              <li><Link to="/risk-radar" className="hover:text-ink">风险雷达 / 避坑</Link></li>
              <li><Link to="/about" className="hover:text-ink">信源规则 / 免责声明</Link></li>
              <li><Link to="/submit" className="hover:text-ink">提交线索 / 共建</Link></li>
              <li><Link to="/changelog" className="hover:text-ink">版本日志</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-ink">联系（占位）</h4>
            <ul className="mt-3 space-y-2 text-xs text-ink-mute">
              <li>公众号：{siteConfig.contact.officialAccountQR}</li>
              <li>联系：{siteConfig.contact.contactPlaceholder}</li>
              <li>合作：{siteConfig.contact.cooperationEntry}</li>
            </ul>
            <p className="mt-3 text-[11px] text-ink-mute">
              公开版仅保留创作者昵称，不展示私人联系方式。
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-black/[0.06] pt-6">
          <p className="text-[11px] leading-relaxed text-ink-mute">
            {siteConfig.disclaimer}
          </p>
          <p className="mt-2 text-[11px] text-amber-700/90">{siteConfig.riskLine}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-mute">
            <span>Created by {siteConfig.creator} · {siteConfig.version}</span>
            <span>所有案例均为 demo / 待核验 / 灵感池，不构成收益承诺。</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
