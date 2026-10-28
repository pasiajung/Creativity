import type { Research } from '../types/content'

/*
 * ✏️ 새 연구 항목 추가 방법
 * ─────────────────────────────────────────────
 * 1. 아래 research 목록에서 { 부터 }, 까지 한 덩어리를 통째로 복사합니다.
 * 2. 목록 안 원하는 위치(다른 덩어리 사이)에 붙여 넣습니다. 순서는 상관없습니다(연도순으로 자동 정렬).
 * 3. 각 칸을 고칩니다.
 *    - slug     : 주소에 쓰일 영문 이름. 영문 소문자·숫자·하이픈(-)만, 다른 항목과 겹치지 않게.
 *                 예) 'flipped-learning-2026' → 사이트 주소 /research/flipped-learning-2026
 *    - type     : '논문', '보고서', '발표', '프로젝트' 중 하나를 정확히 입력합니다.
 *    - authors  : ['홍길동', '김철수'] 처럼 따옴표와 쉼표로 구분합니다.
 *    - links    : 있는 것만 적고 없는 줄은 지웁니다. doi 에는 번호만 적습니다(10.xxxx/...).
 *    - featured : 홈 화면 "대표 연구"에 보이게 하려면 true, 아니면 false.
 * 4. 저장한 뒤 npm run dev 로 확인하고, GitHub에 올리면 Netlify가 자동으로 다시 배포합니다.
 *
 * 예시)
 *   {
 *     slug: 'my-new-paper-2026',
 *     title: '논문 제목',
 *     year: 2026,
 *     type: '논문',
 *     authors: ['[이름]', '[공동저자]'],
 *     venue: '[학술지명], 12(3), 45-67',
 *     abstract: '초록 내용',
 *     keywords: ['키워드1', '키워드2'],
 *     links: { doi: '10.xxxx/xxxx', pdf: 'https://drive.google.com/...' },
 *     featured: true,
 *   },
 *
 * ⚠️ 아래 항목은 모두 화면 구성을 보여주기 위한 [샘플]입니다. 실제 연구로 바꾸거나 지워 주세요.
 */
export const research: Research[] = [
  {
    slug: 'sample-creative-problem-solving',
    title: '[샘플] 교양 수업에서 창의적 문제해결 활동 운영 사례 분석',
    year: 2025,
    type: '논문',
    authors: ['[이름]', '[공동저자]'],
    venue: '[학술지명], [권(호)], [쪽]',
    abstract:
      '이 항목은 사이트 화면 구성을 보여주기 위한 샘플이며 실제 논문이 아닙니다. ' +
      '실제 초록이 들어갈 자리입니다. 연구 목적, 연구 방법, 주요 결과, 시사점을 4~6문장 정도로 정리하면 읽기 좋습니다.',
    keywords: ['창의적 문제해결', '교양교육', '학습자 참여'],
    links: { external: 'https://example.com' },
    featured: true,
  },
  {
    slug: 'sample-consulting-report',
    title: '[샘플] 수업컨설팅 프로그램 운영 결과 보고서',
    year: 2024,
    type: '보고서',
    authors: ['[이름]'],
    venue: '계명대학교 교수학습개발센터',
    abstract:
      '이 항목은 사이트 화면 구성을 보여주기 위한 샘플이며 실제 보고서가 아닙니다. ' +
      '보고서의 목적, 운영 내용, 주요 결과를 요약하는 자리입니다.',
    keywords: ['수업컨설팅', '교수지원', '프로그램 운영'],
    links: { pdf: 'https://example.com/sample.pdf' },
    featured: true,
  },
  {
    slug: 'sample-reflection-presentation',
    title: '[샘플] 학습자 성찰일지를 활용한 수업 개선 경험 발표',
    year: 2024,
    type: '발표',
    authors: ['[이름]'],
    venue: '[학술대회명 또는 워크숍명]',
    abstract:
      '이 항목은 사이트 화면 구성을 보여주기 위한 샘플이며 실제 발표가 아닙니다. ' +
      '발표 주제와 핵심 메시지, 청중과 나눈 내용을 정리하는 자리입니다.',
    keywords: ['성찰일지', '수업 개선', '교수학습'],
    links: {},
    featured: true,
  },
]
