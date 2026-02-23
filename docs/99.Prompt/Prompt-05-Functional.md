# Prompt 05: 기능 정의 & 와이어프레임

**날짜**: 2026-02-23
**단계**: 상세 기능 명세 및 UI 설계
**목적**: Agent Team을 통한 기능 정의서 및 와이어프레임 작성

---

## 📝 원본 프롬프트

```
Agent Team을 [FrontEnd 개발자, BackEnd 개발자, PM, PL, 기획자, UI/UX 디자이너]
로 구성해서 @docs\ 문서를 기반으로 @docs\2.Functional 에 기능 별로
기능 정의서 작성해주고, @docs\3.Wireframe 에 페이지별로 UI 설계서 작성해줘.
```

---

## 🎯 의도

1. **팀 확대**
   - 기존 5명 → 6명으로 확대
   - Backend 개발자, 기획자 추가

2. **기능 정의서 작성**
   - 7개 핵심 기능별로 상세 명세
   - 입력/출력, 유효성 검증, 에러 처리

3. **와이어프레임 작성**
   - 페이지별 UI 구조
   - 컴포넌트 배치 및 인터랙션

---

## ✅ 결과물

### Agent Team 구성 (6명)

| 역할 | 이름 | 담당 |
|------|------|------|
| **PM** | 이서연 | 프로젝트 관리 |
| **PL** | 김태현 | 기술 리드 |
| **기획자** | 박민지 | 기능 요구사항 정의 |
| **FrontEnd** | 정하은 | 프론트엔드 개발 |
| **BackEnd** | 최준호 | 백엔드 개발 (Phase 2+) |
| **UI/UX** | 박지훈 | UX 설계 & 와이어프레임 |

### 생성된 문서 (15개)

**2.Functional (8개)**:
```
docs/
└── 2.Functional/
    ├── README.md
    ├── 01-Color-Input-Feature.md
    ├── 02-Palette-Generation-Feature.md
    ├── 03-Accessibility-Feature.md
    ├── 04-Preview-Feature.md
    ├── 05-Export-Feature.md
    ├── 06-History-Feature.md
    └── 07-Share-Feature.md
```

**3.Wireframe (7개)**:
```
docs/
└── 3.Wireframe/
    ├── README.md
    ├── 01-Overall-Layout.md        (3단 레이아웃)
    ├── 02-Input-Panel.md           (Color Picker)
    ├── 03-Palette-Panel.md         (팔레트 표시)
    ├── 04-Preview-Panel.md         (UI 미리보기)
    ├── 05-Export-Panel.md          (코드 내보내기)
    └── 06-Mobile-View.md           (모바일 레이아웃)
```

### 주요 내용

**기능 정의서 특징**:
- 입력/출력 명세
- 유효성 검증 규칙
- 에러 처리 시나리오
- TypeScript 인터페이스
- 실제 코드 예제

**와이어프레임 특징**:
- ASCII Art로 레이아웃 표현
- 컴포넌트 계층 구조
- 반응형 브레이크포인트 (Desktop/Tablet/Mobile)
- 인터랙션 플로우

---

## 💡 학습 포인트

### 잘된 점
- ✅ 팀 구성 명확화 ([FrontEnd, BackEnd, ...])
- ✅ 기존 문서 참조 (@docs\ 문서 기반)
- ✅ 출력 폴더 분리 (2.Functional, 3.Wireframe)
- ✅ 문서 단위 명시 (기능별, 페이지별)

### 특히 효과적이었던 부분
- **기능별 분리**: 각 기능을 독립 문서로 작성 (재사용성 ↑)
- **실용적 코드**: TypeScript 인터페이스 및 검증 로직 포함
- **ASCII 와이어프레임**: 텍스트 기반으로 빠르게 구조 파악

### 개선 가능한 점
- 원하는 상세도 수준 명시 (High-level vs Detailed)
- 특정 기능 우선순위 지정
- 와이어프레임 스타일 가이드 (예: 컴포넌트 표기법)

---

## 📊 영향도

이 프롬프트가 전체 프로젝트에 미친 영향:

- **문서 수**: 15개 (기능 7개 + 와이어프레임 7개)
- **라인 수**: 약 2,000+ 라인
- **TypeScript 코드**: 30+ 인터페이스 정의
- **와이어프레임**: 6개 화면 설계

---

## 🎨 프롬프트 개선 버전

더 구체적으로 작성한다면:

```
Agent Team을 구성해서 기능 정의서와 와이어프레임을 작성해줘.

**팀 구성** (6명):
- PM, PL, 기획자, Frontend, Backend, UI/UX

**기능 정의서** (@docs/2.Functional/):
다음 7개 기능에 대해 각각 문서 작성:
1. Color Input (Color Picker, 이미지 업로드)
2. Palette Generation (6가지 Harmony 규칙)
3. Accessibility (WCAG 검증)
4. Preview (UI 컴포넌트 미리보기)
5. Export (7가지 포맷)
6. History (LocalStorage 저장)
7. Share (URL 공유)

**각 문서에 포함할 내용**:
- 기능 개요
- 입력/출력 명세
- 유효성 검증 규칙
- TypeScript 인터페이스
- 에러 처리
- 코드 예제

**와이어프레임** (@docs/3.Wireframe/):
다음 화면 설계:
1. Overall Layout (3단 그리드)
2. Input Panel
3. Palette Panel
4. Preview Panel
5. Export Panel
6. Mobile View

**각 와이어프레임에 포함할 내용**:
- ASCII Art 레이아웃
- 컴포넌트 계층 구조
- 반응형 브레이크포인트
- 인터랙션 플로우
- 상태 변화 (예: hover, active)

기존 @docs/0.Concept/, @docs/1.Plan/ 문서를 참조해서
일관성 있게 작성해줘.
```

---

## 🔗 관련 문서

- [docs/2.Functional/README.md](../2.Functional/README.md)
- [docs/3.Wireframe/README.md](../3.Wireframe/README.md)
- [docs/2.Functional/01-Color-Input-Feature.md](../2.Functional/01-Color-Input-Feature.md)
- [docs/3.Wireframe/01-Overall-Layout.md](../3.Wireframe/01-Overall-Layout.md)

---

**이전 단계**: Prompt 04 (프로젝트 초기화)
**다음 단계**: Prompt 06 (개발 플랜 작성)
