interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'brand'
}

/** 키워드·수업방식 등을 표시하는 작은 꼬리표 */
export default function Tag({ children, variant = 'default' }: TagProps) {
  const styles =
    variant === 'brand'
      ? 'bg-brand-800 text-white dark:bg-brand-300 dark:text-brand-950'
      : 'bg-brand-50 text-brand-800 ring-1 ring-brand-100 ring-inset dark:bg-brand-950 dark:text-brand-200 dark:ring-brand-900'
  return <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${styles}`}>{children}</span>
}
