import { Link } from 'react-router-dom';

export default function SubmitLeadCTA({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link to="/submit" className="btn-ghost text-xs">
        ✍️ 提交线索
      </Link>
    );
  }
  return (
    <div className="card card-hover flex flex-col items-start gap-3 bg-gradient-to-br from-iris-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-ink">发现了一条好机会？</h3>
        <p className="mt-1 text-xs text-ink-mute">
          投稿经人工审核后收录，优质投稿者可获专栏采访名额。请勿提交他人隐私或未公开信息。
        </p>
      </div>
      <Link to="/submit" className="btn-iris shrink-0">
        我要投稿
      </Link>
    </div>
  );
}
