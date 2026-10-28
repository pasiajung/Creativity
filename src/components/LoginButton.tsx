/**
 * 헤더 오른쪽 로그인 버튼 자리.
 * Phase 1에서는 비활성 상태로 표시하고, Phase 2에서 Google 로그인/로그아웃·프로필 표시로 바뀝니다.
 */
export default function LoginButton() {
  return (
    <button
      type="button"
      disabled
      title="로그인 기능은 준비 중입니다"
      className="cursor-not-allowed rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500"
    >
      로그인<span className="hidden sm:inline"> (준비 중)</span>
    </button>
  )
}
