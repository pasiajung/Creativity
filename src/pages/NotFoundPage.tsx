import { Link } from 'react-router'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('페이지를 찾을 수 없음')

  return (
    <section className="py-16 text-center">
      <p className="text-5xl font-bold text-brand-800 dark:text-brand-300">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">주소가 바뀌었거나 삭제된 페이지일 수 있습니다.</p>
      <Link to="/" className="mt-8 inline-block rounded-md bg-brand-800 px-4 py-2 font-medium text-white hover:bg-brand-700">
        홈으로 가기
      </Link>
    </section>
  )
}
