import type { ResearchType } from '../types/content'

/* 연구 유형별 색상 (채도를 낮춘 학술 톤) */
const TYPE_STYLES: Record<ResearchType, string> = {
  논문: 'bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-900/60 dark:text-brand-200 dark:ring-brand-700',
  보고서: 'bg-teal-50 text-teal-800 ring-teal-200 dark:bg-teal-950/60 dark:text-teal-200 dark:ring-teal-800',
  발표: 'bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:ring-rose-900',
  프로젝트: 'bg-accent-50 text-accent-700 ring-accent-200 dark:bg-accent-700/20 dark:text-accent-200 dark:ring-accent-700',
}

export default function ResearchTypeBadge({ type }: { type: ResearchType }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${TYPE_STYLES[type]}`}>
      {type}
    </span>
  )
}
