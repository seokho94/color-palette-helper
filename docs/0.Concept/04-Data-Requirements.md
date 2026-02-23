# 필요한 데이터 및 정보

## 1. 색상 이론 기초 데이터

### 1.1 색상환 (Color Wheel) 계산

#### HSL 기반 색상 조화 공식
```javascript
// 보색 (Complementary)
complementary = (hue + 180) % 360

// 유사색 (Analogous)
analogous = [(hue - 30) % 360, hue, (hue + 30) % 360]

// 삼색 조화 (Triadic)
triadic = [hue, (hue + 120) % 360, (hue + 240) % 360]

// 사색 조화 (Tetradic/Square)
tetradic = [hue, (hue + 90) % 360, (hue + 180) % 360, (hue + 270) % 360]

// 분할 보색 (Split-Complementary)
splitComplementary = [hue, (hue + 150) % 360, (hue + 210) % 360]
```

#### 색상 변환 공식
```javascript
// HEX ↔ RGB
hex_to_rgb = (hex) => {
  r = parseInt(hex.slice(1,3), 16)
  g = parseInt(hex.slice(3,5), 16)
  b = parseInt(hex.slice(5,7), 16)
  return [r, g, b]
}

// RGB ↔ HSL
// https://en.wikipedia.org/wiki/HSL_and_HSV
```

---

## 2. 접근성 (Accessibility) 기준

### 2.1 WCAG 2.1 대비 비율

#### 계산 공식
```javascript
// 상대 휘도 (Relative Luminance)
luminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// 대비 비율 (Contrast Ratio)
contrast_ratio = (L1, L2) => {
  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (lighter + 0.05) / (darker + 0.05)
}
```

#### 기준표
| 레벨 | 일반 텍스트 | 큰 텍스트* | 용도 |
|------|------------|-----------|------|
| AA   | 4.5:1      | 3:1       | 최소 권장 |
| AAA  | 7:1        | 4.5:1     | 최상의 접근성 |

*큰 텍스트 = 18pt(24px) 이상 또는 14pt(18.5px) Bold

### 2.2 색맹 시뮬레이션

```javascript
// 색맹 유형별 변환 매트릭스
color_blindness_matrices = {
  protanopia: [...],    // 적색맹 (Red-blind)
  deuteranopia: [...],  // 녹색맹 (Green-blind)
  tritanopia: [...]     // 청색맹 (Blue-blind)
}
```

---

## 3. 산업별 색상 경향 데이터

### 3.1 산업별 추천 색상 팔레트

```json
{
  "fintech": {
    "primary": ["#1E3A8A", "#3B82F6", "#60A5FA"],
    "description": "신뢰감, 안정성",
    "keywords": ["professional", "trustworthy", "secure"]
  },
  "healthcare": {
    "primary": ["#059669", "#10B981", "#34D399"],
    "secondary": ["#0EA5E9", "#38BDF8"],
    "description": "건강, 안정감",
    "keywords": ["healthy", "calm", "clean"]
  },
  "ecommerce": {
    "primary": ["#DC2626", "#EF4444", "#F87171"],
    "secondary": ["#F59E0B", "#FBBF24"],
    "description": "구매 욕구 자극",
    "keywords": ["energetic", "exciting", "action"]
  },
  "education": {
    "primary": ["#2563EB", "#3B82F6"],
    "secondary": ["#10B981", "#34D399"],
    "description": "집중력, 학습 효율",
    "keywords": ["focused", "growth", "knowledge"]
  },
  "food": {
    "primary": ["#DC2626", "#F59E0B", "#FBBF24"],
    "description": "식욕 유발",
    "keywords": ["appetizing", "warm", "delicious"]
  },
  "luxury": {
    "primary": ["#000000", "#1F2937"],
    "accent": ["#D4AF37", "#F59E0B"],
    "description": "고급스러움, 프리미엄",
    "keywords": ["elegant", "premium", "sophisticated"]
  },
  "tech": {
    "primary": ["#6366F1", "#8B5CF6", "#A855F7"],
    "description": "혁신, 미래지향적",
    "keywords": ["innovative", "modern", "futuristic"]
  },
  "nature": {
    "primary": ["#059669", "#10B981"],
    "secondary": ["#0891B2", "#06B6D4"],
    "description": "자연, 친환경",
    "keywords": ["organic", "natural", "sustainable"]
  }
}
```

### 3.2 감성/무드별 색상 조합

```json
{
  "modern": {
    "palette": ["#000000", "#6B7280", "#F3F4F6", "#3B82F6"],
    "saturation": "medium-low",
    "lightness": "varied"
  },
  "minimal": {
    "palette": ["#000000", "#FFFFFF", "#F5F5F5", "#E5E5E5"],
    "saturation": "very-low",
    "lightness": "high-contrast"
  },
  "vibrant": {
    "palette": ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"],
    "saturation": "high",
    "lightness": "medium"
  },
  "pastel": {
    "palette": ["#FBE7F3", "#DBEAFE", "#D1FAE5", "#FEF3C7"],
    "saturation": "low",
    "lightness": "high"
  },
  "dark": {
    "palette": ["#000000", "#1F2937", "#374151", "#4B5563"],
    "saturation": "low",
    "lightness": "very-low"
  }
}
```

---

## 4. 참고 색상 시스템

### 4.1 Material Design 색상 팔레트
- https://material.io/design/color/the-color-system.html
- 500 단계 기준 + 50~900 음영

### 4.2 Tailwind CSS 색상 시스템
```javascript
// 50~950까지 10단계 음영
colors = {
  slate: { 50: '#f8fafc', ..., 950: '#020617' },
  gray: { 50: '#f9fafb', ..., 950: '#030712' },
  // ... 전체 22개 색상
}
```

### 4.3 Radix Colors
- https://www.radix-ui.com/colors
- 접근성 기반 12단계 색상 스케일

---

## 5. 알고리즘 참고 자료

### 5.1 색상 추출 알고리즘
```
- K-Means Clustering: 이미지에서 지배적인 색상 추출
- Median Cut: 색상 양자화
- MMCQ (Modified Median Cut Quantization): color-thief 사용
```

### 5.2 색상 유사도 계산
```javascript
// Delta E (CIE76)
deltaE = sqrt(
  (L2 - L1)^2 +
  (a2 - a1)^2 +
  (b2 - b1)^2
)

// Delta E < 2.3: 거의 동일
// Delta E < 5: 유사
```

---

## 6. 외부 데이터 소스 (선택 사항)

### 6.1 트렌드 데이터
- **Dribbble API**: 디자인 트렌드 색상
- **Behance API**: 크리에이티브 프로젝트 색상
- **Adobe Color**: 커뮤니티 색상 테마

### 6.2 브랜드 색상 데이터
- **Brand Colors**: 유명 브랜드 색상 DB
- **Logo API**: 로고 기반 색상 추출

### 6.3 이미지 소스
- **Unsplash API**: 샘플 이미지
- **Pexels API**: 무료 이미지

---

## 7. 데이터 구조 예시

### 7.1 색상 팔레트 스키마
```typescript
interface ColorPalette {
  id: string
  name: string
  colors: Color[]
  createdAt: Date
  tags: string[]
  industry?: string
  mood?: string
  accessibility: {
    wcagAA: boolean
    wcagAAA: boolean
  }
}

interface Color {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  role: 'primary' | 'secondary' | 'accent' | 'background' | 'text'
}
```

### 7.2 사용자 생성 팔레트 저장
```typescript
interface UserPalette {
  userId: string
  palette: ColorPalette
  isFavorite: boolean
  source: 'generated' | 'extracted' | 'manual'
  sourceUrl?: string
}
```
