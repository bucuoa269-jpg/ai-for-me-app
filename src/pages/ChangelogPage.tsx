import PageHeader from '../components/PageHeader';
import Changelog from '../components/Changelog';

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="🧾 版本日志"
        title="版本日志"
        desc="记录每次新增与修改，公开透明。最后更新：2026-06-19。"
      />
      <Changelog />
    </div>
  );
}
