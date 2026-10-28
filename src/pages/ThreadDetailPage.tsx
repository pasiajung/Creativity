import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Avatar from '../components/Avatar'
import CategoryBadge from '../components/CategoryBadge'
import CommentPanel from '../components/CommentPanel'
import ThreadForm from '../components/ThreadForm'
import { useAuth } from '../lib/AuthContext'
import { formatDateTime } from '../lib/format'
import { findTarget } from '../lib/targets'
import { usePageTitle } from '../lib/usePageTitle'
import { COMMENT_MAX_LENGTH, discussionService, type Thread } from '../services'
import NotFoundPage from './NotFoundPage'

const H2 =
  'flex items-center gap-2.5 text-xl font-semibold text-brand-950 before:h-4 before:w-1 before:rounded-full before:bg-accent-400 dark:text-white'

export default function ThreadDetailPage() {
  const { threadId = '' } = useParams()
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()
  const [thread, setThread] = useState<Thread | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading')
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  usePageTitle(status === 'notfound' ? '페이지를 찾을 수 없음' : (thread?.title ?? '토론'))

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    discussionService
      .getThread(threadId)
      .then((t) => {
        if (cancelled) return
        setThread(t)
        setStatus(t ? 'ready' : 'notfound')
      })
      .catch(() => !cancelled && setStatus('error'))
    return () => {
      cancelled = true
    }
  }, [threadId])

  if (status === 'notfound') return <NotFoundPage />
  if (status === 'error') return <p role="alert">글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
  if (status === 'loading' || !thread) return <p className="text-slate-500">불러오는 중…</p>

  const canEdit = !!user && (user.uid === thread.authorId || isAdmin)
  const related = findTarget(thread.relatedTargetId)

  async function handleDelete() {
    if (!window.confirm('이 글을 삭제할까요? 삭제하면 되돌릴 수 없습니다.')) return
    setDeleting(true)
    try {
      await discussionService.deleteThread(threadId)
      navigate('/discussion', { replace: true })
    } catch {
      window.alert('삭제하지 못했습니다.')
      setDeleting(false)
    }
  }

  return (
    <article>
      <nav aria-label="이동 경로" className="mb-4 text-sm">
        <Link to="/discussion" className="text-brand-700 hover:underline dark:text-brand-300">
          ← 토론 목록
        </Link>
      </nav>

      {editing ? (
        <>
          <h1 className="mb-8 text-2xl font-bold text-brand-950 dark:text-white">글 수정</h1>
          <ThreadForm
            initial={thread}
            submitLabel="수정 완료"
            onCancel={() => setEditing(false)}
            onSubmit={async (input) => {
              await discussionService.updateThread(threadId, input)
              setThread({ ...thread, ...input, updatedAt: new Date() })
              setEditing(false)
            }}
          />
        </>
      ) : (
        <>
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
              <CategoryBadge category={thread.category} />
              {related && (
                <Link to={related.path} className="text-brand-700 hover:underline dark:text-brand-200">
                  관련 {related.group}: {related.label}
                </Link>
              )}
            </div>
            <h1 className="text-3xl leading-tight font-bold tracking-tight text-brand-950 dark:text-white">{thread.title}</h1>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={thread.authorName} photoURL={thread.authorPhoto} />
                <p className="text-sm">
                  <span className="font-semibold text-brand-950 dark:text-white">{thread.authorName}</span>
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    <time dateTime={thread.createdAt.toISOString()}>{formatDateTime(thread.createdAt)}</time>
                    {thread.updatedAt && ' (수정됨)'}
                  </span>
                </p>
              </div>
              {canEdit && (
                <div className="flex gap-2 text-sm">
                  <button type="button" onClick={() => setEditing(true)} className="rounded-full px-4 py-1.5 font-medium text-slate-600 ring-1 ring-slate-200 hover:text-brand-900 dark:text-slate-300 dark:ring-white/15">
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-full px-4 py-1.5 font-medium text-rose-700 ring-1 ring-rose-200 hover:bg-rose-50 disabled:opacity-50 dark:text-rose-300 dark:ring-rose-900 dark:hover:bg-rose-950/50"
                  >
                    {deleting ? '삭제 중…' : '삭제'}
                  </button>
                </div>
              )}
            </div>
            <div aria-hidden="true" className="mt-6 flex h-px">
              <span className="w-16 bg-accent-400" />
              <span className="flex-1 bg-slate-200 dark:bg-white/10" />
            </div>
          </header>
          {/* 사용자 입력은 일반 텍스트로만 표시하고 줄바꿈만 유지합니다 */}
          <p className="text-[17px] leading-8 whitespace-pre-line text-slate-700 dark:text-slate-300">{thread.body}</p>
        </>
      )}

      <section aria-labelledby="replies-heading" className="mt-16 border-t border-slate-200 pt-10 dark:border-white/10">
        <h2 id="replies-heading" className={`${H2} mb-6`}>
          답글 <span className="text-base font-medium text-slate-500">{thread.replyCount}</span>
        </h2>
        <CommentPanel
          listKey={threadId}
          noun="답글"
          maxLength={COMMENT_MAX_LENGTH}
          load={(cursor) => discussionService.listReplies(threadId, cursor)}
          add={(text) => discussionService.addReply(threadId, text)}
          update={(id, text) => discussionService.updateReply(threadId, id, text)}
          remove={(id) => discussionService.deleteReply(threadId, id)}
          onCountChange={(delta) => setThread((t) => (t ? { ...t, replyCount: Math.max(0, t.replyCount + delta) } : t))}
        />
      </section>
    </article>
  )
}
