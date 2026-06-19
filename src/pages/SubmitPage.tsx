import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useToast } from '../components/Toast';
import { siteConfig } from '../data/siteConfig';

interface FormState {
  title: string;
  type: string;
  link: string;
  platform: string;
  city: string;
  why: string;
  payer: string;
  deliverable: string;
  risk: string;
  nickname: string;
  willInterview: boolean;
}

const empty: FormState = {
  title: '',
  type: '',
  link: '',
  platform: '',
  city: '',
  why: '',
  payer: '',
  deliverable: '',
  risk: '',
  nickname: '',
  willInterview: false,
};

function Input({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    'mt-1 w-full rounded-xl border border-black/[0.08] bg-white/80 px-3 py-2 text-sm outline-none transition-colors focus:border-iris-300';
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-soft">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>(empty);
  const toast = useToast();
  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const buildDraft = () => {
    return [
      '【AI For Me 线索投稿】',
      `标题：${form.title}`,
      `机会类型：${form.type}`,
      `原始链接：${form.link}`,
      `平台：${form.platform}`,
      `城市：${form.city}`,
      `为什么有价值：${form.why}`,
      `付款人是谁：${form.payer}`,
      `交付物是什么：${form.deliverable}`,
      `风险 / 不确定点：${form.risk}`,
      `投稿人昵称：${form.nickname || '（匿名）'}`,
      `是否愿意被采访：${form.willInterview ? '是' : '否'}`,
    ].join('\n');
  };

  const onCopy = async () => {
    if (!form.title.trim()) {
      toast('请至少填写标题');
      return;
    }
    try {
      await navigator.clipboard.writeText(buildDraft());
      toast('已复制投稿草稿，可粘贴到投稿入口');
    } catch {
      toast('复制失败，请手动选择文本');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="✍️ 共建"
        title="提交线索"
        desc="投稿经人工审核后才会收录，不会自动上首页。优质投稿者可获得会员额度或专栏采访名额。"
      />

      <div className="card mb-6 space-y-1 p-4 text-xs text-ink-mute">
        <p className="font-medium text-ink">投稿前请阅读：</p>
        <p>· 请勿提交他人隐私、未公开联系方式、内部资料或商业机密。</p>
        <p>· 请提供可公开访问的原始链接；无法核验的线索会被标记为「待核验 / 灵感池」。</p>
        <p>· 不收录灰色、擦边、夸大收益、违法违规项目。</p>
      </div>

      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="sm:col-span-2">
          <Input label="标题" value={form.title} onChange={(v) => set({ title: v })} placeholder="一句话描述这条机会" required />
        </div>
        <Input label="机会类型" value={form.type} onChange={(v) => set({ type: v })} placeholder="如 AI 设计 / 内容变现 / 本地服务" />
        <Input label="平台" value={form.platform} onChange={(v) => set({ platform: v })} placeholder="如 内容平台 / 短视频平台" />
        <div className="sm:col-span-2">
          <Input label="原始链接" value={form.link} onChange={(v) => set({ link: v })} placeholder="可公开访问的链接；没有可留空" />
        </div>
        <Input label="城市" value={form.city} onChange={(v) => set({ city: v })} placeholder="如 成都 / 全国" />
        <Input label="付款人是谁" value={form.payer} onChange={(v) => set({ payer: v })} placeholder="谁会为此付钱" />
        <div className="sm:col-span-2">
          <Input label="为什么觉得它有价值" value={form.why} onChange={(v) => set({ why: v })} placeholder="真实付款信号 / 你的观察" textarea />
        </div>
        <div className="sm:col-span-2">
          <Input label="交付物是什么" value={form.deliverable} onChange={(v) => set({ deliverable: v })} placeholder="客户最终拿到什么" textarea />
        </div>
        <div className="sm:col-span-2">
          <Input label="风险 / 不确定点" value={form.risk} onChange={(v) => set({ risk: v })} placeholder="可能怎么失败、需要核验什么" textarea />
        </div>
        <Input label="投稿人昵称（可选）" value={form.nickname} onChange={(v) => set({ nickname: v })} placeholder="匿名亦可" />
        <label className="flex items-center gap-2 self-end text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={form.willInterview}
            onChange={(e) => set({ willInterview: e.target.checked })}
            className="h-4 w-4 rounded border-black/20"
          />
          愿意被采访
        </label>

        <div className="sm:col-span-2 mt-2 flex flex-wrap items-center gap-3">
          <button type="button" onClick={onCopy} className="btn-iris">
            生成并复制投稿草稿
          </button>
          {siteConfig.contact.submitFormUrl ? (
            <a href={siteConfig.contact.submitFormUrl} target="_blank" rel="noreferrer noopener" className="btn-ghost">
              前往投稿入口 →
            </a>
          ) : (
            <span className="text-xs text-ink-mute">
              投稿入口（GitHub Issue / 表单 / 邮箱）占位，上线后由后台配置。
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
