import { useEffect, useState } from 'react';
import type { Opportunity } from '../types';
import { useFavorites, useActionStatus } from '../lib/storage';
import OpportunityRowCard from './OpportunityRowCard';
import OpportunityDetailDrawer from './OpportunityDetailDrawer';
import { useToast } from './Toast';

export default function OpportunityList({
  items,
  emptyHint = '换个关键词试试，机会可能还在路上 🌱',
  openId,
  onOpenChange,
}: {
  items: Opportunity[];
  emptyHint?: string;
  openId?: string | null;
  onOpenChange?: (id: string | null) => void;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { statusMap, setStatus } = useActionStatus();
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const toast = useToast();

  // 支持外部通过 id 打开详情（深链）
  useEffect(() => {
    if (!openId) return;
    const found = items.find((i) => i.id === openId);
    if (found) setSelected(found);
  }, [openId, items]);

  const open = (o: Opportunity) => {
    setSelected(o);
    onOpenChange?.(o.id);
  };
  const close = () => {
    setSelected(null);
    onOpenChange?.(null);
  };

  const onToggleFav = (o: Opportunity) => {
    toggleFavorite(o.id);
    toast(isFavorite(o.id) ? '已取消收藏' : '已收藏，可在收藏夹查看');
  };

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
        <span className="text-3xl">🔭</span>
        <p className="text-sm text-ink-mute">{emptyHint}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {items.map((o) => (
          <OpportunityRowCard
            key={o.id}
            opportunity={o}
            onOpen={() => open(o)}
            isFavorite={isFavorite(o.id)}
            onToggleFavorite={() => onToggleFav(o)}
            status={statusMap[o.id]}
            onSetStatus={(s) => setStatus(o.id, s)}
          />
        ))}
      </div>

      <OpportunityDetailDrawer
        opportunity={selected}
        onClose={close}
        isFavorite={selected ? isFavorite(selected.id) : false}
        onToggleFavorite={() => selected && onToggleFav(selected)}
        status={selected ? statusMap[selected.id] : undefined}
        onSetStatus={(s) => selected && setStatus(selected.id, s)}
      />
    </>
  );
}
