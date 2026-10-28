import { Link, useParams } from 'react-router'
import DiscussionSection from '../components/DiscussionSection'
import ExternalLink from '../components/ExternalLink'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { teaching } from '../content/teaching'
import { usePageTitle } from '../lib/usePageTitle'
import NotFoundPage from './NotFoundPage'

const sectionHeading = 'mb-3 text-lg font-semibold text-slate-900 dark:text-white'

export default function TeachingDetailPage() {
  const { slug } = useParams()
  const item = teaching.find((t) => t.slug === slug)
  usePageTitle(item?.courseName ?? '페이지를 찾을 수 없음')

  if (!item) return <NotFoundPage />

  return (
    <article>
      <nav aria-label="이동 경로" className="mb-4 text-sm">
        <Link to="/teaching" className="text-brand-700 hover:underline dark:text-brand-300">
          ← 수업 목록
        </Link>
      </nav>

      <PageHeader eyebrow={item.semester} title={item.courseName} />

      <section aria-labelledby="summary-heading" className="mb-8">
        <h2 id="summary-heading" className={sectionHeading}>
          개요
        </h2>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">{item.summary}</p>
      </section>

      <section aria-labelledby="method-heading" className="mb-8">
        <h2 id="method-heading" className={sectionHeading}>
          수업 방식
        </h2>
        {item.methods.length > 0 && (
          <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="수업 방식 태그">
            {item.methods.map((m) => (
              <li key={m}>
                <Tag>{m}</Tag>
              </li>
            ))}
          </ul>
        )}
        <p className="leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">{item.methodDetail}</p>
      </section>

      {item.materials.length > 0 && (
        <section aria-labelledby="materials-heading" className="mb-8">
          <h2 id="materials-heading" className={sectionHeading}>
            수업 자료
          </h2>
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {item.materials.map((m) => (
              <li key={m.url}>
                <ExternalLink
                  href={m.url}
                  className="block px-4 py-3 text-brand-800 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-brand-950"
                >
                  {m.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="reflection-heading" className="mb-8">
        <h2 id="reflection-heading" className={sectionHeading}>
          성찰과 결과
        </h2>
        <p className="leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">{item.reflection}</p>
      </section>

      <DiscussionSection targetId={`teaching-${item.slug}`} />
    </article>
  )
}
