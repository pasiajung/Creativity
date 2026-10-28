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
  `relative block rounded-md px-3 py-2 text-[15px] font-medium transition md:after:absolute md:after:inset-x-3 md:after:-bottom-[13px] md:after:h-0.5 md:after:rounded-full md:after:transition ${
    isActive
      ? 'text-brand-900 md:after:bg-accent-500 max-md:bg-brand-50 dark:text-white dark:max-md:bg-white/5'
      : 'text-slate-500 hover:text-brand-900 md:after:bg-transparent dark:text-slate-400 dark:hover:text-white'
  }`

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // 페이지가 바뀌면 모바일 메뉴를 닫습니다.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-ink-950/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-800 to-brand-950 text-accent-300 shadow-sm ring-1 ring-brand-900/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3zM6 12.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3-6-3z" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-brand-950 dark:text-white">{SITE_SHORT_NAME}</span>
            <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">{SITE_SUBTITLE}</span>
          </span>
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
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-white/5"
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
        <nav id="mobile-menu" aria-label="주 메뉴(모바일)" className="border-t border-slate-200 px-4 py-2 md:hidden dark:border-white/10">
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
