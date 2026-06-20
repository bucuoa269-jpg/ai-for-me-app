import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

const links = [
  { to: '/opportunities', label: '今日线索' },
  { to: '/interviews', label: '深访矿脉' },
  { to: '/cities', label: '城市地图' },
  { to: '/learning', label: 'AI 学习' },
  { to: '/risk-radar', label: '风险雷达' },
  { to: '/links', label: '链接库' },
  { to: '/submit', label: '提交线索' },
  { to: '/about', label: '关于' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] glass">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-iris-500 to-gold-500 text-xs font-bold text-white">
            AI
          </span>
          <span className="text-sm font-semibold tracking-tight">{siteConfig.name}</span>
          <span className="hidden text-xs text-ink-mute sm:inline">为我而生的 AI 时代</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-ink text-white'
                    : 'text-ink-soft hover:bg-black/[0.04]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="btn-ghost lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="菜单"
          aria-expanded={open}
        >
          {open ? '关闭' : '菜单'}
        </button>
      </div>

      {open && (
        <nav className="grid grid-cols-2 gap-1 border-t border-black/[0.06] bg-white/90 px-4 py-3 lg:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm ${
                  isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-black/[0.04]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
