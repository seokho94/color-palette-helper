// lib/color/roles.ts
import type { Color } from '@/types/color'
import { getContrastRatio } from './accessibility'

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
 * @returns UI 역할별 색상 객체
 */
export function assignColorRoles(colors: Color[]): ColorRoles {
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
