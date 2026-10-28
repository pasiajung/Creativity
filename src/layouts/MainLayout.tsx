import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

/** 모든 페이지에 공통으로 쓰이는 틀: 헤더 + 본문 + 푸터 */
export default function MainLayout() {
  const { pathname } = useLocation()

  // 다른 페이지로 이동하면 화면 맨 위로 올립니다.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {/* 키보드 사용자가 메뉴를 건너뛰고 본문으로 바로 갈 수 있는 링크 (Tab 키를 누르면 나타남) */}
      <a
        href="#main"
        className="sr-only z-30 rounded-md bg-brand-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        본문 바로가기
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 outline-none sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
