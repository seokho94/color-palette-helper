// lib/color/perceptual.ts
import chroma from 'chroma-js'

/**
 * Perceptual Color Space (LAB 기반)
 * 인간 시각에 더 가까운 색상 처리
 *
 * LAB: 인간 시각에 균일한 색상 공간
 * - L: Lightness (0-100)
 * - A: Green-Red axis
 * - B: Blue-Yellow axis
 */

/**
 * LAB 색상 공간에서 Tonal Palette 생성
 * HSL보다 인지적으로 균일한 결과
 */
export function generatePerceptualTones(baseColor: string, tones: number[]): string[] {
  const base = chroma(baseColor)
  const [l, a, b] = base.lab()

  return tones.map((tone) => {
    // Tone을 LAB Lightness로 매핑 (0~100)
    const targetL = tone

    // Chroma (채도)를 Lightness에 따라 조정
    // 매우 어둡거나 밝을 때 채도 감소
    let chromaFactor = 1
    if (tone < 20 || tone > 95) {
      chromaFactor = 0.5 + (Math.min(tone, 100 - tone) / 20) * 0.5
    }

    try {
      return chroma.lab(targetL, a * chromaFactor, b * chromaFactor).hex()
    } catch {
      return tone < 50 ? '#000000' : '#FFFFFF'
    }
  })
}

/**
 * LAB에서 색상 혼합 (더 자연스러운 결과)
 */
export function mixColorsPerceptual(
  color1: string,
  color2: string,
  ratio: number = 0.5
): string {
  return chroma.mix(color1, color2, ratio, 'lab').hex()
}

/**
 * LAB에서 색상 스케일 생성
 */
export function createPerceptualScale(
  startColor: string,
  endColor: string,
  steps: number
): string[] {
  return chroma.scale([startColor, endColor]).mode('lab').colors(steps)
}

/**
 * 색상의 인지 밝기 계산 (LAB Lightness)
 */
export function getPerceptualLightness(color: string): number {
  return chroma(color).lab()[0]
}

/**
 * 인지 밝기에 따른 대비 색상 선택
 */
export function getPerceptualContrastColor(backgroundColor: string): string {
  const lightness = getPerceptualLightness(backgroundColor)
  // LAB Lightness 50을 기준으로 흑백 선택
  return lightness > 50 ? '#000000' : '#FFFFFF'
}

/**
 * M3 Tonal Palette (LAB 기반)
 * 더 균일하고 자연스러운 톤 변화
 */
export function generateM3TonalLAB(baseColor: string): Record<number, string> {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
  const colors = generatePerceptualTones(baseColor, tones)

  const palette: Record<number, string> = {}
  tones.forEach((tone, index) => {
    palette[tone] = colors[index]
  })

  return palette
}

/**
 * 색상 거리 계산 (LAB 공간에서 유클리드 거리)
 * 두 색상이 얼마나 다른지 인지적으로 측정
 */
export function getColorDistance(color1: string, color2: string): number {
  const [l1, a1, b1] = chroma(color1).lab()
  const [l2, a2, b2] = chroma(color2).lab()

  const deltaL = l1 - l2
  const deltaA = a1 - a2
  const deltaB = b1 - b2

  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB)
}

/**
 * 가장 대비되는 색상 찾기
 */
export function findMostContrastingColor(
  baseColor: string,
  candidates: string[]
): string {
  let maxDistance = 0
  let bestColor = candidates[0]

  for (const candidate of candidates) {
    const distance = getColorDistance(baseColor, candidate)
    if (distance > maxDistance) {
      maxDistance = distance
      bestColor = candidate
    }
  }

  return bestColor
}
