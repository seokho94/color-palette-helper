// __tests__/lib/share/url.test.ts
import { describe, it, expect } from 'vitest'
import { encodePaletteToUrl, decodePaletteFromUrl, generateShareUrl } from '@/lib/share/url'
import type { Palette } from '@/types/color'

describe('URL Encoding/Decoding', () => {
  const mockPalette: Palette = {
    id: 'test-123',
    name: 'Test Palette',
    baseColor: '#3B82F6',
    harmonyRule: 'complementary',
    colors: [
      { hex: '#3B82F6', rgb: [59, 130, 246], hsl: [217, 0.91, 0.6], locked: false },
      { hex: '#F59E0B', rgb: [245, 158, 11], hsl: [38, 0.92, 0.5], locked: true },
      { hex: '#10B981', rgb: [16, 185, 129], hsl: [160, 0.84, 0.39], locked: false },
      { hex: '#EF4444', rgb: [239, 68, 68], hsl: [0, 0.84, 0.6], locked: false },
      { hex: '#8B5CF6', rgb: [139, 92, 246], hsl: [258, 0.9, 0.66], locked: false },
      { hex: '#EC4899', rgb: [236, 72, 153], hsl: [330, 0.81, 0.6], locked: false },
    ],
    createdAt: Date.now(),
  }

  describe('encodePaletteToUrl', () => {
    it('should encode palette to query string', () => {
      const queryString = encodePaletteToUrl(mockPalette)

      expect(queryString).toContain('base=3B82F6')
      expect(queryString).toContain('harmony=complementary')
      expect(queryString).toContain('colors=')
    })

    it('should encode all 6 colors', () => {
      const queryString = encodePaletteToUrl(mockPalette)
      const params = new URLSearchParams(queryString)
      const colors = params.get('colors')?.split(',')

      expect(colors).toHaveLength(6)
    })

    it('should encode locks when colors are locked', () => {
      const queryString = encodePaletteToUrl(mockPalette)

      expect(queryString).toContain('locks=')
    })

    it('should not include # in encoded colors', () => {
      const queryString = encodePaletteToUrl(mockPalette)
      const params = new URLSearchParams(queryString)
      const colors = params.get('colors')

      expect(colors).not.toContain('#')
    })
  })

  describe('decodePaletteFromUrl', () => {
    it('should decode valid query string', () => {
      const queryString = encodePaletteToUrl(mockPalette)
      const decoded = decodePaletteFromUrl(queryString)

      expect(decoded).not.toBeNull()
      expect(decoded?.baseColor).toBe('#3B82F6')
      expect(decoded?.harmonyRule).toBe('complementary')
      expect(decoded?.colors).toHaveLength(6)
    })

    it('should preserve lock states', () => {
      const queryString = encodePaletteToUrl(mockPalette)
      const decoded = decodePaletteFromUrl(queryString)

      expect(decoded?.colors?.[0].locked).toBe(false)
      expect(decoded?.colors?.[1].locked).toBe(true)
    })

    it('should return null for invalid query string', () => {
      const decoded = decodePaletteFromUrl('invalid=true')

      expect(decoded).toBeNull()
    })

    it('should return null for missing required params', () => {
      const decoded = decodePaletteFromUrl('base=3B82F6')

      expect(decoded).toBeNull()
    })

    it('should return null for invalid harmony rule', () => {
      const decoded = decodePaletteFromUrl('base=3B82F6&harmony=invalid&colors=3B82F6')

      expect(decoded).toBeNull()
    })

    it('should return null for invalid HEX colors', () => {
      const decoded = decodePaletteFromUrl('base=3B82F6&harmony=complementary&colors=GGGGGG')

      expect(decoded).toBeNull()
    })
  })

  describe('generateShareUrl', () => {
    it('should generate complete URL', () => {
      const url = generateShareUrl(mockPalette)

      // In test environment, window.location.origin might not be available
      expect(url).toContain('?')
      expect(url).toContain('base=')
      expect(url).toContain('harmony=')
    })
  })

  describe('Round-trip encoding/decoding', () => {
    it('should preserve data through encode-decode cycle', () => {
      const queryString = encodePaletteToUrl(mockPalette)
      const decoded = decodePaletteFromUrl(queryString)

      expect(decoded?.baseColor).toBe(mockPalette.baseColor)
      expect(decoded?.harmonyRule).toBe(mockPalette.harmonyRule)
      expect(decoded?.colors).toHaveLength(mockPalette.colors.length)

      decoded?.colors?.forEach((color, i) => {
        expect(color.hex).toBe(mockPalette.colors[i].hex)
        expect(color.locked).toBe(mockPalette.colors[i].locked)
      })
    })
  })
})
