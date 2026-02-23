// components/export/ExportFormatSelector.tsx
'use client'

import type { ExportFormat, ExportOption } from '@/types/export'

const EXPORT_OPTIONS: ExportOption[] = [
  { value: 'hex', label: 'HEX', description: 'Plain HEX values', fileExtension: 'txt' },
  { value: 'rgb', label: 'RGB', description: 'RGB format', fileExtension: 'txt' },
  { value: 'hsl', label: 'HSL', description: 'HSL format', fileExtension: 'txt' },
  { value: 'css', label: 'CSS Variables', description: 'CSS custom properties', fileExtension: 'css' },
  { value: 'scss', label: 'SCSS', description: 'SCSS variables', fileExtension: 'scss' },
  { value: 'tailwind', label: 'Tailwind', description: 'Tailwind config', fileExtension: 'js' },
  { value: 'json', label: 'JSON', description: 'JSON format', fileExtension: 'json' },
]

interface ExportFormatSelectorProps {
  value: ExportFormat
  onChange: (format: ExportFormat) => void
}

/**
 * Export 포맷 선택 드롭다운
 */
export function ExportFormatSelector({ value, onChange }: ExportFormatSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Export Format</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ExportFormat)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {EXPORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500">
        {EXPORT_OPTIONS.find((o) => o.value === value)?.description}
      </p>
    </div>
  )
}
