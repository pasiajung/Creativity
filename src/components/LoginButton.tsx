import { useAuth } from '../lib/AuthContext'
import Avatar from './Avatar'

/** 헤더 오른쪽 로그인/로그아웃 버튼과 프로필 */
export default function LoginButton() {
  const { enabled, loading, user, signIn, signOut } = useAuth()

  if (!enabled) {
    return (
      <button
        type="button"
        disabled
        title="로그인 기능은 준비 중입니다"
        className="cursor-not-allowed rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-400 dark:border-white/10 dark:text-slate-500"
      >
        로그인<span className="hidden sm:inline"> (준비 중)</span>
      </button>
    )
  }

  if (loading) {
    return <span aria-hidden="true" className="h-8 w-20 animate-pulse rounded-full bg-slate-100 dark:bg-white/5" />
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar name={user.displayName} photoURL={user.photoURL} size="sm" />
        <span className="hidden max-w-[8rem] truncate text-sm font-medium text-brand-950 lg:inline dark:text-white">{user.displayName}</span>
        <button
          type="button"
          onClick={signOut}
          className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 ring-1 ring-slate-200 transition hover:text-brand-900 hover:ring-brand-300 dark:text-slate-400 dark:ring-white/10 dark:hover:text-white"
        >
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={signIn}
      className="flex items-center gap-2 rounded-full bg-brand-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 dark:bg-accent-400 dark:text-brand-950 dark:hover:bg-accent-300"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1a5.94 5.94 0 010-11.88c1.84 0 3.07.78 3.78 1.46l2.58-2.49A9.4 9.4 0 0012 2.5a9.5 9.5 0 100 19c5.48 0 9.12-3.85 9.12-9.28 0-.62-.07-1.1-.16-1.57z" />
      </svg>
      <span>
        <span className="hidden sm:inline">Google </span>로그인
      </span>
    </button>
  )
}
