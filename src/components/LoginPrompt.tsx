import { useAuth } from '../lib/AuthContext'

/** 로그인하지 않은 사용자에게 보이는 안내 + 로그인 버튼 */
export default function LoginPrompt({ message }: { message: string }) {
  const { signIn, loading } = useAuth()
  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-5 sm:flex-row sm:items-center dark:border-white/15 dark:bg-white/[0.03]">
      <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
      <button
        type="button"
        onClick={signIn}
        disabled={loading}
        className="shrink-0 rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50 dark:bg-accent-400 dark:text-brand-950"
      >
        Google 계정으로 로그인
      </button>
    </div>
  )
}
