import { useState } from 'react'
import { toApaCitation } from '../lib/citation'
import type { Research } from '../types/content'

type Status = 'idle' | 'copied' | 'failed'

/** APA 7판 인용문을 보여주고 클립보드에 복사하는 버튼 */
export default function CitationButton({ item }: { item: Research }) {
  const [status, setStatus] = useState<Status>('idle')
  const citation = toApaCitation(item)

  async function copy() {
    try {
      await navigator.clipboard.writeText(citation)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    window.setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <section aria-labelledby="citation-heading" className="rounded-xl bg-slate-50 p-5 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="citation-heading" className="text-base font-semibold text-slate-900 dark:text-white">
          인용하기 <span className="text-sm font-normal text-slate-500 dark:text-slate-400">(APA 7판)</span>
        </h2>
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-brand-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 dark:bg-brand-300 dark:text-brand-950 dark:hover:bg-brand-200"
        >
          인용문 복사
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed break-all text-slate-700 select-all dark:text-slate-300">{citation}</p>
      <p aria-live="polite" className="mt-2 h-5 text-sm text-brand-700 dark:text-brand-300">
        {status === 'copied' && '복사되었습니다.'}
        {status === 'failed' && '복사하지 못했습니다. 위 문장을 직접 선택해 복사해 주세요.'}
      </p>
    </section>
  )
}
