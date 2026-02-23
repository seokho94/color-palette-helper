// lib/share/validation.ts
import type { HarmonyRule } from '@/types/color'

const VALID_HARMONY_RULES: HarmonyRule[] = [
  'complementary',
  'analogous',
  'triadic',
  'split-complementary',
  'tetradic',
  'monochromatic',
]

/**
 * HEX 색상 유효성 검증
 */
export function isValidHex(hex: string): boolean {
  return /^#?[0-9A-F]{6}$/i.test(hex)
}

/**
 * Harmony 규칙 유효성 검증
 */
export function isValidHarmonyRule(rule: string): rule is HarmonyRule {
  return VALID_HARMONY_RULES.includes(rule as HarmonyRule)
}
