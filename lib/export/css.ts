// lib/export/css.ts
import type { Color } from '@/types/color'

/**
 * CSS Variables 생성
 */
export function generateCssVariables(colors: Color[]): string {
  const variables = colors
    .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
    .join('\n')

  return `:root {\n${variables}\n}`
}

/**
 * CSS 클래스 생성
 */
export function generateCssClasses(colors: Color[]): string {
  const classes = colors
    .map((c, i) => {
      return `.bg-color-${i + 1} {\n  background-color: ${c.hex};\n}\n\n.text-color-${i + 1} {\n  color: ${c.hex};\n}`
    })
    .join('\n\n')

  return classes
}
