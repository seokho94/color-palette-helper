# 개발 로드맵

## Phase 1: MVP (기본 기능) - 2~3주

### 목표
단독으로 사용 가능한 색상 팔레트 생성 도구

### 기능
- [x] 프로젝트 초기화
  - Next.js + TypeScript 설정
  - TailwindCSS 설정
  - 기본 라우팅 구조

- [ ] 색상 입력 UI
  - Color Picker 컴포넌트
  - HEX/RGB/HSL 입력 폼
  - 수동 색상 추가/삭제

- [ ] 조화 규칙 기반 팔레트 생성
  - 보색 (Complementary)
  - 유사색 (Analogous)
  - 삼색 조화 (Triadic)
  - 색상 조화 알고리즘 구현

- [ ] 색상 코드 복사
  - HEX, RGB, HSL 포맷
  - 클립보드 복사 기능
  - CSS Variables 생성

- [ ] 간단한 UI 미리보기
  - 버튼 컴포넌트 (Primary, Secondary)
  - 카드 컴포넌트
  - 배경색 적용 미리보기

### 기술 스택
```
- Next.js 14 + TypeScript
- TailwindCSS
- chroma.js
- react-colorful
```

### 산출물
- 기본적인 색상 팔레트 생성 웹앱
- 로컬 배포 가능

---

## Phase 2: 분석 기능 - 3~4주

### 목표
이미지 및 웹사이트에서 색상 자동 추출

### 기능
- [ ] 이미지 업로드 및 색상 추출
  - 드래그 앤 드롭 업로드
  - color-thief를 이용한 색상 추출
  - 색상 분포 시각화 (차트)

- [ ] 웹사이트 URL 분석
  - URL 입력 UI
  - Puppeteer를 이용한 스크린샷
  - 주요 색상 자동 추출
  - 색상 사용 비율 분석

- [ ] 접근성 검증
  - WCAG AA/AAA 대비 비율 계산
  - 텍스트-배경 조합 자동 검증
  - 개선 제안 (대안 색상)

- [ ] 색상 잠금(Lock) 기능
  - 특정 색상 고정
  - 나머지 색상만 재생성

### 기술 스택 추가
```
+ color-thief / vibrant.js (색상 추출)
+ Puppeteer (웹 스크래핑)
+ recharts (데이터 시각화)
+ Backend API (Next.js API Routes)
```

### 산출물
- 이미지/URL 기반 색상 분석 기능
- 접근성 자동 검증 도구

---

## Phase 3: 고급 추천 기능 - 3~4주

### 목표
산업별/무드별 맞춤 색상 추천

### 기능
- [ ] 무드 기반 추천
  - Modern, Minimal, Vivid 등 8가지 무드
  - 무드 선택 UI
  - 사전 정의된 팔레트 제공

- [ ] 산업별 추천
  - Fintech, Healthcare, E-commerce 등
  - 산업 특성에 맞는 색상 조합
  - 참고 사례 제공

- [ ] 고급 UI 미리보기
  - 다양한 컴포넌트 (폼, 네비게이션 등)
  - 다크모드 자동 생성
  - 모바일/데스크톱 토글

- [ ] 내보내기 기능 확장
  - Tailwind Config 생성
  - SCSS Variables
  - JSON 내보내기
  - Figma Plugin 연동

### 기술 스택 추가
```
+ Radix UI (고급 컴포넌트)
+ Framer Motion (애니메이션)
```

### 산출물
- 산업/무드 기반 지능형 추천
- 다양한 포맷 내보내기

---

## Phase 4: 사용자 기능 - 2~3주

### 목표
팔레트 저장 및 관리

### 기능
- [ ] 히스토리 기능
  - 생성한 팔레트 자동 저장 (로컬)
  - 최근 생성 목록

- [ ] 즐겨찾기
  - 팔레트 즐겨찾기
  - 프로젝트별 분류

- [ ] 팔레트 공유
  - 고유 URL 생성
  - 소셜 미디어 공유 (OG Image)

- [ ] 사용자 인증 (선택 사항)
  - 간단한 로그인 (Google OAuth)
  - 클라우드 저장

### 기술 스택 추가
```
+ IndexedDB / LocalStorage (로컬 저장)
+ Next-Auth (인증, 선택)
+ Supabase (클라우드 저장, 선택)
```

### 산출물
- 팔레트 관리 시스템
- 공유 기능

---

## Phase 5: AI 및 고급 기능 - 4~5주 (선택 사항)

### 목표
AI 기반 지능형 추천 및 트렌드 분석

### 기능
- [ ] AI 기반 색상 추천
  - OpenAI API 연동
  - 브랜드 키워드 → 색상 추천
  - 자연어 입력 ("편안한 느낌의 색상")

- [ ] 트렌드 분석
  - Dribbble/Behance API 연동
  - 최근 인기 색상 조합
  - 연도별 트렌드 차트

- [ ] 그라디언트 생성기
  - 2색 이상 그라디언트
  - 방향 조절 (Linear, Radial)
  - CSS 코드 생성

- [ ] 고급 분석
  - 경쟁사 색상 분석
  - 차별화된 색상 제안

### 기술 스택 추가
```
+ OpenAI API / Anthropic API
+ TensorFlow.js (브라우저 ML, 선택)
+ 외부 API (Dribbble, Behance)
```

### 산출물
- AI 추천 시스템
- 트렌드 분석 대시보드

---

## Phase 6: 최적화 및 배포 - 2주

### 목표
프로덕션 레벨 품질 확보

### 작업
- [ ] 성능 최적화
  - 이미지 최적화
  - 코드 스플리팅
  - 캐싱 전략

- [ ] 테스트
  - 단위 테스트 (Vitest)
  - E2E 테스트 (Playwright)
  - 접근성 테스트

- [ ] SEO 최적화
  - 메타 태그
  - Sitemap
  - Open Graph

- [ ] 배포
  - Vercel 배포
  - 도메인 연결
  - Analytics 설정

- [ ] 문서화
  - 사용자 가이드
  - API 문서
  - CHANGELOG

### 산출물
- 프로덕션 배포
- 완성된 문서

---

## 전체 타임라인 요약

| Phase | 기간 | 핵심 기능 | 상태 |
|-------|------|----------|------|
| Phase 1 | 2~3주 | 기본 팔레트 생성 | 🟡 진행 예정 |
| Phase 2 | 3~4주 | 이미지/URL 분석 | ⚪ 대기 |
| Phase 3 | 3~4주 | 산업/무드 추천 | ⚪ 대기 |
| Phase 4 | 2~3주 | 사용자 기능 | ⚪ 대기 |
| Phase 5 | 4~5주 | AI 추천 (선택) | ⚪ 선택 |
| Phase 6 | 2주 | 최적화 & 배포 | ⚪ 대기 |

**최소 기간**: 12~16주 (Phase 1~4 + 6)
**권장 기간**: 16~21주 (Phase 1~6 전체)

---

## 마일스톤

### 🎯 Milestone 1: MVP 완성 (Week 3)
- 기본 색상 팔레트 생성 가능
- 조화 규칙 기반 추천
- 코드 복사 기능

### 🎯 Milestone 2: 분석 도구 (Week 7)
- 이미지 색상 추출
- URL 분석
- 접근성 검증

### 🎯 Milestone 3: 지능형 추천 (Week 11)
- 산업별 추천
- 무드 기반 추천
- 고급 미리보기

### 🎯 Milestone 4: 사용자 경험 (Week 13)
- 팔레트 저장/관리
- 공유 기능

### 🎯 Milestone 5: 프로덕션 (Week 16)
- 최적화 완료
- 배포 완료
- 문서화 완료

---

## 우선순위 조정 가이드

### 빠른 출시가 목표라면
✅ Phase 1 (MVP)
✅ Phase 2 (분석 기능)
⚠️ Phase 3 간소화 (무드 추천만)
❌ Phase 4 생략 (LocalStorage만 사용)
❌ Phase 5 생략
✅ Phase 6 (배포)

### 차별화가 목표라면
✅ Phase 1~3 전체
✅ Phase 5 (AI 기능)
⚠️ Phase 4 간소화
✅ Phase 6 (배포)
