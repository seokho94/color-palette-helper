// lib/color/tonal.ts
import chroma from 'chroma-js'

/**
 * Material Design 3 Tonal Palette
 * 각 색상에 대해 13단계의 톤을 생성 (0~100)
 *
 * Tone 값:
 * 0 - 완전 검정
 * 10, 20, 30, 40 - 어두운 톤
 * 50 - 중간 톤
 * 60, 70, 80, 90 - 밝은 톤
 * 95, 99 - 매우 밝은 톤
 * 100 - 완전 흰색
 */

export interface TonalPalette {
  0: string
  10: string
  20: string
  30: string
  40: string
  50: string
  60: string
  70: string
  80: string
  90: string
  95: string
  99: string
  100: string
}

/**
 * 단일 색상에서 Tonal Palette 생성
 *
 * @param baseColor - 기준 색상 (HEX)
 * @returns 13단계 Tonal Palette
 */
export function generateTonalPalette(baseColor: string): TonalPalette {
  const color = chroma(baseColor)
  const hue = color.get('hsl.h')
  const saturation = color.get('hsl.s')

  // Material Design 3의 톤 값 (0~100)
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]

  const palette: Partial<TonalPalette> = {}

  tones.forEach((tone) => {
    // Tone을 lightness로 변환 (0~100 → 0~1)
    const lightness = tone / 100

    // Tone이 낮을수록 채도를 약간 낮춤 (자연스러운 어두운 톤)
    const adjustedSaturation = tone < 50
      ? saturation * (0.7 + (tone / 100) * 0.3)
      : saturation

    try {
      const toneColor = chroma.hsl(
        hue,
        adjustedSaturation,
        lightness
      )
      palette[tone as keyof TonalPalette] = toneColor.hex()
    } catch {
      // 색상 범위 초과 시 fallback
      palette[tone as keyof TonalPalette] = tone < 50 ? '#000000' : '#FFFFFF'
    }
  })

  return palette as TonalPalette
}

/**
 * Material Design 3 Core Palettes
 * Primary, Secondary, Tertiary, Neutral, Error
 */
export interface M3CorePalettes {
  primary: TonalPalette
  secondary: TonalPalette
  tertiary: TonalPalette
  neutral: TonalPalette
  neutralVariant: TonalPalette
  error: TonalPalette
}

/**
 * 기준 색상에서 M3 Core Palettes 생성
 *
 * @param seedColor - Seed Color (사용자가 선택한 기준 색상)
 * @returns Material Design 3 Core Palettes
 */
export function generateM3CorePalettes(seedColor: string): M3CorePalettes {
  const seed = chroma(seedColor)
  const hue = seed.get('hsl.h')
  const sat = seed.get('hsl.s')

  // Primary: 기준 색상 그대로
  const primary = generateTonalPalette(seedColor)

  // Secondary: +60도 회전, 채도 약간 낮춤
  const secondary = generateTonalPalette(
    chroma.hsl((hue + 60) % 360, sat * 0.8, 0.5).hex()
  )

  // Tertiary: +120도 회전 (삼각)
  const tertiary = generateTonalPalette(
    chroma.hsl((hue + 120) % 360, sat * 0.9, 0.5).hex()
  )

  // Neutral: 무채색 (채도 거의 없음)
  const neutral = generateTonalPalette(
    chroma.hsl(hue, 0.05, 0.5).hex()
  )

  // Neutral Variant: 약간의 색조가 있는 회색
  const neutralVariant = generateTonalPalette(
    chroma.hsl(hue, 0.15, 0.5).hex()
  )

  // Error: 빨간색 계열 (고정)
  const error = generateTonalPalette('#DC362E')

  return {
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
  }
}

/**
 * Tonal Palette에서 특정 톤 선택 헬퍼
 */
export function getTone(palette: TonalPalette, tone: keyof TonalPalette): string {
  return palette[tone]
}
