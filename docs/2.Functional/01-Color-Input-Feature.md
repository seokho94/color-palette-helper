# 색상 입력 기능 정의서

**작성자**: 강수진 (기획자), 정하은 (Frontend), 박지훈 (UI/UX)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes

---

## 1. 기능 개요

### 1.1 목적
사용자가 다양한 방법으로 색상을 입력하여 팔레트 생성의 기준점을 제공

### 1.2 비즈니스 가치
- **편의성**: 3가지 입력 방법 제공
- **유연성**: 초보자(Color Picker)부터 전문가(HEX 입력)까지 지원
- **차별화**: 이미지 색상 추출 (경쟁 도구 대비 우위)

### 1.3 사용자 스토리
```
As a 디자이너/개발자
I want to 다양한 방법으로 색상을 입력하고
So that 내가 원하는 베이스 컬러를 쉽게 선택할 수 있다
```

---

## 2. 기능 상세

### 2.1 Color Picker (수동 선택)

#### 설명
시각적 색상환을 통한 직관적 색상 선택

#### 사용자 플로우
```
1. Color Picker 영역 클릭
   ↓
2. 색상환에서 Hue 선택 (원형 또는 슬라이더)
   ↓
3. 명도/채도 조절
   ↓
4. 선택한 색상이 베이스 컬러로 설정
   ↓
5. 자동으로 조화 규칙 적용 → 팔레트 생성
```

#### 요구사항

| 항목 | 요구사항 | 우선순위 |
|------|----------|----------|
| **라이브러리** | react-colorful 사용 | P0 |
| **포맷** | HEX, RGB, HSL 모두 지원 | P0 |
| **실시간 미리보기** | 색상 변경 시 즉시 반영 | P0 |
| **Debounce** | 100ms 지연 적용 (성능) | P1 |
| **초기값** | #3B82F6 (파란색) | P1 |

#### UI 컴포넌트
```tsx
<ColorPicker
  color={baseColor}
  onChange={(color) => setBaseColor(color)}
/>
```

---

### 2.2 HEX/RGB/HSL 직접 입력

#### 설명
개발자 친화적인 색상 코드 직접 입력

#### 사용자 플로우
```
1. 입력란 클릭
   ↓
2. 색상 코드 입력 (예: #FF5733)
   ↓
3. Enter 또는 포커스 아웃
   ↓
4. 유효성 검증
   ↓
5. 유효하면 → 베이스 컬러로 설정
   유효하지 않으면 → 에러 메시지 표시
```

#### 요구사항

| 항목 | 요구사항 | 우선순위 |
|------|----------|----------|
| **지원 포맷** | HEX (#RRGGBB), RGB (255,87,51), HSL (9,100%,60%) | P0 |
| **유효성 검증** | 실시간 검증 + 에러 메시지 | P0 |
| **자동 변환** | RGB 입력 → HEX로 자동 변환 표시 | P1 |
| **대소문자** | HEX는 대문자로 정규화 | P1 |
| **복사 버튼** | 클립보드 복사 기능 | P1 |

#### 유효성 검증 규칙
```typescript
// HEX 검증
const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value)

// RGB 검증
const isValidRGB = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value)
  && r >= 0 && r <= 255
  && g >= 0 && g <= 255
  && b >= 0 && b <= 255

// HSL 검증
const isValidHSL = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/.test(value)
  && h >= 0 && h <= 360
  && s >= 0 && s <= 100
  && l >= 0 && l <= 100
```

#### 에러 메시지
```
- "Invalid HEX color. Use format: #RRGGBB"
- "Invalid RGB color. Values must be 0-255"
- "Invalid HSL color. H: 0-360, S/L: 0-100%"
```

---

### 2.3 이미지 업로드 및 색상 추출

#### 설명
이미지에서 자동으로 주요 색상 추출

#### 사용자 플로우
```
1. 이미지 업로드 (Drag & Drop 또는 파일 선택)
   ↓
2. 로딩 인디케이터 표시
   ↓
3. color-thief로 5개 주요 색상 추출 (1초 이내)
   ↓
4. 추출된 색상 표시
   ↓
5. 사용자가 원하는 색상 클릭
   ↓
6. 선택한 색상이 베이스 컬러로 설정
```

#### 요구사항

| 항목 | 요구사항 | 우선순위 |
|------|----------|----------|
| **업로드 방식** | Drag & Drop + 파일 선택 버튼 | P0 |
| **지원 포맷** | JPG, PNG, WebP | P0 |
| **최대 크기** | 5MB | P0 |
| **추출 색상 수** | 기본 5개, 확장 10개 | P0 |
| **처리 시간** | 1초 이내 (5MB 기준) | P1 |
| **썸네일 표시** | 업로드한 이미지 미리보기 | P1 |
| **Web Worker** | 메인 스레드 블록 방지 | P2 |

#### 파일 검증
```typescript
const validateImageFile = (file: File): ValidationResult => {
  // 포맷 검증
  if (!IMAGE_CONFIG.allowedFormats.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, WebP supported' }
  }

  // 크기 검증
  if (file.size > IMAGE_CONFIG.maxSize) {
    return { valid: false, error: 'Image too large (max 5MB)' }
  }

  return { valid: true }
}
```

#### UI 상태
```
- 초기: "Drag image here or click to upload"
- 드래그 중: 배경 하이라이트
- 업로드 중: "Extracting colors..." + 스피너
- 완료: 이미지 썸네일 + 추출된 색상 5개
- 에러: 빨간 테두리 + 에러 메시지
```

---

## 3. 데이터 구조

### 3.1 State 관리 (Zustand)

```typescript
interface ColorInputState {
  // 베이스 컬러
  baseColor: string

  // 이미지 관련
  uploadedImage: File | null
  extractedColors: Color[]
  isExtracting: boolean
  extractError: string | null

  // Actions
  setBaseColor: (color: string) => void
  uploadImage: (file: File) => Promise<void>
  selectExtractedColor: (index: number) => void
  clearImage: () => void
}
```

### 3.2 API (클라이언트 사이드)

#### extractColorsFromImage
```typescript
/**
 * 이미지에서 색상 추출
 */
async function extractColorsFromImage(
  file: File,
  count: number = 5
): Promise<Color[]> {
  const colorThief = new ColorThief()
  const img = await loadImage(file)
  const palette = colorThief.getPalette(img, count)

  return palette.map((rgb) => ({
    hex: chroma(rgb).hex(),
    rgb,
    hsl: chroma(rgb).hsl(),
  }))
}
```

---

## 4. 인터랙션 상세

### 4.1 Color Picker 인터랙션

```
[초기 상태]
- 색상환 표시
- 현재 색상: #3B82F6
- HEX 입력란에 #3B82F6 표시

[사용자가 색상환 드래그]
→ Debounce 100ms
→ baseColor 업데이트
→ 팔레트 자동 재생성

[사용자가 HEX 입력란 수정]
→ 유효성 검증
→ 유효하면: 색상환 위치 업데이트
→ 유효하지 않으면: 빨간 테두리
```

### 4.2 이미지 업로드 인터랙션

```
[드래그 앤 드롭]
1. 파일 드래그 → onDragEnter
   → 배경 하이라이트

2. 파일 드롭 → onDrop
   → 파일 검증
   → 유효하면: 색상 추출 시작
   → 유효하지 않으면: 에러 토스트

[파일 선택 버튼]
1. 버튼 클릭 → <input type="file"> 트리거
2. 파일 선택 → onChange
3. 이후 동일
```

---

## 5. 성능 요구사항

| 항목 | 목표 | 측정 방법 |
|------|------|----------|
| Color Picker 반응 속도 | < 100ms | Debounce 적용 |
| 이미지 색상 추출 | < 1초 (5MB) | Performance API |
| 메모리 사용량 | < 50MB | Chrome DevTools |

---

## 6. 에러 처리

### 6.1 에러 시나리오

| 시나리오 | 에러 메시지 | 대응 |
|----------|------------|------|
| 잘못된 HEX 입력 | "Invalid HEX color. Use format: #RRGGBB" | 입력란 빨간 테두리 |
| 이미지 크기 초과 | "Image too large (max 5MB)" | 토스트 알림 |
| 잘못된 포맷 | "Only JPG, PNG, WebP supported" | 토스트 알림 |
| 이미지 로드 실패 | "Failed to load image" | 토스트 알림 + 재시도 버튼 |
| 색상 추출 실패 | "Failed to extract colors" | 토스트 알림 + 재시도 버튼 |

---

## 7. 테스트 케이스

### 7.1 단위 테스트

```typescript
describe('Color Input', () => {
  it('should validate HEX color', () => {
    expect(isValidHex('#FF5733')).toBe(true)
    expect(isValidHex('#GGG')).toBe(false)
  })

  it('should extract colors from image', async () => {
    const mockImage = new File([''], 'test.jpg', { type: 'image/jpeg' })
    const colors = await extractColorsFromImage(mockImage)
    expect(colors).toHaveLength(5)
  })
})
```

### 7.2 통합 테스트

```
1. Color Picker로 색상 선택
   → baseColor 업데이트 확인
   → 팔레트 재생성 확인

2. HEX 입력
   → 유효한 값 입력 → 색상환 업데이트 확인
   → 유효하지 않은 값 → 에러 메시지 확인

3. 이미지 업로드
   → 색상 추출 → 추출된 색상 표시 확인
   → 색상 클릭 → baseColor 설정 확인
```

---

## 8. 향후 개선 사항 (Phase 2+)

### 8.1 이미지 분석 고도화
- Vibrant.js로 전환 (더 정교한 추출)
- 색상 역할 자동 분류 (Primary, Secondary, Accent)

### 8.2 URL 스크린샷 분석
- URL 입력 → 백엔드에서 스크린샷
- 색상 추출 후 반환

### 8.3 클립보드 붙여넣기
- 이미지 클립보드에서 직접 붙여넣기
- `Ctrl+V` 단축키 지원

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
