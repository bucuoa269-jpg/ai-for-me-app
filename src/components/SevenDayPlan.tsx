import { useState } from 'react';
import type { Opportunity } from '../types';
import { generateSevenDayPlan, planToText } from '../lib/sevenDayPlan';
import { useToast } from './Toast';

export default function SevenDayPlan({ opportunity }: { opportunity: Opportunity }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const plan = generateSevenDayPlan(opportunity);

  const copyPlan = async () => {
    const text = planToText(opportunity, plan);
    try {
      await navigator.clipboard.writeText(text);
      toast('已复制 7 天计划到剪贴板');
    } catch {
      toast('复制失败，请手动选择文本');
    }
  };

  return (
    <div className="rounded-2xl border border-iris-200/70 bg-iris-50/40 p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-ink">🎯 我想做这个</h4>
        {!open ? (
          <button onClick={() => setOpen(true)} className="btn-iris text-xs">
            生成 7 天验证计划
          </button>
        ) : (
          <button onClick={copyPlan} className="btn-ghost text-xs">
            复制计划
          </button>
        )}
      </div>

      {open && (
        <ol className="mt-3 space-y-2">
          {plan.map((d) => (
            <li
              key={d.day}
              className="flex gap-3 rounded-xl border border-black/[0.05] bg-white/70 p-3"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">
                {d.day}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{d.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-mute">{d.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {open && (
        <p className="mt-3 text-[11px] text-ink-mute">
          本计划为本地模板生成，仅供参考；不保证收益，请自行验证，并注意合同、资金与人身安全。
        </p>
      )}
    </div>
  );
}
