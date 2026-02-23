// lib/export/formatters.ts
import type { Color } from '@/types/color'

/**
 * HEX 포맷으로 변환
 */
export function formatHex(colors: Color[]): string {
  return colors.map((c, i) => `Color ${i + 1}: ${c.hex}`).join('\n')
}

/**
 * RGB 포맷으로 변환
 */
export function formatRgb(colors: Color[]): string {
  return colors
    .map((c, i) => {
      const [r, g, b] = c.rgb.map((v) => Math.round(v))
      return `Color ${i + 1}: rgb(${r}, ${g}, ${b})`
    })
    .join('\n')
}

/**
 * HSL 포맷으로 변환
 */
export function formatHsl(colors: Color[]): string {
  return colors
    .map((c, i) => {
      const [h, s, l] = c.hsl
      const hRound = Math.round(h)
      const sPercent = Math.round(s * 100)
      const lPercent = Math.round(l * 100)
      return `Color ${i + 1}: hsl(${hRound}, ${sPercent}%, ${lPercent}%)`
    })
    .join('\n')
}
