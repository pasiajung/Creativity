import { Link } from 'react-router'
import ResearchCard from '../components/ResearchCard'
import TeachingCard from '../components/TeachingCard'
import { profile } from '../content/profile'
import { research } from '../content/research'
import { teaching } from '../content/teaching'
import { usePageTitle } from '../lib/usePageTitle'

const sectionHeading = 'text-xl font-bold text-slate-900 dark:text-white'
const moreLink = 'text-sm font-medium text-brand-700 hover:underline dark:text-brand-300'

export default function HomePage() {
  usePageTitle()

  const featured = research
    .filter((r) => r.featured)
    .sort((a, b) => b.year - a.year)
    .slice(0, 3)
  const recentTeaching = teaching.slice(0, 2)

  return (
    <>
      <section aria-labelledby="intro-heading" className="rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 sm:p-10 dark:from-brand-950 dark:to-slate-950">
        <p className="text-sm font-medium text-brand-700 dark:text-brand-300">{profile.affiliation}</p>
        <h1 id="intro-heading" className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {profile.name} {profile.position}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">{profile.intro}</p>
        <p className="mt-6">
          <Link to="/about" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
            약력과 연락처 보기 →
          </Link>
        </p>
      </section>

      <section aria-labelledby="featured-heading" className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="featured-heading" className={sectionHeading}>
            대표 연구
          </h2>
          <Link to="/research" className={moreLink}>
            전체 연구 보기 →
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {featured.map((item) => (
            <li key={item.slug}>
              <ResearchCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="teaching-heading" className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="teaching-heading" className={sectionHeading}>
            최근 수업
          </h2>
          <Link to="/teaching" className={moreLink}>
            전체 수업 보기 →
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {recentTeaching.map((item) => (
            <li key={item.slug}>
              <TeachingCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="discussion-cta-heading" className="mt-12 rounded-2xl border border-brand-100 bg-brand-800 p-6 text-white sm:p-8 dark:border-brand-900 dark:bg-brand-900">
        <h2 id="discussion-cta-heading" className="text-xl font-bold">
          동료 교수님들과 함께 나누는 토론
        </h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-brand-100">
          연구와 수업 방식, 수업 자료에 대한 생각을 자유롭게 나눠 주세요. 교수법 고민을 함께 이야기하는 공간입니다.
        </p>
        <Link
          to="/discussion"
          className="mt-5 inline-block rounded-md bg-white px-4 py-2 font-semibold text-brand-800 hover:bg-brand-50 focus-visible:outline-white"
        >
          토론 게시판 바로가기
        </Link>
      </section>
    </>
  )
}
