# Task 05: UI 미리보기 기능

**상태**: ✅ Done
**우선순위**: P0
**예상 시간**: 12시간
**실제 시간**: 1.5시간
**담당자**: Frontend (정하은), UI/UX (박지훈)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

생성된 팔레트를 실제 UI 컴포넌트(Button, Card, Text, Form)에 적용하여 미리보기 기능 구현

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현
- [x] Task 02: 색상 입력 기능
- [x] Task 03: 팔레트 생성 기능

---

## 3. 개발 항목 체크리스트

### 3.1 Preview 컴포넌트 ✅
- [x] PreviewButton 컴포넌트
- [x] PreviewCard 컴포넌트
- [x] PreviewText 컴포넌트
- [x] PreviewForm 컴포넌트

### 3.2 탭 네비게이션 ✅
- [x] Tab 컴포넌트 구현
- [x] 4개 탭 (Button, Card, Text, Form)
- [x] 탭 전환 구현

### 3.3 색상 매핑 ✅
- [x] 자동 색상 역할 할당 (primary, secondary, accent, background, text)
- [x] 대비 텍스트 자동 선택 (getContrastColor)
- [x] useMemo로 성능 최적화

### 3.4 통합 ✅
- [x] PreviewPanel 업데이트
- [x] Store 연동 (usePaletteStore)
- [x] 실시간 색상 업데이트

---

## 4. 파일 구조

```
components/
├── preview/
│   ├── PreviewButton.tsx     ← 생성
│   ├── PreviewCard.tsx       ← 생성
│   ├── PreviewText.tsx       ← 생성
│   ├── PreviewForm.tsx       ← 생성
│   ├── PreviewTabs.tsx       ← 생성
│   └── PreviewContainer.tsx  ← 생성
│
├── ui/
│   └── Tabs.tsx              ← 생성
│
└── layout/
    └── PreviewPanel.tsx      ← 수정

lib/
└── color/
    └── roles.ts              ← 생성 (색상 역할 할당)
```

---

## 5. 구현 가이드

### 5.1 lib/color/roles.ts

```tsx
// lib/color/roles.ts
import type { Color } from '@/types/color'
import { getContrastRatio } from './accessibility'

export interface ColorRoles {
  primary: Color
  secondary: Color
  accent: Color
  background: Color
  text: Color
  textOnPrimary: string
  textOnSecondary: string
  textOnAccent: string
}

/**
 * 색상 배열을 UI 역할에 자동 매핑
 */
export function assignColorRoles(colors: Color[]): ColorRoles {
  if (colors.length < 5) {
    throw new Error('At least 5 colors required')
  }

  const [primary, secondary, accent, background, text, ...rest] = colors

  return {
    primary,
    secondary,
    accent,
    background,
    text,
    textOnPrimary: getContrastColor(primary.hex),
    textOnSecondary: getContrastColor(secondary.hex),
    textOnAccent: getContrastColor(accent.hex),
  }
}

/**
 * 배경색에 대비되는 텍스트 색상 반환
 */
export function getContrastColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio('#FFFFFF', backgroundColor)
  const blackContrast = getContrastRatio('#000000', backgroundColor)

  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
}
```

---

### 5.2 components/ui/Tabs.tsx

```tsx
// components/ui/Tabs.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string
  children: ReactNode
}) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 border-b border-gray-200">
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className="mt-6">{children}</div>
}
```

---

### 5.3 components/preview/PreviewButton.tsx

```tsx
// components/preview/PreviewButton.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

export function PreviewButton() {
  const { colors } = usePaletteStore()

  const roles = useMemo(() => {
    if (colors.length < 5) return null
    return assignColorRoles(colors)
  }, [colors])

  if (!roles) {
    return <p className="text-sm text-gray-500">Generate a palette first</p>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">Button Styles</h3>

      {/* Primary Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Primary</p>
        <button
          className="rounded-lg px-6 py-3 font-medium shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.primary.hex,
            color: roles.textOnPrimary,
          }}
        >
          Primary Action
        </button>
      </div>

      {/* Secondary Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Secondary</p>
        <button
          className="rounded-lg px-6 py-3 font-medium shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.secondary.hex,
            color: roles.textOnSecondary,
          }}
        >
          Secondary Action
        </button>
      </div>

      {/* Accent Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Accent</p>
        <button
          className="rounded-lg px-6 py-3 font-medium shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.accent.hex,
            color: roles.textOnAccent,
          }}
        >
          Accent Action
        </button>
      </div>

      {/* Outline Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Outline</p>
        <button
          className="rounded-lg border-2 px-6 py-3 font-medium transition-transform hover:scale-105"
          style={{
            borderColor: roles.primary.hex,
            color: roles.primary.hex,
            backgroundColor: 'transparent',
          }}
        >
          Outline Action
        </button>
      </div>

      {/* Ghost Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Ghost</p>
        <button
          className="rounded-lg px-6 py-3 font-medium transition-colors hover:bg-gray-100"
          style={{
            color: roles.primary.hex,
          }}
        >
          Ghost Action
        </button>
      </div>
    </div>
  )
}
```

---

### 5.4 components/preview/PreviewCard.tsx

```tsx
// components/preview/PreviewCard.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

export function PreviewCard() {
  const { colors } = usePaletteStore()

  const roles = useMemo(() => {
    if (colors.length < 5) return null
    return assignColorRoles(colors)
  }, [colors])

  if (!roles) {
    return <p className="text-sm text-gray-500">Generate a palette first</p>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">Card Styles</h3>

      {/* Card 1 */}
      <div
        className="rounded-lg p-6 shadow-lg"
        style={{ backgroundColor: roles.background.hex }}
      >
        <div
          className="mb-2 inline-block rounded px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: roles.accent.hex,
            color: roles.textOnAccent,
          }}
        >
          Featured
        </div>

        <h4
          className="mb-2 text-xl font-bold"
          style={{ color: roles.text.hex }}
        >
          Card Title
        </h4>

        <p
          className="mb-4 text-sm"
          style={{ color: roles.text.hex, opacity: 0.8 }}
        >
          This is a preview of how your color palette looks in a card component.
          The colors are automatically assigned based on your palette.
        </p>

        <button
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{
            backgroundColor: roles.primary.hex,
            color: roles.textOnPrimary,
          }}
        >
          Learn More
        </button>
      </div>

      {/* Card 2 (Inverted) */}
      <div
        className="rounded-lg p-6 shadow-lg"
        style={{ backgroundColor: roles.primary.hex }}
      >
        <h4
          className="mb-2 text-xl font-bold"
          style={{ color: roles.textOnPrimary }}
        >
          Inverted Card
        </h4>

        <p
          className="mb-4 text-sm"
          style={{ color: roles.textOnPrimary, opacity: 0.9 }}
        >
          This card uses the primary color as background, demonstrating
          color versatility.
        </p>

        <button
          className="rounded-lg border-2 px-4 py-2 text-sm font-medium"
          style={{
            borderColor: roles.textOnPrimary,
            color: roles.textOnPrimary,
            backgroundColor: 'transparent',
          }}
        >
          Action
        </button>
      </div>
    </div>
  )
}
```

---

### 5.5 components/preview/PreviewText.tsx

```tsx
// components/preview/PreviewText.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

export function PreviewText() {
  const { colors } = usePaletteStore()

  const roles = useMemo(() => {
    if (colors.length < 5) return null
    return assignColorRoles(colors)
  }, [colors])

  if (!roles) {
    return <p className="text-sm text-gray-500">Generate a palette first</p>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">Typography Styles</h3>

      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: roles.background.hex }}
      >
        {/* Heading 1 */}
        <h1
          className="mb-4 text-4xl font-bold"
          style={{ color: roles.text.hex }}
        >
          Heading 1
        </h1>

        {/* Heading 2 */}
        <h2
          className="mb-3 text-3xl font-bold"
          style={{ color: roles.text.hex }}
        >
          Heading 2
        </h2>

        {/* Heading 3 */}
        <h3
          className="mb-3 text-2xl font-semibold"
          style={{ color: roles.text.hex }}
        >
          Heading 3
        </h3>

        {/* Paragraph */}
        <p
          className="mb-4 text-base leading-relaxed"
          style={{ color: roles.text.hex, opacity: 0.9 }}
        >
          This is a paragraph with body text. The quick brown fox jumps over
          the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Link */}
        <a
          href="#"
          className="font-medium underline"
          style={{ color: roles.primary.hex }}
        >
          This is a link
        </a>

        {/* Small Text */}
        <p
          className="mt-4 text-sm"
          style={{ color: roles.text.hex, opacity: 0.7 }}
        >
          Small text for captions and footnotes.
        </p>

        {/* Accent Text */}
        <p
          className="mt-4 text-lg font-semibold"
          style={{ color: roles.accent.hex }}
        >
          Accent colored text for emphasis
        </p>
      </div>
    </div>
  )
}
```

---

### 5.6 components/preview/PreviewForm.tsx

```tsx
// components/preview/PreviewForm.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

export function PreviewForm() {
  const { colors } = usePaletteStore()

  const roles = useMemo(() => {
    if (colors.length < 5) return null
    return assignColorRoles(colors)
  }, [colors])

  if (!roles) {
    return <p className="text-sm text-gray-500">Generate a palette first</p>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">Form Elements</h3>

      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: roles.background.hex }}
      >
        <form className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: roles.text.hex }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: roles.text.hex,
                color: roles.text.hex,
              }}
            />
          </div>

          {/* Textarea */}
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: roles.text.hex }}
            >
              Message
            </label>
            <textarea
              placeholder="Your message..."
              rows={3}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: roles.text.hex,
                color: roles.text.hex,
              }}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded"
              style={{ accentColor: roles.primary.hex }}
            />
            <label
              htmlFor="terms"
              className="text-sm"
              style={{ color: roles.text.hex }}
            >
              I agree to the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg py-2.5 font-medium"
            style={{
              backgroundColor: roles.primary.hex,
              color: roles.textOnPrimary,
            }}
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

### 5.7 components/preview/PreviewContainer.tsx

```tsx
// components/preview/PreviewContainer.tsx
'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { PreviewButton } from './PreviewButton'
import { PreviewCard } from './PreviewCard'
import { PreviewText } from './PreviewText'
import { PreviewForm } from './PreviewForm'

export function PreviewContainer() {
  return (
    <Tabs defaultValue="button">
      <TabsList>
        <TabsTrigger value="button">Button</TabsTrigger>
        <TabsTrigger value="card">Card</TabsTrigger>
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="form">Form</TabsTrigger>
      </TabsList>

      <TabsContent value="button">
        <PreviewButton />
      </TabsContent>

      <TabsContent value="card">
        <PreviewCard />
      </TabsContent>

      <TabsContent value="text">
        <PreviewText />
      </TabsContent>

      <TabsContent value="form">
        <PreviewForm />
      </TabsContent>
    </Tabs>
  )
}
```

---

### 5.8 components/layout/PreviewPanel.tsx (업데이트)

```tsx
// components/layout/PreviewPanel.tsx
import { PreviewContainer } from '@/components/preview/PreviewContainer'

export function PreviewPanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Preview
      </h2>

      <PreviewContainer />
    </div>
  )
}
```

---

## 6. 테스트 체크리스트

### 6.1 Button Preview
- [x] Primary 버튼 색상 적용
- [x] Secondary 버튼 색상 적용
- [x] Accent 버튼 색상 적용
- [x] Outline 버튼 스타일
- [x] Ghost 버튼 스타일
- [x] 텍스트 대비 자동 선택

### 6.2 Card Preview
- [x] 배경색 적용
- [x] 텍스트 색상 적용
- [x] Accent 배지 표시
- [x] 버튼 스타일
- [x] Inverted 카드 스타일

### 6.3 Text Preview
- [x] 제목 스타일 (H1, H2, H3)
- [x] 본문 텍스트
- [x] 링크 색상
- [x] 작은 텍스트 (caption)
- [x] Accent 텍스트

### 6.4 Form Preview
- [x] Input 필드 스타일
- [x] Textarea 스타일
- [x] Checkbox 색상
- [x] Submit 버튼
- [x] 테두리 색상 적용

### 6.5 Tabs 동작
- [x] 탭 전환 (Context API)
- [x] Active 탭 표시
- [x] 탭별 콘텐츠 렌더링

---

## 7. 완료 조건

- [x] 4가지 Preview (Button, Card, Text, Form) 모두 구현
- [x] 탭 네비게이션 정상 작동
- [x] 색상 자동 매핑 완료
- [x] 텍스트 대비 자동 조정 (getContrastColor)
- [x] 실시간 색상 업데이트 (useMemo)
- [x] 반응형 레이아웃
- [x] 모든 테스트 통과
- [x] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- Button 미리보기
- Card 미리보기
- Text 미리보기
- Form 미리보기

---

## 9. 참고 문서

- [docs/2.Functional/04-Preview-Feature.md](../2.Functional/04-Preview-Feature.md)
- [docs/3.Wireframe/04-Preview-Panel.md](../3.Wireframe/04-Preview-Panel.md)

---

**상태**: ✅ Done
**다음 단계**: 코드 내보내기 기능 (Task 06)
