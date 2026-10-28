import { Link, useNavigate, useSearchParams } from 'react-router'
import LoginPrompt from '../components/LoginPrompt'
import PageHeader from '../components/PageHeader'
import ThreadForm from '../components/ThreadForm'
import { useAuth } from '../lib/AuthContext'
import { findTarget } from '../lib/targets'
import { usePageTitle } from '../lib/usePageTitle'
import { discussionService } from '../services'

export default function NewThreadPage() {
  usePageTitle('새 토론 글')
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  // 연구·수업 상세의 "이 주제로 토론 글 쓰기"에서 오면 관련 항목이 미리 선택됩니다.
  const related = findTarget(params.get('related'))

  return (
    <>
      <nav aria-label="이동 경로" className="mb-4 text-sm">
        <Link to="/discussion" className="text-brand-700 hover:underline dark:text-brand-300">
          ← 토론 목록
        </Link>
      </nav>
      <PageHeader title="새 토론 글" />

      {!discussionService.isAvailable ? (
        <p className="text-slate-600 dark:text-slate-400">토론 게시판은 준비 중입니다.</p>
      ) : loading ? (
        <p className="text-slate-500">불러오는 중…</p>
      ) : !user ? (
        <LoginPrompt message="글을 쓰려면 Google 계정으로 로그인해 주세요." />
      ) : (
        <ThreadForm
          initial={{ relatedTargetId: related?.id ?? null, category: related ? (related.group === '연구' ? '연구' : '수업방식') : '자유' }}
          submitLabel="등록"
          onCancel={() => navigate(-1)}
          onSubmit={async (input) => {
            const id = await discussionService.createThread(input)
            navigate(`/discussion/${id}`, { replace: true })
          }}
        />
      )}
    </>
  )
}
