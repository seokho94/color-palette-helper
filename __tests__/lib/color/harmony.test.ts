// __tests__/lib/color/harmony.test.ts
import { describe, it, expect } from 'vitest'
import {
  generateComplementary,
  generateAnalogous,
  generateTriadic,
  generateSplitComplementary,
  generateTetradic,
  generateMonochromatic,
} from '@/lib/color/harmony'

describe('Harmony Algorithms', () => {
  const baseColor = '#3B82F6'

  describe('generateComplementary', () => {
    it('should generate 6 colors', () => {
      const colors = generateComplementary(baseColor)
      expect(colors).toHaveLength(6)
    })

    it('should include base color', () => {
      const colors = generateComplementary(baseColor)
      expect(colors[0].toLowerCase()).toBe(baseColor.toLowerCase())
    })

    it('should return valid HEX colors', () => {
      const colors = generateComplementary(baseColor)
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })
  })

  describe('generateAnalogous', () => {
    it('should generate 6 colors', () => {
      const colors = generateAnalogous(baseColor)
      expect(colors).toHaveLength(6)
    })

    it('should return valid HEX colors', () => {
      const colors = generateAnalogous(baseColor)
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })
  })

  describe('generateTriadic', () => {
    it('should generate 6 colors', () => {
      const colors = generateTriadic(baseColor)
      expect(colors).toHaveLength(6)
    })

    it('should include base color', () => {
      const colors = generateTriadic(baseColor)
      expect(colors[0].toLowerCase()).toBe(baseColor.toLowerCase())
    })
  })

  describe('generateSplitComplementary', () => {
    it('should generate 6 colors', () => {
      const colors = generateSplitComplementary(baseColor)
      expect(colors).toHaveLength(6)
    })
  })

  describe('generateTetradic', () => {
    it('should generate 6 colors', () => {
      const colors = generateTetradic(baseColor)
      expect(colors).toHaveLength(6)
    })
  })

  describe('generateMonochromatic', () => {
    it('should generate 6 colors', () => {
      const colors = generateMonochromatic(baseColor)
      expect(colors).toHaveLength(6)
    })

    it('should return valid HEX colors', () => {
      const colors = generateMonochromatic(baseColor)
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })
  })
})
