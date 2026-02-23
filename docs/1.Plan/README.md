# 1. Plan - 프로젝트 기획 및 설계

이 폴더에는 색상 추천 서비스의 기획 회의록 및 설계 문서가 포함되어 있습니다.

## 👥 참여 인원

| 역할 | 이름 | 담당 |
|------|------|------|
| PM (Project Manager) | 김민수 | 프로젝트 총괄, 일정 관리, 리스크 관리 |
| PL (Project Leader) | 이서연 | 기술 리더십, 아키텍처 설계, 코드 품질 |
| UI/UX Designer | 박지훈 | 사용자 경험 설계, 정보 구조, 프로토타입 |
| Designer | 최예린 | 비주얼 디자인, 브랜딩, 디자인 시스템 |
| Frontend Developer | 정하은 | 프론트엔드 구현, 성능 최적화, 기술 검증 |

## 📁 문서 구조

| 문서 | 설명 | 작성일 |
|------|------|--------|
| [01-Kickoff-Meeting.md](./01-Kickoff-Meeting.md) | 프로젝트 킥오프 회의록 | 2026-02-23 |
| [02-Feature-Priority.md](./02-Feature-Priority.md) | 기능 우선순위 및 MVP 정의 | 2026-02-23 |
| [03-User-Research.md](./03-User-Research.md) | 사용자 리서치 및 페르소나 | 2026-02-23 |
| [04-UX-Design-Plan.md](./04-UX-Design-Plan.md) | UX 설계 및 정보 구조 | 2026-02-23 |
| [05-UI-Design-System.md](./05-UI-Design-System.md) | UI 디자인 시스템 정의 | 2026-02-23 |
| [06-Frontend-Architecture.md](./06-Frontend-Architecture.md) | 프론트엔드 아키텍처 설계 | 2026-02-23 |
| [07-Development-Schedule.md](./07-Development-Schedule.md) | 개발 일정 및 마일스톤 | 2026-02-23 |
| [08-Technical-Decisions.md](./08-Technical-Decisions.md) | 기술 결정사항 (ADR) | 2026-02-23 |

## 🎯 회의 주요 결정사항

### 1. 프로젝트 목표
- **비전**: 디자이너와 개발자가 신뢰할 수 있는 AI 기반 색상 추천 플랫폼
- **차별점**: 접근성 자동 검증 + 산업별 맞춤 추천
- **타겟**: 스타트업 초기 팀, 프리랜서 디자이너, 프론트엔드 개발자

### 2. MVP 범위 (4주)
- ✅ 색상 조화 규칙 기반 팔레트 생성
- ✅ 이미지 색상 추출
- ✅ 접근성(WCAG) 자동 검증
- ✅ 기본 UI 컴포넌트 미리보기
- ✅ 코드 복사 (HEX, RGB, CSS Variables)

### 3. 핵심 기술 스택
- **Frontend**: Next.js 14 + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Color Library**: chroma.js + color-thief
- **Deploy**: Vercel

### 4. 디자인 방향
- **스타일**: 모던 미니멀 (클린하고 전문적)
- **컬러**: 모노톤 베이스 + 액센트 컬러 (사용자 생성 팔레트 강조)
- **레이아웃**: 데스크톱 우선 → 모바일 반응형

### 5. 개발 일정
- **Week 1**: 프로젝트 셋업 + 기본 UI
- **Week 2**: 색상 생성 로직 + 미리보기
- **Week 3**: 이미지 분석 + 접근성 검증
- **Week 4**: 테스트 + 배포 + 문서화

## 🔄 업데이트 이력

- 2026-02-23: 프로젝트 킥오프 회의 및 초기 기획 완료
