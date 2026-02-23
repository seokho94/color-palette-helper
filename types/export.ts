// types/export.ts

/**
 * 지원하는 Export 포맷
 */
export type ExportFormat =
  | 'hex'
  | 'rgb'
  | 'hsl'
  | 'css'
  | 'scss'
  | 'tailwind'
  | 'json'

/**
 * Export 옵션 정보
 */
export interface ExportOption {
  value: ExportFormat
  label: string
  description: string
  fileExtension: string
}
