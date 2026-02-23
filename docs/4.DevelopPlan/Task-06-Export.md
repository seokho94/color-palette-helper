# Task 06: 코드 내보내기 기능

**상태**: ✅ Done
**우선순위**: P0
**예상 시간**: 10시간
**실제 시간**: 1시간
**담당자**: Frontend (정하은)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

생성된 팔레트를 7가지 포맷(HEX, RGB, HSL, CSS Variables, SCSS, Tailwind, JSON)으로 내보내기 기능 구현

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현
- [x] Task 02: 색상 입력 기능
- [x] Task 03: 팔레트 생성 기능

---

## 3. 개발 항목 체크리스트

### 3.1 코드 생성 로직 ✅
- [x] HEX 포맷 생성
- [x] RGB 포맷 생성
- [x] HSL 포맷 생성
- [x] CSS Variables 생성
- [x] SCSS Variables 생성
- [x] Tailwind Config 생성
- [x] JSON 생성

### 3.2 UI 컴포넌트 ✅
- [x] ExportFormatSelector 컴포넌트
- [x] CodeBlock 컴포넌트
- [x] CopyButton 컴포넌트
- [x] ExportPanel 컴포넌트 (다운로드 포함)

### 3.3 유틸리티 ✅
- [x] Clipboard API 통합
- [x] 파일 다운로드 기능
- [ ] Syntax Highlighting (Phase 2 예정)

---

## 4. 파일 구조

```
lib/
└── export/
    ├── formatters.ts         ← 생성 (포맷 변환)
    ├── css.ts                ← 생성 (CSS 생성)
    ├── scss.ts               ← 생성 (SCSS 생성)
    ├── tailwind.ts           ← 생성 (Tailwind 생성)
    └── json.ts               ← 생성 (JSON 생성)

components/
├── export/
│   ├── ExportFormatSelector.tsx  ← 생성
│   ├── CodeBlock.tsx             ← 생성
│   ├── CopyButton.tsx            ← 생성
│   └── ExportPanel.tsx           ← 생성
│
└── layout/
    └── PalettePanel.tsx          ← 수정

types/
└── export.ts                     ← 생성
```

---

## 5. 구현 가이드

### 5.1 types/export.ts

```tsx
// types/export.ts
export type ExportFormat =
  | 'hex'
  | 'rgb'
  | 'hsl'
  | 'css'
  | 'scss'
  | 'tailwind'
  | 'json'

export interface ExportOption {
  value: ExportFormat
  label: string
  description: string
  fileExtension: string
}
```

---

### 5.2 lib/export/formatters.ts

```tsx
// lib/export/formatters.ts
import type { Color } from '@/types/color'

/**
 * HEX 포맷
 */
export function formatHex(colors: Color[]): string {
  return colors.map((c, i) => `Color ${i + 1}: ${c.hex}`).join('\n')
}

/**
 * RGB 포맷
 */
export function formatRgb(colors: Color[]): string {
  return colors
    .map((c, i) => {
      const [r, g, b] = c.rgb.map((v) => Math.round(v))
      return `Color ${i + 1}: rgb(${r}, ${g}, ${b})`
    })
    .join('\n')
}

/**
 * HSL 포맷
 */
export function formatHsl(colors: Color[]): string {
  return colors
    .map((c, i) => {
      const [h, s, l] = c.hsl
      const hRound = Math.round(h)
      const sPercent = Math.round(s * 100)
      const lPercent = Math.round(l * 100)
      return `Color ${i + 1}: hsl(${hRound}, ${sPercent}%, ${lPercent}%)`
    })
    .join('\n')
}
```

---

### 5.3 lib/export/css.ts

```tsx
// lib/export/css.ts
import type { Color } from '@/types/color'

/**
 * CSS Variables 생성
 */
export function generateCssVariables(colors: Color[]): string {
  const variables = colors
    .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
    .join('\n')

  return `:root {\n${variables}\n}`
}

/**
 * CSS 클래스 생성
 */
export function generateCssClasses(colors: Color[]): string {
  const classes = colors
    .map((c, i) => {
      return `.bg-color-${i + 1} {\n  background-color: ${c.hex};\n}\n\n.text-color-${i + 1} {\n  color: ${c.hex};\n}`
    })
    .join('\n\n')

  return classes
}
```

---

### 5.4 lib/export/scss.ts

```tsx
// lib/export/scss.ts
import type { Color } from '@/types/color'

/**
 * SCSS Variables 생성
 */
export function generateScssVariables(colors: Color[]): string {
  const variables = colors
    .map((c, i) => `$color-${i + 1}: ${c.hex};`)
    .join('\n')

  return `// Color Palette\n${variables}`
}

/**
 * SCSS Map 생성
 */
export function generateScssMap(colors: Color[]): string {
  const entries = colors
    .map((c, i) => `  'color-${i + 1}': ${c.hex}`)
    .join(',\n')

  return `$colors: (\n${entries}\n);`
}
```

---

### 5.5 lib/export/tailwind.ts

```tsx
// lib/export/tailwind.ts
import type { Color } from '@/types/color'

/**
 * Tailwind Config 생성
 */
export function generateTailwindConfig(colors: Color[]): string {
  const colorEntries = colors
    .map((c, i) => `        'custom-${i + 1}': '${c.hex}'`)
    .join(',\n')

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
${colorEntries}
      }
    }
  }
}`
}
```

---

### 5.6 lib/export/json.ts

```tsx
// lib/export/json.ts
import type { Color, Palette } from '@/types/color'

/**
 * JSON 생성 (간단)
 */
export function generateJsonSimple(colors: Color[]): string {
  const palette = colors.map((c, i) => ({
    id: i + 1,
    hex: c.hex,
    rgb: c.rgb.map((v) => Math.round(v)),
    hsl: c.hsl.map((v, idx) => (idx === 0 ? Math.round(v) : Math.round(v * 100))),
  }))

  return JSON.stringify(palette, null, 2)
}

/**
 * JSON 생성 (전체 팔레트 정보)
 */
export function generateJsonFull(palette: Palette): string {
  return JSON.stringify(palette, null, 2)
}
```

---

### 5.7 components/export/CodeBlock.tsx

```tsx
// components/export/CodeBlock.tsx
'use client'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
      <code className="text-sm font-mono text-gray-800">{code}</code>
    </pre>
  )
}
```

---

### 5.8 components/export/CopyButton.tsx

```tsx
// components/export/CopyButton.tsx
'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Code
        </>
      )}
    </button>
  )
}
```

---

### 5.9 components/export/ExportFormatSelector.tsx

```tsx
// components/export/ExportFormatSelector.tsx
'use client'

import type { ExportFormat, ExportOption } from '@/types/export'

const EXPORT_OPTIONS: ExportOption[] = [
  { value: 'hex', label: 'HEX', description: 'Plain HEX values', fileExtension: 'txt' },
  { value: 'rgb', label: 'RGB', description: 'RGB format', fileExtension: 'txt' },
  { value: 'hsl', label: 'HSL', description: 'HSL format', fileExtension: 'txt' },
  { value: 'css', label: 'CSS Variables', description: 'CSS custom properties', fileExtension: 'css' },
  { value: 'scss', label: 'SCSS', description: 'SCSS variables', fileExtension: 'scss' },
  { value: 'tailwind', label: 'Tailwind', description: 'Tailwind config', fileExtension: 'js' },
  { value: 'json', label: 'JSON', description: 'JSON format', fileExtension: 'json' },
]

interface ExportFormatSelectorProps {
  value: ExportFormat
  onChange: (format: ExportFormat) => void
}

export function ExportFormatSelector({ value, onChange }: ExportFormatSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Export Format</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ExportFormat)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {EXPORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500">
        {EXPORT_OPTIONS.find((o) => o.value === value)?.description}
      </p>
    </div>
  )
}
```

---

### 5.10 components/export/ExportPanel.tsx

```tsx
// components/export/ExportPanel.tsx
'use client'

import { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import type { ExportFormat } from '@/types/export'
import { formatHex, formatRgb, formatHsl } from '@/lib/export/formatters'
import { generateCssVariables } from '@/lib/export/css'
import { generateScssVariables } from '@/lib/export/scss'
import { generateTailwindConfig } from '@/lib/export/tailwind'
import { generateJsonSimple } from '@/lib/export/json'
import { ExportFormatSelector } from './ExportFormatSelector'
import { CodeBlock } from './CodeBlock'
import { CopyButton } from './CopyButton'

export function ExportPanel() {
  const { colors } = usePaletteStore()
  const [format, setFormat] = useState<ExportFormat>('hex')

  const code = useMemo(() => {
    if (colors.length === 0) return ''

    switch (format) {
      case 'hex':
        return formatHex(colors)
      case 'rgb':
        return formatRgb(colors)
      case 'hsl':
        return formatHsl(colors)
      case 'css':
        return generateCssVariables(colors)
      case 'scss':
        return generateScssVariables(colors)
      case 'tailwind':
        return generateTailwindConfig(colors)
      case 'json':
        return generateJsonSimple(colors)
      default:
        return ''
    }
  }, [colors, format])

  const handleDownload = () => {
    const extensions: Record<ExportFormat, string> = {
      hex: 'txt',
      rgb: 'txt',
      hsl: 'txt',
      css: 'css',
      scss: 'scss',
      tailwind: 'js',
      json: 'json',
    }

    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `palette.${extensions[format]}`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (colors.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Generate a palette first to export
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <ExportFormatSelector value={format} onChange={setFormat} />

      <CodeBlock code={code} language={format} />

      <div className="flex gap-2">
        <CopyButton text={code} />

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
    </div>
  )
}
```

---

### 5.11 components/layout/PalettePanel.tsx (업데이트)

```tsx
// components/layout/PalettePanel.tsx
import { PaletteDisplay } from '@/components/palette/PaletteDisplay'
import { AccessibilityCheck } from '@/components/accessibility/AccessibilityCheck'
import { ExportPanel } from '@/components/export/ExportPanel'

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

      {/* Export */}
      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          Export Code
        </h3>
        <ExportPanel />
      </div>
    </div>
  )
}
```

---

## 6. 테스트 체크리스트

### 6.1 포맷 생성
- [x] HEX 포맷 정확도
- [x] RGB 포맷 정확도
- [x] HSL 포맷 정확도
- [x] CSS Variables 문법 확인
- [x] SCSS Variables 문법 확인
- [x] Tailwind Config 문법 확인
- [x] JSON 유효성 검증

### 6.2 UI 테스트
- [x] 포맷 선택 드롭다운
- [x] 코드 블록 표시
- [x] Copy 버튼 동작
- [x] Download 버튼 동작
- [x] 파일 확장자 정확도

### 6.3 Clipboard 테스트
- [x] 클립보드 복사 성공
- [x] 복사 완료 피드백 표시
- [x] 2초 후 버튼 리셋

---

## 7. 완료 조건

- [x] 7가지 포맷 모두 정상 생성
- [x] Copy to Clipboard 기능 정상 작동
- [x] 파일 다운로드 기능 정상 작동
- [x] 코드 블록 정상 표시
- [x] 포맷 선택 UI 완성
- [x] 모든 테스트 통과
- [x] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- 각 포맷별 코드 블록 (7개)
- Copy/Download 버튼 동작 화면

---

## 9. 참고 문서

- [docs/2.Functional/05-Export-Feature.md](../2.Functional/05-Export-Feature.md)
- [docs/3.Wireframe/05-Export-Panel.md](../3.Wireframe/05-Export-Panel.md)

---

**상태**: ✅ Done
**다음 단계**: 히스토리 & 즐겨찾기 (Task 07)
