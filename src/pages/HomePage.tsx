import { Link } from 'react-router'
import ResearchCard from '../components/ResearchCard'
import SectionHeading from '../components/SectionHeading'
import TeachingCard from '../components/TeachingCard'
import { profile } from '../content/profile'
import { research } from '../content/research'
import { teaching } from '../content/teaching'
import { usePageTitle } from '../lib/usePageTitle'

export default function HomePage() {
  usePageTitle()

  const featured = research
    .filter((r) => r.featured)
    .sort((a, b) => b.year - a.year)
    .slice(0, 3)
  const recentTeaching = teaching.slice(0, 2)

  const stats = [
    { label: '연구 성과', value: research.length, unit: '편' },
    { label: '소개한 수업', value: teaching.length, unit: '개' },
  ]

  return (
    <>
      <section
        aria-labelledby="intro-heading"
        className="relative -mt-4 overflow-hidden rounded-3xl bg-brand-950 px-6 py-12 text-white shadow-[0_24px_60px_-24px_rgba(12,21,48,0.6)] sm:px-12 sm:py-16 dark:bg-brand-900/60 dark:ring-1 dark:ring-white/10"
      >
        {/* 장식용 배경 (빛 번짐 + 격자) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent-400/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        </div>

        <div className="relative grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-accent-300">
              <span aria-hidden="true" className="h-px w-8 bg-accent-300" />
              {profile.affiliation}
            </p>
            <h1 id="intro-heading" className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {profile.name} <span className="text-brand-300">{profile.position}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100/90">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/research"
                className="rounded-full bg-accent-400 px-5 py-2.5 font-semibold text-brand-950 shadow-sm transition hover:bg-accent-300 focus-visible:outline-white"
              >
                연구 둘러보기
              </Link>
              <Link
                to="/about"
                className="rounded-full px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10 focus-visible:outline-white"
              >
                약력과 연락처
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm">
            <dl className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-brand-300">{s.label}</dt>
                  <dd className="mt-1 text-3xl font-bold tabular-nums">
                    {s.value}
                    <span className="ml-0.5 text-base font-medium text-brand-300">{s.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs text-brand-300">연구 관심 분야</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.interests.map((i) => (
                  <li key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-50">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mt-20">
        <SectionHeading id="featured-heading" eyebrow="Selected Research" title="대표 연구" more={{ to: '/research', label: '전체 연구' }} />
        <ul className="grid gap-5 md:grid-cols-3">
          {featured.map((item) => (
            <li key={item.slug}>
              <ResearchCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="teaching-heading" className="mt-20">
        <SectionHeading id="teaching-heading" eyebrow="Teaching" title="최근 수업" more={{ to: '/teaching', label: '전체 수업' }} />
        <ul className="grid gap-5 md:grid-cols-2">
          {recentTeaching.map((item) => (
            <li key={item.slug}>
              <TeachingCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="discussion-cta-heading"
        className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-accent-200 bg-gradient-to-br from-accent-50 via-white to-brand-50 p-8 sm:flex-row sm:items-center sm:p-10 dark:border-accent-700/40 dark:from-accent-700/10 dark:via-ink-900 dark:to-brand-900/40"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase dark:text-accent-300">Discussion</p>
          <h2 id="discussion-cta-heading" className="mt-2 text-2xl font-bold tracking-tight text-brand-950 dark:text-white">
            동료 교수님들과 함께 나누는 토론
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
            연구와 수업 방식, 수업 자료에 대한 생각을 자유롭게 나눠 주세요. 교수법 고민을 함께 이야기하는 공간입니다.
          </p>
        </div>
        <Link
          to="/discussion"
          className="shrink-0 rounded-full bg-brand-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-800 dark:bg-accent-400 dark:text-brand-950 dark:hover:bg-accent-300"
        >
          토론 게시판 바로가기 →
        </Link>
      </section>
    </>
  )
}
