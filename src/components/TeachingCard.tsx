import { Link } from 'react-router'
import type { Teaching } from '../types/content'
import Tag from './Tag'

interface TeachingCardProps {
  item: Teaching
  headingLevel?: 'h2' | 'h3'
}

export default function TeachingCard({ item, headingLevel = 'h3' }: TeachingCardProps) {
  const Heading = headingLevel
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{item.semester}</p>
      <Heading className="text-lg leading-snug font-semibold text-slate-900 dark:text-white">
        <Link to={`/teaching/${item.slug}`} className="after:absolute after:inset-0 after:rounded-xl group-hover:text-brand-700 dark:group-hover:text-brand-300">
          {item.courseName}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.summary}</p>
      {item.methods.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="수업 방식">
          {item.methods.map((m) => (
            <li key={m}>
              <Tag>{m}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
