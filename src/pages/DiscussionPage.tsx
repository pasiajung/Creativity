import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'
import { THREAD_CATEGORIES } from '../services'
import { usePageTitle } from '../lib/usePageTitle'

export default function DiscussionPage() {
  usePageTitle('토론')

  return (
    <>
      <PageHeader title="토론" description="동료 교수님들과 연구·수업 방식·자료에 대한 의견을 나누는 게시판입니다." />

      <section className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-8 text-center dark:border-brand-800 dark:bg-brand-950/40">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">토론 게시판은 준비 중입니다</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
          곧 Google 계정으로 로그인해 글을 쓰고 답글을 달 수 있게 됩니다. 게시판은 아래 주제로 나뉠 예정입니다.
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="예정된 게시판 주제">
          {THREAD_CATEGORIES.map((c) => (
            <li key={c} className="rounded-full bg-white px-3 py-1 text-sm font-medium text-brand-800 ring-1 ring-brand-100 dark:bg-slate-900 dark:text-brand-200 dark:ring-brand-900">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          그동안 의견은{' '}
          <Link to="/about" className="font-medium text-brand-700 underline underline-offset-2 dark:text-brand-300">
            연락처
          </Link>
          로 보내 주세요.
        </p>
      </section>
    </>
  )
}
