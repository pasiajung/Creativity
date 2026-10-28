// 사이트 콘텐츠(프로필·연구·수업)의 데이터 모양을 정의합니다.
// src/content/ 폴더의 데이터 파일은 모두 여기 정의된 모양을 따라야 합니다.

/** 연구 유형. 필터 버튼에도 이 순서대로 표시됩니다. */
export const RESEARCH_TYPES = ['논문', '보고서', '발표', '프로젝트'] as const
export type ResearchType = (typeof RESEARCH_TYPES)[number]

export interface ResearchLinks {
  /** PDF 파일 주소 (Google Drive 공유 링크 등) */
  pdf?: string
  /** DOI 번호만 입력 (예: 10.1234/abcd.2025.001). 앞의 https://doi.org/ 는 자동으로 붙습니다. */
  doi?: string
  /** 그 밖의 외부 페이지 주소 (학술지 페이지, KCI, 프로젝트 사이트 등) */
  external?: string
}

export interface Research {
  /** 주소에 쓰이는 영문 식별자. 영문 소문자·숫자·하이픈(-)만 사용하고 다른 항목과 겹치면 안 됩니다. */
  slug: string
  title: string
  year: number
  type: ResearchType
  authors: string[]
  /** 게재지·발표 장소·발주 기관 등 */
  venue: string
  abstract: string
  keywords: string[]
  links: ResearchLinks
  /** true 이면 홈 화면 "대표 연구"에 표시됩니다(최신순 최대 3개). */
  featured: boolean
}

export interface TeachingMaterial {
  label: string
  url: string
}

export interface Teaching {
  /** 주소에 쓰이는 영문 식별자. 영문 소문자·숫자·하이픈(-)만 사용하고 다른 항목과 겹치면 안 됩니다. */
  slug: string
  courseName: string
  /** 예: "2025년 2학기" */
  semester: string
  /** 목록과 상세 상단에 보이는 한두 문장 개요 */
  summary: string
  /** 수업 방식 태그 (예: "프로젝트 기반 학습", "플립러닝") */
  methods: string[]
  /** 수업 방식에 대한 자세한 설명. 줄바꿈이 그대로 표시됩니다. */
  methodDetail: string
  /** 수업 자료 링크 목록. 파일은 올리지 않고 Google Drive 등의 링크만 넣습니다. */
  materials: TeachingMaterial[]
  /** 성찰과 결과. 줄바꿈이 그대로 표시됩니다. */
  reflection: string
}

export interface ProfileLink {
  label: string
  url: string
}

export interface Profile {
  name: string
  /** 직함 (예: "교수") */
  position: string
  affiliation: string
  /** 프로필 사진 주소. 없으면 빈 문자열("")로 두면 이니셜 모양이 표시됩니다. */
  photoUrl: string
  /** 홈 화면 소개 한 단락 */
  intro: string
  /** 약력 (연도와 내용) */
  career: { period: string; description: string }[]
  /** 학력 */
  education: { period: string; description: string }[]
  interests: string[]
  contact: {
    email: string
    office: string
    phone: string
    links: ProfileLink[]
  }
}
