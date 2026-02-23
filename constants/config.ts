/**
 * Application configuration
 */
export const APP_CONFIG = {
  name: 'Color Palette Helper',
  description: 'Generate accessible color palettes with ease',
  version: '0.1.0',
  author: 'Color Palette Helper Team',
  repository: 'https://github.com/yourusername/color-palette-helper',
} as const

/**
 * Color palette configuration
 */
export const PALETTE_CONFIG = {
  defaultCount: 5,
  maxCount: 10,
  minCount: 2,
} as const

/**
 * Image upload configuration
 */
export const IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  colorCount: 6, // 추출할 색상 개수
} as const

/**
 * Debounce delay
 */
export const DEBOUNCE_DELAY = 500 // ms

/**
 * Accessibility configuration
 */
export const ACCESSIBILITY_CONFIG = {
  aa: {
    normal: 4.5,
    large: 3.0,
  },
  aaa: {
    normal: 7.0,
    large: 4.5,
  },
} as const
