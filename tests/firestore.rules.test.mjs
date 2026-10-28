// Firestore 보안 규칙 자동 검증 (Firebase 에뮬레이터에서 실행)
// 실행: npm run test:rules
import { after, before, beforeEach, describe, test } from 'node:test'
import { readFileSync } from 'node:fs'
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { deleteDoc, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc, writeBatch } from 'firebase/firestore'

const ADMIN = { email: 'pasiajung@gmail.com', email_verified: true }
const TARGET = 'research-sample-creative-problem-solving'

let env

const author = (uid, name = '홍길동') => ({ authorId: uid, authorName: name, authorPhoto: null })
const newComment = (uid, text = '좋은 연구입니다.') => ({ ...author(uid), text, createdAt: serverTimestamp(), updatedAt: null })
const threadId = (offsetMs = 0) => `${String(10_000_000_000_000 - (Date.now() + offsetMs)).padStart(13, '0')}-Abc12345`
const newThread = (uid, extra = {}) => ({
  ...author(uid),
  title: '플립러닝 운영 팁',
  body: '사전 학습 영상은 몇 분이 적당할까요?',
  category: '수업방식',
  relatedTargetId: null,
  replyCount: 0,
  createdAt: serverTimestamp(),
  updatedAt: null,
  ...extra,
})

const db = (uid, token) => (uid ? env.authenticatedContext(uid, token).firestore() : env.unauthenticatedContext().firestore())

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-creativity',
    firestore: { rules: readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8') },
  })
})
after(() => env.cleanup())
beforeEach(() => env.clearFirestore())

/** 규칙을 건너뛰고 미리 데이터를 넣어 둡니다. */
async function seed(path, data) {
  await env.withSecurityRulesDisabled((ctx) => setDoc(doc(ctx.firestore(), path), data))
}
const seededComment = (uid) => ({ ...author(uid), text: '원래 댓글', createdAt: new Date(), updatedAt: null })
const seededThread = (uid, replyCount = 0) => ({ ...newThread(uid), createdAt: new Date(), replyCount })

describe('연구·수업 댓글 (posts/{targetId}/comments)', () => {
  test('비로그인 사용자도 댓글을 읽을 수 있다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertSucceeds(getDoc(doc(db(), `posts/${TARGET}/comments/c1`)))
  })
  test('비로그인 쓰기는 거부된다', async () => {
    await assertFails(setDoc(doc(db(), `posts/${TARGET}/comments/c1`), newComment('alice')))
  })
  test('로그인 사용자는 본인 이름으로 댓글을 쓸 수 있다', async () => {
    await assertSucceeds(setDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), newComment('alice')))
  })
  test('다른 사람의 authorId 로 쓰면 거부된다', async () => {
    await assertFails(setDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), newComment('bob')))
  })
  test('createdAt 을 직접 지정(서버 시간 아님)하면 거부된다', async () => {
    await assertFails(setDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), { ...newComment('alice'), createdAt: new Date(2000, 0, 1) }))
  })
  test('2000자는 허용, 2001자는 거부된다', async () => {
    await assertSucceeds(setDoc(doc(db('alice'), `posts/${TARGET}/comments/ok`), newComment('alice', '가'.repeat(2000))))
    await assertFails(setDoc(doc(db('alice'), `posts/${TARGET}/comments/no`), newComment('alice', '가'.repeat(2001))))
  })
  test('빈 댓글과 허용되지 않은 필드는 거부된다', async () => {
    await assertFails(setDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), newComment('alice', '   ')))
    await assertFails(setDoc(doc(db('alice'), `posts/${TARGET}/comments/c2`), { ...newComment('alice'), isPinned: true }))
  })
  test('정해지지 않은 대상 경로에는 쓸 수 없다', async () => {
    await assertFails(setDoc(doc(db('alice'), 'posts/anything/comments/c1'), newComment('alice')))
  })
  test('작성자 본인은 수정할 수 있다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertSucceeds(updateDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), { text: '고친 댓글', updatedAt: serverTimestamp() }))
  })
  test('타인 글 수정은 거부된다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertFails(updateDoc(doc(db('bob'), `posts/${TARGET}/comments/c1`), { text: '남의 글 고치기', updatedAt: serverTimestamp() }))
  })
  test('수정 시 authorId·createdAt 변경은 거부된다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertFails(updateDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), { authorId: 'bob', updatedAt: serverTimestamp() }))
    await assertFails(updateDoc(doc(db('alice'), `posts/${TARGET}/comments/c1`), { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }))
  })
  test('타인 글 삭제는 거부된다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertFails(deleteDoc(doc(db('bob'), `posts/${TARGET}/comments/c1`)))
  })
  test('관리자는 다른 사람의 댓글을 삭제할 수 있다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertSucceeds(deleteDoc(doc(db('admin', ADMIN), `posts/${TARGET}/comments/c1`)))
  })
  test('이메일 인증이 안 된 관리자 이메일은 관리자로 인정되지 않는다', async () => {
    await seed(`posts/${TARGET}/comments/c1`, seededComment('alice'))
    await assertFails(deleteDoc(doc(db('fake', { email: ADMIN.email, email_verified: false }), `posts/${TARGET}/comments/c1`)))
  })
})

describe('토론 게시판 (threads)', () => {
  test('로그인 사용자는 글을 쓸 수 있다', async () => {
    await assertSucceeds(setDoc(doc(db('alice'), `threads/${threadId()}`), newThread('alice')))
  })
  test('비로그인 쓰기는 거부된다', async () => {
    await assertFails(setDoc(doc(db(), `threads/${threadId()}`), newThread('alice')))
  })
  test('제목 101자, 본문 5001자, 없는 카테고리는 거부된다', async () => {
    await assertFails(setDoc(doc(db('alice'), `threads/${threadId()}`), newThread('alice', { title: '가'.repeat(101) })))
    await assertFails(setDoc(doc(db('alice'), `threads/${threadId()}`), newThread('alice', { body: '가'.repeat(5001) })))
    await assertFails(setDoc(doc(db('alice'), `threads/${threadId()}`), newThread('alice', { category: '공지' })))
  })
  test('replyCount 를 0 이 아닌 값으로 시작하면 거부된다', async () => {
    await assertFails(setDoc(doc(db('alice'), `threads/${threadId()}`), newThread('alice', { replyCount: 99 })))
  })
  test('작성 시각과 맞지 않는 글 ID(상단 고정 시도)는 거부된다', async () => {
    await assertFails(setDoc(doc(db('alice'), 'threads/0000000000000-Abc12345'), newThread('alice')))
    await assertFails(setDoc(doc(db('alice'), `threads/${threadId(3 * 3600_000)}`), newThread('alice')))
  })
  test('타인 글 수정은 거부되고, 작성자·관리자 수정은 허용된다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice'))
    const edit = { title: '수정된 제목', updatedAt: serverTimestamp() }
    await assertFails(updateDoc(doc(db('bob'), `threads/${id}`), edit))
    await assertSucceeds(updateDoc(doc(db('alice'), `threads/${id}`), edit))
    await assertSucceeds(updateDoc(doc(db('admin', ADMIN), `threads/${id}`), edit))
  })
  test('replyCount 는 ±1 만 바꿀 수 있다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice', 3))
    await assertSucceeds(updateDoc(doc(db('bob'), `threads/${id}`), { replyCount: increment(1) }))
    await assertFails(updateDoc(doc(db('bob'), `threads/${id}`), { replyCount: 100 }))
    await assertFails(updateDoc(doc(db('bob'), `threads/${id}`), { replyCount: increment(1), title: '끼워넣기' }))
  })
  test('관리자는 다른 사람의 글을 삭제할 수 있고, 타인은 삭제할 수 없다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice'))
    await assertFails(deleteDoc(doc(db('bob'), `threads/${id}`)))
    await assertSucceeds(deleteDoc(doc(db('admin', ADMIN), `threads/${id}`)))
  })
})

describe('토론 답글 (threads/{id}/replies) + replyCount', () => {
  test('답글과 replyCount +1 을 writeBatch 로 함께 쓰면 허용된다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice'))
    const d = db('bob')
    const batch = writeBatch(d)
    batch.set(doc(d, `threads/${id}/replies/r1`), newComment('bob'))
    batch.update(doc(d, `threads/${id}`), { replyCount: increment(1) })
    await assertSucceeds(batch.commit())
  })
  test('replyCount 증가 없이 답글만 쓰면 거부된다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice'))
    await assertFails(setDoc(doc(db('bob'), `threads/${id}/replies/r1`), newComment('bob')))
  })
  test('2001자 답글은 거부된다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice'))
    const d = db('bob')
    const batch = writeBatch(d)
    batch.set(doc(d, `threads/${id}/replies/r1`), newComment('bob', '가'.repeat(2001)))
    batch.update(doc(d, `threads/${id}`), { replyCount: increment(1) })
    await assertFails(batch.commit())
  })
  test('관리자는 답글과 replyCount -1 을 함께 삭제할 수 있고, 타인은 삭제할 수 없다', async () => {
    const id = threadId()
    await seed(`threads/${id}`, seededThread('alice', 1))
    await seed(`threads/${id}/replies/r1`, seededComment('bob'))
    const del = (d) => {
      const batch = writeBatch(d)
      batch.delete(doc(d, `threads/${id}/replies/r1`))
      batch.update(doc(d, `threads/${id}`), { replyCount: increment(-1) })
      return batch.commit()
    }
    await assertFails(del(db('carol')))
    await assertSucceeds(del(db('admin', ADMIN)))
  })
})

describe('사용자 프로필 (users/{uid})', () => {
  const profile = { displayName: '홍길동', photoURL: null, affiliation: '', createdAt: serverTimestamp() }
  test('본인 프로필은 만들 수 있고, 남의 프로필은 만들 수 없다', async () => {
    await assertSucceeds(setDoc(doc(db('alice'), 'users/alice'), profile))
    await assertFails(setDoc(doc(db('alice'), 'users/bob'), profile))
  })
  test('다른 사람의 프로필은 읽을 수 없다', async () => {
    await seed('users/alice', { ...profile, createdAt: new Date() })
    await assertFails(getDoc(doc(db('bob'), 'users/alice')))
    await assertSucceeds(getDoc(doc(db('alice'), 'users/alice')))
  })
  test('소속은 수정할 수 있지만 createdAt 은 바꿀 수 없다', async () => {
    await seed('users/alice', { ...profile, createdAt: new Date() })
    await assertSucceeds(updateDoc(doc(db('alice'), 'users/alice'), { affiliation: '계명대학교' }))
    await assertFails(updateDoc(doc(db('alice'), 'users/alice'), { createdAt: serverTimestamp() }))
  })
})

describe('기본 거부', () => {
  test('규칙에 없는 컬렉션은 읽기·쓰기 모두 거부된다', async () => {
    await assertFails(getDoc(doc(db('alice'), 'secrets/x')))
    await assertFails(setDoc(doc(db('admin', ADMIN), 'secrets/x'), { a: 1 }))
  })
})
