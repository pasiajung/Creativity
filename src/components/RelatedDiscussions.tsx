import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { discussionService, type Thread } from '../services'

/** 이 연구·수업과 연결된 토론 글 목록과 "이 주제로 토론 글 쓰기" 링크 */
export default function RelatedDiscussions({ targetId }: { targetId: string }) {
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    let cancelled = false
    discussionService
      .listRelatedThreads(targetId)
      .then((list) => !cancelled && setThreads(list))
      .catch(() => {
        // 관련 토론을 불러오지 못해도 댓글 영역은 그대로 보여줍니다.
      })
    return () => {
      cancelled = true
    }
  }, [targetId])

  return (
    <div className="mb-8 rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-200 dark:bg-white/[0.03] dark:ring-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-brand-950 dark:text-white">관련 토론</h3>
        <Link
          to={`/discussion/new?related=${encodeURIComponent(targetId)}`}
          className="text-sm font-medium text-brand-700 underline-offset-4 hover:text-accent-600 hover:underline dark:text-brand-200 dark:hover:text-accent-300"
        >
          이 주제로 토론 글 쓰기 →
        </Link>
      </div>
      {threads.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {threads.map((t) => (
            <li key={t.id} className="text-sm">
              <Link to={`/discussion/${t.id}`} className="text-slate-700 hover:text-brand-700 hover:underline dark:text-slate-300 dark:hover:text-white">
                {t.title}
              </Link>
              <span className="ml-2 text-xs text-slate-500">답글 {t.replyCount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">아직 연결된 토론 글이 없습니다.</p>
      )}
    </div>
  )
}
