import { Link } from 'react-router'
import type { Research } from '../types/content'
import Tag from './Tag'

interface ResearchCardProps {
  item: Research
  /** 카드 제목의 제목 수준. 페이지 구조에 맞게 h2 또는 h3 을 씁니다. */
  headingLevel?: 'h2' | 'h3'
}

export default function ResearchCard({ item, headingLevel = 'h3' }: ResearchCardProps) {
  const Heading = headingLevel
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
      <div className="mb-2 flex items-center gap-2 text-sm">
        <Tag variant="brand">{item.type}</Tag>
        <span className="text-slate-500 dark:text-slate-400">{item.year}</span>
      </div>
      <Heading className="text-lg leading-snug font-semibold text-slate-900 dark:text-white">
        {/* 카드 전체를 누를 수 있도록 링크 영역을 카드 크기로 넓힙니다 */}
        <Link to={`/research/${item.slug}`} className="after:absolute after:inset-0 after:rounded-xl group-hover:text-brand-700 dark:group-hover:text-brand-300">
          {item.title}
        </Link>
      </Heading>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {item.authors.join(', ')} · {item.venue}
      </p>
      {item.keywords.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="키워드">
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
