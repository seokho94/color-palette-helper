# 접근성 검증 기능 정의서

**작성자**: 이서연 (PL), 강수진 (기획자)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes
**핵심 차별점**: ⭐ 가장 중요한 기능

---

## 1. 기능 개요

### 1.1 목적
WCAG 기준에 따라 색상 조합의 접근성을 자동으로 검증하고 개선안 제시

### 1.2 비즈니스 가치
- **법적 준수**: WCAG AA/AAA 기준 자동 확인
- **차별화**: 경쟁 도구와의 핵심 차별점
- **시간 절약**: 수동 검증 불필요

### 1.3 사용자 Pain Point 해결
> "매번 WebAIM에서 확인하는 게 귀찮음" → **자동화**
> "접근성 기준을 잘 몰라요" → **자동 제안**

---

## 2. WCAG 기준

### 2.1 대비 비율 (Contrast Ratio)

#### 공식
```typescript
// 1. 상대 휘도 (Relative Luminance) 계산
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// 2. 대비 비율 계산
function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(...chroma(color1).rgb())
  const l2 = getLuminance(...chroma(color2).rgb())

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}
```

#### WCAG 기준표

| 레벨 | 일반 텍스트 | 큰 텍스트* | 용도 |
|------|------------|-----------|------|
| **AA** | 4.5:1 | 3:1 | 최소 권장 |
| **AAA** | 7:1 | 4.5:1 | 최상의 접근성 |

*큰 텍스트 = 18pt (24px) 이상 또는 14pt (18.5px) Bold

---

## 3. 자동 검증 로직

### 3.1 검증 대상

팔레트의 모든 색상 조합을 검증:

```typescript
function validatePalette(colors: Color[]): AccessibilityCheck[] {
  const checks: AccessibilityCheck[] = []
  const textColors = ['#000000', '#FFFFFF'] // 검정, 흰색

  // 각 팔레트 색상에 대해
  colors.forEach((bg) => {
    // 텍스트 색상과의 대비 비율 계산
    textColors.forEach((fg) => {
      const ratio = getContrastRatio(fg, bg.hex)
      const passAA = ratio >= 4.5
      const passAAA = ratio >= 7.0

      checks.push({
        foreground: fg,
        background: bg.hex,
        contrast: {
          ratio,
          passAA,
          passAAA,
          level: passAAA ? 'AAA' : passAA ? 'AA' : 'fail',
        },
      })
    })
  })

  return checks
}
```

### 3.2 실시간 검증

```typescript
// 팔레트 업데이트 시 자동 실행
useEffect(() => {
  const checks = validatePalette(colors)
  setAccessibilityChecks(checks)

  // 경고 카운트
  const warnings = checks.filter(c => !c.contrast.passAA).length
  setWarningCount(warnings)
}, [colors])
```

---

## 4. 자동 수정 제안

### 4.1 알고리즘

```typescript
function suggestAccessibleColor(
  foreground: string,
  background: string,
  targetLevel: WCAGLevel = 'AA'
): string {
  const targetRatio = targetLevel === 'AAA' ? 7.0 : 4.5
  let color = chroma(foreground)

  // 최대 50번 시도
  for (let i = 0; i < 50; i++) {
    const ratio = getContrastRatio(color.hex(), background)

    if (ratio >= targetRatio) {
      return color.hex()
    }

    // 명도 조정 (배경이 밝으면 어둡게, 어두우면 밝게)
    const bgLightness = chroma(background).get('hsl.l')
    const currentL = color.get('hsl.l')

    const newL = bgLightness > 0.5
      ? currentL - 0.05  // 어둡게
      : currentL + 0.05  // 밝게

    color = color.set('hsl.l', Math.max(0, Math.min(1, newL)))
  }

  // 실패 시 흑백 반환
  return chroma(background).get('hsl.l') > 0.5 ? '#000000' : '#FFFFFF'
}
```

### 4.2 사용자 플로우

```
[팔레트 생성 완료]
  ↓
[자동 검증]
  ↓
⚠️ "Primary button has low contrast (3.2:1)"
  ↓
[Fix Automatically] 버튼 클릭
  ↓
색상 자동 조정
  ↓
✅ "Contrast improved to 4.6:1 (AA)"
  ↓
[Keep] 또는 [Undo] 선택
```

---

## 5. UI 표시

### 5.1 경고 표시

```
[모두 통과 시]
✅ All accessibility checks passed (AA)

[경고 있을 시]
⚠️ 3 color pairs have low contrast
  [View Details] [Fix All Automatically]

[Details 확장 시]
┌────────────────────────────────┐
│ ⚠️ Primary Button              │
│ Text: #FFFFFF on #3B82F6       │
│ Contrast: 3.2:1 (needs 4.5:1)  │
│ [Fix] [Ignore]                 │
├────────────────────────────────┤
│ ✅ Secondary Button            │
│ Text: #1E293B on #F1F5F9       │
│ Contrast: 12.6:1               │
└────────────────────────────────┘
```

### 5.2 색상 카드 표시

```
┌─────────────┐
│   #3B82F6   │
│   ███████   │
│   Blue      │
│ ⚠️ Low contrast │ ← 경고 표시
└─────────────┘
```

---

## 6. 데이터 구조

### 6.1 TypeScript 인터페이스

```typescript
// types/accessibility.ts

export type WCAGLevel = 'AA' | 'AAA'

export interface ContrastResult {
  ratio: number          // 대비 비율 (예: 4.52)
  passAA: boolean        // AA 기준 통과 여부
  passAAA: boolean       // AAA 기준 통과 여부
  level: 'fail' | 'AA' | 'AAA'
}

export interface AccessibilityCheck {
  foreground: string     // 전경색 (텍스트)
  background: string     // 배경색
  contrast: ContrastResult
  suggestion?: string    // 개선 제안 색상
}

export interface AccessibilityState {
  checks: AccessibilityCheck[]
  warningCount: number
  isFixing: boolean
}
```

### 6.2 Store

```typescript
interface AccessibilityStore {
  checks: AccessibilityCheck[]
  warningCount: number

  validateColors: (colors: Color[]) => void
  fixColor: (index: number) => void
  fixAll: () => void
}
```

---

## 7. 성능 최적화

### 7.1 Debounce

```typescript
import { debounce } from '@/lib/utils'

// 색상 변경 시 100ms 지연 후 검증
const debouncedValidate = useMemo(
  () => debounce(validateColors, 100),
  []
)

useEffect(() => {
  debouncedValidate(colors)
}, [colors])
```

### 7.2 Web Worker (Phase 2)

대량 검증 시 메인 스레드 블록 방지

```typescript
// worker/accessibility.worker.ts
self.onmessage = (e) => {
  const { colors } = e.data
  const checks = validatePalette(colors)
  self.postMessage({ checks })
}
```

---

## 8. 테스트 케이스

### 8.1 단위 테스트

```typescript
describe('Accessibility', () => {
  it('should calculate contrast ratio correctly', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF')
    expect(ratio).toBe(21) // 완벽한 대비
  })

  it('should pass AA for 4.5:1 ratio', () => {
    const result = checkContrast('#767676', '#FFFFFF')
    expect(result.passAA).toBe(true)
  })

  it('should suggest accessible color', () => {
    const suggested = suggestAccessibleColor('#3B82F6', '#FFFFFF')
    const ratio = getContrastRatio(suggested, '#FFFFFF')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})
```

### 8.2 통합 테스트

```
1. 팔레트 생성 → 접근성 자동 검증 확인
2. 경고 표시 → 개수 정확성 확인
3. [Fix] 버튼 → 대비 비율 개선 확인
4. [Undo] 버튼 → 원래 색상 복구 확인
```

---

## 9. 에러 처리

| 시나리오 | 대응 |
|----------|------|
| 색상 파싱 실패 | 기본값(#000000) 사용 |
| 계산 오류 | 경고 표시 스킵 |
| 자동 수정 실패 | 흑백 제안 |

---

## 10. 향후 개선 사항 (Phase 3)

### 10.1 색맹 시뮬레이션

```typescript
type ColorBlindness = 'protanopia' | 'deuteranopia' | 'tritanopia'

function simulateColorBlindness(
  color: string,
  type: ColorBlindness
): string {
  // 색맹 변환 매트릭스 적용
  // ...
}
```

### 10.2 APCA (Advanced Perceptual Contrast Algorithm)

WCAG 3.0 예정 알고리즘

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
