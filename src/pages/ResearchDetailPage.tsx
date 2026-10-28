import { Link, useParams } from 'react-router'
import CitationButton from '../components/CitationButton'
import DiscussionSection from '../components/DiscussionSection'
import ExternalLink from '../components/ExternalLink'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { research } from '../content/research'
import { usePageTitle } from '../lib/usePageTitle'
import NotFoundPage from './NotFoundPage'

const linkButton =
  'inline-block rounded-md border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-800 hover:bg-brand-50 dark:border-brand-800 dark:text-brand-200 dark:hover:bg-brand-950'

export default function ResearchDetailPage() {
  const { slug } = useParams()
  const item = research.find((r) => r.slug === slug)
  usePageTitle(item?.title ?? '페이지를 찾을 수 없음')

  if (!item) return <NotFoundPage />

  const { pdf, doi, external } = item.links
  const hasLinks = Boolean(pdf || doi || external)

  return (
    <article>
      <nav aria-label="이동 경로" className="mb-4 text-sm">
        <Link to="/research" className="text-brand-700 hover:underline dark:text-brand-300">
          ← 연구 목록
        </Link>
      </nav>

      <PageHeader
        eyebrow={
          <>
            {item.type} · {item.year}
          </>
        }
        title={item.title}
      />

      <dl className="mb-8 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[6rem_1fr]">
        <dt className="font-medium text-slate-500 dark:text-slate-400">저자</dt>
        <dd>{item.authors.join(', ')}</dd>
        <dt className="font-medium text-slate-500 dark:text-slate-400">게재·발표</dt>
        <dd>{item.venue}</dd>
        {item.keywords.length > 0 && (
          <>
            <dt className="font-medium text-slate-500 dark:text-slate-400">키워드</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {item.keywords.map((k) => (
                  <li key={k}>
                    <Tag>{k}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </>
        )}
      </dl>

      <section aria-labelledby="abstract-heading" className="mb-8">
        <h2 id="abstract-heading" className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
          초록
        </h2>
        <p className="leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">{item.abstract}</p>
      </section>

      {hasLinks && (
        <section aria-labelledby="links-heading" className="mb-8">
          <h2 id="links-heading" className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
            링크
          </h2>
          <ul className="flex flex-wrap gap-2">
            {pdf && (
              <li>
                <ExternalLink href={pdf} className={linkButton}>
                  PDF
                </ExternalLink>
              </li>
            )}
            {doi && (
              <li>
                <ExternalLink href={`https://doi.org/${doi}`} className={linkButton}>
                  DOI: {doi}
                </ExternalLink>
              </li>
            )}
            {external && (
              <li>
                <ExternalLink href={external} className={linkButton}>
                  외부 페이지
                </ExternalLink>
              </li>
            )}
          </ul>
        </section>
      )}

      <CitationButton item={item} />

      <DiscussionSection targetId={`research-${item.slug}`} />
    </article>
  )
}
