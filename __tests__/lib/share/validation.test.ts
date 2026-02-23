// __tests__/lib/share/validation.test.ts
import { describe, it, expect } from 'vitest'
import { isValidHex, isValidHarmonyRule } from '@/lib/share/validation'

describe('Validation Functions', () => {
  describe('isValidHex', () => {
    it('should validate correct HEX colors', () => {
      expect(isValidHex('#3B82F6')).toBe(true)
      expect(isValidHex('#000000')).toBe(true)
      expect(isValidHex('#FFFFFF')).toBe(true)
      expect(isValidHex('#abc123')).toBe(true)
    })

    it('should validate HEX without # prefix', () => {
      expect(isValidHex('3B82F6')).toBe(true)
      expect(isValidHex('000000')).toBe(true)
    })

    it('should accept lowercase hex', () => {
      expect(isValidHex('#ffffff')).toBe(true)
      expect(isValidHex('abc123')).toBe(true)
    })

    it('should reject invalid HEX colors', () => {
      expect(isValidHex('#GGGGGG')).toBe(false)
      expect(isValidHex('#123')).toBe(false)
      expect(isValidHex('#12345')).toBe(false)
      expect(isValidHex('#1234567')).toBe(false)
      expect(isValidHex('invalid')).toBe(false)
      expect(isValidHex('')).toBe(false)
    })
  })

  describe('isValidHarmonyRule', () => {
    it('should validate correct harmony rules', () => {
      expect(isValidHarmonyRule('complementary')).toBe(true)
      expect(isValidHarmonyRule('analogous')).toBe(true)
      expect(isValidHarmonyRule('triadic')).toBe(true)
      expect(isValidHarmonyRule('split-complementary')).toBe(true)
      expect(isValidHarmonyRule('tetradic')).toBe(true)
      expect(isValidHarmonyRule('monochromatic')).toBe(true)
    })

    it('should reject invalid harmony rules', () => {
      expect(isValidHarmonyRule('invalid')).toBe(false)
      expect(isValidHarmonyRule('Complementary')).toBe(false)
      expect(isValidHarmonyRule('TRIADIC')).toBe(false)
      expect(isValidHarmonyRule('')).toBe(false)
    })
  })
})
