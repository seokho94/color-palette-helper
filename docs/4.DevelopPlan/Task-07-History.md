# Task 07: 히스토리 & 즐겨찾기

**상태**: ✅ Done
**우선순위**: P1
**예상 시간**: 8시간
**담당자**: Frontend (정하은)
**시작일**: 2026-02-23
**완료일**: 2026-02-23

---

## 1. 목표

생성된 팔레트를 LocalStorage에 자동 저장하고, 히스토리 목록과 즐겨찾기 기능 구현

---

## 2. 선행 작업

- [x] Task 00: 프로젝트 초기 설정
- [x] Task 01: 기본 레이아웃 구현
- [x] Task 02: 색상 입력 기능
- [x] Task 03: 팔레트 생성 기능
- [x] Task 04: 접근성 검증
- [x] Task 05: UI 미리보기
- [x] Task 06: Export 기능

---

## 3. 개발 항목 체크리스트

### 3.1 Zustand Store (Persist) ✅
- [x] useHistoryStore 구현
- [x] 팔레트 자동 저장 로직
- [x] 최대 50개 제한
- [x] 즐겨찾기 토글 기능

### 3.2 UI 컴포넌트 ✅
- [x] History Sidebar 컴포넌트
- [x] PaletteHistoryItem 컴포넌트
- [x] Favorites 필터 기능
- [x] 검색 기능 (선택)

### 3.3 통합 ✅
- [x] Header에 History 버튼 연동
- [x] Sidebar 열기/닫기 애니메이션
- [x] 팔레트 클릭 시 복원

---

## 4. 파일 구조

```
store/
└── useHistoryStore.ts        ← 생성 (History Store)

components/
├── history/
│   ├── HistorySidebar.tsx    ← 생성
│   ├── PaletteHistoryItem.tsx ← 생성
│   └── FavoritesToggle.tsx   ← 생성
│
└── layout/
    └── Header.tsx            ← 수정

lib/
└── utils.ts                  ← 수정 (날짜 포맷 함수 추가)
```

---

## 5. 구현 가이드

### 5.1 store/useHistoryStore.ts

```tsx
// store/useHistoryStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Palette } from '@/types/color'
import { generateId } from '@/lib/utils'

interface HistoryState {
  palettes: Palette[]
  maxHistory: number

  addPalette: (palette: Omit<Palette, 'id' | 'createdAt'>) => void
  removePalette: (id: string) => void
  toggleFavorite: (id: string) => void
  clearHistory: () => void
  getPalette: (id: string) => Palette | undefined
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      palettes: [],
      maxHistory: 50,

      addPalette: (palette) => {
        const newPalette: Palette = {
          ...palette,
          id: generateId(),
          createdAt: Date.now(),
        }

        set((state) => {
          const updated = [newPalette, ...state.palettes]

          // 최대 개수 제한
          if (updated.length > state.maxHistory) {
            // 즐겨찾기가 아닌 항목부터 삭제
            const favorites = updated.filter((p) => p.favorite)
            const nonFavorites = updated.filter((p) => !p.favorite)

            if (nonFavorites.length > state.maxHistory - favorites.length) {
              nonFavorites.pop()
            }

            return {
              palettes: [...favorites, ...nonFavorites].slice(0, state.maxHistory),
            }
          }

          return { palettes: updated }
        })
      },

      removePalette: (id) =>
        set((state) => ({
          palettes: state.palettes.filter((p) => p.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id ? { ...p, favorite: !p.favorite } : p
          ),
        })),

      clearHistory: () => {
        const confirmed = confirm('Are you sure you want to clear all history?')
        if (confirmed) {
          set({ palettes: [] })
        }
      },

      getPalette: (id) => get().palettes.find((p) => p.id === id),
    }),
    {
      name: 'palette-history',
    }
  )
)
```

---

### 5.2 lib/utils.ts (업데이트)

```tsx
// lib/utils.ts
// ... 기존 코드

/**
 * 날짜를 상대 시간으로 포맷
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return new Date(timestamp).toLocaleDateString()
}
```

---

### 5.3 components/history/PaletteHistoryItem.tsx

```tsx
// components/history/PaletteHistoryItem.tsx
'use client'

import { Heart, Trash2 } from 'lucide-react'
import type { Palette } from '@/types/color'
import { formatRelativeTime } from '@/lib/utils'
import { useHistoryStore } from '@/store/useHistoryStore'
import { usePaletteStore } from '@/store/usePaletteStore'

interface PaletteHistoryItemProps {
  palette: Palette
  onSelect?: () => void
}

export function PaletteHistoryItem({ palette, onSelect }: PaletteHistoryItemProps) {
  const { toggleFavorite, removePalette } = useHistoryStore()
  const { setBaseColor, setHarmonyRule } = usePaletteStore()

  const handleLoad = () => {
    setBaseColor(palette.baseColor)
    setHarmonyRule(palette.harmonyRule)
    onSelect?.()
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(palette.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    removePalette(palette.id)
  }

  return (
    <div
      onClick={handleLoad}
      className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:shadow-md"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {palette.name || 'Untitled Palette'}
          </h4>
          <p className="text-xs text-gray-500">
            {formatRelativeTime(palette.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart
              className={`h-4 w-4 ${
                palette.favorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-6 gap-1">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="h-8 rounded"
            style={{ backgroundColor: color.hex }}
            title={color.hex}
          />
        ))}
      </div>

      {/* Harmony Rule */}
      <p className="mt-2 text-xs text-gray-500">
        {palette.harmonyRule}
      </p>
    </div>
  )
}
```

---

### 5.4 components/history/HistorySidebar.tsx

```tsx
// components/history/HistorySidebar.tsx
'use client'

import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useHistoryStore } from '@/store/useHistoryStore'
import { PaletteHistoryItem } from './PaletteHistoryItem'

interface HistorySidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function HistorySidebar({ isOpen, onClose }: HistorySidebarProps) {
  const { palettes, clearHistory } = useHistoryStore()
  const [filter, setFilter] = useState<'all' | 'favorites'>('all')

  const filteredPalettes =
    filter === 'favorites'
      ? palettes.filter((p) => p.favorite)
      : palettes

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">History</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b border-gray-200 px-6 py-3">
          <button
            onClick={() => setFilter('all')}
            className={`text-sm font-medium ${
              filter === 'all'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({palettes.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`text-sm font-medium ${
              filter === 'favorites'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Favorites ({palettes.filter((p) => p.favorite).length})
          </button>
        </div>

        {/* List */}
        <div className="h-[calc(100%-180px)] overflow-y-auto p-6">
          {filteredPalettes.length === 0 ? (
            <p className="mt-8 text-center text-sm text-gray-500">
              {filter === 'favorites'
                ? 'No favorite palettes yet'
                : 'No palettes saved yet'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredPalettes.map((palette) => (
                <PaletteHistoryItem
                  key={palette.id}
                  palette={palette}
                  onSelect={onClose}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {palettes.length > 0 && (
          <div className="absolute bottom-0 w-full border-t border-gray-200 p-6">
            <button
              onClick={clearHistory}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Clear All History
            </button>
          </div>
        )}
      </div>
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

### 5.6 자동 저장 통합 (usePaletteStore.ts)

```tsx
// store/usePaletteStore.ts
// ... 기존 코드

import { useHistoryStore } from './useHistoryStore'

// generateColors 함수 수정
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

  // 히스토리에 자동 저장
  useHistoryStore.getState().addPalette({
    name: `Palette ${Date.now()}`,
    colors: mergedColors,
    harmonyRule,
    baseColor,
  })
},
```

---

## 6. 테스트 체크리스트

### 6.1 Store 테스트
- [ ] 팔레트 자동 저장 확인
- [ ] 최대 50개 제한 확인
- [ ] 즐겨찾기 토글 동작
- [ ] 팔레트 삭제 동작
- [ ] LocalStorage 저장/복원

### 6.2 UI 테스트
- [ ] Sidebar 열기/닫기 애니메이션
- [ ] All / Favorites 필터 전환
- [ ] 팔레트 클릭 시 복원
- [ ] 즐겨찾기 아이콘 표시
- [ ] 삭제 버튼 동작
- [ ] Clear All 버튼 동작

### 6.3 날짜 포맷 테스트
- [ ] "Just now" 표시
- [ ] "5m ago" 표시
- [ ] "2h ago" 표시
- [ ] "3d ago" 표시
- [ ] 날짜 표시 (7일 이상)

---

## 7. 완료 조건

- [ ] useHistoryStore 정상 작동
- [ ] 팔레트 자동 저장 완료
- [ ] History Sidebar UI 완성
- [ ] 즐겨찾기 기능 정상 작동
- [ ] 팔레트 복원 기능 정상 작동
- [ ] 모든 테스트 통과
- [ ] 코드 리뷰 통과

---

## 8. 스크린샷 (예정)

작업 완료 후 스크린샷 첨부:
- History Sidebar (All)
- History Sidebar (Favorites)
- 팔레트 항목 카드

---

## 9. 참고 문서

- [docs/2.Functional/06-History-Feature.md](../2.Functional/06-History-Feature.md)

---

**상태**: ⬜ Not Started
**다음 단계**: URL 공유 기능 (Task 08)
