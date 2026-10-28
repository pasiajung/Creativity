import { Link } from 'react-router'
import { COMMENT_MAX_LENGTH, discussionService } from '../services'
import CommentPanel from './CommentPanel'
import RelatedDiscussions from './RelatedDiscussions'

interface DiscussionSectionProps {
  /** 댓글이 달리는 대상. 예: "research-{slug}", "teaching-{slug}" */
  targetId: string
}

const H2 =
  'flex items-center gap-2.5 text-xl font-semibold text-brand-950 before:h-4 before:w-1 before:rounded-full before:bg-accent-400 dark:text-white'

/** 연구·수업 상세 페이지 하단의 토론(관련 토론 + 댓글) 영역 */
export default function DiscussionSection({ targetId }: DiscussionSectionProps) {
  return (
    <section aria-labelledby="discussion-heading" className="mt-16 border-t border-slate-200 pt-10 dark:border-white/10">
      <h2 id="discussion-heading" className={`${H2} mb-6`}>
        토론
      </h2>

      {!discussionService.isAvailable ? (
        <div className="rounded-2xl border border-dashed border-accent-300 bg-accent-50/60 p-6 text-slate-700 dark:border-accent-700/50 dark:bg-accent-700/10 dark:text-slate-300">
          <p className="font-medium">댓글 기능은 준비 중입니다.</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            곧 Google 계정으로 로그인한 동료 교수님들이 이 글에 의견을 남길 수 있게 됩니다. 그 전에는{' '}
            <Link to="/about" className="font-medium text-brand-700 underline underline-offset-2 dark:text-brand-300">
              연락처
            </Link>
            로 의견을 보내 주세요.
          </p>
        </div>
      ) : (
        <>
          <RelatedDiscussions targetId={targetId} />
          <CommentPanel
            listKey={targetId}
            noun="댓글"
            maxLength={COMMENT_MAX_LENGTH}
            load={(cursor) => discussionService.listComments(targetId, cursor)}
            add={(text) => discussionService.addComment(targetId, text)}
            update={(id, text) => discussionService.updateComment(targetId, id, text)}
            remove={(id) => discussionService.deleteComment(targetId, id)}
          />
        </>
      )}
    </section>
  )
}
