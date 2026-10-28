// 댓글·토론 기능의 "약속(인터페이스)"을 정의합니다.
// 화면 코드는 이 인터페이스만 사용하므로, Phase 2에서 Firestore 구현으로 바꿔도 화면 코드는 그대로입니다.

/** 한 번에 불러오는 개수 ("더 보기" 단위) */
export const PAGE_SIZE = 20

export const COMMENT_MAX_LENGTH = 2000
export const THREAD_TITLE_MAX_LENGTH = 100
export const THREAD_BODY_MAX_LENGTH = 5000

export const THREAD_CATEGORIES = ['연구', '수업방식', '자료공유', '자유'] as const
export type ThreadCategory = (typeof THREAD_CATEGORIES)[number]

export interface AuthorInfo {
  authorId: string
  authorName: string
  authorPhoto: string | null
}

/** 연구·수업 상세의 댓글, 토론 글의 답글이 같은 구조를 씁니다. */
export interface Comment extends AuthorInfo {
  id: string
  text: string
  createdAt: Date
  updatedAt: Date | null
}

export interface Thread extends AuthorInfo {
  id: string
  title: string
  body: string
  category: ThreadCategory
  /** 연결된 연구·수업 (예: "research-my-paper"). 없으면 null */
  relatedTargetId: string | null
  replyCount: number
  createdAt: Date
  updatedAt: Date | null
}

export interface ThreadInput {
  title: string
  body: string
  category: ThreadCategory
  relatedTargetId: string | null
}

/** 다음 페이지를 불러올 때 넘겨주는 위치 정보. 구현마다 내용이 다르므로 화면에서는 그대로 전달만 합니다. */
export type PageCursor = unknown

export interface Page<T> {
  items: T[]
  /** 더 불러올 항목이 없으면 null */
  nextCursor: PageCursor | null
}

export interface DiscussionService {
  /** false 이면 아직 사용할 수 없는 상태(준비 중·설정 전)입니다. 화면은 안내 문구를 보여줍니다. */
  readonly isAvailable: boolean

  // 연구·수업 상세 댓글 (targetId 예: "research-{slug}", "teaching-{slug}")
  listComments(targetId: string, cursor?: PageCursor | null): Promise<Page<Comment>>
  /** 저장한 댓글을 돌려줍니다(화면에 바로 추가하기 위해) */
  addComment(targetId: string, text: string): Promise<Comment>
  updateComment(targetId: string, commentId: string, text: string): Promise<void>
  deleteComment(targetId: string, commentId: string): Promise<void>

  // 토론 게시판
  listThreads(options: { category?: ThreadCategory | null; cursor?: PageCursor | null }): Promise<Page<Thread>>
  /** 특정 연구·수업과 연결된 토론 글 ("관련 토론") */
  listRelatedThreads(targetId: string): Promise<Thread[]>
  getThread(threadId: string): Promise<Thread | null>
  createThread(input: ThreadInput): Promise<string>
  updateThread(threadId: string, input: ThreadInput): Promise<void>
  deleteThread(threadId: string): Promise<void>

  // 토론 글의 답글
  listReplies(threadId: string, cursor?: PageCursor | null): Promise<Page<Comment>>
  addReply(threadId: string, text: string): Promise<Comment>
  updateReply(threadId: string, replyId: string, text: string): Promise<void>
  deleteReply(threadId: string, replyId: string): Promise<void>
}
