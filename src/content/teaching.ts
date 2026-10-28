import type { Teaching } from '../types/content'

/*
 * ✏️ 새 수업 항목 추가 방법
 * ─────────────────────────────────────────────
 * 1. 아래 teaching 목록에서 { 부터 }, 까지 한 덩어리를 통째로 복사합니다.
 * 2. 목록의 맨 위에 붙여 넣습니다. ★ 목록의 맨 위 두 개가 홈 화면 "최근 수업"에 표시됩니다.
 * 3. 각 칸을 고칩니다.
 *    - slug         : 주소에 쓰일 영문 이름. 영문 소문자·숫자·하이픈(-)만, 다른 항목과 겹치지 않게.
 *                     예) 'creative-thinking-2026-1' → 사이트 주소 /teaching/creative-thinking-2026-1
 *    - methods      : 수업 방식 태그. ['플립러닝', '팀 프로젝트'] 처럼 적습니다.
 *    - methodDetail, reflection : 백틱(`) 사이에 쓰면 엔터로 줄을 바꾼 그대로 화면에 표시됩니다.
 *    - materials    : 자료 파일은 사이트에 올리지 않습니다. Google Drive 등에 올린 뒤
 *                     "링크가 있는 모든 사용자" 공유로 바꾸고 그 링크를 url 에 붙여 넣습니다.
 * 4. 저장한 뒤 npm run dev 로 확인하고, GitHub에 올리면 Netlify가 자동으로 다시 배포합니다.
 *
 * 예시)
 *   {
 *     slug: 'new-course-2026-1',
 *     courseName: '교과목명',
 *     semester: '2026년 1학기',
 *     summary: '한두 문장 개요',
 *     methods: ['플립러닝', '토론'],
 *     methodDetail: `첫 줄
 *   둘째 줄`,
 *     materials: [{ label: '강의계획서', url: 'https://drive.google.com/...' }],
 *     reflection: `성찰 내용`,
 *   },
 *
 * ⚠️ 아래 항목은 모두 화면 구성을 보여주기 위한 [샘플]입니다. 실제 수업 내용으로 바꿔 주세요.
 */
export const teaching: Teaching[] = [
  {
    slug: 'creative-problem-solving-in-daily-life',
    courseName: '[샘플] 생활속의 창의적 문제해결',
    semester: '2025년 2학기',
    summary:
      '일상에서 마주치는 문제를 찾아 정의하고, 팀 단위로 아이디어를 내고 시제품을 만들어 보는 교양 수업입니다. (샘플 설명)',
    methods: ['프로젝트 기반 학습', '팀 활동', '디자인 씽킹', '성찰일지'],
    methodDetail: `(샘플) 수업 방식을 자세히 설명하는 자리입니다.

1~4주: 문제 발견 — 생활 속 불편함을 관찰하고 기록합니다.
5~8주: 문제 정의와 아이디어 발산 — 팀별로 문제를 좁히고 다양한 아이디어를 냅니다.
9~13주: 시제품 제작과 피드백 — 간단한 시제품을 만들고 동료 피드백을 받습니다.
14~15주: 발표와 성찰 — 결과를 발표하고 개인 성찰일지를 정리합니다.`,
    materials: [
      { label: '[샘플] 강의계획서 (링크 자리)', url: 'https://example.com/syllabus' },
      { label: '[샘플] 팀 활동지 (링크 자리)', url: 'https://example.com/worksheet' },
    ],
    reflection: `(샘플) 수업을 마친 뒤의 성찰과 결과를 적는 자리입니다.

- 잘된 점: 
- 어려웠던 점: 
- 다음 학기에 바꿔 볼 점: `,
  },
  {
    slug: 'sample-writing-and-discussion',
    courseName: '[샘플] 교양 글쓰기와 토론',
    semester: '2025년 1학기',
    summary: '사전 학습 영상으로 개념을 익히고, 수업 시간에는 토론과 동료 피드백에 집중하는 수업입니다. (샘플 설명)',
    methods: ['플립러닝', '토론', '동료 피드백'],
    methodDetail: `(샘플) 수업 방식을 자세히 설명하는 자리입니다.

수업 전: 짧은 영상과 읽기 자료로 개념을 미리 학습합니다.
수업 중: 소그룹 토론 후 글의 초안을 서로 읽고 피드백을 주고받습니다.
수업 후: 피드백을 반영해 글을 고쳐 제출합니다.`,
    materials: [{ label: '[샘플] 동료 피드백 양식 (링크 자리)', url: 'https://example.com/feedback-form' }],
    reflection: `(샘플) 수업을 마친 뒤의 성찰과 결과를 적는 자리입니다.`,
  },
]
