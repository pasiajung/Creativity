import { useEffect } from 'react'
import { SITE_TITLE } from '../config'

/** 페이지마다 브라우저 탭 제목(<title>)을 설정합니다. title 이 없으면 사이트 이름만 표시합니다. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_TITLE}` : SITE_TITLE
  }, [title])
}
