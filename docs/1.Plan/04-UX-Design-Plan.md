# UX 설계 및 정보 구조

**작성자**: 박지훈 (UI/UX Designer)
**작성일**: 2026-02-23
**버전**: 1.0

---

## 1. 정보 구조 (Information Architecture)

### 1.1 사이트맵

```
Home (메인 화면)
├── Generator (팔레트 생성기) ← MVP 핵심
│   ├── Input (색상 입력)
│   ├── Harmony (조화 규칙 선택)
│   ├── Preview (미리보기)
│   └── Export (내보내기)
│
├── History (히스토리) ← 사이드바
│   └── Favorites (즐겨찾기)
│
└── About (소개) ← Phase 2
    ├── Guide (사용 가이드)
    └── Learn (색상 이론 학습)
```

### 1.2 화면 구조

#### 메인 화면 (Desktop)
```
┌─────────────────────────────────────────────────┐
│  Header (Logo, About, History)                  │
├─────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │   INPUT     │ │  PALETTE    │ │  PREVIEW    │ │
│ │             │ │             │ │             │ │
│ │ Color Picker│ │  5 Colors   │ │ Button      │ │
│ │ Image Upload│ │  Harmony    │ │ Card        │ │
│ │ HEX Input   │ │  Lock       │ │ Text        │ │
│ │             │ │  Randomize  │ │ Form        │ │
│ │             │ │             │ │             │ │
│ │             │ │ Accessibility│ │             │ │
│ │             │ │  Warnings   │ │             │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │             EXPORT (Code Copy)                │ │
│ │  [HEX] [RGB] [HSL] [CSS] [Tailwind] [JSON]   │ │
│ └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

#### 모바일 화면
```
┌──────────────────┐
│ Header           │
├──────────────────┤
│ INPUT            │
│ (Collapsed)      │
├──────────────────┤
│ PALETTE          │
│ ████ ████ ████   │
│                  │
│ Accessibility ⚠️  │
├──────────────────┤
│ PREVIEW          │
│ (Tabs)           │
│ [Button][Card]   │
├──────────────────┤
│ EXPORT           │
│ [Copy Code ▼]    │
└──────────────────┘
```

---

## 2. 사용자 플로우

### 2.1 Primary Flow: 이미지 기반 팔레트 생성

```
[시작]
  ↓
1. 이미지 업로드
   - 드래그 앤 드롭 또는 파일 선택
   - 로딩 인디케이터 표시
  ↓
2. 색상 자동 추출 (1초 내)
   - 5개 주요 색상 표시
   - "More Colors" 옵션 (10개까지)
  ↓
3. 조화 규칙 선택 (선택사항)
   - 기본: "추출된 색상 그대로"
   - 선택: 보색, 유사색 등으로 변환
  ↓
4. 접근성 자동 검증
   - ✅ 모두 통과: "All checks passed"
   - ⚠️ 경고: "3 color pairs have low contrast"
     → [View Details] 클릭 시 상세 정보
  ↓
5. 조정 (선택사항)
   - 색상 클릭 → Color Picker 열림
   - 미세 조정 (H/S/L 슬라이더)
   - 실시간 미리보기 업데이트
  ↓
6. 내보내기
   - [Copy CSS Variables] 클릭
   - ✅ "Copied!" 토스트 메시지
  ↓
[완료]
```

**예상 소요 시간**: 1~2분

---

### 2.2 Secondary Flow: 수동 색상 선택

```
[시작]
  ↓
1. Color Picker로 베이스 컬러 선택
   - HEX 직접 입력 가능
  ↓
2. 조화 규칙 선택
   - "보색" 클릭
   - 자동으로 5색 팔레트 생성
  ↓
3. 색상 잠금 (Lock)
   - 마음에 드는 색상 🔒 클릭
   - [Randomize] 버튼으로 잠금 안 된 색상만 재생성
  ↓
4. 만족할 때까지 반복
   - Spacebar로 빠른 재생성
  ↓
5. 내보내기
  ↓
[완료]
```

**예상 소요 시간**: 30초~1분

---

### 2.3 Edge Case Flow: 접근성 경고 해결

```
[팔레트 생성 완료]
  ↓
⚠️ "Primary button has low contrast (3.2:1)"
  ↓
[Fix Automatically] 클릭
  ↓
자동으로 명도 조정
  ↓
✅ "Contrast improved to 4.6:1 (AA)"
  ↓
미리보기에서 변경 사항 확인
  ↓
만족하면 [Keep] / 되돌리려면 [Undo]
```

---

## 3. 인터랙션 설계

### 3.1 색상 입력 인터랙션

#### Color Picker
```
[초기 상태]
- 큰 색상환 표시
- 현재 선택된 색상: #3B82F6 (파란색)

[인터랙션]
1. 색상환 클릭/드래그 → Hue 변경
2. 명도/채도 슬라이더 → S/L 조정
3. HEX 입력란 → 직접 입력 가능
4. RGB/HSL 탭 → 포맷 전환

[피드백]
- 실시간 미리보기 업데이트 (Debounce 100ms)
- 유효하지 않은 HEX → 빨간 테두리 + "Invalid color"
```

#### 이미지 업로드
```
[Drag & Drop Area]
- 기본: "Drag image here or click to upload"
- Hover: 배경 하이라이트
- Drop: 로딩 애니메이션

[업로드 후]
- 이미지 썸네일 표시 (좌상단)
- 추출된 색상 5개 표시
- [Extract More] 버튼 → 10개로 확장

[에러 처리]
- 파일 크기 > 5MB: "Image too large (max 5MB)"
- 잘못된 포맷: "Only JPG, PNG, WebP supported"
```

### 3.2 팔레트 조작 인터랙션

#### 색상 카드
```
┌─────────────┐
│   #3B82F6   │ ← HEX 코드
│   ███████   │ ← 색상 칩 (클릭 가능)
│   Blue      │ ← 색상 이름 (자동 생성)
│   🔒 Primary │ ← 역할 + 잠금 아이콘
└─────────────┘

[인터랙션]
- 클릭: Color Picker 열림 (모달)
- 🔒 클릭: 잠금 토글
- HEX 클릭: 클립보드 복사 → "Copied!" 토스트

[잠금 상태]
- 잠김: 🔒 아이콘 + 반투명 배경
- [Randomize] 시 색상 변경 안 됨
```

#### 조화 규칙 선택
```
[Harmony Selector]
○ Complementary    (보색)
○ Analogous        (유사색)
○ Triadic          (삼색)
○ Split-Comp       (분할 보색)
○ Tetradic         (사색)
○ Monochromatic    (모노크롬)

[인터랙션]
- 라디오 버튼 선택 → 즉시 팔레트 업데이트
- Hover → 툴팁으로 설명 표시
  예: "Complementary: Colors opposite on the color wheel"

[애니메이션]
- 색상 전환: 0.3초 fade + slide
```

### 3.3 접근성 검증 인터랙션

#### 경고 표시
```
[모두 통과 시]
✅ All accessibility checks passed (AA)

[경고 있을 시]
⚠️ 3 color pairs have low contrast
  [View Details] [Fix Automatically]

[Details 확장 시]
┌────────────────────────────────┐
│ ⚠️ Primary Button              │
│ Text: #FFFFFF on #3B82F6       │
│ Contrast: 3.2:1 (needs 4.5:1)  │
│ [Fix] [Ignore]                 │
├────────────────────────────────┤
│ ✅ Secondary Button            │
│ Text: #1E293B on #F1F5F9       │
│ Contrast: 12.6:1               │
└────────────────────────────────┘
```

#### 자동 수정
```
[Fix Automatically] 클릭
  ↓
Loading: "Adjusting colors..."
  ↓
✅ "3 colors adjusted to meet AA standards"
  ↓
변경 사항 하이라이트 (깜빡임 효과)
  ↓
[Undo] 버튼 활성화 (5초 후 자동 숨김)
```

### 3.4 미리보기 인터랙션

#### 탭 전환
```
[Preview Tabs]
[Button] [Card] [Text] [Form]
 ^^^^^^  (활성 탭 밑줄)

[인터랙션]
- 탭 클릭 → 해당 컴포넌트 미리보기 표시
- 키보드: Tab 키로 순환
```

#### 라이브 업데이트
```
색상 변경 시:
  ↓
Debounce 100ms
  ↓
미리보기 자동 업데이트
  ↓
애니메이션: 0.2초 fade
```

### 3.5 내보내기 인터랙션

#### 코드 복사
```
[Export Panel]
┌───────────────────────────────────────┐
│ [HEX]  [RGB]  [HSL]  [CSS]  [Tailwind]│
│  ^^^^  (선택된 포맷)                   │
├───────────────────────────────────────┤
│ /* CSS Variables */                   │
│ --color-primary: #3B82F6;             │
│ --color-secondary: #10B981;           │
│ ...                                   │
│                           [Copy Code] │
└───────────────────────────────────────┘

[인터랙션]
- 포맷 버튼 클릭 → 코드 블록 업데이트
- [Copy Code] 클릭 → 클립보드 복사
  → ✅ "Copied to clipboard!" 토스트 (2초)
```

---

## 4. 키보드 단축키

| 키 | 기능 | 컨텍스트 |
|----|------|----------|
| `Space` | 랜덤 재생성 | 전역 |
| `L` | 선택된 색상 잠금/해제 | 색상 선택 시 |
| `C` | 코드 복사 | 전역 |
| `Tab` | 미리보기 탭 전환 | Preview 영역 |
| `Esc` | 모달 닫기 | 모달 열린 상태 |
| `Ctrl/Cmd + Z` | 실행 취소 | 전역 |

**접근성 고려**:
- 모든 기능 마우스 없이 사용 가능
- Focus indicator 명확히 표시
- 단축키 목록: `?` 키로 토글

---

## 5. 반응형 설계

### 5.1 브레이크포인트

```css
/* Mobile */
@media (max-width: 768px) {
  /* 1단 레이아웃, 접을 수 있는 섹션 */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  /* 2단 레이아웃 */
}

/* Desktop */
@media (min-width: 1025px) {
  /* 3단 레이아웃 (기본) */
}
```

### 5.2 모바일 UX 조정

#### 색상 입력
- Color Picker: 전체 화면 모달
- 이미지 업로드: 버튼으로 단순화 (Drag & Drop 제거)

#### 팔레트
- 색상 카드: 세로 스크롤
- 잠금 아이콘: 터치 영역 확대 (44px)

#### 미리보기
- 탭 대신 Accordion
- 스와이프로 전환 가능

#### 내보내기
- Dropdown으로 포맷 선택
- "Share" 버튼 추가 (Web Share API)

---

## 6. 애니메이션 및 전환

### 6.1 원칙
- **의미 있는 애니메이션만**: 사용자 이해 돕기
- **빠르게**: 200~300ms
- **자연스럽게**: Easing 사용

### 6.2 주요 애니메이션

```javascript
// 색상 전환
transition: background-color 0.3s ease-in-out;

// 모달 등장
transform: scale(0.95) -> scale(1);
opacity: 0 -> 1;
duration: 200ms;

// 토스트 알림
transform: translateY(100%) -> translateY(0);
duration: 300ms;
easing: cubic-bezier(0.4, 0, 0.2, 1);

// 로딩 인디케이터
keyframes: spin 1s linear infinite;
```

### 6.3 성능 최적화
- `will-change` 속성 최소화
- `transform`과 `opacity`만 애니메이션
- 애니메이션 비활성화 옵션 제공 (접근성)

---

## 7. 에러 처리 및 엣지 케이스

### 7.1 에러 메시지 가이드

| 상황 | 메시지 | 액션 |
|------|--------|------|
| 이미지 업로드 실패 | "Failed to upload image. Please try again." | [Retry] |
| 파일 크기 초과 | "Image too large. Maximum size is 5MB." | - |
| 잘못된 색상 코드 | "Invalid HEX color. Use format: #RRGGBB" | 입력란 빨간 테두리 |
| 네트워크 오류 | "Connection lost. Changes saved locally." | - |

### 7.2 엣지 케이스

#### 극단적인 색상
```
문제: 순수 검정(#000000) 팔레트
해결: "All colors are too dark. Try lighter shades for better visibility."

문제: 모든 색상이 유사
해결: "Colors are very similar. Consider increasing color variety."
```

#### 접근성 불가능한 조합
```
문제: 밝은 노란색 + 흰색 배경 (대비 1.2:1)
해결: [Fix] 버튼으로 자동 조정 → 노란색을 어둡게
```

---

## 8. 온보딩 및 첫 사용 경험

### 8.1 첫 방문자 (처음 접속)

```
[Step 1]
🎨 "Welcome! Let's create your first color palette"
  [Start Tutorial] [Skip]

[Step 2 - 선택 시]
→ Input 영역 하이라이트
  "Start by uploading an image or picking a color"

[Step 3]
→ Harmony 선택 하이라이트
  "Choose a color harmony rule"

[Step 4]
→ Accessibility 하이라이트
  "We automatically check accessibility"

[Step 5]
→ Export 하이라이트
  "Copy code in your preferred format"

[완료]
✅ "You're all set! Press Space to randomize"
```

### 8.2 빈 상태 (Empty State)

#### 히스토리 없음
```
┌─────────────────────────┐
│     📋                  │
│  No palettes yet        │
│  Create your first one! │
│  [Start Creating]       │
└─────────────────────────┘
```

#### 즐겨찾기 없음
```
┌─────────────────────────┐
│     ⭐                  │
│  No favorites yet       │
│  Mark palettes with ❤️   │
└─────────────────────────┘
```

---

## 9. 접근성 (a11y) 고려사항

### 9.1 WCAG 준수 체크리스트

- [ ] **키보드 네비게이션**: 모든 기능 키보드로 접근 가능
- [ ] **Focus Indicator**: 명확한 포커스 표시 (3px outline)
- [ ] **Alt Text**: 모든 아이콘에 대체 텍스트
- [ ] **Color Contrast**: UI 자체도 AA 기준 준수
- [ ] **Screen Reader**: ARIA 라벨 추가
- [ ] **Skip Links**: 메인 콘텐츠로 건너뛰기
- [ ] **동작 감소 모드**: `prefers-reduced-motion` 지원

### 9.2 ARIA 라벨 예시

```html
<button aria-label="Lock this color">
  🔒
</button>

<div role="alert" aria-live="polite">
  Palette updated
</div>

<input
  aria-label="Enter HEX color code"
  aria-describedby="hex-help"
/>
```

---

## 10. 성능 고려사항

### 10.1 목표 지표
- **First Contentful Paint**: < 1.5초
- **Time to Interactive**: < 3초
- **색상 계산**: < 100ms
- **이미지 분석**: < 1초

### 10.2 최적화 전략
- Lazy load: 미리보기 컴포넌트 (Below the fold)
- Debounce: 색상 변경 시 (100ms)
- Web Worker: 이미지 색상 추출
- Memoization: 조화 규칙 계산 결과 캐싱

---

## 11. 다음 단계

### 11.1 Wireframe 작성 (Week 1)
- [ ] Low-fidelity wireframe (Figma)
- [ ] 주요 플로우 3가지 프로토타입

### 11.2 사용성 테스트 (Week 2)
- [ ] 내부 테스트 5명
- [ ] 피드백 수집 및 반영

### 11.3 High-fidelity Prototype (Week 2)
- [ ] 인터랙티브 프로토타입 (Figma)
- [ ] 개발팀 핸드오프

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
