# API 호출 구조 통일 계획서

> 관련 문서: [API 명세서](./API_SPECIFICATION.md)

## 1. 목표

모든 HTTP 요청을 axios `ApiService` 한 곳으로 모은다.

- 인증 토큰은 `ApiService.setAccessToken` 한 곳에서만 설정한다.
- 에러 처리 방식을 통일한다 (4xx/5xx → 예외).
- 화면 컴포넌트는 훅을 통해 결과만 받아 쓴다.

**하지 않는 것:** TanStack Query 도입, 백엔드 API 변경, UI 변경

## 2. 현재 문제

| # | 문제 | 위치 |
|---|------|------|
| 1 | 요청 방식 3가지 혼용 (axios / `useFetch` / `fetch`) | 전역 |
| 2 | 토큰을 `localStorage`에서 직접 읽어 `Bearer "eyJ..."`처럼 따옴표가 포함됨 | `useFetchSentence.tsx`, `GuestBook.tsx`, `BoothComment.tsx` |
| 3 | `POST /sentence` 실패를 감지하지 못함 (`response.ok` 미확인) | `GuestBook.tsx` |
| 4 | `/timetable` 응답 키 불일치 (`perform` vs `performs`) | `FilterableTimeTable.tsx`, `LineUp.tsx` |
| 5 | 렌더링마다 `io()` 연결과 `fetchCurrentUser()` 반복 호출 | `GuestBook.tsx` |

## 3. 목표 구조

```text
컴포넌트  ──>  useFetchXxx 훅 (상태 관리)  ──>  ApiService (요청·인증·에러)  ──>  서버
컴포넌트  ──>  ApiService.createXxx (작성 요청)  ─────────────────────────────>  서버
```

| 계층 | 역할 | 하지 않는 것 |
|------|------|--------------|
| `ApiService` | URL, 헤더, 토큰, 응답 파싱 | React 상태 |
| `useFetchXxx` 훅 | 로딩 시점, 데이터 상태 보관 | URL·헤더 조합 |
| 컴포넌트 | 화면 표시, 사용자 입력 | 직접 `fetch` 호출 |

## 4. 작업 단계

각 단계는 독립적으로 커밋할 수 있다. 한 단계가 끝날 때마다 화면이 이전과 똑같이 동작하는지 확인한다.

### 1단계: `ApiService`에 함수 추가

**파일:** `src/services/ApiService.ts`

| 함수 | 요청 | 반환 |
|------|------|------|
| `fetchBooths()` | `GET /booth/all` | `Booth[]` (`data.booths`) |
| `fetchBoothRanking()` | `GET /booth/top` | `Booth[]` (`data.booths`) |
| `fetchBooth(id)` | `GET /booth/{id}` | `Booth` (`data.booth`) |
| `fetchBoothComments(id)` | `GET /booth/{id}/comment` | `BoothComment[]` (`data.boothComments`) |
| `createBoothComment(id, body)` | `POST /booth/comment/{id}` | `void` |
| `fetchPerforms()` | `GET /timetable` | `Perform[]` |
| `fetchNotices()` | `GET /notice` | `Notice[]` (`data.notices`) |
| `fetchSentences()` | `GET /sentence` | `Shouts[]` (`data.shouts`) |
| `createSentence(body)` | `POST /sentence` | `void` |

- 응답의 감싸는 키(`booths`, `notices` 등)는 `ApiService` 안에서 벗겨서 배열이나 객체를 바로 반환한다.
- 기존 `fetchLike`의 경로 `booth/liked/${id}`를 `/booth/liked/${id}`로 맞춘다.

**완료 기준:** 함수만 추가하고 아직 호출하지 않으므로 기존 동작에는 영향이 없다.

### 2단계: 조회 훅의 내부 교체

**파일:** `src/hooks/useFetch*.ts(x)` 7개

훅 이름과 **반환 형태는 유지**하고, 내부만 `useFetch(url)`에서 `ApiService` 호출로 바꾼다.

| 훅 | 현재 반환 형태 | 사용하는 컴포넌트 |
|----|----------------|-------------------|
| `useFetchBooths` | `Booth[]` | `Map` |
| `useFetchBooth` | `Booth` (없으면 `[]`) | `DetailedMapPage` |
| `useFetchBoothComment` | `BoothComment[]` | `BoothComment` |
| `useFetchNotices` | `Notice[]` | `NoticePage` |
| `useFetchBoothsRanking` | `{ data: { booths } }` | `BoothRanking` |
| `useFetchPerforms` | `{ data: { perform } }` | `LineUp`, `FilterableTimeTable` |
| `useFetchSentence` | `{ data: { shouts } }` | `FestivalSentence`, `GuestBook` |

- 아래 3개 훅은 `{ data }` 형태를 반환한다. 반환 형태를 유지할지, 위 4개처럼 배열을 바로 반환하도록 바꾸고 컴포넌트도 함께 고칠지 정한다. **배열 반환으로 통일하는 것을 권장한다.**
- 로딩 UI가 `data === undefined`에 의존하는 곳(`BoothRanking`, `LineUp`)은 초기값을 `undefined`로 두거나 `isLoading`을 따로 반환한다.
- 조회 결과를 보관하는 `useState`와 `useEffect`는 아래 형태로 각 훅에서 반복된다. 훅이 3개 이상 같은 형태가 되면 공통 훅(`useApi(fn, deps)`)으로 묶는 것을 고려한다.

```ts
export default function useFetchBooths() {
  const [booths, setBooths] = useState<Booth[]>([]);

  useEffect(() => {
    apiService.fetchBooths().then(setBooths).catch(() => setBooths([]));
  }, []);

  return booths;
}
```

**주의:** `ApiService`의 토큰은 `useAccessToken`의 `useEffect`에서 설정된다. 인증이 필요한 조회(`fetchSentences`)가 토큰 설정보다 먼저 실행되지 않는지 확인한다.

### 3단계: 컴포넌트의 `fetch` 교체

| 파일 | 변경 |
|------|------|
| `src/components/GuestBook/GuestBook.tsx` | `fetch(.../sentence)` → `apiService.createSentence(dataToSend)` |
| `src/components/MapDetail/BoothComment.tsx` | `fetch(.../booth/comment/{id})` → `apiService.createBoothComment(boothId, dataToSend)` |

- 토큰을 읽던 `localStorage.getItem("accessToken")`은 로그인 여부 확인에만 쓰이므로 `useAccessToken()`으로 바꾼다.
- 비어 있는 `catch` 블록에 최소한 사용자 알림(alert 또는 toast)을 추가한다.

### 4단계: 함께 고칠 버그

| 항목 | 작업 |
|------|------|
| `/timetable` 응답 키 | 백엔드 실제 응답 확인 → `ApiService.fetchPerforms`에서 한 번만 처리 |
| `GuestBook` 소켓 | `io()` 생성을 `useEffect` 안으로 옮기고 cleanup에서 `socket.disconnect()` |
| `GuestBook` 사용자 조회 | 렌더링 본문의 `store.fetchCurrentUser()`를 `useEffect`로 이동 |

### 5단계: 정리

- `usehooks-ts`의 `useFetch` 사용처가 남아 있지 않은지 검색한다 (`useLocalStorage`는 계속 사용).
- 코드 어디에도 `import.meta.env.VITE_API_URL`이 `ApiService.ts`(와 소켓 연결) 외에 남아 있지 않은지 확인한다.
- `docs/API_SPECIFICATION.md`의 "프론트 구현" 열을 갱신한다.

## 5. 확인 체크리스트

각 단계 후 `npm run check`, `npm run lint`를 통과하고, 아래 화면을 직접 확인한다.

| 화면 | 확인 항목 |
|------|-----------|
| 메인 | 라인업, 부스 랭킹, 축제 한마디 표시 |
| 지도 | 부스 마커와 목록, 요일·카테고리 필터 |
| 부스 상세 | 상세 정보, 좋아요 반영, 댓글 조회·작성 |
| 타임테이블 | day1~3 필터별 공연 목록 |
| 공지 | 목록과 이미지 |
| 방명록 | 목록 조회, 작성(로그인/비로그인), 실시간 수신 |
| 프로필 | 로그인 상태 표시, 로그아웃 |

개발자 도구 Network 탭에서 `Authorization` 헤더가 `Bearer eyJ...` 형태(따옴표 없음)인지 확인한다.

## 6. 위험 요소

| 위험 | 대응 |
|------|------|
| 테스트 코드가 없어 회귀를 자동으로 잡을 수 없음 | 단계별로 커밋하고 5장 체크리스트로 수동 확인 |
| 로그인이 `dummy-token`이라 인증 API를 실제로 확인할 수 없음 | 인증 관련 변경은 서버 응답 코드(401 등)까지만 확인하고, 로그인 연동은 별도 작업으로 분리 |
| 운영 환경 `/api`가 `vercel.json`에서 백엔드로 연결되지 않음 | 이번 범위 밖. 배포 전 별도로 확인 |

## 7. 이후 작업 (이번 범위 밖)

- `LoginForm`을 `apiService.lmsLogin`에 연결
- 필요해지면 2단계 훅을 TanStack Query `useQuery`로 교체
- `vercel.json`에 `/api` 프록시 설정
