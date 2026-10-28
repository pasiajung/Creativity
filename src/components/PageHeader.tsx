interface PageHeaderProps {
  title: string
  description?: string
  /** 제목 위에 작게 표시되는 문구 (예: 연구 유형) */
  eyebrow?: React.ReactNode
}

/** 각 페이지 상단의 제목 영역 */
export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-300">
          <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl leading-tight font-bold tracking-tight text-brand-950 sm:text-4xl dark:text-white">{title}</h1>
      {description && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
      <div aria-hidden="true" className="mt-8 flex h-px">
        <span className="w-16 bg-accent-400" />
        <span className="flex-1 bg-slate-200 dark:bg-white/10" />
      </div>
    </header>
  )
}
