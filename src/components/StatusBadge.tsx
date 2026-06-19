import type { OpportunityStatus } from '../types';

const styles: Record<OpportunityStatus, string> = {
  新鲜: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  待核验: 'bg-amber-50 text-amber-700 ring-amber-200',
  灵感池: 'bg-iris-50 text-iris-700 ring-iris-200',
  风险榜: 'bg-rose-50 text-rose-700 ring-rose-200',
  已过期: 'bg-black/[0.04] text-ink-mute ring-black/10',
};

export default function StatusBadge({ status }: { status: OpportunityStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}
