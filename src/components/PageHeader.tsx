import type { ReactNode } from 'react';

export default function PageHeader({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 animate-fade-up">
      {eyebrow && <span className="chip bg-white/70">{eyebrow}</span>}
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
      {desc && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-mute">{desc}</p>}
      {children}
    </div>
  );
}
