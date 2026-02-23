/**
 * Color representation in different formats
 */
export interface Color {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  name?: string
  role?: 'primary' | 'secondary' | 'accent' | 'background' | 'text'
  locked?: boolean
}

/**
 * Harmony rules for color palette generation
 */
export type HarmonyRule =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic'

/**
 * Color palette
 */
export interface Palette {
  id: string
  colors: Color[]
  baseColor: string
  harmonyRule: HarmonyRule
  createdAt: Date
  isFavorite?: boolean
}
