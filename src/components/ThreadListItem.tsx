import { Link } from 'react-router'
import { formatDateTime } from '../lib/format'
import { findTarget } from '../lib/targets'
import type { Thread } from '../services'
import { cardClass, cardLinkClass } from './ResearchCard'
import CategoryBadge from './CategoryBadge'

export default function ThreadListItem({ thread }: { thread: Thread }) {
  const related = findTarget(thread.relatedTargetId)
  return (
    <article className={`${cardClass} !p-5`}>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <CategoryBadge category={thread.category} />
        {related && <span className="truncate text-slate-500 dark:text-slate-400">· {related.label}</span>}
      </div>
      <h2 className="text-lg leading-snug font-semibold text-brand-950 dark:text-white">
        <Link to={`/discussion/${thread.id}`} className={cardLinkClass}>
          {thread.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{thread.body}</p>
      <p className="mt-3 flex flex-wrap gap-x-3 text-xs text-slate-500 dark:text-slate-400">
        <span>{thread.authorName}</span>
        <time dateTime={thread.createdAt.toISOString()}>{formatDateTime(thread.createdAt)}</time>
        <span className="font-medium text-brand-700 dark:text-brand-200">답글 {thread.replyCount}</span>
      </p>
    </article>
  )
}
