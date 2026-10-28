/** 날짜를 "2025. 3. 14. 오후 2:05" 형식으로 표시합니다. */
export function formatDateTime(date: Date): string {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
