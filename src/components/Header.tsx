import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { SITE_SHORT_NAME, SITE_SUBTITLE } from '../config'
import LoginButton from './LoginButton'
import ThemeToggle from './ThemeToggle'

/* ✏️ 상단 메뉴 항목. 순서나 이름을 바꾸려면 여기를 고칩니다. */
const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/research', label: '연구', end: false },
  { to: '/teaching', label: '수업', end: false },
  { to: '/discussion', label: '토론', end: false },
  { to: '/about', label: '소개', end: false },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-[15px] font-medium transition ${
    isActive
      ? 'bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
  }`

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // 페이지가 바뀌면 모바일 메뉴를 닫습니다.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-base font-bold text-brand-800 dark:text-brand-200">{SITE_SHORT_NAME}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{SITE_SUBTITLE}</span>
        </Link>

        <nav aria-label="주 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <LoginButton />
          <button
            type="button"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="주 메뉴(모바일)" className="border-t border-slate-200 px-4 py-2 md:hidden dark:border-slate-800">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
