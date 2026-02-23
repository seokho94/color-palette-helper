// lib/color/accessibility.ts
import chroma from 'chroma-js'
import type { ContrastCheck, AccessibilityResult, WCAGLevel } from '@/types/accessibility'

/**
 * 상대 휘도 계산 (Relative Luminance)
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns 상대 휘도 (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * 대비 비율 계산
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 *
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the lighter color and L2 is the darker color
 *
 * @param color1 - 첫 번째 색상 (HEX)
 * @param color2 - 두 번째 색상 (HEX)
 * @returns 대비 비율 (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const [r1, g1, b1] = chroma(color1).rgb()
  const [r2, g2, b2] = chroma(color2).rgb()

  const l1 = getLuminance(r1, g1, b1)
  const l2 = getLuminance(r2, g2, b2)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * WCAG 레벨 판정
 *
 * WCAG 2.1 기준:
 * - AA Normal Text: 4.5:1
 * - AA Large Text (18pt+ or 14pt+ bold): 3:1
 * - AAA Normal Text: 7:1
 * - AAA Large Text: 4.5:1
 *
 * @param foreground - 전경색 (텍스트)
 * @param background - 배경색
 * @returns 대비 검사 결과
 */
export function checkContrast(foreground: string, background: string): ContrastCheck {
  const ratio = getContrastRatio(foreground, background)

  const passes = {
    AA: ratio >= 4.5,       // 일반 텍스트 (Normal Text)
    AALarge: ratio >= 3,    // 큰 텍스트 (Large Text 18pt+)
    AAA: ratio >= 7,        // 일반 텍스트 (Normal Text)
    AAALarge: ratio >= 4.5, // 큰 텍스트 (Large Text 18pt+)
  }

  let level: WCAGLevel = 'Fail'
  if (passes.AAA) level = 'AAA'
  else if (passes.AA) level = 'AA'

  return { ratio, level, passes }
}

/**
 * 접근성 검증
 *
 * @param foreground - 전경색 (텍스트)
 * @param background - 배경색
 * @returns 접근성 검증 결과
 */
export function checkAccessibility(
  foreground: string,
  background: string
): AccessibilityResult {
  const { ratio, level, passes } = checkContrast(foreground, background)

  let suggestion: string | undefined

  if (!passes.AA) {
    suggestion = `Contrast ratio is too low (${ratio.toFixed(2)}:1). ` +
      `Minimum is 4.5:1 for AA or 7:1 for AAA.`
  }

  return {
    foreground,
    background,
    contrastRatio: ratio,
    wcagLevel: level,
    passes,
    suggestion,
  }
}

/**
 * 자동 수정 (대비 비율 개선)
 *
 * 배경색에 따라 전경색을 자동으로 밝게 또는 어둡게 조정하여
 * 목표 대비 비율을 달성합니다.
 *
 * @param foreground - 전경색 (텍스트)
 * @param background - 배경색
 * @param targetRatio - 목표 대비 비율 (기본값: 4.5)
 * @returns 수정된 전경색
 */
export function fixContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): string {
  const bgLuminance = getLuminance(...chroma(background).rgb())
  const color = chroma(foreground)

  // 배경이 밝으면 전경을 어둡게, 어두우면 밝게
  let newColor = color
  const step = 0.1

  for (let i = 0; i < 50; i++) {
    const ratio = getContrastRatio(newColor.hex(), background)

    if (ratio >= targetRatio) {
      return newColor.hex()
    }

    newColor = bgLuminance > 0.5
      ? newColor.darken(step)
      : newColor.brighten(step)
  }

  // 실패 시 흑백 반환
  return bgLuminance > 0.5 ? '#000000' : '#FFFFFF'
}

/**
 * 모든 색상 조합 검증
 *
 * 주어진 색상 배열의 모든 조합에 대해 접근성을 검증합니다.
 *
 * @param colors - 색상 배열 (HEX)
 * @returns 접근성 검증 결과 배열
 */
export function checkAllCombinations(colors: string[]): AccessibilityResult[] {
  const results: AccessibilityResult[] = []

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      results.push(checkAccessibility(colors[i], colors[j]))
    }
  }

  return results
}
