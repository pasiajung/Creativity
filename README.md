# [이름] 교수 연구 포트폴리오

계명대학교 교수학습개발센터(CTL) [이름] 교수의 연구 성과와 수업 자료·수업 방식을 소개하는 웹사이트입니다.
동료 교수님들이 Google 계정으로 로그인해 연구·수업에 댓글을 달고, 토론 게시판에서 의견을 나눌 수 있습니다.

| 단계 | 내용 | 상태 |
|---|---|---|
| Phase 1 | 사이트 틀(홈·연구·수업·토론·소개), Netlify 배포 준비 | ✅ 완료 |
| Phase 2 | Firebase 연동(Google 로그인, 댓글, 토론 게시판) | ✅ 완료 |

---

## 1. 내 컴퓨터에서 실행해 보기

### 처음 한 번만 준비
1. [Node.js](https://nodejs.org/ko) 웹사이트에서 **LTS** 버전(24 이상. Firebase 최신 버전이 Node 24.12 이상을 요구합니다)을 내려받아 설치합니다.
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

## 4. Firebase 연동 체크리스트

> **무료 Spark 요금제만** 사용합니다. 유료(Blaze) 전환, Cloud Functions, Cloud Storage, Firebase Hosting, Analytics 는 쓰지 않습니다.
> Firebase 콘솔이 보여주는 설정 코드(`initializeApp`, `getAnalytics` …)는 붙여 넣을 필요가 없습니다. 값 6개만 환경 변수로 넣으면 됩니다(`measurementId`는 쓰지 않음).

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
   - **규칙** 탭의 기존 내용을 모두 지우고, 저장소의 `firestore.rules` 파일 내용을 통째로 붙여 넣은 뒤 → **게시**
   - 관리자 이메일이나 허용 도메인을 바꿨다면 규칙도 다시 붙여 넣고 게시해야 합니다.
5. **Netlify 환경 변수 입력 → 재배포**
   - 아래 [4-1. Netlify 환경 변수 설정 자세히](#4-1-netlify-환경-변수-설정-자세히)를 따라 합니다.
6. **무료 사용량 확인하기**
   - Firestore Database → **사용량** 탭에서 하루 읽기·쓰기 횟수를 확인합니다.
   - Spark 요금제는 한도를 넘으면 과금되지 않고 그날 기능이 멈출 뿐이므로 요금 걱정은 없습니다.

### 4-1. Netlify 환경 변수 설정 자세히

환경 변수는 Firebase 설정값을 코드에 직접 적지 않고 Netlify에 따로 맡겨 두는 방법입니다.
사이트를 빌드할 때 Netlify가 이 값을 넣어 줍니다.

#### ① 넣을 값 찾기
Firebase 콘솔 → ⚙️ **프로젝트 설정** → **일반** 탭 → 아래 **내 앱**의 웹 앱 → **SDK 설정 및 구성** → **구성**을 선택하면 `const firebaseConfig = { ... }` 코드가 보입니다.
여기서 6개 값을 아래 이름으로 옮깁니다. (따옴표 안의 글자만 옮깁니다)

| Netlify 에 넣을 이름 (Key) | firebaseConfig 의 값 | 값 모양 예시 |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` | `AIza`로 시작하는 39자 |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` | `프로젝트ID.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` | `creativity-46db8` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` | `프로젝트ID.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` | 숫자 12자리 |
| `VITE_FIREBASE_APP_ID` | `appId` | `1:숫자:web:영문숫자` |

- `measurementId`(G-로 시작)는 **넣지 않습니다.** 애널리틱스를 쓰지 않기 때문입니다.
- 이름은 대문자·밑줄(_)까지 **정확히 똑같이** 적습니다. 한 글자라도 다르면 사이트가 값을 찾지 못합니다.
- 값 앞뒤에 따옴표나 띄어쓰기를 넣지 않습니다.

#### ② Netlify 에 한 번에 붙여 넣기
1. [app.netlify.com](https://app.netlify.com) 로그인 → 사이트 목록에서 **이 사이트** 클릭
2. 왼쪽 메뉴 **Site configuration** → **Environment variables**
3. **Add a variable** → **Import from a .env file**
4. 입력칸에 아래 형식으로 6줄을 붙여 넣습니다. (`=` 오른쪽을 내 값으로 바꿈)
   ```
   VITE_FIREBASE_API_KEY=apiKey값
   VITE_FIREBASE_AUTH_DOMAIN=authDomain값
   VITE_FIREBASE_PROJECT_ID=projectId값
   VITE_FIREBASE_STORAGE_BUCKET=storageBucket값
   VITE_FIREBASE_MESSAGING_SENDER_ID=messagingSenderId값
   VITE_FIREBASE_APP_ID=appId값
   ```
5. **Contains secret values**(비밀값) 체크 칸이 있으면 **체크하지 않습니다.**
   이 값들은 원래 웹사이트 코드에 공개되는 값이라, 비밀값으로 표시하면 Netlify 의 비밀값 검사가 배포를 실패시킬 수 있습니다.
   (데이터는 `firestore.rules` 보안 규칙이 지킵니다.)
6. Scopes·Deploy contexts 는 기본값(**All**) 그대로 두고 **Import variables**
7. 목록에 6개가 모두 보이는지 확인합니다.

> 한 개씩 넣으려면 3번에서 **Add a single variable** 을 고르고, **Key** 에 이름, **Values** 에 값을 넣고 **Create variable** 을 누릅니다. 6번 반복합니다.

#### ③ 다시 배포하기 (꼭 해야 함)
환경 변수는 **새로 배포할 때만** 반영됩니다.
1. 왼쪽 메뉴 **Deploys** → 오른쪽 **Trigger deploy** → **Deploy site**
2. 맨 위 항목이 **Published**(초록색)가 될 때까지 1~2분 기다립니다.
   **Failed**(빨간색)이면 그 항목을 눌러 로그 마지막 부분을 확인합니다.

#### ④ 잘 됐는지 확인하기
1. 사이트를 열고 **Ctrl + Shift + R**(맥: Cmd + Shift + R)로 새로고침합니다.
2. 오른쪽 위 버튼이 **"로그인 (준비 중)"** → **"Google 로그인"** 으로 바뀌었는지 봅니다.
3. **Google 로그인** → 관리자 계정 선택 → 소속 입력 창이 뜨면 성공입니다.
4. 연구 상세 페이지에 댓글을 하나 달아 봅니다. 다른 사람 댓글에도 **수정·삭제** 버튼이 보이면 관리자 권한도 정상입니다.

#### 문제가 생기면
| 증상 | 원인과 해결 |
|---|---|
| 여전히 "로그인 (준비 중)" | 재배포를 안 했거나 이름에 오타가 있습니다. ③을 다시 하고 이름 철자를 확인하세요 |
| "승인된 도메인에 등록되어 있지 않습니다" | Firebase 콘솔 → Authentication → 설정 → **승인된 도메인**에 Netlify 주소를 `https://` 없이 정확히 넣었는지 확인하세요 |
| "팝업이 차단되었습니다" | 브라우저 주소창 오른쪽의 팝업 차단 아이콘을 눌러 허용하세요 |
| 댓글 등록 시 "저장하지 못했습니다" | Firestore **규칙** 탭에 `firestore.rules` 내용을 붙여 넣고 **게시**했는지 확인하세요 |

#### 내 컴퓨터에서 실제 Firebase 로 실행하려면
프로젝트 폴더의 `.env.example` 을 복사해 이름을 `.env` 로 바꾸고, ②-4와 같은 6줄을 넣은 뒤 `npm run dev` 를 실행합니다.
`.env` 파일은 GitHub 에 올라가지 않습니다.

---

## 5. 토론·댓글 기능 안내

| 기능 | 누가 할 수 있나 |
|---|---|
| 댓글·토론 글 읽기 | 누구나 (로그인 불필요) |
| 댓글·답글·토론 글 쓰기 | Google 로그인한 사람 |
| 수정·삭제 | 작성자 본인, 관리자 |

- **관리자**: `src/config.ts`의 `ADMIN_EMAILS`와 `firestore.rules`의 `isAdmin()`에 적힌 이메일(현재 `pasiajung@gmail.com`)입니다. 두 곳을 항상 똑같이 맞춰 주세요.
- **학교 계정만 참여하게 하려면**
  1. `src/config.ts`에서 `ALLOWED_EMAIL_DOMAIN = 'kmu.ac.kr'`로 바꿉니다.
  2. `firestore.rules`의 `canParticipate()` 안에 있는 `// && request.auth...` 줄 맨 앞의 `//`를 지웁니다.
  3. 규칙을 Firebase 콘솔에 다시 게시하고, 코드는 GitHub에 올려 재배포합니다.
- **첫 로그인** 때 소속을 묻는 창이 한 번 뜹니다(선택 사항, 건너뛰어도 됨).
- **관련 토론**: 연구·수업 상세 페이지의 "이 주제로 토론 글 쓰기"를 누르면 그 항목이 연결된 토론 글을 쓸 수 있고, 상세 페이지에 "관련 토론"으로 표시됩니다.
- 토론 글을 삭제하면 그 글의 답글은 화면에서 더 이상 보이지 않습니다. (무료 요금제에서는 서버 기능이 없어 답글 데이터는 남지만, 용량은 매우 작습니다.)

### 무료 한도를 아끼기 위해 적용한 것
- 목록은 실시간 연결(onSnapshot) 없이 **20개씩 "더 보기"** 로만 불러옵니다.
- 모든 조회에 개수 제한(limit)을 걸었습니다.
- **복합 색인이 필요 없도록** 토론 글 번호를 "작성 시각을 거꾸로 센 숫자"로 만들어, 번호 순서가 곧 최신순이 되게 했습니다. 따라서 Firestore 콘솔에서 색인을 따로 만들 필요가 없습니다.

---

## 6. 보안 규칙 검증

### 검증 시나리오 (자동 테스트 30개 중 핵심)

| # | 시나리오 | 기대 결과 | 확인 |
|---|---|---|---|
| 1 | 로그인하지 않은 사용자가 댓글·토론 글 작성 | ❌ 거부 | ✅ 통과 |
| 2 | 다른 사람이 쓴 댓글·토론 글을 수정 | ❌ 거부 | ✅ 통과 |
| 3 | 2001자 댓글·답글 작성 (2000자는 허용) | ❌ 거부 | ✅ 통과 |
| 4 | 관리자가 다른 사람의 댓글·토론 글·답글 삭제 | ✅ 허용 | ✅ 통과 |
| 5 | 다른 사람 이름(authorId)으로 작성 | ❌ 거부 | ✅ 통과 |
| 6 | 작성 시각(createdAt)을 직접 지정 | ❌ 거부 | ✅ 통과 |
| 7 | 정해지지 않은 필드 추가 (예: isPinned) | ❌ 거부 | ✅ 통과 |
| 8 | 수정하면서 authorId·createdAt 변경 | ❌ 거부 | ✅ 통과 |
| 9 | 답글 수(replyCount)를 ±1 이 아닌 값으로 변경 | ❌ 거부 | ✅ 통과 |
| 10 | replyCount 를 올리지 않고 답글만 작성 | ❌ 거부 | ✅ 통과 |
| 11 | 제목 101자 / 본문 5001자 / 없는 카테고리 | ❌ 거부 | ✅ 통과 |
| 12 | 이메일 인증이 안 된 관리자 이메일로 삭제 | ❌ 거부 | ✅ 통과 |
| 13 | 다른 사람의 프로필(users) 읽기 | ❌ 거부 | ✅ 통과 |
| 14 | 규칙에 없는 컬렉션 읽기·쓰기 | ❌ 거부 | ✅ 통과 |

전체 테스트는 `tests/firestore.rules.test.mjs`에 있습니다.

### Firebase 에뮬레이터로 검증하기

에뮬레이터는 내 컴퓨터에서 돌아가는 "가짜 Firebase"입니다. 실제 데이터와 무료 사용량에 전혀 영향을 주지 않습니다.

**준비 (한 번만)**: [Java](https://adoptium.net/ko/) 21 이상을 설치하고, 프로젝트 폴더에서 `npm install`을 실행합니다.

**① 보안 규칙 자동 검증**
```bash
npm run test:rules
```
마지막에 `# pass 30`, `# fail 0`이 나오면 모든 규칙이 의도대로 동작하는 것입니다.
(중간에 보이는 `PERMISSION_DENIED` 메시지는 "거부되어야 할 요청이 거부됐다"는 정상 기록입니다.)

**② 사이트를 에뮬레이터에 연결해 직접 눌러 보기**
1. 프로젝트 폴더에 `.env.local` 파일을 만들고 아래 내용을 넣습니다.
   ```
   VITE_FIREBASE_API_KEY=demo-key
   VITE_FIREBASE_AUTH_DOMAIN=demo-creativity.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=demo-creativity
   VITE_FIREBASE_STORAGE_BUCKET=demo-creativity.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=0
   VITE_FIREBASE_APP_ID=1:0:web:0
   VITE_USE_FIREBASE_EMULATOR=true
   ```
2. 터미널 창 하나에서 에뮬레이터를 켭니다.
   ```bash
   npm run emulators
   ```
3. 다른 터미널 창에서 사이트를 켭니다.
   ```bash
   npm run dev
   ```
4. 로그인 버튼을 누르면 가짜 Google 로그인 창이 뜹니다. **Add new account** 를 눌러 아무 이메일로 로그인해 보세요.
   관리자 기능을 시험하려면 `pasiajung@gmail.com`으로 로그인합니다.
5. `http://127.0.0.1:4000` 에서 에뮬레이터에 저장된 데이터를 볼 수 있습니다.
6. 테스트가 끝나면 `.env.local` 파일을 지우거나 `VITE_USE_FIREBASE_EMULATOR` 줄을 지웁니다.

---

## 7. 폴더 구조 (참고용)

```
src/
├─ content/     ✏️ 연구·수업·프로필 내용 (주로 여기만 고치면 됩니다)
├─ config.ts    ✏️ 사이트 이름 설정
├─ types/       콘텐츠 데이터의 모양 정의
├─ pages/       페이지 화면 (홈, 연구, 수업, 토론, 소개, 404)
├─ components/  여러 페이지에서 쓰는 화면 조각 (헤더, 카드, 토론 영역 등)
├─ layouts/     공통 틀 (헤더 + 본문 + 푸터)
├─ services/    댓글·토론 기능 (Firestore 구현, Firebase 설정이 없으면 "준비 중" 목업)
└─ lib/         보조 기능 (Firebase 초기화, 로그인 상태, 페이지 제목, APA 인용, 다크 모드)
firestore.rules  Firestore 보안 규칙 (Firebase 콘솔에 붙여 넣는 파일)
tests/           보안 규칙 자동 검증
```

## 8. 사용한 기술

- Vite + React + TypeScript, Tailwind CSS, React Router
- Firebase Authentication(Google), Cloud Firestore (무료 Spark 요금제)
- 글꼴: Pretendard (CDN)
- 배포: Netlify (설정: `netlify.toml`)
