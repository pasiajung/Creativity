import type { ThreadCategory } from '../services'

const STYLES: Record<ThreadCategory, string> = {
  연구: 'bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-900/60 dark:text-brand-200 dark:ring-brand-700',
  수업방식: 'bg-teal-50 text-teal-800 ring-teal-200 dark:bg-teal-950/60 dark:text-teal-200 dark:ring-teal-800',
  자료공유: 'bg-accent-50 text-accent-700 ring-accent-200 dark:bg-accent-700/20 dark:text-accent-200 dark:ring-accent-700',
  자유: 'bg-slate-50 text-slate-700 ring-slate-200 dark:bg-white/5 dark:text-slate-300 dark:ring-white/15',
}

export default function CategoryBadge({ category }: { category: ThreadCategory }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STYLES[category]}`}>{category}</span>
}
