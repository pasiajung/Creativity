import { auth, db } from '../lib/firebase'
import type { DiscussionService } from './discussionService'
import { createFirestoreDiscussionService } from './firestoreDiscussionService'
import { mockDiscussionService } from './mockDiscussionService'

export * from './discussionService'

/** Firebase 설정이 있으면 Firestore 구현을, 없으면 "준비 중" 목업 구현을 사용합니다. */
export const discussionService: DiscussionService =
  db && auth ? createFirestoreDiscussionService(db, auth) : mockDiscussionService
