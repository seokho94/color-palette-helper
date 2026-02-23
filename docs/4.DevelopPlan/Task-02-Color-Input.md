# Task 02: 색상 입력 기능

**상태**: ✅ Done
**우선순위**: P0
**예상 시간**: 12시간
**실제 시간**: 2시간
**담당자**: Frontend (정하은)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

Color Picker 컴포넌트와 이미지 업로드 기능을 구현하여 사용자가 다양한 방법으로 기준 색상을 입력할 수 있도록 구현

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현

---

## 3. 개발 항목 체크리스트

### 3.1 Color Picker 통합 ✅
- [x] react-colorful 통합
- [x] ColorPicker 컴포넌트 생성 (`components/color/ColorPicker.tsx`)
- [x] HEX/RGB/HSL 입력 폼 구현
- [x] 색상 유효성 검증 로직
- [x] Debounce 적용 (500ms)

### 3.2 이미지 업로드 ✅
- [x] 드래그 앤 드롭 UI (`components/color/ImageUpload.tsx`)
- [x] 파일 검증 (크기: 5MB, 포맷: JPG/PNG/WebP)
- [x] color-thief 라이브러리 통합
- [x] 색상 추출 로직 구현
- [x] 추출된 색상 표시 UI

### 3.3 Zustand Store 구성 ✅
- [x] usePaletteStore 생성 (`store/usePaletteStore.ts`)
- [x] baseColor 상태 관리
- [x] setBaseColor 액션 구현

### 3.4 에러 처리 & UI 피드백 ✅
- [x] 에러 메시지 표시 (ImageUpload, ColorInput)
- [x] 로딩 상태 처리 (ImageUpload)

---

## 4. 파일 구조

```
components/
├── color/
│   ├── ColorPicker.tsx       ← 생성 (Color Picker 메인)
│   ├── ColorInput.tsx        ← 생성 (HEX/RGB/HSL 입력)
│   ├── ImageUpload.tsx       ← 생성 (이미지 업로드)
│   └── ExtractedColors.tsx   ← 생성 (추출된 색상 표시)
│
├── ui/
│   └── Toast.tsx             ← 생성 (토스트 알림)
│
└── layout/
    └── InputPanel.tsx        ← 수정 (ColorPicker 통합)

store/
└── usePaletteStore.ts        ← 생성 (Zustand Store)

lib/
└── color/
    ├── validators.ts         ← 생성 (색상 유효성 검증)
    └── extractors.ts         ← 생성 (이미지 색상 추출)

constants/
└── config.ts                 ← 수정 (이미지 설정 추가)
```

---

## 5. 구현 가이드

### 5.1 usePaletteStore.ts

```tsx
// store/usePaletteStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Color {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  locked?: boolean
}

interface PaletteState {
  baseColor: string
  colors: Color[]
  harmonyRule: string

  setBaseColor: (color: string) => void
  setColors: (colors: Color[]) => void
  setHarmonyRule: (rule: string) => void
  toggleLock: (index: number) => void
  randomize: () => void
}

export const usePaletteStore = create<PaletteState>()(
  persist(
    (set) => ({
      baseColor: '#3B82F6',
      colors: [],
      harmonyRule: 'complementary',

      setBaseColor: (color) => set({ baseColor: color }),
      setColors: (colors) => set({ colors }),
      setHarmonyRule: (rule) => set({ harmonyRule: rule }),

      toggleLock: (index) =>
        set((state) => ({
          colors: state.colors.map((c, i) =>
            i === index ? { ...c, locked: !c.locked } : c
          ),
        })),

      randomize: () => {
        // TODO: Task 03에서 구현
      },
    }),
    {
      name: 'palette-storage',
    }
  )
)
```

---

### 5.2 ColorPicker.tsx

```tsx
// components/color/ColorPicker.tsx
'use client'

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import chroma from 'chroma-js'
import { usePaletteStore } from '@/store/usePaletteStore'
import { debounce } from '@/lib/utils'

export function ColorPicker() {
  const { baseColor, setBaseColor } = usePaletteStore()
  const [localColor, setLocalColor] = useState(baseColor)

  // Debounce store update
  useEffect(() => {
    const updateStore = debounce((color: string) => {
      setBaseColor(color)
    }, 500)

    updateStore(localColor)
  }, [localColor, setBaseColor])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-lg border border-gray-200 p-4">
        <HexColorPicker color={localColor} onChange={setLocalColor} />
      </div>

      {/* Current Color Display */}
      <div
        className="h-16 w-full rounded-lg border border-gray-200"
        style={{ backgroundColor: localColor }}
      />

      {/* Color Value Display */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">HEX:</span>
          <span className="font-mono font-medium">{localColor}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">RGB:</span>
          <span className="font-mono font-medium">
            {chroma(localColor).rgb().join(', ')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">HSL:</span>
          <span className="font-mono font-medium">
            {chroma(localColor)
              .hsl()
              .map((v, i) => (i === 0 ? Math.round(v) : Math.round(v * 100) + '%'))
              .join(', ')}
          </span>
        </div>
      </div>
    </div>
  )
}
```

---

### 5.3 ColorInput.tsx

```tsx
// components/color/ColorInput.tsx
'use client'

import { useState } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { validateHexColor, validateRgbColor, validateHslColor } from '@/lib/color/validators'

type ColorFormat = 'hex' | 'rgb' | 'hsl'

export function ColorInput() {
  const { baseColor, setBaseColor } = usePaletteStore()
  const [format, setFormat] = useState<ColorFormat>('hex')
  const [inputValue, setInputValue] = useState(baseColor)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = false

    switch (format) {
      case 'hex':
        isValid = validateHexColor(inputValue)
        break
      case 'rgb':
        isValid = validateRgbColor(inputValue)
        break
      case 'hsl':
        isValid = validateHslColor(inputValue)
        break
    }

    if (isValid) {
      setBaseColor(inputValue)
      setError(null)
    } else {
      setError(`Invalid ${format.toUpperCase()} format`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Format Tabs */}
      <div className="flex gap-2">
        {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map((fmt) => (
          <button
            key={fmt}
            type="button"
            onClick={() => setFormat(fmt)}
            className={`rounded px-3 py-1 text-sm font-medium ${
              format === fmt
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            format === 'hex'
              ? '#3B82F6'
              : format === 'rgb'
              ? 'rgb(59, 130, 246)'
              : 'hsl(217, 91%, 60%)'
          }
          className={`flex-1 rounded-lg border px-3 py-2 text-sm font-mono ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Apply
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
```

---

### 5.4 ImageUpload.tsx

```tsx
// components/color/ImageUpload.tsx
'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { extractColorsFromImage } from '@/lib/color/extractors'
import { IMAGE_CONFIG } from '@/constants/config'
import { ExtractedColors } from './ExtractedColors'

export function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [colors, setColors] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    // Validate file
    if (!IMAGE_CONFIG.allowedFormats.includes(file.type)) {
      setError('Only JPG, PNG, WebP formats are supported')
      return
    }

    if (file.size > IMAGE_CONFIG.maxSize) {
      setError('Image size must be less than 5MB')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Extract colors
      const extractedColors = await extractColorsFromImage(file)
      setColors(extractedColors)
    } catch (err) {
      setError('Failed to extract colors from image')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    setPreview(null)
    setColors([])
    setError(null)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
        >
          <Upload className="mb-3 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm font-medium text-gray-700">
            Drop an image here or click to upload
          </p>
          <p className="text-xs text-gray-500">JPG, PNG, WebP (max 5MB)</p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      ) : (
        /* Preview & Clear */
        <div className="relative">
          <img
            src={preview}
            alt="Uploaded"
            className="h-48 w-full rounded-lg object-cover"
          />
          <button
            onClick={handleClear}
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-lg hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-sm text-gray-600">
          Extracting colors...
        </div>
      )}

      {/* Extracted Colors */}
      {colors.length > 0 && <ExtractedColors colors={colors} />}
    </div>
  )
}
```

---

### 5.5 lib/color/extractors.ts

```tsx
// lib/color/extractors.ts
import ColorThief from 'colorthief'
import chroma from 'chroma-js'

export async function extractColorsFromImage(
  file: File,
  colorCount: number = 6
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }

    img.onload = () => {
      try {
        const colorThief = new ColorThief()
        const palette = colorThief.getPalette(img, colorCount)

        // Convert RGB arrays to HEX
        const hexColors = palette.map((rgb: [number, number, number]) =>
          chroma(rgb).hex()
        )

        resolve(hexColors)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    reader.onerror = () => reject(new Error('Failed to read file'))

    reader.readAsDataURL(file)
  })
}
```

---

### 5.6 lib/color/validators.ts

```tsx
// lib/color/validators.ts
import chroma from 'chroma-js'

export function validateHexColor(value: string): boolean {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (!hexPattern.test(value)) return false

  try {
    chroma(value)
    return true
  } catch {
    return false
  }
}

export function validateRgbColor(value: string): boolean {
  const rgbPattern = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
  const match = value.match(rgbPattern)

  if (!match) return false

  const [, r, g, b] = match
  const isValid =
    [r, g, b].every((v) => {
      const num = parseInt(v, 10)
      return num >= 0 && num <= 255
    })

  if (!isValid) return false

  try {
    chroma(value)
    return true
  } catch {
    return false
  }
}

export function validateHslColor(value: string): boolean {
  const hslPattern = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
  const match = value.match(hslPattern)

  if (!match) return false

  const [, h, s, l] = match
  const hNum = parseInt(h, 10)
  const sNum = parseInt(s, 10)
  const lNum = parseInt(l, 10)

  const isValid =
    hNum >= 0 && hNum <= 360 &&
    sNum >= 0 && sNum <= 100 &&
    lNum >= 0 && lNum <= 100

  if (!isValid) return false

  try {
    chroma(value)
    return true
  } catch {
    return false
  }
}
```

---

### 5.7 constants/config.ts (수정)

```tsx
// constants/config.ts
export const IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  colorCount: 6, // 추출할 색상 개수
} as const

export const DEBOUNCE_DELAY = 500 // ms

// ... 기존 코드
```

---

### 5.8 InputPanel.tsx 업데이트

```tsx
// components/layout/InputPanel.tsx
import { ColorPicker } from '@/components/color/ColorPicker'
import { ColorInput } from '@/components/color/ColorInput'
import { ImageUpload } from '@/components/color/ImageUpload'

export function InputPanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Color Input
      </h2>

      {/* Color Picker */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Pick a Color
        </h3>
        <ColorPicker />
      </div>

      {/* Manual Input */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Or Enter Manually
        </h3>
        <ColorInput />
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-gray-500">OR</span>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Upload an Image
        </h3>
        <ImageUpload />
      </div>
    </div>
  )
}
```

---

## 6. 테스트 체크리스트

### 6.1 Color Picker 테스트
- [ ] Color wheel에서 색상 선택 시 baseColor 업데이트
- [ ] Debounce 적용 확인 (500ms 지연)
- [ ] HEX/RGB/HSL 값 실시간 업데이트
- [ ] 페이지 새로고침 후 색상 유지 (LocalStorage)

### 6.2 Color Input 테스트
- [ ] HEX 입력 유효성 검증 (#3B82F6, #FFF)
- [ ] RGB 입력 유효성 검증 (rgb(59, 130, 246))
- [ ] HSL 입력 유효성 검증 (hsl(217, 91%, 60%))
- [ ] 잘못된 포맷 입력 시 에러 메시지 표시
- [ ] Apply 버튼 클릭 시 baseColor 업데이트

### 6.3 Image Upload 테스트
- [ ] 드래그 앤 드롭 동작 확인
- [ ] 파일 선택 (input) 동작 확인
- [ ] 파일 포맷 검증 (JPG, PNG, WebP만 허용)
- [ ] 파일 크기 검증 (5MB 초과 시 에러)
- [ ] 색상 추출 성공 시 6개 색상 표시
- [ ] 이미지 미리보기 표시
- [ ] Clear 버튼으로 초기화

### 6.4 Zustand Store 테스트
- [ ] setBaseColor 액션 동작 확인
- [ ] LocalStorage 자동 저장 확인
- [ ] 브라우저 새로고침 후 상태 복원

---

## 7. 완료 조건

- [ ] ColorPicker 컴포넌트 정상 작동
- [ ] HEX/RGB/HSL 입력 폼 정상 작동
- [ ] 이미지 업로드 & 색상 추출 정상 작동
- [ ] Zustand Store 연동 완료
- [ ] 모든 유효성 검증 통과
- [ ] 에러 처리 완료
- [ ] 반응형 레이아웃 동작 (모바일/데스크톱)
- [ ] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- Color Picker 사용 화면
- HEX/RGB/HSL 입력 화면
- 이미지 업로드 & 색상 추출 화면

---

## 9. 참고 문서

- [docs/2.Functional/01-Color-Input-Feature.md](../2.Functional/01-Color-Input-Feature.md)
- [docs/3.Wireframe/02-Input-Panel.md](../3.Wireframe/02-Input-Panel.md)
- [react-colorful 문서](https://github.com/omgovich/react-colorful)
- [color-thief 문서](https://github.com/lokesh/color-thief)

---

**상태**: ⏳ In Progress
**다음 단계**: 팔레트 생성 기능 (Task 03)
