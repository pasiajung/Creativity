import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User } from 'firebase/auth'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ADMIN_EMAILS, ALLOWED_EMAIL_DOMAIN } from '../config'
import { ensureUserProfile, saveAffiliation as saveAffiliationToDb } from '../services/userService'
import { auth, db, isFirebaseConfigured } from './firebase'

export interface AuthUser {
  uid: string
  displayName: string
  photoURL: string | null
  email: string | null
}

interface AuthContextValue {
  /** Firebase 설정이 있어 로그인 기능을 쓸 수 있는지 */
  enabled: boolean
  /** 로그인 상태를 확인하는 중인지 (첫 화면 로딩 때) */
  loading: boolean
  user: AuthUser | null
  isAdmin: boolean
  /** 첫 로그인 직후 소속 입력 창을 띄워야 하는지 */
  needsAffiliation: boolean
  error: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  saveAffiliation: (affiliation: string) => Promise<void>
  dismissAffiliation: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function isAllowedEmail(email: string | null): boolean {
  if (!ALLOWED_EMAIL_DOMAIN) return true
  return !!email && email.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN.toLowerCase()}`)
}

function toAuthUser(u: User): AuthUser {
  return { uid: u.uid, displayName: u.displayName || u.email || '이름 없음', photoURL: u.photoURL, email: u.email }
}

function signInErrorMessage(e: unknown): string | null {
  if (e instanceof FirebaseError) {
    if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') return null
    if (e.code === 'auth/popup-blocked') return '팝업이 차단되었습니다. 브라우저 주소창의 팝업 차단을 해제한 뒤 다시 시도해 주세요.'
    if (e.code === 'auth/unauthorized-domain') return '이 사이트 주소가 Firebase 승인된 도메인에 등록되어 있지 않습니다.'
    if (e.code === 'auth/network-request-failed') return '네트워크 연결을 확인해 주세요.'
  }
  return '로그인하지 못했습니다. 잠시 후 다시 시도해 주세요.'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [needsAffiliation, setNeedsAffiliation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) return
    const firebaseAuth = auth
    return onAuthStateChanged(firebaseAuth, async (u) => {
      if (u && !isAllowedEmail(u.email)) {
        await firebaseSignOut(firebaseAuth)
        setError(`@${ALLOWED_EMAIL_DOMAIN} 계정으로만 참여할 수 있습니다.`)
        return
      }
      setUser(u ? toAuthUser(u) : null)
      setIsAdmin(!!u && u.emailVerified && !!u.email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(u.email.toLowerCase()))
      setLoading(false)
      if (u && db) {
        try {
          const isFirstLogin = await ensureUserProfile(db, u)
          if (isFirstLogin) setNeedsAffiliation(true)
        } catch {
          // 프로필 저장에 실패해도 댓글 작성 등 다른 기능은 그대로 쓸 수 있습니다.
        }
      } else {
        setNeedsAffiliation(false)
      }
    })
  }, [])

  const signIn = useCallback(async () => {
    if (!auth) return
    setError(null)
    const provider = new GoogleAuthProvider()
    const params: Record<string, string> = { prompt: 'select_account' }
    if (ALLOWED_EMAIL_DOMAIN) params.hd = ALLOWED_EMAIL_DOMAIN
    provider.setCustomParameters(params)
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      setError(signInErrorMessage(e))
    }
  }, [])

  const signOut = useCallback(async () => {
    if (auth) await firebaseSignOut(auth)
  }, [])

  const saveAffiliation = useCallback(
    async (affiliation: string) => {
      if (!db || !user) return
      await saveAffiliationToDb(db, user.uid, affiliation)
      setNeedsAffiliation(false)
    },
    [user],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      enabled: isFirebaseConfigured,
      loading,
      user,
      isAdmin,
      needsAffiliation,
      error,
      signIn,
      signOut,
      saveAffiliation,
      dismissAffiliation: () => setNeedsAffiliation(false),
      clearError: () => setError(null),
    }),
    [loading, user, isAdmin, needsAffiliation, error, signIn, signOut, saveAffiliation],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** 화면 어디서나 로그인 상태를 가져옵니다. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth 는 AuthProvider 안에서만 사용할 수 있습니다.')
  return ctx
}
