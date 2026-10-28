import PageHeader from '../components/PageHeader'
import TeachingCard from '../components/TeachingCard'
import { teaching } from '../content/teaching'
import { usePageTitle } from '../lib/usePageTitle'

export default function TeachingListPage() {
  usePageTitle('수업')

  return (
    <>
      <PageHeader title="수업" description="담당 교과목과 수업 방식, 수업 자료와 성찰을 소개합니다." />
      <ul className="grid gap-4 md:grid-cols-2">
        {teaching.map((item) => (
          <li key={item.slug}>
            <TeachingCard item={item} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </>
  )
}
