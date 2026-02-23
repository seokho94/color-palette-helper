// lib/color/harmony.ts
import chroma from 'chroma-js'
import type { HarmonyRule } from '@/types/color'

/**
 * 보색 (Complementary)
 * 색상환에서 정반대 위치 (180°)
 */
export function generateComplementary(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  const complementary = chroma.hsl((hue + 180) % 360, sat, light)

  return [
    base.hex(),
    complementary.hex(),
    base.brighten(1).hex(),
    base.darken(1).hex(),
    complementary.brighten(1).hex(),
    complementary.darken(1).hex(),
  ]
}

/**
 * 유사색 (Analogous)
 * 색상환에서 인접한 색 (±30°)
 */
export function generateAnalogous(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  return [
    chroma.hsl((hue - 30 + 360) % 360, sat, light).hex(),
    base.hex(),
    chroma.hsl((hue + 30) % 360, sat, light).hex(),
    chroma.hsl((hue - 30 + 360) % 360, sat, Math.max(0, light - 0.1)).hex(),
    chroma.hsl(hue, sat, Math.min(1, light + 0.1)).hex(),
    chroma.hsl((hue + 30) % 360, sat, Math.max(0, light - 0.1)).hex(),
  ]
}

/**
 * 삼색 (Triadic)
 * 색상환에서 정삼각형 (120°)
 */
export function generateTriadic(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  const color1 = chroma.hsl(hue, sat, light)
  const color2 = chroma.hsl((hue + 120) % 360, sat, light)
  const color3 = chroma.hsl((hue + 240) % 360, sat, light)

  return [
    color1.hex(),
    color2.hex(),
    color3.hex(),
    color1.brighten(0.5).hex(),
    color2.brighten(0.5).hex(),
    color3.brighten(0.5).hex(),
  ]
}

/**
 * 분할 보색 (Split-Complementary)
 * 보색의 양옆 (180° ± 30°)
 */
export function generateSplitComplementary(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  const split1 = chroma.hsl((hue + 150) % 360, sat, light)
  const split2 = chroma.hsl((hue + 210) % 360, sat, light)

  return [
    base.hex(),
    split1.hex(),
    split2.hex(),
    base.brighten(0.5).hex(),
    split1.darken(0.5).hex(),
    split2.darken(0.5).hex(),
  ]
}

/**
 * 사색 (Tetradic / Double-Complementary)
 * 색상환에서 정사각형 (90°)
 */
export function generateTetradic(baseColor: string): string[] {
  const base = chroma(baseColor)
  const hue = base.get('hsl.h')
  const sat = base.get('hsl.s')
  const light = base.get('hsl.l')

  return [
    chroma.hsl(hue, sat, light).hex(),
    chroma.hsl((hue + 90) % 360, sat, light).hex(),
    chroma.hsl((hue + 180) % 360, sat, light).hex(),
    chroma.hsl((hue + 270) % 360, sat, light).hex(),
    chroma.hsl(hue, sat, Math.min(1, light + 0.1)).hex(),
    chroma.hsl((hue + 180) % 360, sat, Math.max(0, light - 0.1)).hex(),
  ]
}

/**
 * 모노크롬 (Monochromatic)
 * 같은 색상의 다양한 명도/채도
 */
export function generateMonochromatic(baseColor: string): string[] {
  const base = chroma(baseColor)

  return [
    base.brighten(2).hex(),
    base.brighten(1).hex(),
    base.hex(),
    base.darken(1).hex(),
    base.darken(2).hex(),
    base.desaturate(1).hex(),
  ]
}

/**
 * Harmony 규칙에 따른 팔레트 생성
 */
export function generatePalette(baseColor: string, rule: HarmonyRule): string[] {
  switch (rule) {
    case 'complementary':
      return generateComplementary(baseColor)
    case 'analogous':
      return generateAnalogous(baseColor)
    case 'triadic':
      return generateTriadic(baseColor)
    case 'split-complementary':
      return generateSplitComplementary(baseColor)
    case 'tetradic':
      return generateTetradic(baseColor)
    case 'monochromatic':
      return generateMonochromatic(baseColor)
    default:
      return [baseColor]
  }
}
