interface TagProps {
  children: React.ReactNode
}

/** 키워드·수업방식 등을 표시하는 작은 꼬리표 */
export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
      {children}
    </span>
  )
}
