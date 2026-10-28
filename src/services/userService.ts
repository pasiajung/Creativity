import type { User } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc, type Firestore } from 'firebase/firestore'

export const AFFILIATION_MAX_LENGTH = 100

/**
 * 첫 로그인이면 users/{uid} 문서를 만들고 true 를 돌려줍니다. (이미 있으면 false)
 * 소속(affiliation)은 빈 값으로 먼저 저장하고, 사용자가 원하면 나중에 입력합니다.
 */
export async function ensureUserProfile(db: Firestore, user: User): Promise<boolean> {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (snap.exists()) return false
  await setDoc(ref, {
    displayName: (user.displayName ?? '').slice(0, 100),
    photoURL: user.photoURL ? user.photoURL.slice(0, 2048) : null,
    affiliation: '',
    createdAt: serverTimestamp(),
  })
  return true
}

export async function saveAffiliation(db: Firestore, uid: string, affiliation: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { affiliation: affiliation.trim().slice(0, AFFILIATION_MAX_LENGTH) })
}
