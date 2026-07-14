# 스포츠 경기 사전 분석 및 승리 확률 예측 MVP

Next.js App Router 기반 축구 우선 MVP입니다. API 키가 있으면 서버 측 OpenAI Responses API `web_search_preview` ResearchProvider를 사용하고, 키가 없거나 `DEMO_MODE=true`이면 fixture 기반 Demo Provider로 전체 흐름을 실행합니다.

## 아키텍처
- `src/domain`: Zod 런타임 스키마와 도메인 타입
- `src/services/match-resolution`: 입력 파싱, 팀 별칭 정규화, 후보 경기 반환
- `src/services/research`: Demo/OpenAI ResearchProvider
- `src/services/availability`: 선수 출전 가능성 및 충돌 처리
- `src/services/prediction`: deterministic soccer Poisson prediction engine
- `src/app/api`: resolve/analysis/refresh/recent API
- `src/components`: 한국어 UI
- `prisma/schema.prisma`: PostgreSQL 추적성 모델

## 설치/실행
```bash
cp .env.example .env
pnpm install
pnpm dev
```

## Docker PostgreSQL
```bash
docker compose up -d postgres
pnpm prisma:push
```

## 테스트
```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## 환경변수
- `OPENAI_API_KEY`: 실제 웹 리서치 사용 시 필요
- `OPENAI_MODEL`: Responses API 모델명. 코드에 고정하지 않습니다.
- `DATABASE_URL`: PostgreSQL URL
- `SPORTS_DATA_PROVIDER`, `SPORTS_DATA_API_KEY`: 향후 교체형 provider용
- `DEFAULT_TIMEZONE`: 기본 `Asia/Seoul`
- `DEMO_MODE`: `true`면 fixture mode
- `ANALYSIS_CACHE_TTL_SECONDS`: 캐시 TTL

## Demo Mode
`.env`에서 `DEMO_MODE=true`로 실행 후 “아스널 vs 첼시”를 입력하면 후보 선택, 선수 출전 가능성, 부상/징계, 확률 계산, 출처 표시까지 확인할 수 있습니다. 확률은 하드코딩하지 않고 Poisson 엔진이 계산합니다.

## 실제 API 연결
`OPENAI_API_KEY`를 설정하고 `DEMO_MODE=false`로 실행하면 `OpenAIResearchProvider`가 Responses API와 `web_search_preview` 도구를 호출합니다. 모든 호출은 서버에서만 수행되며 API 키는 브라우저로 전달되지 않습니다.

## 데이터 출처 정책
공식 리그/구단 자료를 1등급, 신뢰할 수 있는 통계/언론을 2등급으로 취급합니다. 출처 없는 주장은 핵심 사실로 사용하지 않습니다.

## 예측 모델의 한계
팀 레이팅 + 기대득점 + Poisson 분포 기반 설명 가능한 MVP입니다. 선발 명단 발표, 부상 업데이트, 날씨 등 분석 이후 정보 변화는 결과를 바꿀 수 있습니다. 금전적 베팅 결정의 유일한 근거로 사용하지 마십시오.

## 배포
Vercel 등 Next.js 호환 플랫폼에 배포하고 PostgreSQL `DATABASE_URL`과 OpenAI 환경변수를 서버 환경변수로 설정합니다.
