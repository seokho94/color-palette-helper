# 팔레트 패널 와이어프레임

**작성자**: 박지훈 (UI/UX Designer)
**작성일**: 2026-02-23
**버전**: 1.0

---

## 1. 전체 구조 (480px × full height)

```
┌───────────────────────────────────┐
│  COLOR PALETTE                    │
│  ────────────────────────────     │
│                                   │
│  ┌─────┬─────┬─────┬─────┬─────┐ │
│  │ █ 🔒│  █  │  █  │  █  │  █  │ │  ← 색상 카드
│  │#3B82│#10B9│#F59E│#EF44│#8B5C│ │
│  │  F6 │  81 │  0B │  44 │  F6 │ │
│  │Blue │Green│Amber│ Red │Violet│
│  │     │     │     │     │     │ │
│  │Prim │Sec  │Acc  │Err  │Info │ │
│  └─────┴─────┴─────┴─────┴─────┘ │
│                                   │
│  ───────────────────────────────  │
│                                   │
│  Harmony Rule:                    │
│  ┌─────────────────────────────┐ │
│  │ ( ) Complementary           │ │
│  │ ( ) Analogous               │ │
│  │ (•) Triadic                 │ │  ← 선택됨
│  │ ( ) Split-Complementary     │ │
│  │ ( ) Tetradic                │ │
│  │ ( ) Monochromatic           │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🔄 Randomize (Space)       │ │
│  └─────────────────────────────┘ │
│                                   │
│  ───────────────────────────────  │
│                                   │
│  Accessibility Check:             │
│  ✅ All colors meet AA standard  │
│                                   │
│  Text Contrast:                   │
│  ┌─────────────────────────────┐ │
│  │ #3B82F6 on white:  4.8:1 ✅ │ │
│  │ #10B981 on white:  3.1:1 ⚠️ │ │
│  │ #F59E0B on white:  2.8:1 ❌ │ │
│  └─────────────────────────────┘ │
│                                   │
│  [Fix All Automatically]          │
│  [View Details]                   │
│                                   │
└───────────────────────────────────┘
```

---

## 2. 색상 카드 상세

### 2.1 일반 상태

```
┌─────────────┐
│   ███████   │  ← 색상 칩 (클릭: Color Picker)
│             │
│   #3B82F6   │  ← HEX (클릭: 복사)
│             │
│    Blue     │  ← 색상 이름
│             │
│   🔒 Primary │  ← 잠금 + 역할
└─────────────┘
    90px × 120px
```

### 2.2 잠금 상태

```
┌─────────────┐
│   ███████   │
│     🔒      │  ← 잠금 아이콘 오버레이
│   #3B82F6   │
│    Blue     │
│   🔒 Primary │  ← 잠긴 상태
└─────────────┘
배경 반투명
```

### 2.3 Hover 상태

```
┌─────────────┐
│   ███████   │
│   [Edit]    │  ← Edit 버튼 표시
│   #3B82F6   │
│   [Copy]    │  ← Copy 버튼
│    Blue     │
│   🔒 Primary │
└─────────────┘
```

### 2.4 접근성 경고

```
┌─────────────┐
│   ███████   │
│             │
│   #F59E0B   │
│    Amber    │
│             │
│ ⚠️ Low      │  ← 경고 표시
│  contrast   │
└─────────────┘
노란 테두리
```

---

## 3. 조화 규칙 선택

### 3.1 라디오 버튼 목록

```
┌─────────────────────────────────┐
│ Harmony Rule:                   │
│                                 │
│ ( ) Complementary    [?]        │  ← 툴팁
│     "Strong contrast"           │
│                                 │
│ ( ) Analogous        [?]        │
│     "Harmonious, calm"          │
│                                 │
│ (•) Triadic          [?]        │  ← 선택됨
│     "Vibrant, balanced"         │
│                                 │
│ ( ) Split-Complementary [?]     │
│     "Softer contrast"           │
│                                 │
│ ( ) Tetradic         [?]        │
│     "Rich, complex"             │
│                                 │
│ ( ) Monochromatic    [?]        │
│     "Unified, minimal"          │
└─────────────────────────────────┘
```

### 3.2 툴팁 (Hover)

```
┌──────────────────────┐
│ Triadic              │
│                      │
│ Colors evenly spaced │
│ around color wheel   │
│ (120° apart)         │
│                      │
│ Best for: Vibrant    │
│ designs, logos       │
└──────────────────────┘
```

---

## 4. 랜덤 재생성 버튼

```
┌─────────────────────────────────┐
│  🔄 Randomize (Space)           │
│                                 │
│  Generate new colors while      │
│  keeping locked ones            │
└─────────────────────────────────┘

[클릭 시]
→ 로딩 애니메이션 (0.3초)
→ 잠긴 색상 제외하고 재생성
```

---

## 5. 접근성 체크 섹션

### 5.1 모두 통과

```
┌─────────────────────────────────┐
│ Accessibility Check:            │
│                                 │
│ ✅ All colors meet AA standard  │
│                                 │
│ Text Contrast:                  │
│ • All combinations: PASS        │
│                                 │
│ [View Details] →                │
└─────────────────────────────────┘
```

### 5.2 경고 있음

```
┌─────────────────────────────────┐
│ Accessibility Check:            │
│                                 │
│ ⚠️ 2 color pairs have low       │
│    contrast                     │
│                                 │
│ [Fix All Automatically]         │
│ [View Details] →                │
└─────────────────────────────────┘
```

### 5.3 상세 정보 (확장)

```
┌─────────────────────────────────┐
│ Accessibility Details:          │
│                                 │
│ ⚠️ #F59E0B on white             │
│    Contrast: 2.8:1              │
│    Required: 4.5:1 (AA)         │
│    [Fix] → #D97706              │
│                                 │
│ ⚠️ #10B981 on white             │
│    Contrast: 3.1:1              │
│    Required: 4.5:1 (AA)         │
│    [Fix] → #059669              │
│                                 │
│ ✅ #3B82F6 on white             │
│    Contrast: 4.8:1 (AA ✅)      │
│                                 │
│ [Apply All Fixes]               │
└─────────────────────────────────┘
```

---

## 6. 인터랙션

### 6.1 색상 카드 클릭

```javascript
onClick={(color) => {
  // Color Picker 모달 열기
  openColorPicker(color)
}}
```

### 6.2 HEX 클릭

```javascript
onClick={(hex) => {
  copyToClipboard(hex)
  toast.success('Copied!')
}}
```

### 6.3 잠금 토글

```javascript
onClick={(index) => {
  toggleLock(index)
  // 아이콘 변경: 🔒 ↔ 🔓
}}
```

### 6.4 조화 규칙 변경

```javascript
onChange={(rule) => {
  setHarmonyRule(rule)
  // 팔레트 즉시 재생성 (잠긴 색상 제외)
}}
```

---

## 7. 애니메이션

### 7.1 색상 변경

```css
.color-card {
  transition: background-color 0.3s ease-in-out;
}
```

### 7.2 잠금 토글

```css
.lock-icon {
  transition: transform 0.2s ease-out;
}

.locked {
  transform: rotate(-15deg);
}
```

### 7.3 Randomize 버튼

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.randomizing .icon {
  animation: spin 0.5s ease-in-out;
}
```

---

## 8. 반응형 (모바일)

```
┌──────────────┐
│   Palette    │
│              │
│ [█][█][█]    │  ← 가로 스크롤
│ [█][█]       │
│              │
│ Harmony:     │
│ [Dropdown ▼] │  ← 라디오 → 드롭다운
│              │
│ [Randomize]  │
│              │
│ Access:      │
│ ✅ All OK    │
└──────────────┘
```

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
