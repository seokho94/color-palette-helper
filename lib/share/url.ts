// lib/share/url.ts
import type { Palette, HarmonyRule } from '@/types/color'
import { isValidHex, isValidHarmonyRule } from './validation'

/**
 * 팔레트를 URL Query String으로 인코딩
 */
export function encodePaletteToUrl(palette: Palette): string {
  const params = new URLSearchParams()

  // 기본 색상
  params.set('base', palette.baseColor.replace('#', ''))

  // Harmony 규칙
  params.set('harmony', palette.harmonyRule)

  // 색상 배열 (HEX만)
  const colors = palette.colors.map((c) => c.hex.replace('#', '')).join(',')
  params.set('colors', colors)

  // 잠금 상태 (옵션)
  const locks = palette.colors.map((c) => (c.locked ? '1' : '0')).join('')
  if (locks.includes('1')) {
    params.set('locks', locks)
  }

  return params.toString()
}

/**
 * URL Query String에서 팔레트 디코딩
 */
export function decodePaletteFromUrl(queryString: string): Partial<Palette> | null {
  try {
    const params = new URLSearchParams(queryString)

    const baseColor = params.get('base')
    const harmonyRule = params.get('harmony')
    const colorsParam = params.get('colors')
    const locksParam = params.get('locks')

    if (!baseColor || !harmonyRule || !colorsParam) {
      return null
    }

    // HEX 색상 파싱
    const hexColors = colorsParam.split(',').map((hex) => `#${hex}`)

    // 유효성 검증
    if (!isValidHarmonyRule(harmonyRule)) {
      return null
    }

    if (!hexColors.every(isValidHex)) {
      return null
    }

    // 잠금 상태 파싱
    const locks = locksParam ? locksParam.split('').map((l) => l === '1') : []

    // Color 객체 생성
    const colors = hexColors.map((hex, i) => ({
      hex,
      rgb: hexToRgb(hex),
      hsl: hexToHsl(hex),
      locked: locks[i] || false,
    }))

    return {
      baseColor: `#${baseColor}`,
      harmonyRule: harmonyRule as HarmonyRule,
      colors,
    }
  } catch (error) {
    console.error('Failed to decode palette from URL:', error)
    return null
  }
}

/**
 * 전체 URL 생성
 */
export function generateShareUrl(palette: Palette): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const query = encodePaletteToUrl(palette)
  return `${origin}/?${query}`
}

/**
 * HEX → RGB 변환
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0]
}

/**
 * HEX → HSL 변환
 */
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) {
    return [0, 0, l]
  }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h = 0
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6
  } else {
    h = ((r - g) / d + 4) / 6
  }

  return [h * 360, s, l]
}
