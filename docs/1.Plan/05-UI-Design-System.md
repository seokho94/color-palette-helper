# UI 디자인 시스템

**작성자**: 최예린 (Designer)
**작성일**: 2026-02-23
**버전**: 1.0

---

## 1. 디자인 철학

### 1.1 핵심 가치

**"사용자 생성 색상이 주인공"**

- 우리 UI는 조연, 사용자 팔레트가 주연
- 모노톤 베이스로 깔끔하고 전문적인 느낌
- 액센트 컬러는 사용자가 생성한 색상으로

### 1.2 디자인 키워드

| 키워드 | 구현 방법 |
|--------|----------|
| **Professional** | 모노톤 컬러, 명확한 타이포그래피 |
| **Clean** | 넉넉한 여백, 미니멀한 UI |
| **Modern** | 둥근 모서리, 부드러운 그림자 |
| **Accessible** | 높은 대비, 명확한 라벨 |

---

## 2. 컬러 시스템

### 2.1 기본 컬러 팔레트

#### Neutral (회색조)
```css
:root {
  /* Black & White */
  --color-white: #FFFFFF;
  --color-black: #000000;

  /* Gray Scale (Tailwind 기반) */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
}
```

#### Semantic Colors (시스템 컬러)
```css
:root {
  /* Success */
  --color-success-light: #D1FAE5;
  --color-success: #10B981;
  --color-success-dark: #059669;

  /* Warning */
  --color-warning-light: #FEF3C7;
  --color-warning: #F59E0B;
  --color-warning-dark: #D97706;

  /* Error */
  --color-error-light: #FEE2E2;
  --color-error: #EF4444;
  --color-error-dark: #DC2626;

  /* Info */
  --color-info-light: #DBEAFE;
  --color-info: #3B82F6;
  --color-info-dark: #2563EB;
}
```

### 2.2 컬러 사용 가이드

| 용도 | 컬러 | 예시 |
|------|------|------|
| **배경** | gray-50, white | 페이지 배경 |
| **패널/카드** | white (shadow) | 입력 패널, 팔레트 카드 |
| **텍스트 (Primary)** | gray-900 | Heading, Body |
| **텍스트 (Secondary)** | gray-600 | Label, Caption |
| **텍스트 (Tertiary)** | gray-400 | Placeholder |
| **테두리** | gray-200, gray-300 | Input, Divider |
| **Hover** | gray-100 | 버튼 호버 |
| **Focus** | info (blue) | Input focus ring |
| **Success** | green | 접근성 통과 |
| **Warning** | yellow | 접근성 경고 |
| **Error** | red | 접근성 실패 |

### 2.3 다크모드 (Phase 3)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0F172A;    /* gray-950 → dark blue */
    --bg-secondary: #1E293B;  /* gray-900 → dark blue */
    --text-primary: #F8FAFC;  /* gray-50 */
    --text-secondary: #CBD5E1; /* gray-400 */
    --border: #334155;         /* gray-700 */
  }
}
```

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

```css
:root {
  /* Sans-serif (UI) */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont,
               'Segoe UI', sans-serif;

  /* Monospace (Code) */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

**선정 이유**:
- **Inter**: 가독성 우수, 다양한 weight, 무료
- **JetBrains Mono**: 코드 표시에 최적, 리거처 지원

### 3.2 타입 스케일

| 레벨 | 크기 | Line Height | Weight | 용도 |
|------|------|-------------|--------|------|
| **H1** | 32px | 1.2 | 700 | 페이지 제목 |
| **H2** | 24px | 1.3 | 600 | 섹션 제목 |
| **H3** | 20px | 1.4 | 600 | 서브 섹션 |
| **H4** | 18px | 1.4 | 600 | 카드 제목 |
| **Body** | 16px | 1.5 | 400 | 본문 |
| **Body-sm** | 14px | 1.5 | 400 | 작은 본문 |
| **Caption** | 12px | 1.4 | 400 | 라벨, 힌트 |
| **Code** | 14px | 1.6 | 400 | 코드 블록 |

### 3.3 CSS 변수

```css
:root {
  /* Font Size */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;

  /* Font Weight */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Height */
  --leading-tight: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
}
```

---

## 4. 간격 (Spacing)

### 4.1 Spacing Scale (4px 기반)

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

### 4.2 사용 가이드

| 용도 | 값 | 예시 |
|------|-----|------|
| 컴포넌트 내부 여백 | space-4, space-6 | 버튼, 카드 padding |
| 요소 간 간격 | space-3, space-4 | Label과 Input 사이 |
| 섹션 간 간격 | space-8, space-12 | 패널 간 margin |
| 페이지 여백 | space-6, space-8 | 좌우 padding |

---

## 5. Border & Radius

### 5.1 Border Width

```css
:root {
  --border-0: 0;
  --border-1: 1px;
  --border-2: 2px;
  --border-4: 4px;
}
```

### 5.2 Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;    /* 버튼, Input */
  --radius-md: 8px;    /* 카드, 패널 */
  --radius-lg: 12px;   /* 모달 */
  --radius-full: 9999px; /* 원형 (색상 칩) */
}
```

### 5.3 사용 예시

| 컴포넌트 | Radius | Border |
|---------|--------|--------|
| 버튼 | sm (4px) | 1px (hover만) |
| Input | sm (4px) | 1px |
| 카드/패널 | md (8px) | 1px |
| 모달 | lg (12px) | 0 |
| 색상 칩 | full (circle) | 2px |

---

## 6. 그림자 (Shadow)

### 6.1 Shadow Scale

```css
:root {
  /* Elevation */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1),
               0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07),
               0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1),
               0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1),
               0 10px 10px rgba(0, 0, 0, 0.04);

  /* Focus */
  --shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.5);

  /* Inner */
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}
```

### 6.2 사용 가이드

| 레벨 | Shadow | 용도 |
|------|--------|------|
| **xs** | 0-1px | Input default |
| **sm** | 1-3px | 버튼, 카드 default |
| **md** | 4-6px | 카드 hover, Dropdown |
| **lg** | 10-15px | 모달 |
| **xl** | 20-25px | Popover (사용 최소화) |

---

## 7. 컴포넌트 스타일

### 7.1 버튼

#### Primary Button
```css
.btn-primary {
  /* 사용자 팔레트 Primary 색상 사용 */
  background: var(--palette-primary, #3B82F6);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: var(--font-medium);
  transition: all 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
}

.btn-secondary:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-400);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-gray-600);
  padding: 12px 24px;
}

.btn-ghost:hover {
  background: var(--color-gray-100);
}
```

### 7.2 Input

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-info);
  box-shadow: var(--shadow-focus);
}

.input::placeholder {
  color: var(--color-gray-400);
}

.input.error {
  border-color: var(--color-error);
}
```

### 7.3 카드

```css
.card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-gray-300);
}
```

### 7.4 색상 칩 (Color Swatch)

```css
.color-swatch {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-gray-200);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.color-swatch:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.color-swatch.locked::after {
  content: '🔒';
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 16px;
}
```

### 7.5 토스트 (Toast Notification)

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--color-gray-900);
  color: white;
  padding: 16px 24px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toast.success {
  background: var(--color-success);
}

.toast.error {
  background: var(--color-error);
}
```

---

## 8. 아이콘 시스템

### 8.1 아이콘 라이브러리

**선택**: Lucide Icons (React)
- MIT 라이선스
- 일관된 스타일
- Tree-shaking 지원

```bash
npm install lucide-react
```

### 8.2 아이콘 크기

```css
:root {
  --icon-xs: 16px;
  --icon-sm: 20px;
  --icon-md: 24px;
  --icon-lg: 32px;
  --icon-xl: 48px;
}
```

### 8.3 주요 아이콘

| 기능 | 아이콘 | 이름 |
|------|--------|------|
| 색상 선택 | 🎨 | Palette |
| 이미지 업로드 | 📁 | Upload |
| 복사 | 📋 | Copy |
| 잠금 | 🔒 | Lock |
| 재생성 | 🔄 | RefreshCw |
| 설정 | ⚙️ | Settings |
| 정보 | ℹ️ | Info |
| 경고 | ⚠️ | AlertTriangle |
| 성공 | ✅ | CheckCircle |
| 닫기 | ✕ | X |

---

## 9. 레이아웃 그리드

### 9.1 컨테이너

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### 9.2 그리드 시스템

```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

---

## 10. 애니메이션 시스템

### 10.1 Transition Timing

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;

  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 10.2 공통 애니메이션

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 11. 접근성 가이드

### 11.1 Color Contrast (우리 UI 자체)

- **텍스트-배경**: 최소 4.5:1 (AA)
- **큰 텍스트**: 최소 3:1
- **UI 컴포넌트**: 최소 3:1

### 11.2 Focus State

```css
:focus-visible {
  outline: 2px solid var(--color-info);
  outline-offset: 2px;
}

/* 키보드 사용자만 표시 */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 11.3 Touch Target

**모바일 최소 크기**: 44px × 44px

```css
.btn-mobile {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-3);
}
```

---

## 12. Figma 디자인 파일 구조

### 12.1 페이지 구조
```
📁 Color Palette Helper
├── 📄 Cover (프로젝트 개요)
├── 📄 Design System
│   ├── Colors
│   ├── Typography
│   ├── Components
│   └── Icons
├── 📄 Wireframes
├── 📄 UI Design (High-fidelity)
│   ├── Desktop
│   ├── Tablet
│   └── Mobile
└── 📄 Prototype
```

### 12.2 Components
```
┌── Buttons
│   ├── Primary
│   ├── Secondary
│   └── Ghost
├── Inputs
│   ├── Text Input
│   ├── Color Picker
│   └── File Upload
├── Cards
│   ├── Color Swatch
│   └── Preview Card
├── Modals
└── Toast
```

---

## 13. 개발 핸드오프

### 13.1 CSS Variables Export

Figma에서 Tailwind Config로 변환:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F9FAFB',
          // ...
        },
      },
      spacing: {
        // Figma Auto Layout → Tailwind Spacing
      },
      borderRadius: {
        // Figma Corner Radius
      },
    },
  },
}
```

### 13.2 개발자 가이드

- **컴포넌트 명명**: Figma와 동일하게 (예: `ColorSwatch`)
- **Props**: Figma Variants → React Props
- **상태**: Default, Hover, Active, Disabled, Focus

---

## 14. 디자인 토큰 (Phase 2)

향후 JSON 형식으로 관리:

```json
{
  "color": {
    "gray": {
      "50": { "value": "#F9FAFB" },
      "100": { "value": "#F3F4F6" }
    }
  },
  "spacing": {
    "4": { "value": "16px" }
  }
}
```

**장점**:
- Figma, CSS, 모바일 앱 등 플랫폼 간 일관성
- 테마 전환 용이 (라이트/다크)

---

**다음 단계**:
1. Figma 디자인 시스템 구축 (Week 1)
2. 주요 컴포넌트 디자인 (Week 1-2)
3. 개발팀 핸드오프 (Week 2)
