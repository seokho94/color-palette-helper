// lib/export/scss.ts
import type { Color } from '@/types/color'

/**
 * SCSS Variables 생성
 */
export function generateScssVariables(colors: Color[]): string {
  const variables = colors
    .map((c, i) => `$color-${i + 1}: ${c.hex};`)
    .join('\n')

  return `// Color Palette\n${variables}`
}

/**
 * SCSS Map 생성
 */
export function generateScssMap(colors: Color[]): string {
  const entries = colors
    .map((c, i) => `  'color-${i + 1}': ${c.hex}`)
    .join(',\n')

  return `$colors: (\n${entries}\n);`
}
