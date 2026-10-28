import type { Profile } from '../types/content'

/*
 * ✏️ 프로필 정보 수정 방법
 * ─────────────────────────────────────────────
 * - 따옴표('...') 안의 글자만 바꾸면 됩니다. 따옴표·쉼표·괄호는 지우지 마세요.
 * - [이름], [연구실 위치] 처럼 대괄호로 된 부분은 자리표시자입니다. 실제 정보로 바꿔 주세요.
 * - 약력·학력·관심 분야에 항목을 추가하려면, 기존 한 줄을 복사해 바로 아래에 붙여 넣고 내용을 고칩니다.
 *     예) { period: '2026 ~ 현재', description: '[새 경력]' },
 * - 프로필 사진을 쓰려면 사진 파일을 public 폴더에 넣고 photoUrl: '/profile.jpg' 처럼 적습니다.
 *   사진을 쓰지 않으려면 photoUrl: '' 로 둡니다.
 */
export const profile: Profile = {
  name: '[이름]',
  position: '교수',
  affiliation: '계명대학교 교수학습개발센터(CTL)',
  photoUrl: '',

  intro:
    '[이름]은 계명대학교 교수학습개발센터에서 대학 수업의 질을 높이기 위한 연구와 지원을 하고 있습니다. ' +
    '학습자 중심 수업 설계, 창의적 문제해결 교육, 수업컨설팅을 주로 다루며, ' +
    '이 사이트에서 연구 성과와 수업 경험을 나누고 동료 교수님들과 의견을 주고받고자 합니다.',

  career: [
    { period: '[연도] ~ 현재', description: '계명대학교 교수학습개발센터 교수' },
    { period: '[연도] ~ [연도]', description: '[이전 기관] [직위]' },
  ],

  education: [
    { period: '[연도]', description: '[대학교] [전공] 박사' },
    { period: '[연도]', description: '[대학교] [전공] 석사' },
  ],

  interests: ['학습자 중심 수업 설계', '창의적 문제해결 교육', '수업컨설팅', '교수학습 성찰'],

  contact: {
    email: '[이메일]@kmu.ac.kr',
    office: '[연구실 위치]',
    phone: '053-[번호]',
    links: [{ label: '계명대학교 교수학습개발센터', url: 'https://www.kmu.ac.kr' }],
  },
}
