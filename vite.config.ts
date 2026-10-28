import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Firebase SDK 가 커서 기본 경고 기준(500kB)을 넘습니다. 압축 후 약 270kB 로 문제 없는 크기입니다.
  build: { chunkSizeWarningLimit: 1000 },
})
