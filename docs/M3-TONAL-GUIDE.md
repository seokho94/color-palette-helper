# Material Design 3 Tonal Palette Guide

## 🎨 개요

Material Design 3의 Tonal Palette 시스템을 구현했습니다. 이 시스템은 Google의 최신 디자인 언어로, 단일 색상에서 13단계의 톤을 생성하여 일관되고 접근 가능한 색상 팔레트를 만듭니다.

## 📚 핵심 개념

### Tonal Palette

각 색상에 대해 0부터 100까지 13개의 톤을 생성합니다:

```
Tone 0   - 완전 검정
Tone 10  - 매우 어두운 톤
Tone 20  - 어두운 톤
Tone 30  - 어두운 톤
Tone 40  - 중간 어두운 톤 (Primary Light Theme)
Tone 50  - 중간 톤
Tone 60  - 중간 밝은 톤
Tone 70  - 밝은 톤
Tone 80  - 밝은 톤 (Primary Dark Theme)
Tone 90  - 매우 밝은 톤 (Container)
Tone 95  - 거의 흰색
Tone 99  - 거의 흰색 (Background)
Tone 100 - 완전 흰색
```

### Core Palettes

하나의 Seed Color에서 6개의 Core Palette를 생성합니다:

1. **Primary** - 기준 색상 그대로
2. **Secondary** - +60° 회전, 채도 80%
3. **Tertiary** - +120° 회전, 채도 90%
4. **Neutral** - 거의 무채색 (채도 5%)
5. **Neutral Variant** - 약간의 색조 (채도 15%)
6. **Error** - 빨간색 계열 (고정)

## 🎯 Color Roles

### Light Theme

```typescript
primary: Tone 40
onPrimary: Tone 100
primaryContainer: Tone 90
onPrimaryContainer: Tone 10

background: Tone 99 (neutral)
onBackground: Tone 10 (neutral)
surface: Tone 99 (neutral)
onSurface: Tone 10 (neutral)
```

### Dark Theme

```typescript
primary: Tone 80
onPrimary: Tone 20
primaryContainer: Tone 30
onPrimaryContainer: Tone 90

background: Tone 10 (neutral)
onBackground: Tone 90 (neutral)
surface: Tone 10 (neutral)
onSurface: Tone 90 (neutral)
```

## 💻 사용 방법

### 1. UI에서 선택

Harmony Selector에서 **"Material Design 3 Tonal"**을 선택하세요.

### 2. 프로그래밍 방식

```typescript
import { generateM3CorePalettes, createLightThemeRoles } from '@/lib/color/tonal'
import { createLightThemeRoles } from '@/lib/color/m3-roles'

// Core Palettes 생성
const palettes = generateM3CorePalettes('#3B82F6')

// Light Theme Roles 생성
const lightRoles = createLightThemeRoles(palettes)

// Dark Theme Roles 생성
const darkRoles = createDarkThemeRoles(palettes)

// 사용 예시
console.log(lightRoles.primary)           // Tone 40
console.log(lightRoles.onPrimary)         // Tone 100
console.log(lightRoles.primaryContainer)  // Tone 90
```

### 3. 간소화된 형태 사용

```typescript
import { simplifyM3Roles } from '@/lib/color/m3-roles'

const simplified = simplifyM3Roles(lightRoles)

// 기존 ColorRoles와 호환되는 형태
console.log(simplified.primary)
console.log(simplified.background)
console.log(simplified.textOnPrimary)
```

## 🎨 생성되는 6개 색상

M3 Tonal Harmony Rule로 생성되는 6개 색상:

```typescript
[
  Tone 40,  // Primary (Light Theme Primary)
  Tone 80,  // Light Primary (Dark Theme Primary)
  Tone 90,  // Container (밝은 배경)
  Tone 30,  // Dark Primary (어두운 강조)
  Tone 95,  // Surface (거의 흰색, Neutral)
  Tone 10,  // On Surface (거의 검정, Neutral)
]
```

## ✅ 장점

1. **일관성**: 모든 색상이 동일한 색조를 유지
2. **접근성**: WCAG 대비 기준을 자동으로 만족
3. **확장성**: 13단계 톤으로 세밀한 조정 가능
4. **테마 지원**: Light/Dark 테마 자동 생성
5. **구글 표준**: Material Design 3 공식 시스템

## 📖 참고 자료

- [Material Design 3 Color System](https://m3.material.io/styles/color/)
- [Material Theme Builder](https://m3.material.io/theme-builder)
- [HCT Color Space](https://material.io/blog/science-of-color-design)

## 🔧 기술 구현

- **Color Space**: HSL 기반 (Chroma.js)
- **Tone 조정**: Lightness 0~1 매핑
- **채도 보정**: 어두운 톤에서 채도 자동 조정
- **Neutral**: 채도를 5~15%로 낮춰 무채색 생성

## 💡 활용 예시

### 버튼 디자인

```typescript
// Primary Button
background: roles.primary        // Tone 40
color: roles.onPrimary          // Tone 100

// Container Button
background: roles.primaryContainer  // Tone 90
color: roles.onPrimaryContainer    // Tone 10
```

### 카드 디자인

```typescript
// Light Theme Card
background: roles.surface        // Tone 99
color: roles.onSurface          // Tone 10

// Dark Theme Card
background: roles.surface        // Tone 10
color: roles.onSurface          // Tone 90
```

---

**Updated**: 2026-02-23
