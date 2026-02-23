# URL 공유 기능 정의서

**작성자**: 정하은 (Frontend), 김민수 (PM)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes

---

## 1. 기능 개요

### 1.1 목적
생성한 팔레트를 URL로 공유하여 다른 사람과 협업

### 1.2 비즈니스 가치
- **바이럴**: 소셜 미디어 공유 → 유입 증가
- **협업**: 팀원과 팔레트 공유
- **영구 링크**: 나중에 다시 접근 가능

---

## 2. URL 구조

### 2.1 Query String 방식

```
https://color-palette-helper.vercel.app/?palette=3B82F6-10B981-F59E0B-EF4444-8B5CF6&rule=triadic
```

#### 파라미터
- `palette`: HEX 색상들을 `-`로 연결 (# 제외)
- `rule`: 조화 규칙 (complementary, analogous, triadic 등)

### 2.2 인코딩/디코딩

```typescript
// 인코딩
function encodePalette(colors: Color[], rule: HarmonyRule): string {
  const hexes = colors.map(c => c.hex.replace('#', '')).join('-')
  return `?palette=${hexes}&rule=${rule}`
}

// 디코딩
function decodePalette(url: string): { colors: string[], rule: HarmonyRule } {
  const params = new URLSearchParams(url)
  const palette = params.get('palette') || ''
  const rule = params.get('rule') as HarmonyRule || 'complementary'

  const colors = palette.split('-').map(hex => `#${hex}`)

  return { colors, rule }
}
```

---

## 3. 공유 플로우

### 3.1 사용자 플로우

```
1. 팔레트 생성 완료
   ↓
2. [Share] 버튼 클릭
   ↓
3. URL 자동 생성
   ↓
4. 모달 표시:
   ┌─────────────────────────────┐
   │ Share Palette               │
   │                             │
   │ https://color-palette...    │
   │ [Copy Link]                 │
   │                             │
   │ Share on:                   │
   │ [Twitter] [Facebook]        │
   └─────────────────────────────┘
   ↓
5. [Copy Link] 클릭
   ↓
6. ✅ "Link copied!" 토스트
```

### 3.2 URL 로드 플로우

```
1. 공유된 URL 접속
   ↓
2. Query String 파싱
   ↓
3. 팔레트 복원
   ↓
4. 화면에 표시
   ↓
5. (선택) 히스토리에 자동 저장
```

---

## 4. 소셜 미디어 공유

### 4.1 Twitter

```typescript
function shareToTwitter(url: string) {
  const text = encodeURIComponent('Check out my color palette!')
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
  window.open(shareUrl, '_blank')
}
```

### 4.2 Facebook

```typescript
function shareToFacebook(url: string) {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
  window.open(shareUrl, '_blank')
}
```

### 4.3 Web Share API (모바일)

```typescript
async function shareNative(url: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Color Palette',
        text: 'Check out this color palette!',
        url,
      })
    } catch (error) {
      console.error('Share failed', error)
    }
  } else {
    // Fallback: Copy to clipboard
    copyToClipboard(url)
  }
}
```

---

## 5. Open Graph 메타 태그

```tsx
// app/layout.tsx 또는 dynamic
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const palette = searchParams.palette

  if (palette) {
    return {
      title: 'Color Palette - Shared',
      description: `Beautiful color palette: ${palette}`,
      openGraph: {
        images: [
          {
            url: `/api/og?palette=${palette}`, // OG Image 생성 (Phase 2)
            width: 1200,
            height: 630,
          }
        ],
      },
    }
  }

  return { /* default metadata */ }
}
```

---

## 6. 유효성 검증

```typescript
function validatePaletteUrl(palette: string): boolean {
  const hexes = palette.split('-')

  // 2~10개 색상
  if (hexes.length < 2 || hexes.length > 10) return false

  // 각 HEX 검증
  const hexPattern = /^[0-9A-Fa-f]{6}$/
  return hexes.every(hex => hexPattern.test(hex))
}

// 사용
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const palette = params.get('palette')

  if (palette && validatePaletteUrl(palette)) {
    loadPaletteFromUrl(palette)
  }
}, [])
```

---

## 7. 에러 처리

| 시나리오 | 대응 |
|----------|------|
| 잘못된 HEX | 무시하고 나머지만 로드 |
| 색상 < 2개 | 기본 팔레트 표시 + 경고 |
| 잘못된 규칙 | 기본값 (complementary) 사용 |

---

## 8. 테스트 케이스

```typescript
describe('Share', () => {
  it('should encode palette to URL', () => {
    const url = encodePalette(mockColors, 'triadic')
    expect(url).toContain('palette=3B82F6')
    expect(url).toContain('rule=triadic')
  })

  it('should decode URL to palette', () => {
    const url = '?palette=3B82F6-10B981&rule=analogous'
    const { colors, rule } = decodePalette(url)
    expect(colors).toHaveLength(2)
    expect(rule).toBe('analogous')
  })

  it('should validate palette URL', () => {
    expect(validatePaletteUrl('3B82F6-10B981')).toBe(true)
    expect(validatePaletteUrl('GGGGGG')).toBe(false)
  })
})
```

---

## 9. 향후 개선 사항 (Phase 2)

### 9.1 짧은 URL (Short URL)
```
https://colorpal.app/p/a1b2c3 (Backend 필요)
```

### 9.2 OG Image 자동 생성
Next.js API Route로 팔레트 이미지 생성

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
