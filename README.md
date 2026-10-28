# [이름] 교수 연구 포트폴리오

계명대학교 교수학습개발센터(CTL) [이름] 교수의 연구 성과와 수업 자료·수업 방식을 소개하는 웹사이트입니다.
동료 교수님들이 Google 계정으로 로그인해 댓글과 토론으로 의견을 나누는 기능은 **2단계(Phase 2)** 에서 추가됩니다.

| 단계 | 내용 | 상태 |
|---|---|---|
| Phase 1 | 사이트 틀(홈·연구·수업·토론·소개), Netlify 배포 준비 | ✅ 완료 |
| Phase 2 | Firebase 연동(Google 로그인, 댓글, 토론 게시판) | 준비 중 |

---

## 1. 내 컴퓨터에서 실행해 보기

### 처음 한 번만 준비
1. [Node.js](https://nodejs.org/ko) 웹사이트에서 **LTS** 버전(22 이상 권장, 최소 20.19)을 내려받아 설치합니다.
2. 이 저장소를 내려받습니다. (GitHub 저장소 화면 → 초록색 **Code** 버튼 → **Download ZIP** → 압축 풀기)
3. 터미널(맥: "터미널", 윈도우: "명령 프롬프트" 또는 "PowerShell")을 열고, 압축을 푼 폴더로 이동합니다.
   ```bash
   cd 폴더경로/Creativity
   ```
4. 필요한 프로그램 조각(라이브러리)을 설치합니다. 몇 분 걸릴 수 있습니다.
   ```bash
   npm install
   ```

### 실행
```bash
npm run dev
```
화면에 나온 주소(보통 `http://localhost:5173`)를 브라우저에서 열면 사이트가 보입니다.
파일을 고치고 저장하면 브라우저 화면이 자동으로 바뀝니다. 끝낼 때는 터미널에서 `Ctrl + C`를 누릅니다.

### 배포 전 점검
```bash
npm run build
```
오류 없이 `✓ built` 가 나오면 배포해도 됩니다. 오류가 나면 메시지에 적힌 파일과 줄 번호를 확인하세요(대부분 따옴표나 쉼표가 빠진 경우입니다).

---

## 2. 콘텐츠 고치기·추가하기

글 내용은 모두 `src/content/` 폴더의 파일 3개에 들어 있습니다. 데이터베이스는 쓰지 않습니다.

| 파일 | 내용 |
|---|---|
| `src/content/profile.ts` | 이름, 소개 문단, 약력, 학력, 연구 관심 분야, 연락처 |
| `src/content/research.ts` | 연구 목록(논문·보고서·발표·프로젝트) |
| `src/content/teaching.ts` | 수업 목록 |
| `src/config.ts` | 브라우저 탭에 보이는 사이트 이름 |

> ⚠️ 지금 들어 있는 연구 3개, 수업 2개는 모두 **[샘플]** 입니다. 실제 내용으로 바꾸거나 지워 주세요.
> `[이름]`, `[이메일]`처럼 대괄호로 된 부분도 실제 정보로 바꿔 주세요.

**고칠 때 지킬 규칙**
- 따옴표(`'...'`) 안의 글자만 바꿉니다. 따옴표, 쉼표(`,`), 괄호(`{ }`, `[ ]`)는 지우지 않습니다.
- 각 파일 맨 위에 한국어로 된 "새 항목 추가 방법" 설명이 있습니다.

### 예시: 연구 추가하기 (`src/content/research.ts`)
목록(`[` 와 `]` 사이)에 아래 덩어리를 하나 붙여 넣고 내용을 고칩니다.

```ts
  {
    slug: 'flipped-learning-2026',          // 주소 이름: /research/flipped-learning-2026
    title: '대학 플립러닝 수업의 학습 효과',
    year: 2026,
    type: '논문',                            // '논문' | '보고서' | '발표' | '프로젝트'
    authors: ['[이름]', '[공동저자]'],
    venue: '[학술지명], 12(3), 45-67',
    abstract: '초록 내용을 여기에 씁니다.',
    keywords: ['플립러닝', '학습 효과'],
    links: {
      doi: '10.xxxx/xxxx',                   // DOI 번호만 (없으면 이 줄 삭제)
      pdf: 'https://drive.google.com/...',   // PDF 공유 링크 (없으면 이 줄 삭제)
    },
    featured: true,                          // 홈 "대표 연구"에 표시하려면 true
  },
```
- `slug`는 영문 소문자·숫자·하이픈(-)만 쓰고, 다른 항목과 겹치면 안 됩니다.
- 연구 목록은 연도순으로 자동 정렬되므로 붙여 넣는 위치는 상관없습니다.
- 상세 페이지의 "인용하기(APA 7판)" 문장은 이 정보로 자동으로 만들어집니다.

### 예시: 수업 추가하기 (`src/content/teaching.ts`)
**목록의 맨 위**에 붙여 넣습니다. 맨 위 두 개가 홈 "최근 수업"에 표시됩니다.

```ts
  {
    slug: 'creative-thinking-2026-1',
    courseName: '창의적 사고와 표현',
    semester: '2026년 1학기',
    summary: '한두 문장으로 된 수업 개요',
    methods: ['플립러닝', '팀 프로젝트'],
    methodDetail: `여러 줄로 쓰면
엔터로 바꾼 줄이 그대로 화면에 보입니다.`,
    materials: [
      { label: '강의계획서', url: 'https://drive.google.com/...' },
    ],
    reflection: `수업 성찰과 결과`,
  },
```
- 수업 자료 파일은 사이트에 올리지 않습니다. Google Drive에 올린 뒤 **공유 → "링크가 있는 모든 사용자"** 로 바꾸고 그 링크를 `url`에 넣습니다.
- 여러 줄 글은 따옴표 대신 **백틱(`` ` ``, 키보드 숫자 1 왼쪽 키)** 으로 감쌉니다.

### 프로필 사진 넣기
사진 파일(예: `profile.jpg`)을 `public` 폴더에 넣고, `profile.ts`에서 `photoUrl: '/profile.jpg'`로 바꿉니다.

---

## 3. GitHub에 올리고 Netlify로 배포하기

이 사이트는 **GitHub 저장소 → Netlify** 순서로 배포합니다. GitHub에 변경 사항을 올리면 Netlify가 자동으로 사이트를 다시 만듭니다.
빌드 설정은 `netlify.toml` 파일에 미리 넣어 두었기 때문에 Netlify에서 따로 입력할 것이 거의 없습니다.

### 3-1. GitHub에 올리기
이 저장소(`pasiajung/Creativity`)에는 이미 코드가 올라가 있습니다.
나중에 콘텐츠를 고칠 때는 아래 두 방법 중 편한 쪽을 씁니다.
- **웹에서 바로 고치기(가장 쉬움)**: GitHub 저장소에서 파일을 열고 연필(✏️) 아이콘 → 내용 수정 → **Commit changes**
- **내 컴퓨터에서 고치기**: 파일을 고친 뒤 아래 명령을 차례로 실행합니다.
  ```bash
  git add .
  ```
  ```bash
  git commit -m "연구 항목 추가"
  ```
  ```bash
  git push
  ```

### 3-2. Netlify 연결 (처음 한 번)
1. [Netlify](https://app.netlify.com)에 접속해 **GitHub 계정으로 가입/로그인**합니다.
2. **Add new site → Import an existing project** 를 누릅니다.
3. **GitHub** 을 선택하고, Netlify가 저장소에 접근하도록 허용한 뒤 `Creativity` 저장소를 고릅니다.
4. 설정 화면에서 다음을 확인합니다. (`netlify.toml` 덕분에 대부분 자동으로 채워집니다)
   - **Branch to deploy**: 사이트로 내보낼 브랜치 (코드가 들어 있는 브랜치를 선택)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Deploy** 를 누르고 1~2분 기다리면 `https://임의이름.netlify.app` 주소가 생깁니다.
6. (선택) **Site configuration → Change site name** 에서 주소 앞부분을 바꿀 수 있습니다. 예: `ctl-professor.netlify.app`

### 3-3. 배포 후 확인할 것
- 홈, 연구, 수업, 토론, 소개 메뉴가 모두 열리는지
- 연구 상세 페이지 주소(예: `/research/sample-consulting-report`)를 주소창에 직접 입력하고 새로고침해도 열리는지
  (열리지 않으면 `netlify.toml`의 리다이렉트 설정이 빠진 것입니다)
- 휴대폰에서도 메뉴(☰)가 잘 열리는지

---

## 4. Firebase 연동 체크리스트 (Phase 2에서 진행)

> Phase 2 작업이 끝난 뒤에 진행합니다. **무료 Spark 요금제만** 사용하며, 유료(Blaze) 전환은 하지 않습니다.

1. **프로젝트 생성 → 웹 앱 등록 → 설정값 복사**
   - [Firebase 콘솔](https://console.firebase.google.com) → 프로젝트 추가 (Google 애널리틱스는 꺼도 됩니다)
   - 요금제가 **Spark(무료)** 인지 확인합니다.
   - 프로젝트 개요 옆 ⚙️ → 프로젝트 설정 → **내 앱 → 웹(</>)** 으로 앱 등록 (Firebase Hosting은 체크하지 않음)
   - 화면에 나오는 `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` 6개 값을 메모합니다.
2. **Authentication에서 Google 사용 설정**
   - Authentication → 시작하기 → 로그인 방법 → **Google** → 사용 설정 → 지원 이메일 선택 → 저장
3. **승인된 도메인에 Netlify 주소 추가**
   - Authentication → 설정 → **승인된 도메인** → 도메인 추가 → `xxx.netlify.app` (내 Netlify 주소)
4. **Firestore 생성 → 보안 규칙 게시**
   - Firestore Database → 데이터베이스 만들기 → 위치 **asia-northeast3 (서울)** 권장 (나중에 바꿀 수 없음) → 프로덕션 모드
   - **규칙** 탭에 저장소의 `firestore.rules` 파일 내용을 통째로 붙여 넣고 → **게시**
5. **Netlify 환경 변수 입력 → 재배포**
   - Netlify → Site configuration → **Environment variables** → 아래 6개를 추가합니다. (값은 1번에서 메모한 것)

     | 이름 | Firebase 값 |
     |---|---|
     | `VITE_FIREBASE_API_KEY` | apiKey |
     | `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
     | `VITE_FIREBASE_PROJECT_ID` | projectId |
     | `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
     | `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
     | `VITE_FIREBASE_APP_ID` | appId |
   - Deploys → **Trigger deploy → Deploy site** 로 다시 배포합니다. (환경 변수는 다시 배포해야 반영됩니다)
   - 내 컴퓨터에서 쓰려면 `.env.example`을 복사해 `.env` 파일을 만들고 같은 값을 넣습니다. `.env`는 GitHub에 올라가지 않습니다.
6. **무료 사용량 확인하기**
   - Firestore Database → **사용량** 탭에서 하루 읽기·쓰기 횟수를 확인합니다.
   - Spark 요금제는 한도를 넘으면 과금되지 않고 그날 기능이 멈출 뿐이므로 요금 걱정은 없습니다.

---

## 5. 폴더 구조 (참고용)

```
src/
├─ content/     ✏️ 연구·수업·프로필 내용 (주로 여기만 고치면 됩니다)
├─ config.ts    ✏️ 사이트 이름 설정
├─ types/       콘텐츠 데이터의 모양 정의
├─ pages/       페이지 화면 (홈, 연구, 수업, 토론, 소개, 404)
├─ components/  여러 페이지에서 쓰는 화면 조각 (헤더, 카드, 토론 영역 등)
├─ layouts/     공통 틀 (헤더 + 본문 + 푸터)
├─ services/    댓글·토론 기능 (지금은 "준비 중" 목업, Phase 2에서 Firestore로 교체)
└─ lib/         보조 기능 (페이지 제목, APA 인용, 다크 모드)
```

## 6. 사용한 기술

- Vite + React + TypeScript, Tailwind CSS, React Router
- 글꼴: Pretendard (CDN)
- 배포: Netlify (설정: `netlify.toml`)
