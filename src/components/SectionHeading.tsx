import { Link } from 'react-router'

interface SectionHeadingProps {
  id: string
  /** 제목 위의 작은 영문 문구 */
  eyebrow: string
  title: string
  more?: { to: string; label: string }
}

/** 홈 화면 각 구역의 제목 */
export default function SectionHeading({ id, eyebrow, title, more }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase dark:text-accent-300">
          <span aria-hidden="true" className="h-px w-6 bg-accent-400" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-brand-950 dark:text-white">
          {title}
        </h2>
      </div>
      {more && (
        <Link
          to={more.to}
          className="shrink-0 text-sm font-medium text-brand-700 underline-offset-4 hover:text-accent-600 hover:underline dark:text-brand-200 dark:hover:text-accent-300"
        >
          {more.label} →
        </Link>
      )}
    </div>
  )
}
