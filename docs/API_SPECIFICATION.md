# INU Festival API 명세서

> **작성 기준:** `INU-Festival-FE` 저장소에서 실제로 호출하는 HTTP / Socket.io 인터페이스를 코드로부터 역추적해 정리했습니다.
> 백엔드 구현과 1:1로 맞는다는 보장은 없습니다. 코드만으로 확인할 수 없는 내용은 **(추정)** 으로 표시했습니다.

---

## 1. 개요

| 항목 | 내용 |
|------|------|
| 프로토콜 | HTTP REST + WebSocket(Socket.io) |
| 데이터 형식 | JSON (`Content-Type: application/json`) |
| 인증 | `Authorization: Bearer {accessToken}` (일부 엔드포인트) |
| Base URL | 환경 변수 `VITE_API_URL` |

### 1.1 환경별 Base URL

| 환경 | 파일 | `VITE_API_URL` | 비고 |
|------|------|----------------|------|
| Development | `.env.development` | `/legacy/api` | Vite dev proxy → `http://3.35.68.147:8080` (`vite.config.ts`) |
| Production | `.env.production` | `/api` | 배포 환경의 리버스 프록시가 백엔드로 연결 **(추정)** |

예: 개발 환경에서 `GET /booth/all` → `http://localhost:3000/legacy/api/booth/all`

> ⚠️ dev proxy는 `/legacy/api` 경로를 **prefix 제거 없이** 그대로 전달합니다(`rewrite` 미설정). 즉 백엔드가 `/legacy/api/...` 경로를 받아야 합니다.

### 1.2 HTTP 클라이언트

프론트에서는 두 가지 방식이 섞여 있습니다.

| 방식 | 사용처 | 인증 헤더 처리 |
|------|--------|----------------|
| axios (`src/services/ApiService.ts`) | 로그인, 내 정보, 로그아웃, 좋아요 | `setAccessToken()` 호출 시 인스턴스에 자동 설정 |
| `fetch` / `usehooks-ts` `useFetch` | 조회 API 전반, 방명록·댓글 작성 | 호출부에서 직접 `localStorage.accessToken`을 읽어 설정 |

### 1.3 인증 토큰

- 저장 위치: `localStorage` 키 `accessToken` (`useLocalStorage` 사용 → 값이 **JSON 문자열**로 저장됨, 예: `"\"eyJ...\""`)
- 앱 진입 시(`Layout` → `useCheckAccessToken`) `GET /user/me`를 호출하고, 실패하면 토큰을 비웁니다.

> ⚠️ `useFetchSentence`, `GuestBook`, `BoothComment`는 `localStorage.getItem("accessToken")` 원본 값을 그대로 헤더에 넣기 때문에 실제로는 `Bearer "eyJ..."` 처럼 **따옴표가 포함된 토큰**이 전송됩니다.

---

## 2. 엔드포인트 목록

| # | Method | Path | 인증 | 설명 | 프론트 구현 |
|---|--------|------|------|------|-------------|
| 1 | POST | `/user/lms` | ✗ | LMS(학번) 로그인 | `ApiService.lmsLogin` ⚠️ 미연동 |
| 2 | GET | `/user/me` | ✓ | 현재 사용자 조회 | `ApiService.fetchCurrentUser` |
| 3 | GET | `/user/logout` | ✓ | 로그아웃 | `ApiService.logout` |
| 4 | GET | `/booth/all` | ✗ | 전체 부스 목록 | `useFetchBooths` |
| 5 | GET | `/booth/top` | ✗ | 인기 부스 랭킹 | `useFetchBoothsRanking` |
| 6 | GET | `/booth/{boothId}` | ✗ | 부스 상세 | `useFetchBooth` |
| 7 | PUT | `/booth/liked/{boothId}` | ✗ **(추정)** | 부스 좋아요 누적 반영 | `ApiService.fetchLike` |
| 8 | GET | `/booth/{boothId}/comment` | ✗ | 부스 댓글 목록 | `useFetchBoothComment` |
| 9 | POST | `/booth/comment/{boothId}` | ✓ | 부스 댓글 작성 | `BoothComment` |
| 10 | GET | `/timetable` | ✗ | 공연 타임테이블 | `useFetchPerforms` |
| 11 | GET | `/notice` | ✗ | 공지사항 목록 | `useFetchNotices` |
| 12 | GET | `/sentence` | △ | 방명록(한마디) 목록 | `useFetchSentence` |
| 13 | POST | `/sentence` | ✓ | 방명록 작성 | `GuestBook` |
| WS | — | Socket.io | ✗ | 방명록 실시간 브로드캐스트 | `GuestBook` |

△: 프론트는 항상 Authorization 헤더를 붙여 보내지만, 필수 여부는 확인 불가.

---

## 3. 사용자 (User)

### 3.1 `POST /user/lms` — LMS 로그인

> ⚠️ **현재 미연동.** `LoginForm.handleSubmit`은 API를 호출하지 않고 `"dummy-token"`을 저장합니다.

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `studentId` | string | ✓ | 학번 (UI의 email 입력값을 그대로 전달) |
| `password` | string | ✓ | 포털 비밀번호 |

```json
{ "studentId": "202412345", "password": "********" }
```

**Response 200**

| 필드 | 타입 | 설명 |
|------|------|------|
| `accessToken` | string | 이후 요청에 사용할 토큰 |

```json
{ "accessToken": "eyJhbGciOi..." }
```

---

### 3.2 `GET /user/me` — 현재 사용자 조회

- **인증:** 필수
- **사용처:** `useCheckAccessToken`(앱 전역), `UserStore.fetchCurrentUser`(방명록·부스 댓글에서 작성자명 표시)

**Response 200**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 사용자 ID |
| `name` | string | 표시 이름. 방명록 `studentId` 값으로도 사용됨 |

```json
{ "id": "1", "name": "202412345" }
```

**에러:** 실패(4xx 등) 시 프론트는 토큰을 `""`로 초기화합니다.

---

### 3.3 `GET /user/logout` — 로그아웃

- **인증:** 필수
- **Response:** 본문 사용 안 함. 호출 후 프론트에서 토큰 삭제 및 `/profile` 이동.

> 💡 상태를 변경하는 요청이므로 `POST` 사용을 권장합니다.

---

## 4. 부스 (Booth)

### 공통 스키마

**`Booth`** (`src/types/Booth.ts`)

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 부스 ID |
| `name` | string | 부스 이름 |
| `category` | string | 카테고리. 코드에서 비교하는 값: `"푸드트럭"`, `"플리마켓"`, `"존"` 등 |
| `department` | string | 운영 학과/단체 |
| `description` | string | 소개 |
| `liked` | number | 좋아요 수 |
| `markerImage` | string | 지도 마커 이미지 |
| `boothDays` | `BoothDay[]` | 운영 요일 |
| `boothImgs` | `BoothImg[]` | 이미지 목록 |
| `boothComments` | `BoothComment[]` | 댓글 (상세 외 응답에서 포함 여부 불확실) |
| `time` | string | 운영 시간 |
| `location` | string | 위치 설명 |
| `x` | string | 지도 좌표 (위도/경도 문자열) |
| `y` | string | 지도 좌표 |

**`BoothDay`**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | number | |
| `day` | string | 지도 필터 값과 비교됨 (예: `"Day 1"` **(추정)**) |
| `boothId` | string | |

**`BoothImg`**

| 필드 | 타입 |
|------|------|
| `id` | string |
| `url` | string |

**`BoothComment`**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | |
| `content` | string | 최대 16자 (프론트 제한) |
| `userId` | number | 작성자 |
| `emoji` | string | `happy` \| `funny` \| `thrilling` \| `excited` |
| `createdAt` | string | ISO 8601 **(추정)** |
| `updatedAt` | string | |

---

### 4.1 `GET /booth/all` — 전체 부스 목록

- **사용처:** 지도 페이지 (`Map`)

**Response 200**

```json
{
  "booths": [
    {
      "id": "1",
      "name": "컴공 주점",
      "category": "주점",
      "department": "컴퓨터공학부",
      "description": "...",
      "liked": 120,
      "markerImage": "...",
      "boothDays": [{ "id": 1, "day": "Day 1", "boothId": "1" }],
      "boothImgs": [{ "id": "1", "url": "https://..." }],
      "boothComments": [],
      "time": "18:00 ~ 24:00",
      "location": "대운동장",
      "x": "37.375",
      "y": "126.632"
    }
  ]
}
```

---

### 4.2 `GET /booth/top` — 인기 부스 랭킹

- **사용처:** 메인 페이지 `BoothRanking`
- **Response 200:** `{ "booths": Booth[] }` (4.1과 동일 구조, 서버에서 정렬된 순서 그대로 표시)

---

### 4.3 `GET /booth/{boothId}` — 부스 상세

| Path Param | 타입 | 설명 |
|------------|------|------|
| `boothId` | string | 부스 ID |

**Response 200**

```json
{ "booth": { /* Booth */ } }
```

> 응답이 단일 객체(`booth`)로 감싸져 있어야 합니다.

---

### 4.4 `PUT /booth/liked/{boothId}` — 좋아요 반영

좋아요는 클릭마다 호출하지 않고 **로컬에서 누적한 뒤 한 번에 전송**합니다.
(`DetailedMapPage`에서 `LikeStore.increase` → 다음 렌더링 시 `Layout`에서 `LikeStore.boothLike` 호출)

| Path Param | 타입 | 설명 |
|------------|------|------|
| `boothId` | string | 부스 ID |

**Request Body**

| 필드 | 타입 | 설명 |
|------|------|------|
| `likeCount` | number | 이번에 **추가할** 좋아요 수 (누적 증분, 총합 아님) |

```json
{ "likeCount": 5 }
```

**Response 200:** `{ "liked": number }` (프론트는 반환값을 사용하지 않음)

**에러:** 실패 시 `"좋아요는 모바일에서만 가능합니다!"` alert 표시. 서버가 User-Agent 등으로 모바일만 허용하는 것으로 **(추정)**.

> ⚠️ axios 호출 경로가 `booth/liked/${id}` (선행 `/` 없음)라 baseURL과 상대 결합됩니다. 현재 baseURL에서는 문제없이 동작하지만 다른 경로와 표기를 맞추는 것을 권장합니다.

---

### 4.5 `GET /booth/{boothId}/comment` — 부스 댓글 목록

**Response 200**

```json
{
  "boothComments": [
    {
      "id": "10",
      "content": "너무 맛있어요",
      "userId": 3,
      "emoji": "happy",
      "createdAt": "2024-05-08T12:00:00Z",
      "updatedAt": "2024-05-08T12:00:00Z"
    }
  ]
}
```

---

### 4.6 `POST /booth/comment/{boothId}` — 부스 댓글 작성

- **인증:** 필수 (토큰이 없으면 프론트에서 `/login`으로 이동)

**Request Body** (`SendComment`)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `content` | string | ✓ | 최대 16자, 앞뒤 공백 제거 |
| `emoji` | string | ✓ | `happy` \| `funny` \| `thrilling` \| `excited` 중 프론트에서 랜덤 선택 |

```json
{ "content": "너무 맛있어요", "emoji": "funny" }
```

**Response:** 2xx + JSON 본문 필요 (프론트에서 `response.json()` 호출). 본문 내용은 사용하지 않음.

> ⚠️ 조회는 `/booth/{id}/comment`, 작성은 `/booth/comment/{id}`로 **경로 순서가 다릅니다.** 백엔드와 일치 여부 확인 필요.

---

## 5. 타임테이블 (Timetable)

### 5.1 `GET /timetable` — 공연 목록

- **사용처:** 메인 `LineUp`, 타임테이블 페이지 `FilterableTimeTable`

**`Perform`**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | |
| `name` | string | 공연명/아티스트 |
| `category` | string | `"연예인"`인 경우 라인업으로 표시 |
| `detail` | string | 상세 설명 |
| `date` | string | 날짜 |
| `day` | string | `"day1"` \| `"day2"` \| `"day3"` (타임테이블 필터 값) |
| `time` | string | 공연 시간 |
| `img` | string | 이미지 URL |

**Response 200**

```json
{
  "performs": [
    {
      "id": "1",
      "name": "아티스트",
      "category": "연예인",
      "detail": "...",
      "date": "2024-05-08",
      "day": "day1",
      "time": "20:00",
      "img": "https://..."
    }
  ]
}
```

> 응답 키는 다른 목록 API(`booths`, `notices`)와 맞춰 복수형 `performs`를 사용합니다.

---

## 6. 공지사항 (Notice)

### 6.1 `GET /notice` — 공지 목록

**`Notice`**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | |
| `category` | string | 공지 분류 |
| `title` | string | 제목 |
| `content` | string | 본문 |
| `updatedAt` | string | 수정 시각 |
| `noticeImgs` | `{ id: number; img: string }[]` | 첨부 이미지 |

**Response 200**

```json
{
  "notices": [
    {
      "id": "1",
      "category": "안내",
      "title": "우천 시 일정 변경",
      "content": "...",
      "updatedAt": "2024-05-07T09:00:00Z",
      "noticeImgs": [{ "id": 1, "img": "https://..." }]
    }
  ]
}
```

---

## 7. 방명록 / 한마디 (Sentence)

### 7.1 `GET /sentence` — 방명록 목록

- **헤더:** `Authorization: Bearer {accessToken}` (항상 전송, 비로그인 시 빈 토큰)
- **사용처:** 메인 `FestivalSentence`, `GuestBook`

**`Shouts`**

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | number | |
| `content` | string | 최대 16자 |
| `emoji` | string | `happy` \| `thrilling` \| `funny` \| `excited` |
| `studentId` | string | 작성자 표시명 |
| `userId` | number | 작성자 ID |

**Response 200**

```json
{
  "shouts": [
    { "id": 1, "content": "축제 최고!", "emoji": "happy", "studentId": "202412345", "userId": 3 }
  ]
}
```

---

### 7.2 `POST /sentence` — 방명록 작성

- **인증:** 필수 (토큰이 없으면 `/login`으로 이동)

**Request Body** (`Message`)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `studentId` | string | ✓ | `GET /user/me`의 `name` 값 |
| `content` | string | ✓ | 최대 16자 |
| `emoji` | string | ✓ | 프론트에서 랜덤 선택 |

```json
{ "studentId": "202412345", "content": "축제 최고!", "emoji": "excited" }
```

**Response:** JSON 본문 필요 (`response.json()` 호출). 성공 후 Socket.io `message` 이벤트를 emit 합니다.

> 💡 작성자 정보는 토큰으로 서버에서 식별할 수 있으므로 `studentId`를 클라이언트가 보내지 않도록 하는 것을 권장합니다(위조 가능).

---

## 8. 실시간 (Socket.io)

| 항목 | 내용 |
|------|------|
| 연결 URL | `io(VITE_API_URL)` → 예: `/legacy/api`, `/api` |
| 클라이언트 | `socket.io-client` |
| 인증 | 없음 |

> ⚠️ Socket.io는 URL의 path 부분을 **namespace**로 해석합니다. `io("/api")`는 현재 origin의 `/socket.io/` 엔드포인트에 연결하면서 namespace `/api`를 사용합니다. 또한 vite dev proxy에 `/socket.io` 경로가 설정되어 있지 않아 개발 환경에서는 연결이 실패할 가능성이 높습니다.

### 이벤트

| 방향 | 이벤트 | Payload | 설명 |
|------|--------|---------|------|
| Client → Server | `message` | `Message` (`{ studentId, content, emoji }`) | `POST /sentence` 성공 후 전송 |
| Server → Client | `update` | `Message` | 다른 사용자의 새 메시지. 수신 시 목록 하단에 추가 |

---

## 9. 공통 에러 처리 (프론트 동작)

서버의 표준 에러 포맷은 프론트 코드에서 확인되지 않습니다. 현재 프론트는 에러 본문을 읽지 않고 다음과 같이만 처리합니다.

| API | 실패 시 동작 |
|-----|--------------|
| `GET /user/me` | 토큰 초기화 / `UserStore.error = true` |
| `PUT /booth/liked/{id}` | alert 표시 후 `LikeStore.error = true` |
| `POST /booth/comment/{id}`, `POST /sentence` | 무시 (catch 블록 비어 있음) |
| `useFetch` 기반 조회 | 데이터 없음 → 빈 배열 또는 로딩 UI |

---

## 10. 확인/정리가 필요한 사항

| # | 항목 | 위치 |
|---|------|------|
| 1 | `/timetable` 응답 키 `perform` vs `performs` 불일치 → `performs`로 통일 | `FilterableTimeTable.tsx`, `LineUp.tsx` |
| 2 | 로그인 API 미연동 (`dummy-token` 저장) | `LoginForm.tsx` |
| 3 | 댓글 조회/작성 경로 순서 불일치 (`/booth/{id}/comment` vs `/booth/comment/{id}`) | `useFetchBoothComment.ts`, `BoothComment.tsx` |
| 4 | `fetch` 호출부에서 JSON 문자열 토큰을 그대로 헤더에 사용 (`Bearer "..."`) | `useFetchSentence.tsx`, `GuestBook.tsx`, `BoothComment.tsx` |
| 5 | 로그아웃이 `GET` 메서드 | `ApiService.ts` |
| 6 | Socket.io 연결 URL/namespace 및 dev proxy 미설정 | `GuestBook.tsx`, `vite.config.ts` |
| 7 | 방명록 작성 시 클라이언트가 `studentId` 전송 | `GuestBook.tsx` |
| 8 | `GuestBook` 렌더링마다 `io()` 새 연결 생성, `store.fetchCurrentUser()` 반복 호출 | `GuestBook.tsx` |
| 9 | HTTP 클라이언트 혼용(axios / fetch / useFetch) — 인증 헤더 처리 일원화 필요 | 전역 |
