import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { discussionService, type Comment, type PageCursor } from '../services'
import { formatDateTime } from '../lib/format'

interface DiscussionSectionProps {
  /** 댓글이 달리는 대상. 예: "research-{slug}", "teaching-{slug}" */
  targetId: string
}

/**
 * 연구·수업 상세 페이지 하단의 토론(댓글) 영역.
 * Phase 1에서는 "준비 중" 안내만 보이고, Phase 2에서 로그인한 동료 교수님이 댓글을 쓸 수 있게 됩니다.
 */
export default function DiscussionSection({ targetId }: DiscussionSectionProps) {
  const available = discussionService.isAvailable
  const [comments, setComments] = useState<Comment[]>([])
  const [cursor, setCursor] = useState<PageCursor | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!available) return
    let cancelled = false
    setLoading(true)
    setError(null)
    discussionService
      .listComments(targetId)
      .then((page) => {
        if (cancelled) return
        setComments(page.items)
        setCursor(page.nextCursor)
      })
      .catch(() => !cancelled && setError('댓글을 불러오지 못했습니다.'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [available, targetId])

  async function loadMore() {
    setLoading(true)
    try {
      const page = await discussionService.listComments(targetId, cursor)
      setComments((prev) => [...prev, ...page.items])
      setCursor(page.nextCursor)
    } catch {
      setError('댓글을 더 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="discussion-heading" className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
      <h2 id="discussion-heading" className="text-xl font-bold text-slate-900 dark:text-white">
        토론
      </h2>

      {!available ? (
        <div className="mt-4 rounded-xl border border-dashed border-brand-200 bg-brand-50/60 p-5 text-slate-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-slate-300">
          <p className="font-medium">댓글 기능은 준비 중입니다.</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            곧 Google 계정으로 로그인한 동료 교수님들이 이 글에 의견을 남길 수 있게 됩니다. 그 전에는{' '}
            <Link to="/about" className="font-medium text-brand-700 underline underline-offset-2 dark:text-brand-300">
              연락처
            </Link>
            로 의견을 보내 주세요.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          {error && (
            <p role="alert" className="mb-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          )}
          {comments.length === 0 && !loading && !error && (
            <p className="text-slate-500 dark:text-slate-400">아직 댓글이 없습니다. 첫 의견을 남겨 주세요.</p>
          )}
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {c.authorName}{' '}
                  <span className="font-normal text-slate-500 dark:text-slate-400">· {formatDateTime(c.createdAt)}</span>
                </p>
                {/* 사용자 입력은 일반 텍스트로만 표시하고 줄바꿈만 유지합니다 */}
                <p className="mt-2 whitespace-pre-line text-slate-700 dark:text-slate-300">{c.text}</p>
              </li>
            ))}
          </ul>
          {cursor !== null && (
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-900"
            >
              {loading ? '불러오는 중…' : '더 보기'}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
