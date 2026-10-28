import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import type { Comment, Page, PageCursor } from '../services'
import CommentItem from './CommentItem'
import LoginPrompt from './LoginPrompt'
import TextForm from './TextForm'

interface CommentPanelProps {
  /** 목록이 바뀌어야 할 때(대상이 바뀔 때) 달라지는 값 */
  listKey: string
  noun: '댓글' | '답글'
  maxLength: number
  load: (cursor: PageCursor | null) => Promise<Page<Comment>>
  add: (text: string) => Promise<Comment>
  update: (id: string, text: string) => Promise<void>
  remove: (id: string) => Promise<void>
  /** 개수가 바뀔 때 알려줌 (+1 / -1) */
  onCountChange?: (delta: number) => void
}

/** 댓글(연구·수업)과 답글(토론)이 함께 쓰는 목록 + 입력 영역. 20개씩 "더 보기"로 불러옵니다. */
export default function CommentPanel({ listKey, noun, maxLength, load, add, update, remove, onCountChange }: CommentPanelProps) {
  const { user, isAdmin } = useAuth()
  const [items, setItems] = useState<Comment[]>([])
  const [cursor, setCursor] = useState<PageCursor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 같은 항목이 두 번 보이지 않도록 id 로 합칩니다.
  const merge = useCallback((prev: Comment[], next: Comment[]) => {
    const seen = new Set(prev.map((c) => c.id))
    return [...prev, ...next.filter((c) => !seen.has(c.id))]
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setItems([])
    load(null)
      .then((page) => {
        if (cancelled) return
        setItems(page.items)
        setCursor(page.nextCursor)
      })
      .catch(() => {
        if (!cancelled) setError(`${noun}을 불러오지 못했습니다.`)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // listKey 가 바뀔 때만 다시 불러옵니다.
  }, [listKey])

  async function loadMore() {
    setLoading(true)
    try {
      const page = await load(cursor)
      setItems((prev) => merge(prev, page.items))
      setCursor(page.nextCursor)
    } catch {
      setError(`${noun}을 더 불러오지 못했습니다.`)
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(text: string) {
    const created = await add(text)
    // 아직 불러오지 않은 뒷부분이 있으면, 새 글은 "더 보기"로 끝까지 불러올 때 나타납니다.
    if (cursor === null) setItems((prev) => merge(prev, [created]))
    onCountChange?.(1)
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-3 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}

      {loading && items.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">불러오는 중…</p>
      ) : (
        items.length === 0 &&
        !error && <p className="text-slate-500 dark:text-slate-400">아직 {noun}이 없습니다. 첫 의견을 남겨 주세요.</p>
      )}

      {items.length > 0 && (
        <ul className="space-y-3">
          {items.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              maxLength={maxLength}
              canEdit={!!user && (user.uid === c.authorId || isAdmin)}
              onUpdate={async (text) => {
                await update(c.id, text)
                setItems((prev) => prev.map((x) => (x.id === c.id ? { ...x, text, updatedAt: new Date() } : x)))
              }}
              onDelete={async () => {
                await remove(c.id)
                setItems((prev) => prev.filter((x) => x.id !== c.id))
                onCountChange?.(-1)
              }}
            />
          ))}
        </ul>
      )}

      {cursor !== null && (
        <button
          type="button"
          onClick={loadMore}
          disabled={loading}
          className="mt-4 rounded-full border border-slate-300 px-5 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-white/15 dark:hover:bg-white/5"
        >
          {loading ? '불러오는 중…' : `${noun} 더 보기`}
        </button>
      )}

      <div className="mt-6">
        {user ? (
          <TextForm label={`${noun} 쓰기`} maxLength={maxLength} placeholder={`${noun}을 남겨 주세요. (최대 ${maxLength.toLocaleString()}자)`} submitLabel={`${noun} 등록`} onSubmit={handleAdd} />
        ) : (
          <LoginPrompt message={`Google 계정으로 로그인하면 ${noun}을 남길 수 있습니다.`} />
        )}
      </div>
    </div>
  )
}
