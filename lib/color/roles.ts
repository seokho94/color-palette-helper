// lib/color/roles.ts
import type { Color } from '@/types/color'
import { getContrastRatio } from './accessibility'
import { generateM3CorePalettes } from './tonal'
import { createLightThemeRoles, createDarkThemeRoles } from './m3-roles'
import type { HarmonyRule } from '@/types/color'

/**
 * UI 역할별 색상 매핑
 */
export interface ColorRoles {
  primary: Color
  secondary: Color
  accent: Color
  background: Color
  text: string // HEX 문자열로 변경 (대비를 위해)
  textOnPrimary: string
  textOnSecondary: string
  textOnAccent: string
  textOnBackground: string // 배경에 대비되는 텍스트 색상
}

/**
 * 색상 배열을 UI 역할에 자동 매핑
 *
 * @param colors - 팔레트 색상 배열 (최소 5개)
 * @param harmonyRule - Harmony rule (M3 Tonal인 경우 특별 처리)
 * @param baseColor - 기준 색상 (M3 Tonal용)
 * @param theme - Light or Dark theme (M3 Tonal용)
 * @returns UI 역할별 색상 객체
 */
export function assignColorRoles(
  colors: Color[],
  harmonyRule?: HarmonyRule,
  baseColor?: string,
  theme: 'light' | 'dark' = 'light'
): ColorRoles {
  // Material Design 3 Tonal 모드
  if (harmonyRule === 'm3-tonal' && baseColor) {
    const palettes = generateM3CorePalettes(baseColor)
    const m3Roles = theme === 'light'
      ? createLightThemeRoles(palettes)
      : createDarkThemeRoles(palettes)

    // M3 ColorRoles를 기존 ColorRoles 형식으로 변환
    return {
      primary: { hex: m3Roles.primary, rgb: [0, 0, 0], hsl: [0, 0, 0] },
      secondary: { hex: m3Roles.secondary, rgb: [0, 0, 0], hsl: [0, 0, 0] },
      accent: { hex: m3Roles.tertiary, rgb: [0, 0, 0], hsl: [0, 0, 0] },
      background: { hex: m3Roles.background, rgb: [0, 0, 0], hsl: [0, 0, 0] },
      text: m3Roles.onBackground,
      textOnPrimary: m3Roles.onPrimary,
      textOnSecondary: m3Roles.onSecondary,
      textOnAccent: m3Roles.onTertiary,
      textOnBackground: m3Roles.onBackground,
    }
  }

  // 기존 방식 (다른 Harmony Rules)
  if (colors.length < 5) {
    throw new Error('At least 5 colors required')
  }

  const [primary, secondary, accent, background] = colors

  // 배경색에 대비되는 텍스트 색상을 자동 계산
  const textOnBackground = getContrastColor(background.hex)

  return {
    primary,
    secondary,
    accent,
    background,
    text: textOnBackground, // 배경과 대비되는 색상 사용
    textOnPrimary: getContrastColor(primary.hex),
    textOnSecondary: getContrastColor(secondary.hex),
    textOnAccent: getContrastColor(accent.hex),
    textOnBackground, // 명시적으로 제공
  }
}

/**
 * 배경색에 대비되는 텍스트 색상 반환
 *
 * @param backgroundColor - 배경색 (HEX)
 * @returns '#FFFFFF' 또는 '#000000'
 */
export function getContrastColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio('#FFFFFF', backgroundColor)
  const blackContrast = getContrastRatio('#000000', backgroundColor)

  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
}
