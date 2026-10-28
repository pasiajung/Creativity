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
    <section aria-labelledby="citation-heading" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/10 dark:bg-ink-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="citation-heading" className="text-base font-semibold text-brand-950 dark:text-white">
          인용하기 <span className="text-sm font-normal text-slate-500 dark:text-slate-400">(APA 7판)</span>
        </h2>
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-brand-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-accent-400 dark:text-brand-950 dark:hover:bg-accent-300"
        >
          인용문 복사
        </button>
      </div>
      <p className="mt-4 border-l-2 border-accent-400 pl-4 text-sm leading-relaxed break-all text-slate-700 select-all dark:text-slate-300">{citation}</p>
      <p aria-live="polite" className="mt-2 h-5 text-sm text-brand-700 dark:text-brand-300">
        {status === 'copied' && '복사되었습니다.'}
        {status === 'failed' && '복사하지 못했습니다. 위 문장을 직접 선택해 복사해 주세요.'}
      </p>
    </section>
  )
}
