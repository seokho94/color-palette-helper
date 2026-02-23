// lib/color/utils.ts
import chroma from 'chroma-js'
import type { Color } from '@/types/color'

/**
 * HEX 색상을 Color 객체로 변환
 */
export function hexToColor(hex: string): Color {
  const color = chroma(hex)

  return {
    hex: color.hex(),
    rgb: color.rgb() as [number, number, number],
    hsl: color.hsl() as [number, number, number],
  }
}

/**
 * 색상 배열을 Color 객체 배열로 변환
 */
export function hexArrayToColors(hexArray: string[]): Color[] {
  return hexArray.map(hexToColor)
}

/**
 * 랜덤 색상 생성
 */
export function randomColor(): string {
  return chroma.random().hex()
}

/**
 * 색상 밝기 조정
 */
export function adjustBrightness(color: string, amount: number): string {
  return chroma(color).brighten(amount).hex()
}

/**
 * 색상 채도 조정
 */
export function adjustSaturation(color: string, amount: number): string {
  return chroma(color).saturate(amount).hex()
}

/**
 * 색상 이름 추출 (간단한 구현)
 */
export function getColorName(hex: string): string {
  const color = chroma(hex)
  const hue = color.get('hsl.h')

  if (isNaN(hue)) return 'Gray'

  if (hue >= 0 && hue < 30) return 'Red'
  if (hue >= 30 && hue < 60) return 'Orange'
  if (hue >= 60 && hue < 90) return 'Yellow'
  if (hue >= 90 && hue < 150) return 'Green'
  if (hue >= 150 && hue < 210) return 'Cyan'
  if (hue >= 210 && hue < 270) return 'Blue'
  if (hue >= 270 && hue < 330) return 'Purple'
  return 'Pink'
}
