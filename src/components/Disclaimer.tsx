import { siteConfig } from '../data/siteConfig';

export default function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-ink-mute ${className}`}>
      {siteConfig.disclaimer}
    </p>
  );
}
