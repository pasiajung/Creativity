import { profile } from '../content/profile'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-500 sm:px-6 dark:text-slate-400">
        <p>
          {profile.affiliation} · {profile.name} {profile.position}
        </p>
        <p className="mt-1">
          문의:{' '}
          <a href={`mailto:${profile.contact.email}`} className="underline underline-offset-2 hover:text-brand-700 dark:hover:text-brand-300">
            {profile.contact.email}
          </a>
        </p>
      </div>
    </footer>
  )
}
