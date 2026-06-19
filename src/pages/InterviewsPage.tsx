import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InterviewCard from '../components/InterviewCard';
import { interviews } from '../data/interviews';

export default function InterviewsPage() {
  const [onlyFail, setOnlyFail] = useState(false);
  const list = onlyFail ? interviews.filter((i) => i.isFailureCase) : interviews;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="🎙️ 深访矿脉"
        title="从访谈与复盘中提炼可执行机会"
        desc="一句话结论 + 可复制机会 + 不可复制条件 + 付款信号 + 第一行动。含失败复盘，提醒幸存者偏差。以下均为 demo / 待核验，请以公开原文为准。"
      />

      <div className="mb-5 flex items-center gap-2">
        <button
          onClick={() => setOnlyFail(false)}
          className={!onlyFail ? 'btn-primary text-xs' : 'btn-ghost text-xs'}
        >
          全部（{interviews.length}）
        </button>
        <button
          onClick={() => setOnlyFail(true)}
          className={onlyFail ? 'btn-primary text-xs' : 'btn-ghost text-xs'}
        >
          常见避坑 / 失败复盘（{interviews.filter((i) => i.isFailureCase).length}）
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((it) => (
          <InterviewCard key={it.id} interview={it} />
        ))}
      </div>
    </div>
  );
}
