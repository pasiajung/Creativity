import type { Research } from '../types/content'

/** APA 7판 저자 표기: A / A, & B / A, B, & C (21명 이상은 앞 19명 … 마지막 저자) */
function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return ''
  if (authors.length === 1) return authors[0] ?? ''
  if (authors.length > 20) {
    return `${authors.slice(0, 19).join(', ')}, ... ${authors[authors.length - 1]}`
  }
  return `${authors.slice(0, -1).join(', ')}, & ${authors[authors.length - 1]}`
}

function endWithPeriod(text: string): string {
  const trimmed = text.trim()
  return /[.?!]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

/** 연구 항목을 APA 7판 형식의 일반 텍스트 인용문으로 만듭니다. (기울임꼴은 텍스트 복사에서 표현되지 않습니다) */
export function toApaCitation(item: Research): string {
  const parts = [
    endWithPeriod(formatAuthors(item.authors)),
    `(${item.year}).`,
    endWithPeriod(item.title),
    item.venue ? endWithPeriod(item.venue) : '',
  ]
  const link = item.links.doi ? `https://doi.org/${item.links.doi}` : item.links.external
  if (link) parts.push(link)
  return parts.filter(Boolean).join(' ')
}
