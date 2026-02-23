# 히스토리 & 즐겨찾기 기능 정의서

**작성자**: 강수진 (기획자), 정하은 (Frontend)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes

---

## 1. 기능 개요

### 1.1 목적
생성한 팔레트를 로컬 저장하여 재사용 가능하도록 함

### 1.2 비즈니스 가치
- **재사용성**: 이전 작업 불러오기
- **비교**: 여러 팔레트 비교 선택
- **신뢰성**: 브라우저 종료 후에도 유지

---

## 2. 히스토리 (History)

### 2.1 자동 저장

```typescript
// 팔레트 생성 시 자동 저장
const savePalette = () => {
  const palette: Palette = {
    id: crypto.randomUUID(),
    colors,
    baseColor,
    harmonyRule,
    createdAt: new Date(),
    isFavorite: false,
  }

  historyStore.addItem(palette)
}

// 트리거: 팔레트 확정 시 (내보내기 또는 5초 idle 후)
```

### 2.2 저장 용량

- **최대 개수**: 50개
- **초과 시**: 가장 오래된 항목부터 자동 삭제 (즐겨찾기 제외)

### 2.3 LocalStorage

```typescript
// Zustand persist middleware 사용
export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (palette) => {
        set((state) => ({
          items: [palette, ...state.items].slice(0, 50)
        }))
      },
      // ...
    }),
    {
      name: 'palette-history', // localStorage key
    }
  )
)
```

---

## 3. 즐겨찾기 (Favorites)

### 3.1 토글

```typescript
// 즐겨찾기 토글
const toggleFavorite = (id: string) => {
  historyStore.toggleFavorite(id)
}
```

### 3.2 UI 표시

```
[히스토리 항목]
┌──────────────────┐
│ ❤️ Palette Name  │ ← 즐겨찾기됨
│ █ █ █ █ █       │
│ 2 hours ago     │
└──────────────────┘

[일반 항목]
┌──────────────────┐
│ 🤍 Palette Name  │ ← 즐겨찾기 안됨
│ █ █ █ █ █       │
│ Yesterday       │
└──────────────────┘
```

---

## 4. 사이드바 UI

### 4.1 레이아웃

```
┌─────────────┐
│ History     │
│ ───────────  │
│ [Favorites] │ ← 탭
│ [Recent]    │ ← 탭
│             │
│ ┌─────────┐ │
│ │ Palette │ │
│ │ █ █ █ █ │ │
│ └─────────┘ │
│             │
│ ┌─────────┐ │
│ │ Palette │ │
│ │ █ █ █ █ │ │
│ └─────────┘ │
│             │
│ [Clear All] │
└─────────────┘
```

### 4.2 인터랙션

```
[팔레트 항목 클릭]
→ 해당 팔레트 로드
→ 메인 화면 팔레트 교체

[❤️ 아이콘 클릭]
→ 즐겨찾기 토글

[삭제 버튼 클릭]
→ 확인 다이얼로그
→ "Delete this palette?" [Cancel] [Delete]
```

---

## 5. 데이터 구조

```typescript
interface Palette {
  id: string
  colors: Color[]
  baseColor: string
  harmonyRule: HarmonyRule
  createdAt: Date
  isFavorite: boolean
}

interface HistoryState {
  items: Palette[]

  addItem: (palette: Palette) => void
  removeItem: (id: string) => void
  toggleFavorite: (id: string) => void
  loadPalette: (id: string) => void
  clear: () => void
}
```

---

## 6. 시간 표시

```typescript
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
```

---

## 7. 반응형 (모바일)

- **데스크톱**: 좌측 사이드바 (고정)
- **모바일**: 하단 Drawer (토글)

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
