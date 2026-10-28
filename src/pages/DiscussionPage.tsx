import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import PageHeader from '../components/PageHeader'
import ThreadListItem from '../components/ThreadListItem'
import { useAuth } from '../lib/AuthContext'
import { usePageTitle } from '../lib/usePageTitle'
import { THREAD_CATEGORIES, discussionService, type PageCursor, type Thread, type ThreadCategory } from '../services'

function isCategory(value: string | null): value is ThreadCategory {
  return value !== null && (THREAD_CATEGORIES as readonly string[]).includes(value)
}

export default function DiscussionPage() {
  usePageTitle('토론')
  const { user, signIn } = useAuth()
  const [params, setParams] = useSearchParams()
  const categoryParam = params.get('category')
  const category = isCategory(categoryParam) ? categoryParam : null

  const [threads, setThreads] = useState<Thread[]>([])
  const [cursor, setCursor] = useState<PageCursor | null>(null)
  const [loading, setLoading] = useState(discussionService.isAvailable)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!discussionService.isAvailable) return
    let cancelled = false
    setLoading(true)
    setError(null)
    discussionService
      .listThreads({ category })
      .then((page) => {
        if (cancelled) return
        setThreads(page.items)
        setCursor(page.nextCursor)
      })
      .catch(() => !cancelled && setError('글 목록을 불러오지 못했습니다.'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [category])

  async function loadMore() {
    setLoading(true)
    try {
      const page = await discussionService.listThreads({ category, cursor })
      setThreads((prev) => [...prev, ...page.items.filter((t) => !prev.some((p) => p.id === t.id))])
      setCursor(page.nextCursor)
    } catch {
      setError('글을 더 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const filterButton = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active
        ? 'bg-brand-900 text-white shadow-sm dark:bg-accent-400 dark:text-brand-950'
        : 'bg-white text-slate-600 ring-1 ring-slate-200 ring-inset hover:bg-slate-50 hover:text-brand-900 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-white/10'
    }`

  if (!discussionService.isAvailable) {
    return (
      <>
        <PageHeader title="토론" description="동료 교수님들과 연구·수업 방식·자료에 대한 의견을 나누는 게시판입니다." />
        <section className="rounded-3xl border border-accent-200 bg-gradient-to-br from-accent-50 via-white to-brand-50 p-10 text-center dark:border-accent-700/40 dark:from-accent-700/10 dark:via-ink-900 dark:to-brand-900/40">
          <h2 className="text-xl font-semibold text-brand-950 dark:text-white">토론 게시판은 준비 중입니다</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
            곧 Google 계정으로 로그인해 글을 쓰고 답글을 달 수 있게 됩니다. 그동안 의견은{' '}
            <Link to="/about" className="font-medium text-brand-700 underline underline-offset-2 dark:text-brand-300">
              연락처
            </Link>
            로 보내 주세요.
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader title="토론" description="동료 교수님들과 연구·수업 방식·자료에 대한 의견을 나누는 게시판입니다." />

      <div className="mb-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="주제 필터" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={category === null} className={filterButton(category === null)} onClick={() => setParams({}, { replace: true })}>
            전체
          </button>
          {THREAD_CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={category === c} className={filterButton(category === c)} onClick={() => setParams({ category: c }, { replace: true })}>
              {c}
            </button>
          ))}
        </div>
        {user ? (
          <Link
            to="/discussion/new"
            className="shrink-0 self-start rounded-full bg-brand-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 dark:bg-accent-400 dark:text-brand-950 dark:hover:bg-accent-300"
          >
            새 글 쓰기
          </Link>
        ) : (
          <button
            type="button"
            onClick={signIn}
            className="shrink-0 self-start rounded-full bg-brand-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 dark:bg-accent-400 dark:text-brand-950"
          >
            로그인하고 글 쓰기
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}

      {loading && threads.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">불러오는 중…</p>
      ) : threads.length === 0 && !error ? (
        <p className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-600 dark:border-white/10 dark:text-slate-400">
          {category ? `'${category}' 주제의 글이 아직 없습니다.` : '아직 글이 없습니다. 첫 토론을 시작해 주세요.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {threads.map((t) => (
            <li key={t.id}>
              <ThreadListItem thread={t} />
            </li>
          ))}
        </ul>
      )}

      {cursor !== null && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-white/15 dark:hover:bg-white/5"
          >
            {loading ? '불러오는 중…' : '더 보기'}
          </button>
        </div>
      )}
    </>
  )
}
