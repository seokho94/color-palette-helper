# Task 08: URL 공유 기능

**상태**: ✅ Done
**우선순위**: P1
**예상 시간**: 6시간
**담당자**: Frontend (정하은)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

생성된 팔레트를 URL Query String으로 인코딩하여 공유하고, URL에서 팔레트를 복원하는 기능 구현

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현
- [x] Task 02: 색상 입력 기능
- [x] Task 03: 팔레트 생성 기능
- [x] Task 04: 접근성 검증
- [x] Task 05: UI 미리보기
- [x] Task 06: Export 기능
- [x] Task 07: 히스토리 & 즐겨찾기

---

## 3. 개발 항목 체크리스트

### 3.1 URL 인코딩/디코딩 ✅
- [x] 팔레트 → URL 변환 함수
- [x] URL → 팔레트 변환 함수
- [x] Query String 파싱
- [x] 유효성 검증

### 3.2 UI 컴포넌트 ✅
- [x] Share 버튼 (Header)
- [x] Share 모달
- [x] URL 복사 버튼
- [x] 소셜 미디어 공유 버튼 (선택)

### 3.3 URL 동기화 ✅
- [x] Next.js Router 통합
- [x] URL 로드 시 팔레트 복원
- [x] 브라우저 히스토리 관리

---

## 4. 파일 구조

```
lib/
└── share/
    ├── url.ts                ← 생성 (URL 인코딩/디코딩)
    └── validation.ts         ← 생성 (URL 유효성 검증)

components/
├── share/
│   ├── ShareButton.tsx       ← 생성
│   ├── ShareModal.tsx        ← 생성
│   └── SocialShare.tsx       ← 생성 (선택)
│
└── layout/
    └── Header.tsx            ← 수정

app/
└── page.tsx                  ← 수정 (URL 파싱)
```

---

## 5. 구현 가이드

### 5.1 lib/share/url.ts

```tsx
// lib/share/url.ts
import type { Palette } from '@/types/color'

/**
 * 팔레트를 URL Query String으로 인코딩
 */
export function encodePaletteToUrl(palette: Palette): string {
  const params = new URLSearchParams()

  // 기본 색상
  params.set('base', palette.baseColor.replace('#', ''))

  // Harmony 규칙
  params.set('harmony', palette.harmonyRule)

  // 색상 배열 (HEX만)
  const colors = palette.colors.map((c) => c.hex.replace('#', '')).join(',')
  params.set('colors', colors)

  // 잠금 상태 (옵션)
  const locks = palette.colors.map((c) => (c.locked ? '1' : '0')).join('')
  if (locks.includes('1')) {
    params.set('locks', locks)
  }

  return params.toString()
}

/**
 * URL Query String에서 팔레트 디코딩
 */
export function decodePaletteFromUrl(queryString: string): Partial<Palette> | null {
  try {
    const params = new URLSearchParams(queryString)

    const baseColor = params.get('base')
    const harmonyRule = params.get('harmony')
    const colorsParam = params.get('colors')
    const locksParam = params.get('locks')

    if (!baseColor || !harmonyRule || !colorsParam) {
      return null
    }

    // HEX 색상 파싱
    const hexColors = colorsParam.split(',').map((hex) => `#${hex}`)

    // 유효성 검증
    if (!isValidHarmonyRule(harmonyRule)) {
      return null
    }

    if (!hexColors.every(isValidHex)) {
      return null
    }

    // 잠금 상태 파싱
    const locks = locksParam ? locksParam.split('').map((l) => l === '1') : []

    // Color 객체 생성
    const colors = hexColors.map((hex, i) => ({
      hex,
      rgb: hexToRgb(hex),
      hsl: hexToHsl(hex),
      locked: locks[i] || false,
    }))

    return {
      baseColor: `#${baseColor}`,
      harmonyRule: harmonyRule as HarmonyRule,
      colors,
    }
  } catch (error) {
    console.error('Failed to decode palette from URL:', error)
    return null
  }
}

/**
 * 전체 URL 생성
 */
export function generateShareUrl(palette: Palette): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const query = encodePaletteToUrl(palette)
  return `${origin}/?${query}`
}

/**
 * HEX → RGB 변환
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0]
}

/**
 * HEX → HSL 변환
 */
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) {
    return [0, 0, l]
  }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h = 0
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6
  } else {
    h = ((r - g) / d + 4) / 6
  }

  return [h * 360, s, l]
}
```

---

### 5.2 lib/share/validation.ts

```tsx
// lib/share/validation.ts
import type { HarmonyRule } from '@/types/color'

const VALID_HARMONY_RULES: HarmonyRule[] = [
  'complementary',
  'analogous',
  'triadic',
  'split-complementary',
  'tetradic',
  'monochromatic',
]

/**
 * HEX 색상 유효성 검증
 */
export function isValidHex(hex: string): boolean {
  return /^#?[0-9A-F]{6}$/i.test(hex)
}

/**
 * Harmony 규칙 유효성 검증
 */
export function isValidHarmonyRule(rule: string): rule is HarmonyRule {
  return VALID_HARMONY_RULES.includes(rule as HarmonyRule)
}
```

---

### 5.3 components/share/ShareModal.tsx

```tsx
// components/share/ShareModal.tsx
'use client'

import { useState } from 'react'
import { X, Copy, Check, Share2 } from 'lucide-react'
import type { Palette } from '@/types/color'
import { generateShareUrl } from '@/lib/share/url'

interface ShareModalProps {
  palette: Palette
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ palette, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = generateShareUrl(palette)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Share Palette
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* URL Display */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Share Link
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-600"
            />

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Preview
          </label>

          <div className="grid grid-cols-6 gap-2">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="h-12 rounded-lg"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500">
          Anyone with this link can view and use this color palette.
        </p>
      </div>
    </>
  )
}
```

---

### 5.4 components/share/ShareButton.tsx

```tsx
// components/share/ShareButton.tsx
'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { ShareModal } from './ShareModal'

export function ShareButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { colors, baseColor, harmonyRule } = usePaletteStore()

  const handleShare = () => {
    if (colors.length === 0) {
      alert('Please generate a palette first')
      return
    }

    setIsModalOpen(true)
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        aria-label="Share"
      >
        <Share2 className="h-5 w-5" />
        <span className="hidden md:inline">Share</span>
      </button>

      <ShareModal
        palette={{
          id: 'temp',
          name: 'Shared Palette',
          colors,
          baseColor,
          harmonyRule,
          createdAt: Date.now(),
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
```

---

### 5.5 components/layout/Header.tsx (업데이트)

```tsx
// components/layout/Header.tsx
'use client'

import { useState } from 'react'
import { Palette, HelpCircle, History } from 'lucide-react'
import { HistorySidebar } from '@/components/history/HistorySidebar'
import { ShareButton } from '@/components/share/ShareButton'

export function Header() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <>
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
            <ShareButton />

            <button
              onClick={() => setIsHistoryOpen(true)}
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

      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  )
}
```

---

### 5.6 app/page.tsx (URL 파싱 추가)

```tsx
// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { InputPanel } from '@/components/layout/InputPanel'
import { PalettePanel } from '@/components/layout/PalettePanel'
import { PreviewPanel } from '@/components/layout/PreviewPanel'
import { usePaletteStore } from '@/store/usePaletteStore'
import { decodePaletteFromUrl } from '@/lib/share/url'

export default function HomePage() {
  const searchParams = useSearchParams()
  const { setBaseColor, setHarmonyRule, setColors } = usePaletteStore()

  // URL에서 팔레트 복원
  useEffect(() => {
    const queryString = searchParams.toString()

    if (queryString) {
      const palette = decodePaletteFromUrl(queryString)

      if (palette) {
        if (palette.baseColor) setBaseColor(palette.baseColor)
        if (palette.harmonyRule) setHarmonyRule(palette.harmonyRule)
        if (palette.colors) setColors(palette.colors)
      }
    }
  }, [searchParams, setBaseColor, setHarmonyRule, setColors])

  return (
    <div className="grid h-full grid-cols-1 gap-px bg-gray-200 md:grid-cols-2 lg:grid-cols-[320px_1fr_1fr]">
      <InputPanel />
      <PalettePanel />
      <PreviewPanel />
    </div>
  )
}
```

---

## 6. 테스트 체크리스트

### 6.1 URL 인코딩/디코딩
- [x] 팔레트 → URL 변환 확인
- [x] URL → 팔레트 변환 확인
- [x] 잠금 상태 유지 확인
- [x] 특수문자 처리 (#, %)

### 6.2 유효성 검증
- [x] 잘못된 HEX 색상 거부
- [x] 잘못된 Harmony 규칙 거부
- [x] 빈 Query String 처리

### 6.3 UI 테스트
- [x] Share 버튼 동작
- [x] Share 모달 열기/닫기
- [x] URL 복사 버튼 동작
- [x] 팔레트 미리보기 표시

### 6.4 URL 동기화
- [x] 페이지 로드 시 URL 파싱
- [x] 팔레트 복원 확인
- [x] 브라우저 뒤로가기 동작

---

## 7. 완료 조건

- [x] URL 인코딩/디코딩 정상 작동
- [x] Share 모달 UI 완성
- [x] URL 복사 기능 정상 작동
- [x] 팔레트 복원 기능 정상 작동
- [x] 모든 테스트 통과
- [x] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- Share 모달 화면
- URL 복사 완료 화면

---

## 9. 참고 문서

- [docs/2.Functional/07-Share-Feature.md](../2.Functional/07-Share-Feature.md)

---

**상태**: ✅ Done
**다음 단계**: 테스트 & 배포 (Task 09)
