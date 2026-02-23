# Task 03: 팔레트 생성 기능

**상태**: ✅ Done
**우선순위**: P0
**예상 시간**: 16시간
**실제 시간**: 2시간
**담당자**: Frontend (정하은)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

색상 조화 이론을 기반으로 한 6가지 Harmony 규칙을 구현하여 기준 색상으로부터 조화로운 팔레트를 자동 생성

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현
- [x] Task 02: 색상 입력 기능

---

## 3. 개발 항목 체크리스트

### 3.1 Harmony 알고리즘 구현 ✅
- [x] 보색 (Complementary)
- [x] 유사색 (Analogous)
- [x] 삼색 (Triadic)
- [x] 분할 보색 (Split-Complementary)
- [x] 사색 (Tetradic / Double-Complementary)
- [x] 모노크롬 (Monochromatic)

### 3.2 색상 생성 유틸리티 ✅
- [x] `lib/color/harmony.ts` 생성
- [x] 각 Harmony 규칙 함수 구현
- [x] Shade/Tint 생성 함수
- [x] 채도/명도 조정 함수

### 3.3 UI 컴포넌트 ✅
- [x] HarmonySelector 컴포넌트 (`components/palette/HarmonySelector.tsx`)
- [x] ColorCard 컴포넌트 (`components/palette/ColorCard.tsx`)
- [x] PaletteDisplay 컴포넌트 (`components/palette/PaletteDisplay.tsx`)
- [x] 랜덤 재생성 버튼

### 3.4 Store 업데이트 ✅
- [x] usePaletteStore에 colors 상태 추가
- [x] generatePalette 액션 구현
- [x] toggleLock 액션 구현
- [x] randomize 액션 구현

---

## 4. 파일 구조

```
lib/
└── color/
    ├── harmony.ts            ← 생성 (Harmony 알고리즘)
    └── utils.ts              ← 생성 (색상 유틸리티)

components/
├── palette/
│   ├── HarmonySelector.tsx   ← 생성
│   ├── ColorCard.tsx         ← 생성
│   ├── PaletteDisplay.tsx    ← 생성
│   └── LockButton.tsx        ← 생성
│
└── layout/
    └── PalettePanel.tsx      ← 수정

store/
└── usePaletteStore.ts        ← 수정 (generatePalette 추가)

types/
└── color.ts                  ← 수정 (HarmonyRule 타입 추가)
```

---

## 5. 구현 가이드

### 5.1 types/color.ts (수정)

```tsx
// types/color.ts
export type HarmonyRule =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic'

export interface Color {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  name?: string
  role?: 'primary' | 'secondary' | 'accent' | 'background' | 'text'
  locked?: boolean
}

export interface Palette {
  id: string
  name: string
  colors: Color[]
  harmonyRule: HarmonyRule
  baseColor: string
  createdAt: number
  favorite?: boolean
}
```

---

### 5.2 lib/color/harmony.ts

```tsx
// lib/color/harmony.ts
import chroma from 'chroma-js'

/**
 * 보색 (Complementary)
 * 색상환에서 정반대 위치 (180°)
 */
export function generateComplementary(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')

  const complementary = chroma.hsl((hue + 180) % 360, base.get('hsl.s'), base.get('hsl.l'))

  return [
    base.hex(),
    complementary.hex(),
    base.brighten(1).hex(),
    base.darken(1).hex(),
    complementary.brighten(1).hex(),
    complementary.darken(1).hex(),
  ]
}

/**
 * 유사색 (Analogous)
 * 색상환에서 인접한 색 (±30°)
 */
export function generateAnalogous(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  return [
    chroma.hsl((hue - 30 + 360) % 360, sat, light).hex(),
    base.hex(),
    chroma.hsl((hue + 30) % 360, sat, light).hex(),
    chroma.hsl((hue - 30 + 360) % 360, sat, Math.max(0, light - 0.1)).hex(),
    chroma.hsl(hue, sat, Math.min(1, light + 0.1)).hex(),
    chroma.hsl((hue + 30) % 360, sat, Math.max(0, light - 0.1)).hex(),
  ]
}

/**
 * 삼색 (Triadic)
 * 색상환에서 정삼각형 (120°)
 */
export function generateTriadic(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  const color1 = chroma.hsl(hue, sat, light)
  const color2 = chroma.hsl((hue + 120) % 360, sat, light)
  const color3 = chroma.hsl((hue + 240) % 360, sat, light)

  return [
    color1.hex(),
    color2.hex(),
    color3.hex(),
    color1.brighten(0.5).hex(),
    color2.brighten(0.5).hex(),
    color3.brighten(0.5).hex(),
  ]
}

/**
 * 분할 보색 (Split-Complementary)
 * 보색의 양옆 (180° ± 30°)
 */
export function generateSplitComplementary(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  const split1 = chroma.hsl((hue + 150) % 360, sat, light)
  const split2 = chroma.hsl((hue + 210) % 360, sat, light)

  return [
    base.hex(),
    split1.hex(),
    split2.hex(),
    base.brighten(0.5).hex(),
    split1.darken(0.5).hex(),
    split2.darken(0.5).hex(),
  ]
}

/**
 * 사색 (Tetradic / Double-Complementary)
 * 색상환에서 정사각형 (90°)
 */
export function generateTetradic(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  return [
    chroma.hsl(hue, sat, light).hex(),
    chroma.hsl((hue + 90) % 360, sat, light).hex(),
    chroma.hsl((hue + 180) % 360, sat, light).hex(),
    chroma.hsl((hue + 270) % 360, sat, light).hex(),
    chroma.hsl(hue, sat, Math.min(1, light + 0.1)).hex(),
    chroma.hsl((hue + 180) % 360, sat, Math.max(0, light - 0.1)).hex(),
  ]
}

/**
 * 모노크롬 (Monochromatic)
 * 같은 색상의 다양한 명도/채도
 */
export function generateMonochromatic(baseColor: string): string[] {
  const base = chroma(baseColor)

  return [
    base.brighten(2).hex(),
    base.brighten(1).hex(),
    base.hex(),
    base.darken(1).hex(),
    base.darken(2).hex(),
    base.desaturate(1).hex(),
  ]
}

/**
 * Harmony 규칙에 따른 팔레트 생성
 */
export function generatePalette(baseColor: string, rule: HarmonyRule): string[] {
  switch (rule) {
    case 'complementary':
      return generateComplementary(baseColor)
    case 'analogous':
      return generateAnalogous(baseColor)
    case 'triadic':
      return generateTriadic(baseColor)
    case 'split-complementary':
      return generateSplitComplementary(baseColor)
    case 'tetradic':
      return generateTetradic(baseColor)
    case 'monochromatic':
      return generateMonochromatic(baseColor)
    default:
      return [baseColor]
  }
}
```

---

### 5.3 lib/color/utils.ts

```tsx
// lib/color/utils.ts
import chroma from 'chroma-js'
import type { Color } from '@/types/color'

/**
 * HEX 색상을 Color 객체로 변환
 */
export function hexToColor(hex: string): Color {
  const color = chroma(hex)

  return {
    hex: color.hex(),
    rgb: color.rgb() as [number, number, number],
    hsl: color.hsl() as [number, number, number],
  }
}

/**
 * 색상 배열을 Color 객체 배열로 변환
 */
export function hexArrayToColors(hexArray: string[]): Color[] {
  return hexArray.map(hexToColor)
}

/**
 * 랜덤 색상 생성
 */
export function randomColor(): string {
  return chroma.random().hex()
}

/**
 * 색상 밝기 조정
 */
export function adjustBrightness(color: string, amount: number): string {
  return chroma(color).brighten(amount).hex()
}

/**
 * 색상 채도 조정
 */
export function adjustSaturation(color: string, amount: number): string {
  return chroma(color).saturate(amount).hex()
}

/**
 * 색상 이름 추출 (가장 가까운 CSS 색상)
 */
export function getColorName(hex: string): string {
  // 간단한 구현 (실제로는 color-name 라이브러리 사용 가능)
  const color = chroma(hex)
  const hue = color.get('hsl.h')

  if (hue >= 0 && hue < 30) return 'Red'
  if (hue >= 30 && hue < 60) return 'Orange'
  if (hue >= 60 && hue < 90) return 'Yellow'
  if (hue >= 90 && hue < 150) return 'Green'
  if (hue >= 150 && hue < 210) return 'Cyan'
  if (hue >= 210 && hue < 270) return 'Blue'
  if (hue >= 270 && hue < 330) return 'Purple'
  return 'Pink'
}
```

---

### 5.4 store/usePaletteStore.ts (업데이트)

```tsx
// store/usePaletteStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Color, HarmonyRule } from '@/types/color'
import { generatePalette } from '@/lib/color/harmony'
import { hexArrayToColors, randomColor } from '@/lib/color/utils'

interface PaletteState {
  baseColor: string
  colors: Color[]
  harmonyRule: HarmonyRule

  setBaseColor: (color: string) => void
  setHarmonyRule: (rule: HarmonyRule) => void
  generateColors: () => void
  toggleLock: (index: number) => void
  randomize: () => void
}

export const usePaletteStore = create<PaletteState>()(
  persist(
    (set, get) => ({
      baseColor: '#3B82F6',
      colors: [],
      harmonyRule: 'complementary',

      setBaseColor: (color) => {
        set({ baseColor: color })
        get().generateColors()
      },

      setHarmonyRule: (rule) => {
        set({ harmonyRule: rule })
        get().generateColors()
      },

      generateColors: () => {
        const { baseColor, harmonyRule, colors } = get()
        const hexArray = generatePalette(baseColor, harmonyRule)
        const newColors = hexArrayToColors(hexArray)

        // 잠긴 색상은 유지
        const mergedColors = newColors.map((color, i) => {
          if (colors[i]?.locked) {
            return colors[i]
          }
          return color
        })

        set({ colors: mergedColors })
      },

      toggleLock: (index) =>
        set((state) => ({
          colors: state.colors.map((c, i) =>
            i === index ? { ...c, locked: !c.locked } : c
          ),
        })),

      randomize: () => {
        const { harmonyRule, colors } = get()
        const newBaseColor = randomColor()
        const hexArray = generatePalette(newBaseColor, harmonyRule)
        const newColors = hexArrayToColors(hexArray)

        // 잠긴 색상은 유지
        const mergedColors = newColors.map((color, i) => {
          if (colors[i]?.locked) {
            return colors[i]
          }
          return color
        })

        set({ baseColor: newBaseColor, colors: mergedColors })
      },
    }),
    {
      name: 'palette-storage',
    }
  )
)
```

---

### 5.5 components/palette/HarmonySelector.tsx

```tsx
// components/palette/HarmonySelector.tsx
'use client'

import type { HarmonyRule } from '@/types/color'
import { usePaletteStore } from '@/store/usePaletteStore'

const HARMONY_OPTIONS: { value: HarmonyRule; label: string; description: string }[] = [
  {
    value: 'complementary',
    label: 'Complementary',
    description: 'Opposite colors (180°)',
  },
  {
    value: 'analogous',
    label: 'Analogous',
    description: 'Adjacent colors (±30°)',
  },
  {
    value: 'triadic',
    label: 'Triadic',
    description: 'Evenly spaced (120°)',
  },
  {
    value: 'split-complementary',
    label: 'Split-Complementary',
    description: 'Complement + neighbors',
  },
  {
    value: 'tetradic',
    label: 'Tetradic',
    description: 'Double complementary',
  },
  {
    value: 'monochromatic',
    label: 'Monochromatic',
    description: 'Single hue variations',
  },
]

export function HarmonySelector() {
  const { harmonyRule, setHarmonyRule } = usePaletteStore()

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Harmony Rule
      </label>

      <select
        value={harmonyRule}
        onChange={(e) => setHarmonyRule(e.target.value as HarmonyRule)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {HARMONY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500">
        {HARMONY_OPTIONS.find((o) => o.value === harmonyRule)?.description}
      </p>
    </div>
  )
}
```

---

### 5.6 components/palette/ColorCard.tsx

```tsx
// components/palette/ColorCard.tsx
'use client'

import { useState } from 'react'
import { Lock, Unlock, Copy, Check } from 'lucide-react'
import chroma from 'chroma-js'
import type { Color } from '@/types/color'

interface ColorCardProps {
  color: Color
  index: number
  onToggleLock: (index: number) => void
}

export function ColorCard({ color, index, onToggleLock }: ColorCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Contrast text color
  const textColor = chroma.contrast(color.hex, '#FFFFFF') > 4.5 ? '#FFFFFF' : '#000000'

  return (
    <div
      className="group relative flex h-32 flex-col items-center justify-center rounded-lg border border-gray-200 transition-all hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: color.hex }}
    >
      {/* Lock Button */}
      <button
        onClick={() => onToggleLock(index)}
        className="absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition-opacity hover:bg-black/10 group-hover:opacity-100"
        style={{ color: textColor }}
      >
        {color.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
      </button>

      {/* Color Info */}
      <div className="text-center" style={{ color: textColor }}>
        <p className="mb-1 font-mono text-sm font-semibold">{color.hex}</p>
        <p className="text-xs opacity-80">
          RGB({color.rgb.map((v) => Math.round(v)).join(', ')})
        </p>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-medium opacity-0 transition-all hover:bg-black/10 group-hover:opacity-100"
        style={{ color: textColor }}
      >
        {copied ? (
          <>
            <Check className="mr-1 inline-block h-3 w-3" />
            Copied
          </>
        ) : (
          <>
            <Copy className="mr-1 inline-block h-3 w-3" />
            Copy
          </>
        )}
      </button>
    </div>
  )
}
```

---

### 5.7 components/palette/PaletteDisplay.tsx

```tsx
// components/palette/PaletteDisplay.tsx
'use client'

import { useEffect } from 'react'
import { Shuffle } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { ColorCard } from './ColorCard'
import { HarmonySelector } from './HarmonySelector'

export function PaletteDisplay() {
  const { colors, generateColors, toggleLock, randomize } = usePaletteStore()

  // 초기 로드 시 팔레트 생성
  useEffect(() => {
    if (colors.length === 0) {
      generateColors()
    }
  }, [colors.length, generateColors])

  return (
    <div className="space-y-6">
      {/* Harmony Selector */}
      <HarmonySelector />

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {colors.map((color, index) => (
          <ColorCard
            key={`${color.hex}-${index}`}
            color={color}
            index={index}
            onToggleLock={toggleLock}
          />
        ))}
      </div>

      {/* Randomize Button */}
      <button
        onClick={randomize}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Shuffle className="h-5 w-5" />
        Randomize Palette
      </button>
    </div>
  )
}
```

---

### 5.8 components/layout/PalettePanel.tsx (업데이트)

```tsx
// components/layout/PalettePanel.tsx
import { PaletteDisplay } from '@/components/palette/PaletteDisplay'

export function PalettePanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Color Palette
      </h2>

      <PaletteDisplay />
    </div>
  )
}
```

---

## 6. 테스트 체크리스트

### 6.1 Harmony 알고리즘 테스트
- [x] Complementary: 보색 생성 확인
- [x] Analogous: 유사색 생성 확인
- [x] Triadic: 삼색 생성 확인
- [x] Split-Complementary: 분할 보색 생성 확인
- [x] Tetradic: 사색 생성 확인
- [x] Monochromatic: 모노크롬 생성 확인

### 6.2 UI 테스트
- [x] Harmony 선택 시 팔레트 업데이트
- [x] 색상 카드 hover 효과
- [x] Lock 버튼 동작 (잠긴 색상 유지)
- [x] Copy 버튼으로 HEX 복사
- [x] Randomize 버튼 (잠금 해제된 색상만 변경)

### 6.3 Store 테스트
- [x] baseColor 변경 시 팔레트 재생성
- [x] harmonyRule 변경 시 팔레트 재생성
- [x] toggleLock 동작 확인
- [x] randomize 시 잠긴 색상 유지
- [x] LocalStorage 저장/복원

---

## 7. 완료 조건

- [x] 6가지 Harmony 규칙 모두 정상 작동
- [x] 색상 잠금 기능 정상 작동
- [x] 랜덤 재생성 기능 정상 작동
- [x] Copy to Clipboard 기능 정상 작동
- [x] 반응형 그리드 레이아웃
- [x] 색상 대비에 따른 텍스트 색상 자동 조정
- [x] 모든 테스트 통과
- [x] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- 각 Harmony 규칙별 팔레트 예시 (6개)
- Lock 기능 동작 화면
- Randomize 동작 화면

---

## 9. 참고 문서

- [docs/2.Functional/02-Palette-Generation-Feature.md](../2.Functional/02-Palette-Generation-Feature.md)
- [docs/3.Wireframe/03-Palette-Panel.md](../3.Wireframe/03-Palette-Panel.md)
- [Adobe Color Wheel](https://color.adobe.com/)
- [Coolors.co Harmony](https://coolors.co/)

---

**상태**: ✅ Done
**다음 단계**: 접근성 검증 기능 (Task 04)
