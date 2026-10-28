import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { AFFILIATION_MAX_LENGTH } from '../services/userService'

/** 첫 로그인 때 한 번 소속(선택)을 묻는 창 */
export default function AffiliationDialog() {
  const { needsAffiliation, user, saveAffiliation, dismissAffiliation } = useAuth()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (needsAffiliation && !dialog.open) dialog.showModal()
    if (!needsAffiliation && dialog.open) dialog.close()
  }, [needsAffiliation])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) {
      dismissAffiliation()
      return
    }
    setSaving(true)
    setError(null)
    try {
      await saveAffiliation(value)
    } catch {
      setError('저장하지 못했습니다. 다시 시도해 주세요.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="affiliation-title"
      onClose={dismissAffiliation}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 text-slate-700 shadow-2xl backdrop:bg-brand-950/50 backdrop:backdrop-blur-sm dark:bg-ink-900 dark:text-slate-300"
    >
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <h2 id="affiliation-title" className="text-xl font-bold text-brand-950 dark:text-white">
          환영합니다{user ? `, ${user.displayName} 님` : ''}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          소속을 알려 주시면 사이트 운영에 참고하겠습니다. 입력하지 않아도 모든 기능을 쓸 수 있습니다.
        </p>
        <label htmlFor="affiliation" className="mt-5 block text-sm font-medium text-brand-950 dark:text-white">
          소속 <span className="font-normal text-slate-500">(선택)</span>
        </label>
        <input
          id="affiliation"
          value={value}
          maxLength={AFFILIATION_MAX_LENGTH}
          onChange={(e) => setValue(e.target.value)}
          placeholder="예: ○○대학교 ○○학과"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-white/15 dark:bg-ink-950"
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={dismissAffiliation} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5">
            건너뛰기
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-brand-900 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50 dark:bg-accent-400 dark:text-brand-950"
          >
            {saving ? '저장 중…' : '저장'}
          </button>
        </div>
      </form>
    </dialog>
  )
}
