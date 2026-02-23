# 2. Functional - 기능 정의서

이 폴더에는 색상 추천 서비스의 기능별 상세 정의서가 포함되어 있습니다.

## 👥 작성자

| 역할 | 이름 | 담당 |
|------|------|------|
| PM | 김민수 | 기능 우선순위, 비즈니스 요구사항 |
| PL | 이서연 | 기술 스펙, API 설계 |
| 기획자 | 강수진 | 비즈니스 로직, 사용자 시나리오 |
| Frontend | 정하은 | 프론트엔드 구현 상세 |
| Backend | (필요시) | 백엔드 API (Phase 2) |
| UI/UX | 박지훈 | 사용자 인터랙션 |

## 📁 문서 구조

| 문서 | 기능 | MVP | 작성일 |
|------|------|-----|--------|
| [01-Color-Input-Feature.md](./01-Color-Input-Feature.md) | 색상 입력 | ✅ | 2026-02-23 |
| [02-Palette-Generation-Feature.md](./02-Palette-Generation-Feature.md) | 팔레트 생성 | ✅ | 2026-02-23 |
| [03-Accessibility-Feature.md](./03-Accessibility-Feature.md) | 접근성 검증 | ✅ | 2026-02-23 |
| [04-Preview-Feature.md](./04-Preview-Feature.md) | UI 미리보기 | ✅ | 2026-02-23 |
| [05-Export-Feature.md](./05-Export-Feature.md) | 코드 내보내기 | ✅ | 2026-02-23 |
| [06-History-Feature.md](./06-History-Feature.md) | 히스토리 & 즐겨찾기 | ✅ | 2026-02-23 |
| [07-Share-Feature.md](./07-Share-Feature.md) | URL 공유 | ✅ | 2026-02-23 |

## 🎯 MVP 기능 범위

### ✅ Phase 1 (MVP - 4주)
1. **색상 입력**: Color Picker, HEX/RGB/HSL 입력, 이미지 업로드
2. **팔레트 생성**: 6가지 조화 규칙, 색상 잠금, 랜덤 생성
3. **접근성 검증**: WCAG AA/AAA 대비 비율, 자동 수정 제안
4. **미리보기**: 버튼, 카드, 텍스트, 폼 컴포넌트
5. **내보내기**: HEX, RGB, HSL, CSS, Tailwind, JSON
6. **히스토리**: LocalStorage 저장, 즐겨찾기
7. **공유**: URL Query String 기반

### ❌ Phase 2 이후
- URL 스크린샷 분석
- 산업별/무드별 추천
- AI 기반 추천
- 사용자 인증 & 클라우드 저장

## 📊 기능 의존성 다이어그램

```
색상 입력
  ↓
팔레트 생성 ←→ 접근성 검증
  ↓              ↓
미리보기 ←──────┘
  ↓
내보내기
  ↓
히스토리 ←→ 공유
```

## 🔄 공통 데이터 모델

### Color 인터페이스
```typescript
interface Color {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  name?: string
  role?: 'primary' | 'secondary' | 'accent' | 'background' | 'text'
  locked?: boolean
}
```

### Palette 인터페이스
```typescript
interface Palette {
  id: string
  colors: Color[]
  baseColor: string
  harmonyRule: HarmonyRule
  createdAt: Date
  isFavorite?: boolean
}
```

## 📖 문서 읽기 순서

1. **처음 읽는 경우**:
   - README.md (현재 문서)
   - 01-Color-Input-Feature.md
   - 02-Palette-Generation-Feature.md
   - 나머지 순서대로

2. **개발 시작 전**:
   - 해당 기능 정의서 정독
   - 03-Accessibility-Feature.md (핵심 차별점)

3. **API 설계 시**:
   - 각 문서의 "데이터 구조" 섹션 참고

## 🔄 업데이트 이력

- 2026-02-23: 초안 작성 (전체 팀)
