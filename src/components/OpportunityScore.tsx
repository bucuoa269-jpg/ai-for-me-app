import { scoreTone } from '../lib/scoring';

export default function OpportunityScore({
  score,
  size = 'md',
}: {
  score: number;
  size?: 'sm' | 'md';
}) {
  const tone = scoreTone(score);
  const dim = size === 'sm' ? 'h-9 w-9 text-sm' : 'h-12 w-12 text-base';
  return (
    <div className="flex flex-col items-center" title="机会分（仅辅助，不构成收益承诺）">
      <div
        className={`flex ${dim} items-center justify-center rounded-full border border-black/[0.06] bg-white font-semibold shadow-soft ${tone.className}`}
      >
        {score}
      </div>
      <span className={`mt-1 text-[10px] ${tone.className}`}>{tone.label}</span>
    </div>
  );
}
