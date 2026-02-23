# Task 04: 접근성 검증 기능

**상태**: ✅ Done
**우선순위**: P0
**예상 시간**: 14시간
**실제 시간**: 2시간
**담당자**: Frontend (정하은), Accessibility Specialist (김태영), UI/UX (박지훈)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

WCAG 2.1 AA/AAA 기준에 따라 색상 대비 비율을 검증하고, 접근성 문제를 자동으로 수정하는 기능 구현

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현
- [x] Task 02: 색상 입력 기능
- [x] Task 03: 팔레트 생성 기능

---

## 3. 개발 항목 체크리스트

### 3.1 WCAG 검증 로직 ✅
- [x] 대비 비율 계산 함수 (`lib/color/accessibility.ts`)
- [x] WCAG AA/AAA 레벨 검증
- [x] 자동 수정 제안 알고리즘
- [x] 색상 조합 검증 (모든 조합)

### 3.2 UI 컴포넌트 ✅
- [x] AccessibilityCheck 컴포넌트
- [x] ContrastRatio 표시
- [x] 경고/성공 인디케이터
- [x] WCAGBadge 컴포넌트

### 3.3 색맹 시뮬레이션 (Phase 3 - 선택) ⬜
- [ ] Protanopia (적색맹) - Phase 3 예정
- [ ] Deuteranopia (녹색맹) - Phase 3 예정
- [ ] Tritanopia (청색맹) - Phase 3 예정

### 3.4 Store 통합 ✅
- [x] 접근성 검증 결과 상태 관리 (useMemo로 최적화)
- [x] PalettePanel 통합

---

## 4. 파일 구조

```
lib/
└── color/
    ├── accessibility.ts      ← 생성 (WCAG 검증)
    └── colorblind.ts         ← 생성 (색맹 시뮬레이션, Phase 3)

components/
├── accessibility/
│   ├── AccessibilityCheck.tsx    ← 생성
│   ├── ContrastRatio.tsx          ← 생성
│   ├── WCAGBadge.tsx              ← 생성
│   └── ColorblindSimulator.tsx    ← 생성 (Phase 3)
│
└── layout/
    └── PalettePanel.tsx           ← 수정

store/
└── usePaletteStore.ts             ← 수정

types/
└── accessibility.ts               ← 수정
```

---

## 5. 구현 가이드

### 5.1 types/accessibility.ts (수정)

```tsx
// types/accessibility.ts
export type WCAGLevel = 'AAA' | 'AA' | 'Fail'

export interface ContrastCheck {
  ratio: number
  level: WCAGLevel
  passes: {
    AA: boolean
    AALarge: boolean
    AAA: boolean
    AAALarge: boolean
  }
}

export interface AccessibilityResult {
  foreground: string
  background: string
  contrastRatio: number
  wcagLevel: WCAGLevel
  passes: ContrastCheck['passes']
  suggestion?: string
}
```

---

### 5.2 lib/color/accessibility.ts

```tsx
// lib/color/accessibility.ts
import chroma from 'chroma-js'
import type { ContrastCheck, AccessibilityResult, WCAGLevel } from '@/types/accessibility'

/**
 * 상대 휘도 계산 (Relative Luminance)
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * 대비 비율 계산
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const [r1, g1, b1] = chroma(color1).rgb()
  const [r2, g2, b2] = chroma(color2).rgb()

  const l1 = getLuminance(r1, g1, b1)
  const l2 = getLuminance(r2, g2, b2)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * WCAG 레벨 판정
 */
export function checkContrast(foreground: string, background: string): ContrastCheck {
  const ratio = getContrastRatio(foreground, background)

  const passes = {
    AA: ratio >= 4.5,       // 일반 텍스트 (Normal Text)
    AALarge: ratio >= 3,    // 큰 텍스트 (Large Text 18pt+)
    AAA: ratio >= 7,        // 일반 텍스트 (Normal Text)
    AAALarge: ratio >= 4.5, // 큰 텍스트 (Large Text 18pt+)
  }

  let level: WCAGLevel = 'Fail'
  if (passes.AAA) level = 'AAA'
  else if (passes.AA) level = 'AA'

  return { ratio, level, passes }
}

/**
 * 접근성 검증
 */
export function checkAccessibility(
  foreground: string,
  background: string
): AccessibilityResult {
  const { ratio, level, passes } = checkContrast(foreground, background)

  let suggestion: string | undefined

  if (!passes.AA) {
    suggestion = `Contrast ratio is too low (${ratio.toFixed(2)}:1). ` +
      `Minimum is 4.5:1 for AA or 7:1 for AAA.`
  }

  return {
    foreground,
    background,
    contrastRatio: ratio,
    wcagLevel: level,
    passes,
    suggestion,
  }
}

/**
 * 자동 수정 (대비 비율 개선)
 */
export function fixContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): string {
  const bgLuminance = getLuminance(...chroma(background).rgb())
  const color = chroma(foreground)

  // 배경이 밝으면 전경을 어둡게, 어두우면 밝게
  let newColor = color
  let step = 0.1

  for (let i = 0; i < 50; i++) {
    const ratio = getContrastRatio(newColor.hex(), background)

    if (ratio >= targetRatio) {
      return newColor.hex()
    }

    newColor = bgLuminance > 0.5
      ? newColor.darken(step)
      : newColor.brighten(step)
  }

  // 실패 시 흑백 반환
  return bgLuminance > 0.5 ? '#000000' : '#FFFFFF'
}

/**
 * 모든 색상 조합 검증
 */
export function checkAllCombinations(colors: string[]): AccessibilityResult[] {
  const results: AccessibilityResult[] = []

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      results.push(checkAccessibility(colors[i], colors[j]))
    }
  }

  return results
}
```

---

### 5.3 components/accessibility/AccessibilityCheck.tsx

```tsx
// components/accessibility/AccessibilityCheck.tsx
'use client'

import { useMemo } from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { checkAllCombinations } from '@/lib/color/accessibility'
import { ContrastRatio } from './ContrastRatio'
import { WCAGBadge } from './WCAGBadge'

export function AccessibilityCheck() {
  const { colors } = usePaletteStore()

  const results = useMemo(() => {
    const hexColors = colors.map((c) => c.hex)
    return checkAllCombinations(hexColors)
  }, [colors])

  const passCount = results.filter((r) => r.wcagLevel !== 'Fail').length
  const totalCount = results.length

  const allPassing = passCount === totalCount

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className={`flex items-center gap-3 rounded-lg border p-4 ${
        allPassing
          ? 'border-green-200 bg-green-50'
          : 'border-yellow-200 bg-yellow-50'
      }`}>
        {allPassing ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <AlertCircle className="h-5 w-5 text-yellow-600" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {allPassing
              ? 'All color combinations pass WCAG AA!'
              : `${passCount} of ${totalCount} combinations pass WCAG AA`
            }
          </p>
          {!allPassing && (
            <p className="text-xs text-gray-600">
              Some color combinations may not be accessible
            </p>
          )}
        </div>
      </div>

      {/* Detailed Results */}
      <details className="rounded-lg border border-gray-200">
        <summary className="cursor-pointer p-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Info className="mr-2 inline-block h-4 w-4" />
          View all combinations ({results.length})
        </summary>

        <div className="divide-y divide-gray-100 border-t border-gray-200">
          {results.map((result, index) => (
            <div key={index} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded border border-gray-300"
                    style={{ backgroundColor: result.foreground }}
                  />
                  <span className="text-xs font-mono text-gray-600">
                    {result.foreground}
                  </span>
                  <span className="text-gray-400">+</span>
                  <div
                    className="h-6 w-6 rounded border border-gray-300"
                    style={{ backgroundColor: result.background }}
                  />
                  <span className="text-xs font-mono text-gray-600">
                    {result.background}
                  </span>
                </div>

                <WCAGBadge level={result.wcagLevel} />
              </div>

              <ContrastRatio ratio={result.contrastRatio} passes={result.passes} />

              {result.suggestion && (
                <p className="mt-2 text-xs text-yellow-600">
                  {result.suggestion}
                </p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
```

---

### 5.4 components/accessibility/ContrastRatio.tsx

```tsx
// components/accessibility/ContrastRatio.tsx
import type { ContrastCheck } from '@/types/accessibility'

interface ContrastRatioProps {
  ratio: number
  passes: ContrastCheck['passes']
}

export function ContrastRatio({ ratio, passes }: ContrastRatioProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-700">
        Contrast Ratio: <span className="font-mono">{ratio.toFixed(2)}:1</span>
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={passes.AA ? 'text-green-600' : 'text-gray-400'}>
          {passes.AA ? '✓' : '✗'} AA Normal ({'>'}4.5:1)
        </div>
        <div className={passes.AALarge ? 'text-green-600' : 'text-gray-400'}>
          {passes.AALarge ? '✓' : '✗'} AA Large ({'>'}3:1)
        </div>
        <div className={passes.AAA ? 'text-green-600' : 'text-gray-400'}>
          {passes.AAA ? '✓' : '✗'} AAA Normal ({'>'}7:1)
        </div>
        <div className={passes.AAALarge ? 'text-green-600' : 'text-gray-400'}>
          {passes.AAALarge ? '✓' : '✗'} AAA Large ({'>'}4.5:1)
        </div>
      </div>
    </div>
  )
}
```

---

### 5.5 components/accessibility/WCAGBadge.tsx

```tsx
// components/accessibility/WCAGBadge.tsx
import type { WCAGLevel } from '@/types/accessibility'

interface WCAGBadgeProps {
  level: WCAGLevel
}

export function WCAGBadge({ level }: WCAGBadgeProps) {
  const styles = {
    AAA: 'bg-green-100 text-green-800 border-green-200',
    AA: 'bg-blue-100 text-blue-800 border-blue-200',
    Fail: 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[level]}`}
    >
      {level === 'Fail' ? 'Failed' : `WCAG ${level}`}
    </span>
  )
}
```

---

### 5.6 components/layout/PalettePanel.tsx (업데이트)

```tsx
// components/layout/PalettePanel.tsx
import { PaletteDisplay } from '@/components/palette/PaletteDisplay'
import { AccessibilityCheck } from '@/components/accessibility/AccessibilityCheck'

export function PalettePanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Color Palette
      </h2>

      <PaletteDisplay />

      {/* Accessibility Check */}
      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          Accessibility Check
        </h3>
        <AccessibilityCheck />
      </div>
    </div>
  )
}
```

---

## 6. 테스트 체크리스트

### 6.1 대비 비율 계산
- [x] 흰색 vs 검정색 (21:1)
- [x] 파란색 vs 흰색 대비 확인
- [x] 유사 색상 조합 (낮은 대비)
- [x] 경계값 테스트 (4.5:1, 3:1, 7:1)

### 6.2 WCAG 검증
- [x] AA 레벨 검증
- [x] AAA 레벨 검증
- [x] Large Text vs Normal Text 차이
- [x] 모든 조합 검증

### 6.3 UI 테스트
- [x] 접근성 요약 표시 (Pass/Fail)
- [x] 상세 결과 확장/축소
- [x] 색상 조합별 대비 비율 표시
- [x] WCAG 배지 표시

### 6.4 자동 수정 (구현 완료)
- [x] fixContrast 함수 동작 확인
- [x] 수정 제안 메시지
- [ ] [Fix] 버튼 UI (Phase 2 예정)

---

## 7. 완료 조건

- [x] WCAG 대비 비율 계산 정확도 100%
- [x] 모든 색상 조합 검증 완료
- [x] 접근성 요약 UI 완성
- [x] 상세 결과 UI 완성
- [x] WCAG 배지 표시
- [x] 반응형 레이아웃
- [x] 모든 테스트 통과
- [x] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- 접근성 검사 통과 화면
- 접근성 검사 실패 화면
- 상세 결과 확장 화면

---

## 9. 참고 문서

- [docs/2.Functional/03-Accessibility-Feature.md](../2.Functional/03-Accessibility-Feature.md)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**상태**: ✅ Done
**다음 단계**: UI 미리보기 기능 (Task 05)
