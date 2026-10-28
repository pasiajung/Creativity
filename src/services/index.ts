import type { DiscussionService } from './discussionService'
import { mockDiscussionService } from './mockDiscussionService'

export * from './discussionService'

/** 현재 사이트가 사용하는 댓글·토론 구현. Phase 2에서 Firestore 구현으로 교체합니다. */
export const discussionService: DiscussionService = mockDiscussionService
