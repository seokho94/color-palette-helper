/**
 * WCAG conformance levels
 */
export type WCAGLevel = 'AA' | 'AAA'

/**
 * Contrast ratio check result
 */
export interface ContrastResult {
  ratio: number
  passAA: boolean
  passAAA: boolean
  level: 'fail' | 'AA' | 'AAA'
}

/**
 * Accessibility check for a color pair
 */
export interface AccessibilityCheck {
  foreground: string
  background: string
  contrast: ContrastResult
  suggestion?: string
}
