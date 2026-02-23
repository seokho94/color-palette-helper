// __tests__/lib/color/accessibility.test.ts
import { describe, it, expect } from 'vitest'
import { getContrastRatio, checkContrast, fixContrast } from '@/lib/color/accessibility'

describe('Accessibility Functions', () => {
  describe('getContrastRatio', () => {
    it('should return 21:1 for black vs white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF')
      expect(ratio).toBeCloseTo(21, 0)
    })

    it('should return 1:1 for same colors', () => {
      const ratio = getContrastRatio('#3B82F6', '#3B82F6')
      expect(ratio).toBeCloseTo(1, 1)
    })

    it('should be symmetrical', () => {
      const ratio1 = getContrastRatio('#000000', '#FFFFFF')
      const ratio2 = getContrastRatio('#FFFFFF', '#000000')
      expect(ratio1).toBeCloseTo(ratio2, 1)
    })

    it('should handle lowercase hex', () => {
      const ratio = getContrastRatio('#ffffff', '#000000')
      expect(ratio).toBeCloseTo(21, 0)
    })
  })

  describe('checkContrast', () => {
    it('should pass AAA for black vs white', () => {
      const result = checkContrast('#000000', '#FFFFFF')
      expect(result.level).toBe('AAA')
      expect(result.passes.AAA).toBe(true)
      expect(result.passes.AA).toBe(true)
    })

    it('should fail for low contrast', () => {
      const result = checkContrast('#CCCCCC', '#FFFFFF')
      expect(result.level).toBe('Fail')
      expect(result.passes.AA).toBe(false)
      expect(result.passes.AAA).toBe(false)
    })

    it('should pass AA but not AAA for medium contrast', () => {
      const result = checkContrast('#767676', '#FFFFFF')
      // This should pass AA (4.5:1) but not AAA (7:1)
      expect(result.passes.AA).toBe(true)
      expect(result.level).not.toBe('AAA')
    })
  })

  describe('fixContrast', () => {
    it('should improve contrast to meet target', () => {
      const fixed = fixContrast('#CCCCCC', '#FFFFFF', 4.5)
      const ratio = getContrastRatio(fixed, '#FFFFFF')
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })

    it('should return valid HEX color', () => {
      const fixed = fixContrast('#CCCCCC', '#FFFFFF', 4.5)
      expect(fixed).toMatch(/^#[0-9A-F]{6}$/i)
    })

    it('should not change color if contrast is already sufficient', () => {
      const original = '#000000'
      const fixed = fixContrast(original, '#FFFFFF', 4.5)
      // Should be very dark since it already has high contrast
      expect(getContrastRatio(fixed, '#FFFFFF')).toBeGreaterThanOrEqual(4.5)
    })
  })
})
