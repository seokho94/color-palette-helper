/**
 * WCAG 접근성 레벨
 * - AAA: 최고 수준 (대비 비율 7:1 이상)
 * - AA: 일반 수준 (대비 비율 4.5:1 이상)
 * - Fail: 기준 미달
 */
export type WCAGLevel = 'AAA' | 'AA' | 'Fail'

/**
 * 대비 비율 검사 결과
 */
export interface ContrastCheck {
  /** 대비 비율 (예: 4.5, 7.0) */
  ratio: number
  /** WCAG 레벨 */
  level: WCAGLevel
  /** 각 기준별 통과 여부 */
  passes: {
    /** WCAG AA - 일반 텍스트 (4.5:1) */
    AA: boolean
    /** WCAG AA - 큰 텍스트 (3:1) */
    AALarge: boolean
    /** WCAG AAA - 일반 텍스트 (7:1) */
    AAA: boolean
    /** WCAG AAA - 큰 텍스트 (4.5:1) */
    AAALarge: boolean
  }
}

/**
 * 접근성 검증 결과
 */
export interface AccessibilityResult {
  /** 전경색 (텍스트 색상) */
  foreground: string
  /** 배경색 */
  background: string
  /** 대비 비율 */
  contrastRatio: number
  /** WCAG 레벨 */
  wcagLevel: WCAGLevel
  /** 각 기준별 통과 여부 */
  passes: ContrastCheck['passes']
  /** 실패 시 개선 제안 메시지 */
  suggestion?: string
}

/**
 * 색맹 타입 (Phase 3)
 */
export type ColorBlindType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'normal'
