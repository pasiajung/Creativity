import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'

// 환경 변수(.env 또는 Netlify 환경 변수)에서 Firebase 설정값을 읽습니다.
// Firebase 콘솔의 코드에서 따옴표·쉼표까지 같이 복사해 넣어도 동작하도록 앞뒤를 정리합니다.
const clean = (value: string | undefined) => (value ?? '').trim().replace(/^["']|["'],?$/g, '').trim()

const config = {
  apiKey: clean(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: clean(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: clean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: clean(import.meta.env.VITE_FIREBASE_APP_ID),
}

/** 6개 값이 모두 있을 때만 Firebase를 켭니다. 하나라도 없으면 사이트는 댓글·로그인 없이 동작합니다. */
export const isFirebaseConfigured = Object.values(config).every((v) => v !== '')

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (isFirebaseConfigured) {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)

  // 로컬 테스트용: .env 에 VITE_USE_FIREBASE_EMULATOR=true 를 넣으면 실제 Firebase 대신 에뮬레이터에 연결합니다.
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
  }
}

export { app, auth, db }
