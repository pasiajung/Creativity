import type { DiscussionService, Page } from './discussionService'

// Phase 1용 목업 구현: 데이터베이스 없이 항상 빈 목록을 돌려주고, 쓰기는 "준비 중" 오류를 냅니다.

const emptyPage = <T>(): Promise<Page<T>> => Promise.resolve({ items: [], nextCursor: null })
const notReady = (): Promise<never> => Promise.reject(new Error('토론 기능은 준비 중입니다.'))

export const mockDiscussionService: DiscussionService = {
  isAvailable: false,

  listComments: () => emptyPage(),
  addComment: notReady,
  updateComment: notReady,
  deleteComment: notReady,

  listThreads: () => emptyPage(),
  listRelatedThreads: () => Promise.resolve([]),
  getThread: () => Promise.resolve(null),
  createThread: notReady,
  updateThread: notReady,
  deleteThread: notReady,

  listReplies: () => emptyPage(),
  addReply: notReady,
  updateReply: notReady,
  deleteReply: notReady,
}
