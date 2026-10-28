interface PageHeaderProps {
  title: string
  description?: string
  /** 제목 위에 작게 표시되는 문구 (예: 연구 유형) */
  eyebrow?: React.ReactNode
}

/** 각 페이지 상단의 제목 영역 */
export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
      {eyebrow && <div className="mb-2 text-sm font-medium text-brand-600 dark:text-brand-300">{eyebrow}</div>}
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">{title}</h1>
      {description && <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
    </header>
  )
}
