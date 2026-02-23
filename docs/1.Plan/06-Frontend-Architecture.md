# 프론트엔드 아키텍처 설계

**작성자**: 이서연 (PL), 정하은 (Frontend Developer)
**작성일**: 2026-02-23
**버전**: 1.0

---

## 1. 기술 스택

### 1.1 Core
```json
{
  "runtime": "Node.js 20 LTS",
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript 5.x",
  "package-manager": "pnpm"
}
```

### 1.2 UI & Styling
```json
{
  "css": "TailwindCSS 3.4",
  "components": "shadcn/ui (Radix UI 기반)",
  "icons": "lucide-react"
}
```

### 1.3 Color Libraries
```json
{
  "manipulation": "chroma-js",
  "extraction": "color-thief",
  "picker": "react-colorful"
}
```

### 1.4 State Management
```json
{
  "global": "Zustand",
  "server": "없음 (클라이언트 전용)",
  "local": "React useState"
}
```

### 1.5 Dev Tools
```json
{
  "linter": "ESLint",
  "formatter": "Prettier",
  "testing": "Vitest + Testing Library",
  "git-hooks": "Husky + lint-staged"
}
```

---

## 2. 프로젝트 구조

### 2.1 디렉토리 구조

```
color-palette-helper/
├── public/
│   ├── fonts/
│   └── images/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 메인 페이지
│   │   ├── globals.css         # 글로벌 스타일
│   │   └── api/                # API Routes (선택)
│   │
│   ├── components/             # React 컴포넌트
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── color/              # 색상 관련 컴포넌트
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   ├── ColorInput.tsx
│   │   │   └── HarmonySelector.tsx
│   │   │
│   │   ├── palette/            # 팔레트 관련
│   │   │   ├── PaletteDisplay.tsx
│   │   │   ├── PaletteCard.tsx
│   │   │   └── AccessibilityWarning.tsx
│   │   │
│   │   ├── preview/            # 미리보기 컴포넌트
│   │   │   ├── PreviewButton.tsx
│   │   │   ├── PreviewCard.tsx
│   │   │   ├── PreviewText.tsx
│   │   │   └── PreviewForm.tsx
│   │   │
│   │   ├── export/             # 내보내기
│   │   │   ├── CodeExporter.tsx
│   │   │   └── FormatSelector.tsx
│   │   │
│   │   └── layout/             # 레이아웃
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── MainLayout.tsx
│   │
│   ├── lib/                    # 유틸리티 & 라이브러리
│   │   ├── color/              # 색상 관련 로직
│   │   │   ├── harmony.ts      # 조화 규칙
│   │   │   ├── accessibility.ts # 접근성 검증
│   │   │   ├── converter.ts    # 색상 변환
│   │   │   └── extractor.ts    # 이미지 색상 추출
│   │   │
│   │   ├── export/             # 코드 생성
│   │   │   ├── css.ts
│   │   │   ├── tailwind.ts
│   │   │   └── json.ts
│   │   │
│   │   └── utils.ts            # 공통 유틸리티
│   │
│   ├── hooks/                  # Custom Hooks
│   │   ├── useColorPalette.ts
│   │   ├── useAccessibility.ts
│   │   ├── useImageUpload.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── store/                  # Zustand Store
│   │   ├── paletteStore.ts
│   │   └── historyStore.ts
│   │
│   ├── types/                  # TypeScript 타입
│   │   ├── color.ts
│   │   ├── palette.ts
│   │   └── accessibility.ts
│   │
│   └── constants/              # 상수
│       ├── colors.ts           # 산업별 팔레트 등
│       └── config.ts           # 앱 설정
│
├── docs/                       # 문서
├── tests/                      # 테스트
│   ├── unit/
│   └── integration/
│
├── .github/                    # GitHub Actions
├── .husky/                     # Git Hooks
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 3. 아키텍처 패턴

### 3.1 컴포넌트 구조

#### Atomic Design 원칙 (느슨하게 적용)

```
Atoms (기본 요소)
└── Button, Input, ColorSwatch

Molecules (조합)
└── ColorPicker, ColorInput, CodeBlock

Organisms (복잡한 조합)
└── PaletteDisplay, PreviewPanel, ExportPanel

Templates (레이아웃)
└── MainLayout

Pages (실제 페이지)
└── HomePage (app/page.tsx)
```

### 3.2 데이터 흐름

```
┌─────────────────┐
│  User Action    │ (이미지 업로드, 색상 선택)
└────────┬────────┘
         ↓
┌─────────────────┐
│  Event Handler  │ (컴포넌트 내 함수)
└────────┬────────┘
         ↓
┌─────────────────┐
│  Store Update   │ (Zustand)
└────────┬────────┘
         ↓
┌─────────────────┐
│  Color Library  │ (chroma.js, color-thief)
└────────┬────────┘
         ↓
┌─────────────────┐
│  State Change   │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Re-render      │ (React)
└─────────────────┘
```

---

## 4. 핵심 모듈 설계

### 4.1 색상 조화 모듈 (`lib/color/harmony.ts`)

```typescript
// src/lib/color/harmony.ts

import chroma from 'chroma-js';

export type HarmonyRule =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic';

export interface PaletteColor {
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
  name?: string;
  role?: 'primary' | 'secondary' | 'accent' | 'background' | 'text';
  locked?: boolean;
}

/**
 * 색상 조화 규칙에 따라 팔레트 생성
 */
export function generateHarmony(
  baseColor: string,
  rule: HarmonyRule,
  count: number = 5
): PaletteColor[] {
  const base = chroma(baseColor);
  const hue = base.get('hsl.h');

  let hues: number[] = [];

  switch (rule) {
    case 'complementary':
      hues = [hue, (hue + 180) % 360];
      break;
    case 'analogous':
      hues = [(hue - 30 + 360) % 360, hue, (hue + 30) % 360];
      break;
    case 'triadic':
      hues = [hue, (hue + 120) % 360, (hue + 240) % 360];
      break;
    case 'split-complementary':
      hues = [hue, (hue + 150) % 360, (hue + 210) % 360];
      break;
    case 'tetradic':
      hues = [hue, (hue + 90) % 360, (hue + 180) % 360, (hue + 270) % 360];
      break;
    case 'monochromatic':
      return generateMonochromatic(baseColor, count);
  }

  return hues.map((h) => {
    const color = chroma.hsl(h, base.get('hsl.s'), base.get('hsl.l'));
    return colorToObject(color);
  });
}

/**
 * 모노크롬 팔레트 생성 (명도 변화)
 */
function generateMonochromatic(
  baseColor: string,
  count: number
): PaletteColor[] {
  const base = chroma(baseColor);
  const hue = base.get('hsl.h');
  const saturation = base.get('hsl.s');

  const lightnesses = Array.from({ length: count }, (_, i) =>
    (i / (count - 1)) * 0.8 + 0.1
  ); // 0.1 ~ 0.9

  return lightnesses.map((l) => {
    const color = chroma.hsl(hue, saturation, l);
    return colorToObject(color);
  });
}

/**
 * Chroma 객체를 PaletteColor로 변환
 */
function colorToObject(color: chroma.Color): PaletteColor {
  return {
    hex: color.hex(),
    rgb: color.rgb() as [number, number, number],
    hsl: color.hsl() as [number, number, number],
    name: getColorName(color.hex()), // 별도 구현
  };
}
```

### 4.2 접근성 검증 모듈 (`lib/color/accessibility.ts`)

```typescript
// src/lib/color/accessibility.ts

import chroma from 'chroma-js';

export type WCAGLevel = 'AA' | 'AAA';

export interface ContrastResult {
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  level: 'fail' | 'AA' | 'AAA';
}

export interface AccessibilityCheck {
  foreground: string;
  background: string;
  contrast: ContrastResult;
  suggestion?: string;
}

/**
 * WCAG 대비 비율 계산
 */
export function getContrastRatio(color1: string, color2: string): number {
  return chroma.contrast(color1, color2);
}

/**
 * 대비 비율 검증
 */
export function checkContrast(
  foreground: string,
  background: string,
  largeText: boolean = false
): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  const aaThreshold = largeText ? 3 : 4.5;
  const aaaThreshold = largeText ? 4.5 : 7;

  const passAA = ratio >= aaThreshold;
  const passAAA = ratio >= aaaThreshold;

  let level: 'fail' | 'AA' | 'AAA' = 'fail';
  if (passAAA) level = 'AAA';
  else if (passAA) level = 'AA';

  return { ratio, passAA, passAAA, level };
}

/**
 * 대안 색상 자동 제안
 */
export function suggestAccessibleColor(
  foreground: string,
  background: string,
  targetLevel: WCAGLevel = 'AA'
): string {
  const targetRatio = targetLevel === 'AAA' ? 7 : 4.5;
  let color = chroma(foreground);

  // 명도 조정 (최대 50번 시도)
  for (let i = 0; i < 50; i++) {
    const ratio = chroma.contrast(color, background);
    if (ratio >= targetRatio) {
      return color.hex();
    }

    // 명도를 조금씩 조정
    const currentL = color.get('hsl.l');
    const bgL = chroma(background).get('hsl.l');

    const newL = bgL > 0.5 ? currentL - 0.05 : currentL + 0.05;
    color = color.set('hsl.l', newL);
  }

  // 실패 시 흑백 반환
  return chroma(background).get('hsl.l') > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * 팔레트 전체 접근성 검증
 */
export function validatePalette(
  colors: string[],
  textColor: string = '#000000'
): AccessibilityCheck[] {
  const checks: AccessibilityCheck[] = [];

  colors.forEach((bg) => {
    const contrast = checkContrast(textColor, bg);
    const check: AccessibilityCheck = {
      foreground: textColor,
      background: bg,
      contrast,
    };

    if (!contrast.passAA) {
      check.suggestion = suggestAccessibleColor(textColor, bg);
    }

    checks.push(check);
  });

  return checks;
}
```

### 4.3 이미지 색상 추출 모듈 (`lib/color/extractor.ts`)

```typescript
// src/lib/color/extractor.ts

import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { PaletteColor } from './harmony';

/**
 * 이미지에서 색상 추출 (Web Worker 사용 권장)
 */
export async function extractColorsFromImage(
  file: File,
  count: number = 5
): Promise<PaletteColor[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(img, count);

          const colors: PaletteColor[] = palette.map((rgb: [number, number, number]) => {
            const color = chroma(rgb);
            return {
              hex: color.hex(),
              rgb,
              hsl: color.hsl() as [number, number, number],
            };
          });

          resolve(colors);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * 지배적인 색상 1개 추출
 */
export async function getDominantColor(file: File): Promise<PaletteColor> {
  const colors = await extractColorsFromImage(file, 1);
  return colors[0];
}
```

### 4.4 코드 생성 모듈 (`lib/export/`)

```typescript
// src/lib/export/css.ts

import { PaletteColor } from '../color/harmony';

export function generateCSSVariables(colors: PaletteColor[]): string {
  const lines = colors.map((color, idx) => {
    const name = color.role || `color-${idx + 1}`;
    return `  --${name}: ${color.hex};`;
  });

  return `:root {\n${lines.join('\n')}\n}`;
}

// src/lib/export/tailwind.ts

export function generateTailwindConfig(colors: PaletteColor[]): string {
  const colorObj: Record<string, string> = {};

  colors.forEach((color, idx) => {
    const name = color.role || `color${idx + 1}`;
    colorObj[name] = color.hex;
  });

  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorObj, null, 8)}
    }
  }
}`;
}

// src/lib/export/json.ts

export function generateJSON(colors: PaletteColor[]): string {
  return JSON.stringify({ colors }, null, 2);
}
```

---

## 5. 상태 관리 (Zustand)

### 5.1 Palette Store

```typescript
// src/store/paletteStore.ts

import { create } from 'zustand';
import { PaletteColor, HarmonyRule, generateHarmony } from '@/lib/color/harmony';

interface PaletteState {
  colors: PaletteColor[];
  baseColor: string;
  harmonyRule: HarmonyRule;

  // Actions
  setBaseColor: (color: string) => void;
  setHarmonyRule: (rule: HarmonyRule) => void;
  updateColor: (index: number, color: PaletteColor) => void;
  toggleLock: (index: number) => void;
  randomize: () => void;
  setColors: (colors: PaletteColor[]) => void;
}

export const usePaletteStore = create<PaletteState>((set, get) => ({
  colors: [],
  baseColor: '#3B82F6',
  harmonyRule: 'complementary',

  setBaseColor: (color) => {
    set({ baseColor: color });
    const { harmonyRule } = get();
    const newColors = generateHarmony(color, harmonyRule);
    set({ colors: newColors });
  },

  setHarmonyRule: (rule) => {
    set({ harmonyRule: rule });
    const { baseColor } = get();
    const newColors = generateHarmony(baseColor, rule);
    set({ colors: newColors });
  },

  updateColor: (index, color) => {
    const { colors } = get();
    const newColors = [...colors];
    newColors[index] = color;
    set({ colors: newColors });
  },

  toggleLock: (index) => {
    const { colors } = get();
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    set({ colors: newColors });
  },

  randomize: () => {
    const { colors, harmonyRule, baseColor } = get();
    const newColors = generateHarmony(baseColor, harmonyRule);

    // 잠긴 색상은 유지
    const merged = newColors.map((newColor, idx) =>
      colors[idx]?.locked ? colors[idx] : newColor
    );

    set({ colors: merged });
  },

  setColors: (colors) => set({ colors }),
}));
```

### 5.2 History Store

```typescript
// src/store/historyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaletteColor } from '@/lib/color/harmony';

interface HistoryItem {
  id: string;
  colors: PaletteColor[];
  createdAt: Date;
  isFavorite: boolean;
}

interface HistoryState {
  items: HistoryItem[];

  addItem: (colors: PaletteColor[]) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (colors) => {
        const item: HistoryItem = {
          id: crypto.randomUUID(),
          colors,
          createdAt: new Date(),
          isFavorite: false,
        };

        set((state) => ({
          items: [item, ...state.items].slice(0, 50), // 최대 50개
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
          ),
        }));
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'palette-history', // LocalStorage key
    }
  )
);
```

---

## 6. Custom Hooks

### 6.1 useImageUpload

```typescript
// src/hooks/useImageUpload.ts

import { useState } from 'react';
import { extractColorsFromImage } from '@/lib/color/extractor';
import { PaletteColor } from '@/lib/color/harmony';

export function useImageUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<PaletteColor[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // 파일 크기 검증
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image too large (max 5MB)');
      }

      // 포맷 검증
      if (!file.type.startsWith('image/')) {
        throw new Error('Invalid file type');
      }

      const colors = await extractColorsFromImage(file, 5);
      return colors;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading, error };
}
```

---

## 7. 성능 최적화

### 7.1 최적화 전략

| 전략 | 구현 | 효과 |
|------|------|------|
| **Code Splitting** | Dynamic import 사용 | 초기 로드 시간 감소 |
| **Memoization** | React.memo, useMemo | 불필요한 리렌더 방지 |
| **Debounce** | 색상 변경 시 100ms | 계산 빈도 감소 |
| **Web Worker** | 이미지 분석 | UI 블록 방지 |
| **Image Optimization** | Next.js Image | 로딩 속도 향상 |

### 7.2 예시: Debounced Color Update

```typescript
// src/hooks/useDebouncedColor.ts

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedColor(color: string, delay: number = 100) {
  const [debouncedColor] = useDebounce(color, delay);
  return debouncedColor;
}
```

---

## 8. 에러 처리

### 8.1 Error Boundary

```typescript
// src/components/ErrorBoundary.tsx

'use client';

import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 9. 테스트 전략

### 9.1 테스트 범위

| 레벨 | 범위 | 도구 |
|------|------|------|
| **Unit** | 색상 로직, 유틸리티 | Vitest |
| **Component** | UI 컴포넌트 | Testing Library |
| **Integration** | 전체 플로우 | Playwright (Phase 2) |

### 9.2 예시: 색상 조화 테스트

```typescript
// tests/unit/harmony.test.ts

import { describe, it, expect } from 'vitest';
import { generateHarmony } from '@/lib/color/harmony';

describe('Color Harmony', () => {
  it('should generate complementary colors', () => {
    const palette = generateHarmony('#FF0000', 'complementary');
    expect(palette).toHaveLength(2);
    expect(palette[1].hex).toBe('#00FFFF'); // Cyan
  });

  it('should generate triadic colors', () => {
    const palette = generateHarmony('#FF0000', 'triadic');
    expect(palette).toHaveLength(3);
  });
});
```

---

## 10. 배포 및 CI/CD

### 10.1 Vercel 배포

```bash
# 자동 배포 설정
git push origin main → Vercel 자동 빌드 & 배포
```

### 10.2 환경 변수 (없음, 클라이언트 전용)

```env
# .env.local (향후 필요 시)
# NEXT_PUBLIC_ANALYTICS_ID=xxx
```

---

## 11. 다음 단계

1. **프로젝트 초기화** (Week 1)
   ```bash
   npx create-next-app@latest color-palette-helper
   ```

2. **기본 라이브러리 설치**
   ```bash
   pnpm add chroma-js color-thief react-colorful zustand
   pnpm add -D tailwindcss @types/chroma-js
   ```

3. **디렉토리 구조 생성**

4. **핵심 모듈 구현** (Week 2)

---

**문서 히스토리**:
- 2026-02-23: 초안 작성
