# 기술 스택

## 프론트엔드

### 핵심 프레임워크
```
- React 18 + TypeScript
- Next.js 14 (SSR/SSG 지원)
- Vite (빠른 개발 환경, 대안)
```

### 상태 관리
```
- Zustand (경량 상태 관리)
- React Query (서버 상태 관리)
- Context API (간단한 전역 상태)
```

### 스타일링
```
- TailwindCSS (유틸리티 우선 CSS)
- shadcn/ui (재사용 컴포넌트)
- CSS Modules (컴포넌트별 스타일, 선택)
```

### 색상 처리 라이브러리
```
- chroma.js: 색상 조작 및 변환
- color-thief: 이미지 색상 추출
- vibrant.js: 지배적인 색상 추출
- tinycolor2: 색상 유틸리티
```

### 시각화
```
- Canvas API: 색상환, 차트
- Fabric.js: 인터랙티브 캔버스
- react-colorful: 현대적인 Color Picker
- recharts: 색상 분포 차트
```

### UI 컴포넌트
```
- Radix UI: 접근성 우선 컴포넌트
- Headless UI: 비스타일 컴포넌트
- Framer Motion: 애니메이션
```

---

## 백엔드 (필요 시)

### 런타임 & 프레임워크
```
Option 1: Node.js
- Express.js (미니멀)
- NestJS (엔터프라이즈급)

Option 2: Python
- FastAPI (빠른 API 개발)
- Flask (경량)
```

### 웹 스크래핑 & 이미지 처리
```
Node.js:
- Puppeteer: 헤드리스 브라우저
- Playwright: 크로스 브라우저 자동화
- Sharp: 고성능 이미지 처리

Python:
- Selenium: 웹 스크래핑
- Pillow (PIL): 이미지 처리
- OpenCV: 고급 이미지 분석
```

### AI/ML (선택 사항)
```
- OpenAI API: GPT-4 기반 색상 추천
- Anthropic API: Claude 기반 분석
- TensorFlow.js: 브라우저 ML
- scikit-learn: 색상 클러스터링
```

---

## 데이터베이스

### 관계형 DB (프로젝트 규모가 큰 경우)
```
- PostgreSQL + pgvector: 색상 유사도 검색
- MySQL: 범용적 선택
```

### NoSQL (MVP 단계)
```
- MongoDB: 유연한 스키마
- Firebase Firestore: 실시간 동기화
```

### 캐싱
```
- Redis: 팔레트 캐싱, 세션 관리
- LocalStorage/IndexedDB: 클라이언트 캐싱
```

---

## 인프라 & 배포

### 호스팅
```
Frontend:
- Vercel (Next.js 최적화)
- Netlify (정적 사이트)
- AWS S3 + CloudFront

Backend:
- Railway (간단한 배포)
- AWS Lambda (서버리스)
- Docker + AWS ECS
```

### CI/CD
```
- GitHub Actions
- Vercel Auto Deploy
```

### 도메인 & CDN
```
- Cloudflare (CDN + DNS)
- AWS Route 53
```

---

## 개발 도구

### 패키지 관리
```
- pnpm (빠른 설치)
- npm / yarn (표준)
```

### 코드 품질
```
- ESLint: 린트
- Prettier: 포매터
- Husky: Git Hooks
- lint-staged: 커밋 전 검사
```

### 테스트
```
- Vitest: 단위 테스트
- Testing Library: 컴포넌트 테스트
- Playwright: E2E 테스트
```

### 문서화
```
- Storybook: 컴포넌트 문서
- TypeDoc: API 문서
```

---

## 추천 기술 스택 조합

### 🚀 MVP (빠른 출시)
```
Frontend Only:
- React + TypeScript + Vite
- TailwindCSS + shadcn/ui
- chroma.js + color-thief
- Vercel 배포
```

### 🏗️ 확장 가능한 풀스택
```
Frontend:
- Next.js 14 + TypeScript
- TailwindCSS + Radix UI
- React Query + Zustand

Backend:
- Next.js API Routes (통합)
- Puppeteer (스크린샷)
- PostgreSQL (데이터 저장)

Deploy:
- Vercel (Frontend + API)
- Supabase (Database)
```

### 🎯 엔터프라이즈급
```
Frontend:
- Next.js 14 + TypeScript
- TailwindCSS + Design System

Backend:
- NestJS + TypeScript
- PostgreSQL + Redis
- GraphQL API

AI:
- OpenAI API
- TensorFlow Serving

Deploy:
- AWS ECS (Backend)
- Vercel (Frontend)
- AWS RDS (Database)
```

---

## 외부 API & 서비스 (선택 사항)

```
- OpenAI API: AI 기반 추천
- Unsplash API: 이미지 샘플
- Google Fonts API: 폰트 매칭
- Adobe Color API: 트렌드 데이터
```
