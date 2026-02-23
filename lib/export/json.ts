// lib/export/json.ts
import type { Color } from '@/types/color'

/**
 * JSON 생성 (간단 버전)
 */
export function generateJsonSimple(colors: Color[]): string {
  const palette = colors.map((c, i) => ({
    id: i + 1,
    hex: c.hex,
    rgb: c.rgb.map((v) => Math.round(v)),
    hsl: c.hsl.map((v, idx) => (idx === 0 ? Math.round(v) : Math.round(v * 100))),
  }))

  return JSON.stringify(palette, null, 2)
}
