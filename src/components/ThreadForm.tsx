import { useState } from 'react'
import { discussionTargets } from '../lib/targets'
import {
  THREAD_BODY_MAX_LENGTH,
  THREAD_CATEGORIES,
  THREAD_TITLE_MAX_LENGTH,
  type ThreadCategory,
  type ThreadInput,
} from '../services'

interface ThreadFormProps {
  initial?: Partial<ThreadInput>
  submitLabel: string
  onSubmit: (input: ThreadInput) => Promise<void>
  onCancel: () => void
}

const field =
  'mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:border-brand-400 dark:border-white/15 dark:bg-ink-900'
const labelClass = 'block text-sm font-semibold text-brand-950 dark:text-white'
const counter = 'mt-1 text-right text-xs text-slate-500 tabular-nums dark:text-slate-400'

/** 토론 글 작성·수정 양식 */
export default function ThreadForm({ initial, submitLabel, onSubmit, onCancel }: ThreadFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [body, setBody] = useState(initial?.body ?? '')
  const [category, setCategory] = useState<ThreadCategory>(initial?.category ?? '자유')
  const [related, setRelated] = useState(initial?.relatedTargetId ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const invalid = title.trim() === '' || body.trim() === ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (invalid) return
    setSaving(true)
    setError(null)
    try {
      await onSubmit({ title: title.trim(), body: body.trim(), category, relatedTargetId: related || null })
    } catch {
      setError('저장하지 못했습니다. 로그인 상태와 컴퓨터의 날짜·시간 설정을 확인한 뒤 다시 시도해 주세요.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="thread-category" className={labelClass}>
            주제
          </label>
          <select id="thread-category" value={category} onChange={(e) => setCategory(e.target.value as ThreadCategory)} className={field}>
            {THREAD_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="thread-related" className={labelClass}>
            관련 연구·수업 <span className="font-normal text-slate-500">(선택)</span>
          </label>
          <select id="thread-related" value={related} onChange={(e) => setRelated(e.target.value)} className={field}>
            <option value="">연결하지 않음</option>
            {(['연구', '수업'] as const).map((group) => (
              <optgroup key={group} label={group}>
                {discussionTargets
                  .filter((t) => t.group === group)
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="thread-title" className={labelClass}>
          제목
        </label>
        <input id="thread-title" value={title} maxLength={THREAD_TITLE_MAX_LENGTH} onChange={(e) => setTitle(e.target.value)} className={field} required />
        <p className={counter}>
          {title.length} / {THREAD_TITLE_MAX_LENGTH}자
        </p>
      </div>

      <div>
        <label htmlFor="thread-body" className={labelClass}>
          내용
        </label>
        <textarea
          id="thread-body"
          value={body}
          rows={12}
          maxLength={THREAD_BODY_MAX_LENGTH}
          onChange={(e) => setBody(e.target.value)}
          className={`${field} resize-y leading-relaxed`}
          required
        />
        <p className={counter}>
          {body.length.toLocaleString()} / {THREAD_BODY_MAX_LENGTH.toLocaleString()}자
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5">
          취소
        </button>
        <button
          type="submit"
          disabled={saving || invalid}
          className="rounded-full bg-brand-900 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-accent-400 dark:text-brand-950 dark:hover:bg-accent-300"
        >
          {saving ? '저장 중…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
