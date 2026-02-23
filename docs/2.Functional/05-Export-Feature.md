# 코드 내보내기 기능 정의서

**작성자**: 정하은 (Frontend), 이서연 (PL)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes

---

## 1. 기능 개요

### 1.1 목적
생성된 팔레트를 다양한 포맷의 코드로 변환하여 복사

### 1.2 비즈니스 가치
- **생산성**: 수동 입력 제거
- **개발자 친화**: Tailwind, CSS Variables 등 지원
- **유연성**: 6가지 포맷 지원

---

## 2. 지원 포맷

### 2.1 HEX

```
#3B82F6
#10B981
#F59E0B
#EF4444
#8B5CF6
```

### 2.2 RGB

```
rgb(59, 130, 246)
rgb(16, 185, 129)
rgb(245, 158, 11)
rgb(239, 68, 68)
rgb(139, 92, 246)
```

### 2.3 HSL

```
hsl(221, 83%, 53%)
hsl(160, 84%, 39%)
hsl(38, 92%, 50%)
hsl(0, 84%, 60%)
hsl(258, 90%, 66%)
```

### 2.4 CSS Variables

```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #10B981;
  --color-accent: #F59E0B;
  --color-error: #EF4444;
  --color-info: #8B5CF6;
}
```

### 2.5 SCSS Variables

```scss
$color-primary: #3B82F6;
$color-secondary: #10B981;
$color-accent: #F59E0B;
$color-error: #EF4444;
$color-info: #8B5CF6;
```

### 2.6 Tailwind Config

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'secondary': '#10B981',
        'accent': '#F59E0B',
        'error': '#EF4444',
        'info': '#8B5CF6',
      }
    }
  }
}
```

### 2.7 JSON

```json
{
  "colors": [
    { "name": "primary", "hex": "#3B82F6", "rgb": [59, 130, 246] },
    { "name": "secondary", "hex": "#10B981", "rgb": [16, 185, 129] },
    { "name": "accent", "hex": "#F59E0B", "rgb": [245, 158, 11] },
    { "name": "error", "hex": "#EF4444", "rgb": [239, 68, 68] },
    { "name": "info", "hex": "#8B5CF6", "rgb": [139, 92, 246] }
  ]
}
```

---

## 3. 코드 생성 로직

### 3.1 구현

```typescript
// lib/export/css.ts
export function generateCSSVariables(colors: Color[]): string {
  const lines = colors.map((color, idx) => {
    const name = color.role || `color-${idx + 1}`
    return `  --${name}: ${color.hex};`
  })
  return `:root {\n${lines.join('\n')}\n}`
}

// lib/export/tailwind.ts
export function generateTailwindConfig(colors: Color[]): string {
  const colorObj: Record<string, string> = {}
  colors.forEach((color, idx) => {
    const name = color.role || `color${idx + 1}`
    colorObj[name] = color.hex
  })
  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorObj, null, 8)}
    }
  }
}`
}

// lib/export/json.ts
export function generateJSON(colors: Color[]): string {
  const data = {
    colors: colors.map((color, idx) => ({
      name: color.role || `color${idx + 1}`,
      hex: color.hex,
      rgb: color.rgb,
      hsl: color.hsl,
    }))
  }
  return JSON.stringify(data, null, 2)
}
```

---

## 4. UI 인터랙션

### 4.1 포맷 선택

```
[Export Panel]
┌───────────────────────────────────────┐
│ [HEX]  [RGB]  [HSL]  [CSS]  [Tailwind]│
│  ^^^^                                 │ ← 선택됨
├───────────────────────────────────────┤
│ #3B82F6                               │
│ #10B981                               │
│ #F59E0B                               │
│ #EF4444                               │
│ #8B5CF6                               │
│                           [Copy Code] │
└───────────────────────────────────────┘
```

### 4.2 복사 플로우

```
1. 포맷 버튼 클릭 (예: [Tailwind])
   ↓
2. 코드 블록 내용 업데이트
   ↓
3. [Copy Code] 버튼 클릭
   ↓
4. 클립보드에 복사
   ↓
5. ✅ "Copied to clipboard!" 토스트 (2초)
   ↓
6. 버튼 텍스트 "Copied!" (2초 후 원래대로)
```

---

## 5. 클립보드 API

```typescript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}
```

---

## 6. 토스트 알림

```tsx
import { toast } from '@/components/ui/toast'

function handleCopy() {
  const code = generateCode(selectedFormat, colors)
  const success = await copyToClipboard(code)

  if (success) {
    toast.success('Copied to clipboard!')
  } else {
    toast.error('Failed to copy')
  }
}
```

---

## 7. 키보드 단축키

```typescript
// C 키로 빠른 복사
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      return // 기본 복사 동작
    }
    if (e.key === 'c' || e.key === 'C') {
      handleCopy()
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

---

## 8. 테스트 케이스

```typescript
describe('Export', () => {
  it('should generate CSS variables', () => {
    const css = generateCSSVariables(mockColors)
    expect(css).toContain('--color-primary: #3B82F6')
  })

  it('should generate Tailwind config', () => {
    const config = generateTailwindConfig(mockColors)
    expect(config).toContain("'primary': '#3B82F6'")
  })

  it('should copy to clipboard', async () => {
    const success = await copyToClipboard('test')
    expect(success).toBe(true)
  })
})
```

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
