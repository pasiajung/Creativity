import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const FIREBASE_ENV_NAMES = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

export default defineConfig(({ command, mode }) => {
  // 빌드할 때 Firebase 환경 변수가 들어왔는지 Netlify 배포 기록(Deploy log)에 표시합니다. (값은 표시하지 않음)
  if (command === 'build') {
    const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env }
    const missing = FIREBASE_ENV_NAMES.filter((name) => !env[name]?.trim())
    if (missing.length === 0) {
      // 값의 "모양"이 맞는지 점검합니다. (값 자체는 기록에 남기지 않고 길이만 표시)
      const clean = (v: string) => v.trim().replace(/^["']|["'],?$/g, '').trim()
      const formats: Record<string, [RegExp, string]> = {
        VITE_FIREBASE_API_KEY: [/^AIza[0-9A-Za-z_-]{35}$/, 'AIza 로 시작하는 39자'],
        VITE_FIREBASE_AUTH_DOMAIN: [/^[a-z0-9-]+\.firebaseapp\.com$/, '프로젝트ID.firebaseapp.com'],
        VITE_FIREBASE_PROJECT_ID: [/^[a-z0-9-]+$/, '영문 소문자·숫자·하이픈'],
        VITE_FIREBASE_STORAGE_BUCKET: [/^[a-z0-9.-]+$/, '프로젝트ID.firebasestorage.app'],
        VITE_FIREBASE_MESSAGING_SENDER_ID: [/^[0-9]+$/, '숫자만'],
        VITE_FIREBASE_APP_ID: [/^1:[0-9]+:web:[0-9a-f]+$/, '1:숫자:web:영문숫자'],
      }
      const wrong = FIREBASE_ENV_NAMES.filter((name) => {
        const [pattern] = formats[name]!
        return !pattern.test(clean(env[name]!))
      })
      if (wrong.length === 0) {
        console.log('\n[Firebase] 환경 변수 6개 확인됨(형식 정상) → 로그인·댓글 기능이 켜집니다.\n')
      } else {
        console.warn(
          '\n[Firebase] 환경 변수 형식이 올바르지 않은 값이 있습니다. 로그인이 실패할 수 있습니다.\n' +
            wrong
              .map((name) => `  ${name}: 현재 ${clean(env[name]!).length}자 / 올바른 모양: ${formats[name]![1]}`)
              .join('\n') +
            '\n  Netlify > Site configuration > Environment variables 에서 값을 다시 붙여 넣고 재배포하세요.\n',
        )
      }
    } else {
      console.warn(
        `\n[Firebase] 환경 변수 ${missing.length}개가 없어 로그인·댓글 기능이 꺼진 상태로 빌드됩니다("로그인 (준비 중)").\n` +
          `  빠진 이름: ${missing.join(', ')}\n` +
          '  Netlify > Site configuration > Environment variables 에서 이름·범위(Builds 포함)를 확인한 뒤 다시 배포하세요.\n',
      )
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    // Firebase SDK 가 커서 기본 경고 기준(500kB)을 넘습니다. 압축 후 약 270kB 로 문제 없는 크기입니다.
    build: { chunkSizeWarningLimit: 1000 },
  }
})
