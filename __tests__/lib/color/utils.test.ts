// __tests__/lib/color/utils.test.ts
import { describe, it, expect } from 'vitest'
import {
  hexToColor,
  hexArrayToColors,
  randomColor,
  adjustBrightness,
  adjustSaturation,
  getColorName,
} from '@/lib/color/utils'

describe('Color Utility Functions', () => {
  describe('hexToColor', () => {
    it('should convert HEX to Color object', () => {
      const color = hexToColor('#FFFFFF')
      expect(color.hex).toMatch(/^#[Ff]{6}$/)
      expect(color.rgb).toEqual([255, 255, 255])
    })

    it('should handle lowercase hex', () => {
      const color = hexToColor('#ffffff')
      expect(color.hex).toMatch(/^#[Ff]{6}$/)
      expect(color.rgb).toEqual([255, 255, 255])
    })

    it('should convert black color', () => {
      const color = hexToColor('#000000')
      expect(color.rgb).toEqual([0, 0, 0])
    })

    it('should convert primary colors', () => {
      const red = hexToColor('#FF0000')
      expect(red.rgb).toEqual([255, 0, 0])

      const green = hexToColor('#00FF00')
      expect(green.rgb).toEqual([0, 255, 0])

      const blue = hexToColor('#0000FF')
      expect(blue.rgb).toEqual([0, 0, 255])
    })
  })

  describe('hexArrayToColors', () => {
    it('should convert array of HEX to Color objects', () => {
      const hexArray = ['#FF0000', '#00FF00', '#0000FF']
      const colors = hexArrayToColors(hexArray)

      expect(colors).toHaveLength(3)
      expect(colors[0].rgb).toEqual([255, 0, 0])
      expect(colors[1].rgb).toEqual([0, 255, 0])
      expect(colors[2].rgb).toEqual([0, 0, 255])
    })

    it('should handle empty array', () => {
      const colors = hexArrayToColors([])
      expect(colors).toEqual([])
    })
  })

  describe('randomColor', () => {
    it('should generate valid HEX color', () => {
      const color = randomColor()
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })

    it('should generate different colors', () => {
      const colors = Array.from({ length: 10 }, () => randomColor())
      const uniqueColors = new Set(colors)
      // At least some colors should be different (not guaranteed but very likely)
      expect(uniqueColors.size).toBeGreaterThan(1)
    })
  })

  describe('adjustBrightness', () => {
    it('should brighten color', () => {
      const original = '#808080'
      const brighter = adjustBrightness(original, 1)
      // Brighter color should not be the same
      expect(brighter).not.toBe(original)
    })

    it('should darken color', () => {
      const original = '#808080'
      const darker = adjustBrightness(original, -1)
      // Darker color should not be the same
      expect(darker).not.toBe(original)
    })
  })

  describe('adjustSaturation', () => {
    it('should increase saturation', () => {
      const original = '#8080FF'
      const saturated = adjustSaturation(original, 1)
      expect(saturated).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })

    it('should decrease saturation', () => {
      const original = '#8080FF'
      const desaturated = adjustSaturation(original, -1)
      expect(desaturated).toMatch(/^#[0-9A-Fa-f]{6}$/)
    })
  })

  describe('getColorName', () => {
    it('should identify red', () => {
      expect(getColorName('#FF0000')).toBe('Red')
    })

    it('should identify blue', () => {
      expect(getColorName('#0000FF')).toBe('Blue')
    })

    it('should identify green', () => {
      expect(getColorName('#00FF00')).toBe('Green')
    })

    it('should identify gray', () => {
      expect(getColorName('#808080')).toBe('Gray')
    })
  })
})
