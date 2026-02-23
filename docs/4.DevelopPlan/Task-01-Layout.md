# Task 01: 기본 레이아웃 구현

**상태**: ✅ Done
**우선순위**: P0
**예상 시간**: 6시간
**실제 시간**: 1시간
**담당자**: Frontend (정하은), Designer (최예린)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

3단 그리드 기반 메인 레이아웃과 Header 컴포넌트를 구현하여 전체 화면 구조 완성

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정

---

## 3. 개발 항목 체크리스트

### 3.1 Header 컴포넌트 ✅
- [x] `components/layout/Header.tsx` 생성
- [x] 로고 & 서비스명 표시
- [x] History, Help 버튼 추가
- [x] 반응형 레이아웃 (모바일: 축소)

### 3.2 MainLayout 컴포넌트 ✅
- [x] `components/layout/MainLayout.tsx` 생성
- [x] 3단 그리드 구조 (Input | Palette | Preview)
- [x] CSS Grid 또는 Flexbox 사용
- [x] 각 패널 독립 스크롤

### 3.3 패널 컴포넌트 (껍데기) ✅
- [x] `components/layout/InputPanel.tsx`
- [x] `components/layout/PalettePanel.tsx`
- [x] `components/layout/PreviewPanel.tsx`
- [x] 각 패널에 제목 + 임시 콘텐츠

### 3.4 반응형 설정 ✅
- [x] TailwindCSS 브레이크포인트 설정
- [x] Desktop (1280px+): 3단 레이아웃
- [x] Tablet (768-1023px): 2단 레이아웃
- [x] Mobile (<768px): 1단 레이아웃

### 3.5 스타일링 ✅
- [x] 배경 색상, 테두리 적용
- [x] Shadow 추가
- [x] Header 고정 (sticky)

---

## 4. 파일 구조

```
components/
└── layout/
    ├── Header.tsx          ← 생성
    ├── MainLayout.tsx      ← 생성
    ├── InputPanel.tsx      ← 생성
    ├── PalettePanel.tsx    ← 생성
    └── PreviewPanel.tsx    ← 생성

app/
├── layout.tsx              ← 수정 (MainLayout 사용)
└── page.tsx                ← 수정 (임시 콘텐츠 제거)
```

---

## 5. 구현 가이드

### 5.1 Header.tsx

```tsx
// components/layout/Header.tsx
import { Palette, HelpCircle, History } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white px-6">
      <div className="flex h-full items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">
            Color Palette Helper
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            aria-label="History"
          >
            <History className="h-5 w-5" />
            <span className="hidden md:inline">History</span>
          </button>
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="hidden md:inline">Help</span>
          </button>
        </div>
      </div>
    </header>
  )
}
```

### 5.2 MainLayout.tsx

```tsx
// components/layout/MainLayout.tsx
import { ReactNode } from 'react'
import { Header } from './Header'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
```

### 5.3 3단 그리드 레이아웃 (app/page.tsx)

```tsx
// app/page.tsx
import { InputPanel } from '@/components/layout/InputPanel'
import { PalettePanel } from '@/components/layout/PalettePanel'
import { PreviewPanel } from '@/components/layout/PreviewPanel'

export default function HomePage() {
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-[320px_1fr_1fr] gap-px bg-gray-200">
      <InputPanel />
      <PalettePanel />
      <PreviewPanel />
    </div>
  )
}
```

### 5.4 InputPanel.tsx (껍데기)

```tsx
// components/layout/InputPanel.tsx
export function InputPanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Color Input
      </h2>
      <p className="text-sm text-gray-500">
        Color Picker will go here
      </p>
    </div>
  )
}
```

### 5.5 반응형 CSS

```css
/* globals.css 추가 */

/* Desktop (3단) */
@media (min-width: 1024px) {
  .grid-3-col {
    grid-template-columns: 320px minmax(480px, 1fr) minmax(480px, 1fr);
  }
}

/* Tablet (2단) */
@media (min-width: 768px) and (max-width: 1023px) {
  .grid-3-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile (1단) */
@media (max-width: 767px) {
  .grid-3-col {
    grid-template-columns: 1fr;
  }
}
```

---

## 6. 테스트 체크리스트

- [ ] **시각적 테스트**
  - [ ] Desktop에서 3단 레이아웃 확인
  - [ ] Tablet에서 2단 레이아웃 확인
  - [ ] Mobile에서 1단 레이아웃 확인

- [ ] **인터랙션 테스트**
  - [ ] Header 버튼 hover 효과 확인
  - [ ] 각 패널 스크롤 독립 작동 확인
  - [ ] Header sticky 동작 확인

- [ ] **접근성 테스트**
  - [ ] 키보드 네비게이션 (Tab)
  - [ ] ARIA 라벨 확인
  - [ ] Focus indicator 표시 확인

---

## 7. 완료 조건

- [ ] 3단 그리드 레이아웃 정상 작동
- [ ] Header 컴포넌트 완성
- [ ] 반응형 레이아웃 동작 (3가지 브레이크포인트)
- [ ] 각 패널 독립 스크롤 가능
- [ ] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- Desktop 뷰
- Tablet 뷰
- Mobile 뷰

---

## 9. 참고 문서

- [docs/3.Wireframe/01-Overall-Layout.md](../3.Wireframe/01-Overall-Layout.md)
- [docs/1.Plan/05-UI-Design-System.md](../1.Plan/05-UI-Design-System.md)

---

**상태**: ⏳ In Progress
**다음 단계**: Color Picker 통합 (Task 02)
