// lib/export/tailwind.ts
import type { Color } from '@/types/color'

/**
 * Tailwind Config 생성
 */
export function generateTailwindConfig(colors: Color[]): string {
  const colorEntries = colors
    .map((c, i) => `        'custom-${i + 1}': '${c.hex}'`)
    .join(',\n')

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
${colorEntries}
      }
    }
  }
}`
}
