import { useAuth } from '../lib/AuthContext'

/** 로그인 중 생긴 문제를 헤더 아래에 알려줍니다. */
export default function AuthErrorBanner() {
  const { error, clearError } = useAuth()
  if (!error) return null
  return (
    <div role="alert" className="border-b border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 text-sm sm:px-6">
        <p>{error}</p>
        <button type="button" onClick={clearError} className="shrink-0 rounded-md px-2 py-1 font-medium hover:bg-rose-100 dark:hover:bg-rose-900">
          닫기
        </button>
      </div>
    </div>
  )
}
