import { Link } from 'react-router'
import type { Research } from '../types/content'
import ResearchTypeBadge from './ResearchTypeBadge'
import Tag from './Tag'

interface ResearchCardProps {
  item: Research
  /** 카드 제목의 제목 수준. 페이지 구조에 맞게 h2 또는 h3 을 씁니다. */
  headingLevel?: 'h2' | 'h3'
}

export const cardClass =
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-200 ' +
  'before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-accent-400 before:to-brand-500 before:opacity-0 before:transition ' +
  'hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_32px_-12px_rgba(21,35,69,0.25)] hover:before:opacity-100 ' +
  'dark:border-white/10 dark:bg-ink-900 dark:hover:border-brand-600'

export const cardLinkClass =
  'after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand-700 dark:group-hover:text-accent-200'

export default function ResearchCard({ item, headingLevel = 'h3' }: ResearchCardProps) {
  const Heading = headingLevel
  return (
    <article className={cardClass}>
      <div className="mb-3 flex items-center gap-2.5 text-sm">
        <ResearchTypeBadge type={item.type} />
        <span className="font-medium text-slate-400 tabular-nums dark:text-slate-500">{item.year}</span>
      </div>
      <Heading className="text-lg leading-snug font-semibold text-brand-950 dark:text-white">
        {/* 카드 전체를 누를 수 있도록 링크 영역을 카드 크기로 넓힙니다 */}
        <Link to={`/research/${item.slug}`} className={cardLinkClass}>
          {item.title}
        </Link>
      </Heading>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {item.authors.join(', ')} · {item.venue}
      </p>
      {item.keywords.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="키워드">
          {item.keywords.map((k) => (
            <li key={k}>
              <Tag>{k}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
