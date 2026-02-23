// lib/color/validators.ts
import chroma from 'chroma-js'

/**
 * HEX 색상 유효성 검증
 */
export function validateHexColor(value: string): boolean {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (!hexPattern.test(value)) return false

  try {
    chroma(value)
    return true
  } catch {
    return false
  }
}

/**
 * RGB 색상 유효성 검증
 */
export function validateRgbColor(value: string): boolean {
  const rgbPattern = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
  const match = value.match(rgbPattern)

  if (!match) return false

  const [, r, g, b] = match
  const isValid = [r, g, b].every((v) => {
    const num = parseInt(v, 10)
    return num >= 0 && num <= 255
  })

  if (!isValid) return false

  try {
    chroma(value)
    return true
  } catch {
    return false
  }
}

/**
 * HSL 색상 유효성 검증
 */
export function validateHslColor(value: string): boolean {
  const hslPattern = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
  const match = value.match(hslPattern)

  if (!match) return false

  const [, h, s, l] = match
  const hNum = parseInt(h, 10)
  const sNum = parseInt(s, 10)
  const lNum = parseInt(l, 10)

  const isValid =
    hNum >= 0 &&
    hNum <= 360 &&
    sNum >= 0 &&
    sNum <= 100 &&
    lNum >= 0 &&
    lNum <= 100

  if (!isValid) return false

  try {
    chroma(value)
    return true
  } catch {
    return false
  }
}
