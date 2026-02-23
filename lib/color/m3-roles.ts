// lib/color/m3-roles.ts
import type { M3CorePalettes, TonalPalette } from './tonal'
import { getTone } from './tonal'

/**
 * Material Design 3 Color Roles
 * Light/Dark 테마에 따라 다른 톤을 사용
 */
export interface M3ColorRoles {
  // Primary
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string

  // Secondary
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string

  // Tertiary
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string

  // Error
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string

  // Background & Surface
  background: string
  onBackground: string
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string

  // Outline
  outline: string
  outlineVariant: string

  // Inverse
  inverseSurface: string
  inverseOnSurface: string
  inversePrimary: string
}

/**
 * Light Theme Color Roles 생성
 *
 * Material Design 3 Light Theme 톤 매핑:
 * - Primary: tone 40
 * - On Primary: tone 100
 * - Primary Container: tone 90
 * - On Primary Container: tone 10
 */
export function createLightThemeRoles(palettes: M3CorePalettes): M3ColorRoles {
  return {
    // Primary
    primary: getTone(palettes.primary, 40),
    onPrimary: getTone(palettes.primary, 100),
    primaryContainer: getTone(palettes.primary, 90),
    onPrimaryContainer: getTone(palettes.primary, 10),

    // Secondary
    secondary: getTone(palettes.secondary, 40),
    onSecondary: getTone(palettes.secondary, 100),
    secondaryContainer: getTone(palettes.secondary, 90),
    onSecondaryContainer: getTone(palettes.secondary, 10),

    // Tertiary
    tertiary: getTone(palettes.tertiary, 40),
    onTertiary: getTone(palettes.tertiary, 100),
    tertiaryContainer: getTone(palettes.tertiary, 90),
    onTertiaryContainer: getTone(palettes.tertiary, 10),

    // Error
    error: getTone(palettes.error, 40),
    onError: getTone(palettes.error, 100),
    errorContainer: getTone(palettes.error, 90),
    onErrorContainer: getTone(palettes.error, 10),

    // Background & Surface
    background: getTone(palettes.neutral, 99),
    onBackground: getTone(palettes.neutral, 10),
    surface: getTone(palettes.neutral, 99),
    onSurface: getTone(palettes.neutral, 10),
    surfaceVariant: getTone(palettes.neutralVariant, 90),
    onSurfaceVariant: getTone(palettes.neutralVariant, 30),

    // Outline
    outline: getTone(palettes.neutralVariant, 50),
    outlineVariant: getTone(palettes.neutralVariant, 80),

    // Inverse
    inverseSurface: getTone(palettes.neutral, 20),
    inverseOnSurface: getTone(palettes.neutral, 95),
    inversePrimary: getTone(palettes.primary, 80),
  }
}

/**
 * Dark Theme Color Roles 생성
 *
 * Material Design 3 Dark Theme 톤 매핑:
 * - Primary: tone 80
 * - On Primary: tone 20
 * - Primary Container: tone 30
 * - On Primary Container: tone 90
 */
export function createDarkThemeRoles(palettes: M3CorePalettes): M3ColorRoles {
  return {
    // Primary
    primary: getTone(palettes.primary, 80),
    onPrimary: getTone(palettes.primary, 20),
    primaryContainer: getTone(palettes.primary, 30),
    onPrimaryContainer: getTone(palettes.primary, 90),

    // Secondary
    secondary: getTone(palettes.secondary, 80),
    onSecondary: getTone(palettes.secondary, 20),
    secondaryContainer: getTone(palettes.secondary, 30),
    onSecondaryContainer: getTone(palettes.secondary, 90),

    // Tertiary
    tertiary: getTone(palettes.tertiary, 80),
    onTertiary: getTone(palettes.tertiary, 20),
    tertiaryContainer: getTone(palettes.tertiary, 30),
    onTertiaryContainer: getTone(palettes.tertiary, 90),

    // Error
    error: getTone(palettes.error, 80),
    onError: getTone(palettes.error, 20),
    errorContainer: getTone(palettes.error, 30),
    onErrorContainer: getTone(palettes.error, 90),

    // Background & Surface
    background: getTone(palettes.neutral, 10),
    onBackground: getTone(palettes.neutral, 90),
    surface: getTone(palettes.neutral, 10),
    onSurface: getTone(palettes.neutral, 90),
    surfaceVariant: getTone(palettes.neutralVariant, 30),
    onSurfaceVariant: getTone(palettes.neutralVariant, 80),

    // Outline
    outline: getTone(palettes.neutralVariant, 60),
    outlineVariant: getTone(palettes.neutralVariant, 30),

    // Inverse
    inverseSurface: getTone(palettes.neutral, 90),
    inverseOnSurface: getTone(palettes.neutral, 20),
    inversePrimary: getTone(palettes.primary, 40),
  }
}

/**
 * 간소화된 UI Roles (기존 프로젝트와 호환)
 */
export interface SimplifiedM3Roles {
  primary: string
  secondary: string
  tertiary: string
  accent: string
  background: string
  surface: string
  text: string
  textOnPrimary: string
  textOnSecondary: string
  textOnTertiary: string
  textOnBackground: string
  outline: string
}

/**
 * M3 Color Roles를 간소화된 형태로 변환
 */
export function simplifyM3Roles(m3Roles: M3ColorRoles): SimplifiedM3Roles {
  return {
    primary: m3Roles.primary,
    secondary: m3Roles.secondary,
    tertiary: m3Roles.tertiary,
    accent: m3Roles.tertiary, // Tertiary를 Accent로 사용
    background: m3Roles.background,
    surface: m3Roles.surface,
    text: m3Roles.onBackground,
    textOnPrimary: m3Roles.onPrimary,
    textOnSecondary: m3Roles.onSecondary,
    textOnTertiary: m3Roles.onTertiary,
    textOnBackground: m3Roles.onBackground,
    outline: m3Roles.outline,
  }
}
