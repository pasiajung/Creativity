import { research } from '../content/research'
import { teaching } from '../content/teaching'

/** 토론 글과 연결할 수 있는 연구·수업 항목 */
export interface DiscussionTarget {
  id: string
  label: string
  path: string
  group: '연구' | '수업'
}

/** 콘텐츠 데이터 파일에서 자동으로 만들어지므로 따로 고칠 필요가 없습니다. */
export const discussionTargets: DiscussionTarget[] = [
  ...research.map((r) => ({ id: `research-${r.slug}`, label: r.title, path: `/research/${r.slug}`, group: '연구' as const })),
  ...teaching.map((t) => ({ id: `teaching-${t.slug}`, label: t.courseName, path: `/teaching/${t.slug}`, group: '수업' as const })),
]

export function findTarget(id: string | null | undefined): DiscussionTarget | undefined {
  return id ? discussionTargets.find((t) => t.id === id) : undefined
}
