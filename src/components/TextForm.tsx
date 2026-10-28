import { useId, useState } from 'react'

interface TextFormProps {
  label: string
  maxLength: number
  initialValue?: string
  placeholder?: string
  submitLabel: string
  onSubmit: (text: string) => Promise<void>
  onCancel?: () => void
  /** 저장 후 입력칸을 비울지 (새 댓글은 true, 수정은 false) */
  resetOnSubmit?: boolean
  autoFocus?: boolean
}

/** 댓글·답글 입력(새로 쓰기와 수정에 함께 사용). 글자 수를 보여주고 최대 길이를 넘지 못하게 합니다. */
export default function TextForm({
  label,
  maxLength,
  initialValue = '',
  placeholder,
  submitLabel,
  onSubmit,
  onCancel,
  resetOnSubmit = true,
  autoFocus,
}: TextFormProps) {
  const id = useId()
  const [text, setText] = useState(initialValue)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const empty = text.trim() === ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (empty || text.length > maxLength) return
    setSaving(true)
    setError(null)
    try {
      await onSubmit(text.trim())
      if (resetOnSubmit) setText('')
    } catch {
      setError('저장하지 못했습니다. 로그인 상태를 확인한 뒤 다시 시도해 주세요.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        value={text}
        maxLength={maxLength}
        rows={resetOnSubmit ? 4 : 5}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(e) => setText(e.target.value)}
        aria-describedby={`${id}-count`}
        className="block w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 leading-relaxed shadow-sm placeholder:text-slate-400 focus:border-brand-400 dark:border-white/15 dark:bg-ink-900"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p id={`${id}-count`} className="text-xs text-slate-500 tabular-nums dark:text-slate-400">
          {text.length.toLocaleString()} / {maxLength.toLocaleString()}자
        </p>
        <div className="flex gap-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5">
              취소
            </button>
          )}
          <button
            type="submit"
            disabled={saving || empty}
            className="rounded-full bg-brand-900 px-5 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-accent-400 dark:text-brand-950 dark:hover:bg-accent-300"
          >
            {saving ? '저장 중…' : submitLabel}
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}
    </form>
  )
}
