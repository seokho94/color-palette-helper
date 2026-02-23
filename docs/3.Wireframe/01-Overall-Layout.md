# 전체 레이아웃 와이어프레임

**작성자**: 박지훈 (UI/UX Designer)
**작성일**: 2026-02-23
**버전**: 1.0

---

## 1. 데스크톱 레이아웃 (1280px+)

### 1.1 전체 구조

```
┌────────────────────────────────────────────────────────────────────────┐
│  [Logo] Color Palette Helper          [About] [History] [Dark Mode]   │ Header (64px)
├───────────┬──────────────────────────┬────────────────────────────────┤
│           │                          │                                │
│  INPUT    │   PALETTE DISPLAY        │      PREVIEW                   │
│  PANEL    │                          │                                │
│           │  ┌────────────────────┐  │  ┌──────────────────────────┐  │
│  Color    │  │  █  █  █  █  █    │  │  │  [Button] [Card] [Text]  │  │
│  Picker   │  │                    │  │  │                          │  │
│           │  │  Accessibility     │  │  │  ┌────────────────────┐  │  │
│  Image    │  │  ✅ All checks pass │  │  │  │  Preview Area      │  │  │
│  Upload   │  │                    │  │  │  │                    │  │  │
│           │  │  Harmony Rule:     │  │  │  │  [Primary Button]  │  │  │
│  HEX      │  │  ( ) Complementary │  │  │  │                    │  │  │
│  Input    │  │  (•) Triadic       │  │  │  │  [Secondary Btn]   │  │  │
│           │  │  ( ) Analogous     │  │  │  │                    │  │  │
│           │  │                    │  │  │  └────────────────────┘  │  │
│           │  │  [🔄 Randomize]    │  │  │                          │  │
│           │  └────────────────────┘  │  └──────────────────────────┘  │
│           │                          │                                │
│           │                          │  ┌──────────────────────────┐  │
│           │                          │  │      EXPORT              │  │
│           │                          │  │                          │  │
│           │                          │  │  [HEX] [RGB] [CSS] ...   │  │
│           │                          │  │                          │  │
│           │                          │  │  #3B82F6                 │  │
│           │                          │  │  #10B981                 │  │
│           │                          │  │  ...                     │  │
│           │                          │  │                          │  │
│           │                          │  │  [Copy Code]             │  │
│           │                          │  └──────────────────────────┘  │
│           │                          │                                │
└───────────┴──────────────────────────┴────────────────────────────────┘

    320px            480px                      480px
```

### 1.2 픽셀 사이즈

| 영역 | 너비 | 높이 | 설명 |
|------|------|------|------|
| **Header** | 100% | 64px | 고정 높이 |
| **Input Panel** | 320px | calc(100vh - 64px) | 고정 너비 |
| **Palette Panel** | 480px | calc(100vh - 64px) | 고정 너비 |
| **Preview Panel** | 나머지 (min 480px) | calc(100vh - 64px) | 유연한 너비 |

---

## 2. Header 구조

```
┌────────────────────────────────────────────────────────────┐
│  🎨 Color Palette Helper                                   │
│                                        [History] [Help] [☀️]│
└────────────────────────────────────────────────────────────┘
```

### 2.1 구성 요소

**왼쪽**:
- 로고 아이콘 (🎨)
- 서비스명 "Color Palette Helper"

**오른쪽**:
- History 버튼 (사이드바 토글)
- Help 버튼 (가이드 모달)
- Dark Mode 토글 (Phase 3)

### 2.2 스타일

```css
Header {
  height: 64px;
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 3. 사이드바 (History)

```
┌─────────────┐
│  History    │
│  ─────────  │
│             │
│ [Favorites] │ ← Active
│ [Recent]    │
│             │
│ ┌─────────┐ │
│ │ Palette │ │
│ │ █ █ █ █ │ │
│ │ 2h ago  │ │
│ └─────────┘ │
│             │
│ ┌─────────┐ │
│ │ Palette │ │
│ │ █ █ █ █ │ │
│ │ Yesterday│ │
│ └─────────┘ │
│             │
│ [Clear All] │
└─────────────┘

   280px
```

### 3.1 토글 방식

- **데스크톱**: 왼쪽에서 슬라이드 인
- **모바일**: 하단에서 Drawer

---

## 4. 반응형 브레이크포인트

### 4.1 Large Desktop (1440px+)
```
3단 레이아웃 유지, Preview Panel 더 넓게
```

### 4.2 Desktop (1024px ~ 1439px)
```
3단 레이아웃 유지, 기본 사이즈
```

### 4.3 Tablet (768px ~ 1023px)
```
2단 레이아웃:
┌──────────┬──────────┐
│  Input   │ Palette  │
│  &       │ &        │
│  Export  │ Preview  │
└──────────┴──────────┘
```

### 4.4 Mobile (< 768px)
```
1단 레이아웃 (세로 스크롤):
┌──────────┐
│  Input   │
├──────────┤
│ Palette  │
├──────────┤
│ Preview  │
├──────────┤
│  Export  │
└──────────┘
```

---

## 5. 스크롤 동작

| 패널 | 스크롤 | 설명 |
|------|--------|------|
| Header | 고정 | 스크롤 시 항상 표시 |
| Input Panel | 독립 스크롤 | 내용이 많을 경우 |
| Palette Panel | 독립 스크롤 | 색상이 많을 경우 |
| Preview Panel | 독립 스크롤 | 미리보기 컴포넌트 많을 경우 |

---

## 6. 색상 시스템 (UI 자체)

### 6.1 배경
```css
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;
```

### 6.2 텍스트
```css
--text-primary: #111827;
--text-secondary: #6B7280;
--text-tertiary: #9CA3AF;
```

### 6.3 테두리
```css
--border-primary: #E5E7EB;
--border-secondary: #D1D5DB;
```

---

## 7. Shadow & Depth

```css
/* Panel 구분 */
.panel {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Card */
.card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Modal */
.modal {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}
```

---

## 8. 애니메이션 가이드

### 8.1 페이지 전환
```css
.panel {
  transition: transform 0.3s ease-out;
}
```

### 8.2 색상 변경
```css
.color-swatch {
  transition: background-color 0.3s ease-in-out;
}
```

### 8.3 모달/사이드바
```css
.sidebar {
  transition: transform 0.2s ease-out;
}
```

---

## 9. 접근성 (Accessibility)

### 9.1 Focus State
```css
button:focus-visible,
input:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
```

### 9.2 Skip Links
```html
<a href="#main" class="sr-only">Skip to main content</a>
```

### 9.3 ARIA Labels
- 모든 인터랙티브 요소에 aria-label
- Panel에 role="region"
- 동적 콘텐츠에 aria-live

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
