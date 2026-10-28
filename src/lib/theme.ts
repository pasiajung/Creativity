export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** 테마를 적용하고 다음 방문을 위해 브라우저에 기억합니다. */
export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // 사생활 보호 모드 등에서 저장이 막혀도 화면 전환은 그대로 동작합니다.
  }
}
