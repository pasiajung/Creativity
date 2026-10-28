import ExternalLink from '../components/ExternalLink'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { profile } from '../content/profile'
import { usePageTitle } from '../lib/usePageTitle'

const sectionHeading = 'mb-5 flex items-center gap-2.5 text-lg font-semibold text-brand-950 before:h-4 before:w-1 before:rounded-full before:bg-accent-400 dark:text-white'

function Timeline({ items }: { items: { period: string; description: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={`${it.period}-${it.description}`} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <span className="text-sm font-medium text-accent-600 tabular-nums dark:text-accent-300">{it.period}</span>
          <span>{it.description}</span>
        </li>
      ))}
    </ul>
  )
}

export default function AboutPage() {
  usePageTitle('소개')
  const { contact } = profile

  return (
    <>
      <PageHeader title="소개" />

      <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={`${profile.name} ${profile.position} 프로필 사진`}
            className="h-28 w-28 rounded-full object-cover ring-4 ring-accent-200 dark:ring-accent-700/40"
          />
        ) : (
          <div aria-hidden="true" className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-800 to-brand-950 text-3xl font-bold text-accent-200 ring-4 ring-accent-200 dark:ring-accent-700/40">
            {profile.name.replace(/[[\]]/g, '').slice(0, 1)}
          </div>
        )}
        <div>
          <p className="text-2xl font-bold text-brand-950 dark:text-white">
            {profile.name} <span className="text-lg font-medium text-slate-600 dark:text-slate-400">{profile.position}</span>
          </p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">{profile.affiliation}</p>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <section aria-labelledby="career-heading">
          <h2 id="career-heading" className={sectionHeading}>
            약력
          </h2>
          <Timeline items={profile.career} />
          <h3 className="mt-6 mb-3 font-semibold text-brand-950 dark:text-white">학력</h3>
          <Timeline items={profile.education} />
        </section>

        <div className="space-y-10">
          <section aria-labelledby="interests-heading">
            <h2 id="interests-heading" className={sectionHeading}>
              연구 관심 분야
            </h2>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <li key={i}>
                  <Tag>{i}</Tag>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className={sectionHeading}>
              연락처
            </h2>
            <dl className="grid grid-cols-[4.5rem_1fr] gap-y-2 text-[15px]">
              <dt className="text-slate-500 dark:text-slate-400">이메일</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="text-brand-700 hover:underline dark:text-brand-300">
                  {contact.email}
                </a>
              </dd>
              <dt className="text-slate-500 dark:text-slate-400">연구실</dt>
              <dd>{contact.office}</dd>
              <dt className="text-slate-500 dark:text-slate-400">전화</dt>
              <dd>{contact.phone}</dd>
            </dl>
            {contact.links.length > 0 && (
              <ul className="mt-4 space-y-1">
                {contact.links.map((l) => (
                  <li key={l.url}>
                    <ExternalLink href={l.url} className="text-brand-700 hover:underline dark:text-brand-300">
                      {l.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
