/*
 * ✏️ 사이트 기본 설정
 * ─────────────────────────────────────────────
 * 브라우저 탭에 보이는 사이트 이름 등을 바꿀 수 있습니다.
 * (Phase 2에서 관리자 이메일·허용 도메인 설정이 이 파일에 추가됩니다.)
 */

/** 브라우저 탭 제목 뒤에 붙는 사이트 이름 */
export const SITE_TITLE = '[이름] 연구 포트폴리오'

/** 헤더 왼쪽에 보이는 짧은 사이트 이름 */
export const SITE_SHORT_NAME = '[이름] 교수'

/** 헤더 사이트 이름 아래에 보이는 소속 */
export const SITE_SUBTITLE = '계명대학교 교수학습개발센터'

/*
 * ✏️ 토론·댓글 참여 설정 (Phase 2)
 * ─────────────────────────────────────────────
 * ⚠️ 이 두 값을 바꾸면 firestore.rules 파일의 같은 설정도 반드시 함께 바꾸고,
 *    Firebase 콘솔 > Firestore > 규칙 탭에 다시 붙여 넣어 "게시"해야 합니다.
 */

/** 관리자 Google 계정 이메일. 관리자는 다른 사람의 댓글·글도 수정·삭제할 수 있습니다. 여러 명이면 쉼표로 추가합니다. */
export const ADMIN_EMAILS: string[] = ['pasiajung@gmail.com']

/**
 * 참여를 허용할 이메일 도메인. 비워 두면('') 누구나 Google 계정으로 참여할 수 있습니다.
 * 예) 'kmu.ac.kr' 로 적으면 @kmu.ac.kr 계정만 로그인·작성할 수 있습니다.
 */
export const ALLOWED_EMAIL_DOMAIN: string = ''
