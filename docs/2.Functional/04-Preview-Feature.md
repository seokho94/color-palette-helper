# UI 미리보기 기능 정의서

**작성자**: 박지훈 (UI/UX), 정하은 (Frontend)
**작성일**: 2026-02-23
**버전**: 1.0
**MVP 포함**: ✅ Yes

---

## 1. 기능 개요

### 1.1 목적
생성된 팔레트가 실제 UI 컴포넌트에 적용된 모습을 실시간으로 미리보기

### 1.2 비즈니스 가치
- **시각화**: 추상적인 색상 → 구체적인 적용 모습
- **의사결정**: 실제 사용 시 문제점 즉시 발견
- **신뢰성**: 전문적인 도구로 인식

---

## 2. 미리보기 컴포넌트

### 2.1 버튼 (Button)

#### 3가지 상태
```tsx
<PreviewButton>
  <Button variant="primary">Primary Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button disabled>Disabled Button</Button>
</PreviewButton>
```

#### 적용 색상
- **Primary**: `colors[0]` (배경) + 대비 텍스트 (흑/백 자동 선택)
- **Secondary**: `colors[1]` (배경) + 대비 텍스트
- **Disabled**: 회색 (`#9CA3AF`)

#### 표시 정보
```
┌──────────────┐
│ Primary Btn  │ ← 버튼
│ Contrast: 4.8:1 (AA) │ ← 접근성 정보
└──────────────┘
```

---

### 2.2 카드 (Card)

#### UI 구성
```tsx
<PreviewCard>
  <Card>
    <CardHeader>Card Title</CardHeader>
    <CardContent>
      This is a sample card with the generated palette.
    </CardContent>
  </Card>
</PreviewCard>
```

#### 적용 색상
- **Background**: `colors[3]` 또는 밝은 회색
- **Border**: `colors[2]` 또는 연한 회색
- **Title**: `colors[0]`
- **Text**: 검정/회색

---

### 2.3 텍스트 (Typography)

#### 3가지 레벨
```tsx
<PreviewText>
  <h1 style={{ color: colors[0] }}>Heading 1</h1>
  <h2 style={{ color: colors[1] }}>Heading 2</h2>
  <p style={{ color: '#374151' }}>
    Body text with normal size and color.
  </p>
  <a style={{ color: colors[0] }}>Link Text</a>
</PreviewText>
```

#### 접근성 표시
각 텍스트 옆에 대비 비율 표시

---

### 2.4 폼 (Form)

#### UI 구성
```tsx
<PreviewForm>
  <Input
    placeholder="Enter your email"
    focusColor={colors[0]}
  />
  <Input
    value="Success"
    state="success"
    borderColor={colors[1]}
  />
  <Input
    value="Error"
    state="error"
    borderColor="#EF4444"
  />
</PreviewForm>
```

#### 상태별 색상
- **Default**: 회색 테두리
- **Focus**: `colors[0]` 테두리 + Shadow
- **Success**: `colors[1]` (녹색 계열이면 유지, 아니면 #10B981)
- **Error**: 빨간색 (#EF4444)

---

## 3. 탭 네비게이션

### 3.1 UI 구조

```
[Preview Panel Header]
┌──────────────────────────────────┐
│ [Button] [Card] [Text] [Form]   │ ← 탭
├──────────────────────────────────┤
│                                  │
│  [선택된 탭의 미리보기]            │
│                                  │
└──────────────────────────────────┘
```

### 3.2 인터랙션

```typescript
const [activeTab, setActiveTab] = useState<PreviewTab>('button')

const tabs: PreviewTab[] = ['button', 'card', 'text', 'form']

// 키보드 단축키
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      const currentIndex = tabs.indexOf(activeTab)
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveTab(tabs[nextIndex])
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [activeTab])
```

---

## 4. 실시간 업데이트

### 4.1 자동 반영

```typescript
// 팔레트 변경 시 자동 업데이트
const { colors } = usePaletteStore()

useEffect(() => {
  // Debounce 100ms
  const timer = setTimeout(() => {
    updatePreview(colors)
  }, 100)

  return () => clearTimeout(timer)
}, [colors])
```

### 4.2 애니메이션

```css
/* 색상 전환 애니메이션 */
.preview-component {
  transition: background-color 0.3s ease-in-out,
              color 0.3s ease-in-out,
              border-color 0.3s ease-in-out;
}
```

---

## 5. 대비 텍스트 자동 선택

### 5.1 알고리즘

```typescript
/**
 * 배경색에 대해 최적의 텍스트 색상 선택 (흑/백)
 */
function getContrastText(backgroundColor: string): string {
  const blackContrast = getContrastRatio('#000000', backgroundColor)
  const whiteContrast = getContrastRatio('#FFFFFF', backgroundColor)

  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
}
```

---

## 6. 반응형 레이아웃

### 6.1 데스크톱
3단 레이아웃의 오른쪽 패널 (고정 폭)

### 6.2 모바일
- 탭 → Accordion으로 변경
- 스와이프로 탭 전환 가능

---

## 7. 테스트 케이스

```typescript
describe('Preview', () => {
  it('should display button with palette colors', () => {
    render(<PreviewButton colors={mockColors} />)
    const button = screen.getByRole('button', { name: /primary/i })
    expect(button).toHaveStyle({ backgroundColor: mockColors[0].hex })
  })

  it('should auto-select contrast text', () => {
    const darkBg = '#000000'
    const text = getContrastText(darkBg)
    expect(text).toBe('#FFFFFF')
  })
})
```

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
