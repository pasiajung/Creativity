import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import PageHeader from '../components/PageHeader'
import ResearchCard from '../components/ResearchCard'
import { research } from '../content/research'
import { usePageTitle } from '../lib/usePageTitle'
import { RESEARCH_TYPES, type ResearchType } from '../types/content'

type SortOrder = 'newest' | 'oldest'

function isResearchType(value: string | null): value is ResearchType {
  return value !== null && (RESEARCH_TYPES as readonly string[]).includes(value)
}

export default function ResearchListPage() {
  usePageTitle('연구')

  // 필터 상태를 주소(?type=논문&q=...)에 저장해, 뒤로 가기나 링크 공유 시에도 유지되게 합니다.
  const [params, setParams] = useSearchParams()
  const typeParam = params.get('type')
  const type = isResearchType(typeParam) ? typeParam : null
  const sort: SortOrder = params.get('sort') === 'oldest' ? 'oldest' : 'newest'
  const query = params.get('q') ?? ''

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return research
      .filter((r) => !type || r.type === type)
      .filter((r) => {
        if (!q) return true
        const haystack = [r.title, r.abstract, r.venue, ...r.authors, ...r.keywords].join(' ').toLowerCase()
        return haystack.includes(q)
      })
      .sort((a, b) => (sort === 'newest' ? b.year - a.year : a.year - b.year) || a.title.localeCompare(b.title, 'ko'))
  }, [type, sort, query])

  const filterButton = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active
        ? 'bg-brand-900 text-white shadow-sm dark:bg-accent-400 dark:text-brand-950'
        : 'bg-white text-slate-600 ring-1 ring-slate-200 ring-inset hover:bg-slate-50 hover:text-brand-900 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
    }`

  return (
    <>
      <PageHeader title="연구" description="논문, 보고서, 발표, 프로젝트 등 연구 성과를 모았습니다." />

      <div className="mb-8 space-y-4">
        <div role="group" aria-label="연구 유형 필터" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={type === null} className={filterButton(type === null)} onClick={() => update('type', null)}>
            전체
          </button>
          {RESEARCH_TYPES.map((t) => (
            <button key={t} type="button" aria-pressed={type === t} className={filterButton(type === t)} onClick={() => update('type', t)}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="research-search" className="sr-only">
              연구 검색
            </label>
            <input
              id="research-search"
              type="search"
              value={query}
              onChange={(e) => update('q', e.target.value)}
              placeholder="제목, 키워드, 저자로 검색"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:border-brand-400 placeholder:text-slate-400 dark:border-white/15 dark:bg-ink-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="research-sort" className="shrink-0 text-sm text-slate-600 dark:text-slate-400">
              정렬
            </label>
            <select
              id="research-sort"
              value={sort}
              onChange={(e) => update('sort', e.target.value === 'oldest' ? 'oldest' : null)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-white/15 dark:bg-ink-900"
            >
              <option value="newest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {results.length}건
      </p>

      {results.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {results.map((item) => (
            <li key={item.slug}>
              <ResearchCard item={item} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-200 p-10 text-center dark:border-white/10 text-slate-600 dark:bg-ink-900 dark:text-slate-400">
          조건에 맞는 연구가 없습니다. 검색어나 유형을 바꿔 보세요.
        </p>
      )}
    </>
  )
}
