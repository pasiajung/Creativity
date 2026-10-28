import { useState } from 'react'
import { formatDateTime } from '../lib/format'
import type { Comment } from '../services'
import Avatar from './Avatar'
import TextForm from './TextForm'

interface CommentItemProps {
  comment: Comment
  canEdit: boolean
  maxLength: number
  onUpdate: (text: string) => Promise<void>
  onDelete: () => Promise<void>
}

export default function CommentItem({ comment, canEdit, maxLength, onUpdate, onDelete }: CommentItemProps) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!window.confirm('이 댓글을 삭제할까요? 삭제하면 되돌릴 수 없습니다.')) return
    setDeleting(true)
    setError(null)
    try {
      await onDelete()
    } catch {
      setError('삭제하지 못했습니다.')
      setDeleting(false)
    }
  }

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-ink-900">
      <div className="flex items-start gap-3">
        <Avatar name={comment.authorName} photoURL={comment.authorPhoto} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="text-sm">
              <span className="font-semibold text-brand-950 dark:text-white">{comment.authorName}</span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">
                <time dateTime={comment.createdAt.toISOString()}>{formatDateTime(comment.createdAt)}</time>
                {comment.updatedAt && ' (수정됨)'}
              </span>
            </p>
            {canEdit && !editing && (
              <div className="flex gap-1 text-xs">
                <button type="button" onClick={() => setEditing(true)} className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-brand-900 dark:hover:bg-white/5 dark:hover:text-white">
                  수정
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-md px-2 py-1 text-slate-500 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50 dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
                >
                  {deleting ? '삭제 중…' : '삭제'}
                </button>
              </div>
            )}
          </div>
          {editing ? (
            <div className="mt-3">
              <TextForm
                label="댓글 수정"
                maxLength={maxLength}
                initialValue={comment.text}
                submitLabel="수정 완료"
                resetOnSubmit={false}
                autoFocus
                onCancel={() => setEditing(false)}
                onSubmit={async (text) => {
                  await onUpdate(text)
                  setEditing(false)
                }}
              />
            </div>
          ) : (
            // 사용자 입력은 일반 텍스트로만 표시하고 줄바꿈만 유지합니다
            <p className="mt-2 leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">{comment.text}</p>
          )}
          {error && (
            <p role="alert" className="mt-2 text-sm text-rose-700 dark:text-rose-300">
              {error}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}
