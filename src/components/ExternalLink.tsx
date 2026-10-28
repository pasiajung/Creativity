interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/** 새 창으로 열리는 외부 링크. 화면 낭독기 사용자에게 "새 창"임을 알려줍니다. */
export default function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (새 창에서 열림)</span>
    </a>
  )
}
