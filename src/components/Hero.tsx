import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="chip bg-white/70">
            ✨ 不追热点，追真实付款信号
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            AI <span className="bg-gradient-to-r from-iris-600 to-gold-500 bg-clip-text text-transparent">For Me</span>
            <br />
            为我而生的 AI 时代
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            把 AI 时代分散、混乱、真假难辨的信息，<strong className="text-ink">提纯</strong>成普通人、大学生和年轻人能看懂、能判断、能点击原始信源、能形成
            <strong className="text-ink"> 7 天行动计划</strong>的财富机会与副业 / 学习线索地图。
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/opportunities" className="btn-primary">
              进入今日线索 →
            </Link>
            <Link to="/learning" className="btn-ghost">
              AI 小白 7 天路线
            </Link>
            <Link to="/risk-radar" className="btn-ghost">
              风险雷达 / 避坑
            </Link>
          </div>

          <p className="mt-5 text-xs text-ink-mute">
            {siteConfig.riskLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
