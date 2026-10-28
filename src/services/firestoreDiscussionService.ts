import type { Auth } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
  type DocumentData,
  type DocumentSnapshot,
  type Firestore,
  type QueryConstraint,
  type Timestamp,
} from 'firebase/firestore'
import {
  PAGE_SIZE,
  THREAD_CATEGORIES,
  type AuthorInfo,
  type Comment,
  type DiscussionService,
  type Page,
  type PageCursor,
  type Thread,
  type ThreadCategory,
  type ThreadInput,
} from './discussionService'

/*
 * Firestore 구현.
 * - 무료 한도 보호: 실시간 리스너(onSnapshot) 없이 getDocs/getDoc 만 쓰고, 모든 목록 쿼리에 limit 을 겁니다.
 * - 복합 색인 없이 동작: 토론 글 ID 를 "시간을 거꾸로 센 숫자"로 만들어(makeThreadId),
 *   문서 ID 순서 = 최신순이 되게 했습니다. 그래서 카테고리·관련 연구 조건 + 최신순 조회에 복합 색인이 필요 없습니다.
 */

const RELATED_LIMIT = 5
/** 토론 글 ID 앞부분 계산에 쓰는 기준값 (firestore.rules 와 같아야 함) */
const ID_BASE = 10_000_000_000_000

function makeThreadId(): string {
  const reversed = String(ID_BASE - Date.now()).padStart(13, '0')
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  const random = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
  return `${reversed}-${random}`
}

function toDate(value: unknown): Date {
  return value && typeof (value as Timestamp).toDate === 'function' ? (value as Timestamp).toDate() : new Date()
}

function toDateOrNull(value: unknown): Date | null {
  return value ? toDate(value) : null
}

function toComment(snap: DocumentSnapshot<DocumentData>): Comment {
  const d = snap.data() ?? {}
  return {
    id: snap.id,
    authorId: String(d.authorId ?? ''),
    authorName: String(d.authorName ?? ''),
    authorPhoto: typeof d.authorPhoto === 'string' ? d.authorPhoto : null,
    text: String(d.text ?? ''),
    createdAt: toDate(d.createdAt),
    updatedAt: toDateOrNull(d.updatedAt),
  }
}

function toThread(snap: DocumentSnapshot<DocumentData>): Thread {
  const d = snap.data() ?? {}
  const category = (THREAD_CATEGORIES as readonly string[]).includes(d.category) ? (d.category as ThreadCategory) : '자유'
  return {
    id: snap.id,
    title: String(d.title ?? ''),
    body: String(d.body ?? ''),
    category,
    relatedTargetId: typeof d.relatedTargetId === 'string' ? d.relatedTargetId : null,
    authorId: String(d.authorId ?? ''),
    authorName: String(d.authorName ?? ''),
    authorPhoto: typeof d.authorPhoto === 'string' ? d.authorPhoto : null,
    replyCount: typeof d.replyCount === 'number' ? d.replyCount : 0,
    createdAt: toDate(d.createdAt),
    updatedAt: toDateOrNull(d.updatedAt),
  }
}

/** PAGE_SIZE + 1 개를 읽어, 남은 항목이 있는지 정확히 알아냅니다. */
async function fetchPage<T>(
  col: ReturnType<typeof collection>,
  constraints: QueryConstraint[],
  cursor: PageCursor | null | undefined,
  map: (snap: DocumentSnapshot<DocumentData>) => T,
): Promise<Page<T>> {
  const all = [...constraints]
  if (cursor) all.push(startAfter(cursor as DocumentSnapshot))
  all.push(limit(PAGE_SIZE + 1))
  const result = await getDocs(query(col, ...all))
  const docs = result.docs.slice(0, PAGE_SIZE)
  const hasMore = result.docs.length > PAGE_SIZE
  return { items: docs.map(map), nextCursor: hasMore ? (docs[docs.length - 1] ?? null) : null }
}

export function createFirestoreDiscussionService(db: Firestore, auth: Auth): DiscussionService {
  function currentAuthor(): AuthorInfo {
    const user = auth.currentUser
    if (!user) throw new Error('로그인이 필요합니다.')
    return {
      authorId: user.uid,
      authorName: (user.displayName || user.email || '이름 없음').slice(0, 100),
      authorPhoto: user.photoURL ? user.photoURL.slice(0, 2048) : null,
    }
  }

  const commentsCol = (targetId: string) => collection(db, 'posts', targetId, 'comments')
  const threadsCol = collection(db, 'threads')
  const threadRef = (threadId: string) => doc(db, 'threads', threadId)
  const repliesCol = (threadId: string) => collection(db, 'threads', threadId, 'replies')

  return {
    isAvailable: true,

    // ── 연구·수업 댓글 ─────────────────────────
    listComments: (targetId, cursor) => fetchPage(commentsCol(targetId), [orderBy('createdAt', 'asc')], cursor, toComment),

    async addComment(targetId, text) {
      const author = currentAuthor()
      const ref = doc(commentsCol(targetId))
      await setDoc(ref, { ...author, text, createdAt: serverTimestamp(), updatedAt: null })
      return { id: ref.id, ...author, text, createdAt: new Date(), updatedAt: null }
    },

    async updateComment(targetId, commentId, text) {
      await updateDoc(doc(commentsCol(targetId), commentId), { text, updatedAt: serverTimestamp() })
    },

    async deleteComment(targetId, commentId) {
      await deleteDoc(doc(commentsCol(targetId), commentId))
    },

    // ── 토론 게시판 ─────────────────────────────
    listThreads({ category, cursor }) {
      const constraints: QueryConstraint[] = []
      if (category) constraints.push(where('category', '==', category))
      constraints.push(orderBy(documentId()))
      return fetchPage(threadsCol, constraints, cursor, toThread)
    },

    async listRelatedThreads(targetId) {
      const result = await getDocs(
        query(threadsCol, where('relatedTargetId', '==', targetId), orderBy(documentId()), limit(RELATED_LIMIT)),
      )
      return result.docs.map(toThread)
    },

    async getThread(threadId) {
      const snap = await getDoc(threadRef(threadId))
      return snap.exists() ? toThread(snap) : null
    },

    async createThread(input: ThreadInput) {
      const author = currentAuthor()
      const id = makeThreadId()
      await setDoc(threadRef(id), {
        ...author,
        title: input.title,
        body: input.body,
        category: input.category,
        relatedTargetId: input.relatedTargetId,
        replyCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: null,
      })
      return id
    },

    async updateThread(threadId, input) {
      await updateDoc(threadRef(threadId), {
        title: input.title,
        body: input.body,
        category: input.category,
        relatedTargetId: input.relatedTargetId,
        updatedAt: serverTimestamp(),
      })
    },

    async deleteThread(threadId) {
      // Cloud Functions 없이는 다른 사람의 답글까지 지울 수 없으므로 글만 삭제합니다. (남은 답글은 화면에 나타나지 않음)
      await deleteDoc(threadRef(threadId))
    },

    // ── 토론 답글 (replyCount 는 writeBatch 로 함께 증감) ──
    listReplies: (threadId, cursor) => fetchPage(repliesCol(threadId), [orderBy('createdAt', 'asc')], cursor, toComment),

    async addReply(threadId, text) {
      const author = currentAuthor()
      const ref = doc(repliesCol(threadId))
      const batch = writeBatch(db)
      batch.set(ref, { ...author, text, createdAt: serverTimestamp(), updatedAt: null })
      batch.update(threadRef(threadId), { replyCount: increment(1) })
      await batch.commit()
      return { id: ref.id, ...author, text, createdAt: new Date(), updatedAt: null }
    },

    async updateReply(threadId, replyId, text) {
      await updateDoc(doc(repliesCol(threadId), replyId), { text, updatedAt: serverTimestamp() })
    },

    async deleteReply(threadId, replyId) {
      const batch = writeBatch(db)
      batch.delete(doc(repliesCol(threadId), replyId))
      batch.update(threadRef(threadId), { replyCount: increment(-1) })
      await batch.commit()
    },
  }
}
