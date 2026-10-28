import { Link } from 'react-router'
import { profile } from '../content/profile'

const FOOTER_LINKS = [
  { to: '/research', label: '연구' },
  { to: '/teaching', label: '수업' },
  { to: '/discussion', label: '토론' },
  { to: '/about', label: '소개' },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-950 text-brand-200 dark:bg-black/30">
      <div aria-hidden="true" className="h-0.5 bg-gradient-to-r from-accent-400 via-accent-300/60 to-transparent" />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-white">
            {profile.name} <span className="font-normal text-brand-300">{profile.position}</span>
          </p>
          <p className="mt-1 text-sm text-brand-300">{profile.affiliation}</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${profile.contact.email}`} className="text-accent-300 underline-offset-4 hover:underline">
              {profile.contact.email}
            </a>
          </p>
        </div>
        <nav aria-label="바닥글 메뉴">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {FOOTER_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
