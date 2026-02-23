# 팔레트 생성 기능 정의서

**작성자**: 이서연 (PL), 정하은 (Frontend), 강수진 (기획자)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes

---

## 1. 기능 개요

### 1.1 목적
색상 이론 기반 조화 규칙을 적용하여 자동으로 아름다운 색상 팔레트 생성

### 1.2 비즈니스 가치
- **자동화**: 수동 시행착오 제거
- **전문성**: 색상 이론 지식 없어도 조화로운 팔레트 생성
- **효율성**: 몇 초 만에 완성

### 1.3 핵심 차별점
- 6가지 검증된 색상 조화 규칙
- 색상 잠금 기능 (Coolors 스타일)
- 실시간 재생성

---

## 2. 조화 규칙 상세

### 2.1 보색 (Complementary)

#### 설명
색상환에서 정반대 위치의 색상 (180도)

#### 알고리즘
```typescript
function generateComplementary(baseColor: string): Color[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')

  return [
    colorFromHue(hue),                  // 베이스
    colorFromHue((hue + 180) % 360),    // 보색
  ]
}
```

#### 사용 사례
- 대비가 강한 디자인
- CTA 버튼 (Primary vs Secondary)
- 스포츠 팀 컬러

#### 예시
```
베이스: #3B82F6 (파란색, 221°)
보색:   #F6913B (주황색, 41°)
```

---

### 2.2 유사색 (Analogous)

#### 설명
색상환에서 인접한 색상 (±30도)

#### 알고리즘
```typescript
function generateAnalogous(baseColor: string): Color[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')

  return [
    colorFromHue((hue - 30 + 360) % 360),
    colorFromHue(hue),
    colorFromHue((hue + 30) % 360),
  ]
}
```

#### 사용 사례
- 자연스럽고 편안한 느낌
- 브랜드 컬러 확장
- 그라디언트

#### 예시
```
베이스: #3B82F6 (파란색, 221°)
유사1:  #3B5FF6 (보라-파랑, 191°)
유사2:  #3BA5F6 (하늘색, 251°)
```

---

### 2.3 삼색 조화 (Triadic)

#### 설명
색상환을 3등분한 위치 (120도 간격)

#### 알고리즘
```typescript
function generateTriadic(baseColor: string): Color[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')

  return [
    colorFromHue(hue),
    colorFromHue((hue + 120) % 360),
    colorFromHue((hue + 240) % 360),
  ]
}
```

#### 사용 사례
- 활기찬 디자인
- 다채로운 인포그래픽
- 어린이 대상 UI

#### 예시
```
베이스: #3B82F6 (파란색, 221°)
삼색1:  #82F63B (녹색, 341°)
삼색2:  #F63B82 (분홍색, 101°)
```

---

### 2.4 분할 보색 (Split-Complementary)

#### 설명
보색의 양옆 색상 (보색 ± 30도)

#### 알고리즘
```typescript
function generateSplitComplementary(baseColor: string): Color[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const complement = (hue + 180) % 360

  return [
    colorFromHue(hue),
    colorFromHue((complement - 30 + 360) % 360),
    colorFromHue((complement + 30) % 360),
  ]
}
```

#### 사용 사례
- 보색보다 부드러운 대비
- 균형 잡힌 디자인

---

### 2.5 사색 조화 (Tetradic)

#### 설명
색상환을 4등분 (90도 간격)

#### 알고리즘
```typescript
function generateTetradic(baseColor: string): Color[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')

  return [
    colorFromHue(hue),
    colorFromHue((hue + 90) % 360),
    colorFromHue((hue + 180) % 360),
    colorFromHue((hue + 270) % 360),
  ]
}
```

#### 사용 사례
- 풍부한 색상 팔레트
- 복잡한 UI

---

### 2.6 모노크롬 (Monochromatic)

#### 설명
같은 Hue, 다른 명도/채도

#### 알고리즘
```typescript
function generateMonochromatic(baseColor: string, count: number): Color[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const saturation = base.get('hsl.s')

  return Array.from({ length: count }, (_, i) => {
    const lightness = (i / (count - 1)) * 0.8 + 0.1 // 0.1 ~ 0.9
    return chroma.hsl(hue, saturation, lightness)
  })
}
```

#### 사용 사례
- 미니멀 디자인
- 통일감 있는 UI
- 그레이스케일 변형

---

## 3. 색상 잠금 기능

### 3.1 목적
특정 색상을 고정하고 나머지만 재생성

### 3.2 사용자 플로우
```
1. 팔레트에서 마음에 드는 색상 발견
   ↓
2. 색상 카드의 🔒 아이콘 클릭
   ↓
3. 해당 색상 잠김 (배경 변화)
   ↓
4. [Randomize] 또는 Spacebar 누름
   ↓
5. 잠긴 색상은 유지, 나머지만 재생성
```

### 3.3 구현
```typescript
interface Color {
  hex: string
  // ... 기타 필드
  locked?: boolean
}

function randomize() {
  const newColors = generateHarmony(baseColor, harmonyRule)

  // 잠긴 색상은 유지
  const merged = newColors.map((newColor, idx) =>
    colors[idx]?.locked ? colors[idx] : newColor
  )

  setColors(merged)
}
```

---

## 4. 랜덤 팔레트 생성

### 4.1 목적
영감을 위한 완전 랜덤 팔레트

### 4.2 알고리즘
```typescript
function generateRandomPalette(): Palette {
  // 1. 랜덤 Hue 생성
  const randomHue = Math.random() * 360

  // 2. 채도/명도 범위 제한 (너무 밝거나 어두운 색 제외)
  const saturation = Math.random() * 0.6 + 0.3  // 0.3 ~ 0.9
  const lightness = Math.random() * 0.5 + 0.3   // 0.3 ~ 0.8

  const baseColor = chroma.hsl(randomHue, saturation, lightness)

  // 3. 랜덤 조화 규칙 선택
  const rules: HarmonyRule[] = ['complementary', 'analogous', 'triadic']
  const randomRule = rules[Math.floor(Math.random() * rules.length)]

  return generateHarmony(baseColor.hex(), randomRule)
}
```

---

## 5. 데이터 구조

### 5.1 State 관리 (Zustand)

```typescript
interface PaletteState {
  // 현재 팔레트
  colors: Color[]
  baseColor: string
  harmonyRule: HarmonyRule

  // Actions
  setBaseColor: (color: string) => void
  setHarmonyRule: (rule: HarmonyRule) => void
  updateColor: (index: number, color: Color) => void
  toggleLock: (index: number) => void
  randomize: () => void
  generateRandom: () => void
}

export const usePaletteStore = create<PaletteState>((set, get) => ({
  colors: [],
  baseColor: '#3B82F6',
  harmonyRule: 'complementary',

  setBaseColor: (color) => {
    set({ baseColor: color })
    const newColors = generateHarmony(color, get().harmonyRule)
    set({ colors: newColors })
  },

  setHarmonyRule: (rule) => {
    set({ harmonyRule: rule })
    const newColors = generateHarmony(get().baseColor, rule)
    set({ colors: newColors })
  },

  toggleLock: (index) => {
    const colors = [...get().colors]
    colors[index].locked = !colors[index].locked
    set({ colors })
  },

  randomize: () => {
    const { baseColor, harmonyRule, colors } = get()
    const newColors = generateHarmony(baseColor, harmonyRule)

    // 잠긴 색상 유지
    const merged = newColors.map((nc, idx) =>
      colors[idx]?.locked ? colors[idx] : nc
    )

    set({ colors: merged })
  },
}))
```

---

## 6. 성능 최적화

### 6.1 Memoization

```typescript
import { useMemo } from 'react'

function PaletteDisplay() {
  const { baseColor, harmonyRule } = usePaletteStore()

  // 조화 규칙 계산 결과 캐싱
  const colors = useMemo(
    () => generateHarmony(baseColor, harmonyRule),
    [baseColor, harmonyRule]
  )

  return <div>{/* ... */}</div>
}
```

### 6.2 성능 목표

| 항목 | 목표 | 측정 |
|------|------|------|
| 조화 규칙 계산 | < 10ms | Performance API |
| 팔레트 업데이트 | < 100ms | React DevTools Profiler |
| 메모리 사용 | < 10MB | Chrome DevTools |

---

## 7. UI 인터랙션

### 7.1 조화 규칙 선택

```
[Harmony Selector]
( ) Complementary    "대비가 강한"
( ) Analogous        "편안한"
(•) Triadic          "활기찬"  ← 선택됨
( ) Split-Comp       "균형잡힌"
( ) Tetradic         "풍부한"
( ) Monochromatic    "통일된"

[인터랙션]
- 라디오 버튼 선택 → 즉시 팔레트 업데이트
- Hover → 툴팁으로 설명 표시
```

### 7.2 색상 카드

```
┌─────────────┐
│   #3B82F6   │ ← HEX 코드 (클릭: 복사)
│   ███████   │ ← 색상 칩 (클릭: Color Picker)
│   Blue      │ ← 색상 이름
│   🔒 Primary │ ← 잠금 아이콘 + 역할
└─────────────┘

[잠금 상태]
✓ 잠김: 🔒 표시, 반투명 배경
✗ 잠금 해제: 🔓 표시
```

---

## 8. 테스트 케이스

### 8.1 단위 테스트

```typescript
describe('Palette Generation', () => {
  it('should generate complementary colors', () => {
    const palette = generateComplementary('#FF0000')
    expect(palette).toHaveLength(2)
    expect(palette[1].hex).toBe('#00FFFF') // Cyan
  })

  it('should generate triadic colors', () => {
    const palette = generateTriadic('#FF0000')
    expect(palette).toHaveLength(3)
    // Hue 차이 120도 검증
  })

  it('should preserve locked colors on randomize', () => {
    const colors = [
      { hex: '#FF0000', locked: true },
      { hex: '#00FF00', locked: false },
    ]
    const result = randomizeWithLock(colors)
    expect(result[0].hex).toBe('#FF0000') // 유지
    expect(result[1].hex).not.toBe('#00FF00') // 변경
  })
})
```

---

## 9. 향후 개선 사항 (Phase 2+)

### 9.1 고급 조화 규칙
- Compound (복합)
- Custom (사용자 정의 각도)

### 9.2 자동 역할 할당
- Primary, Secondary, Accent 자동 분류
- 명도 기반 Background/Text 판단

### 9.3 색상 정렬
- Hue 순서
- 명도 순서
- 채도 순서

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
