// components/export/M3ExportPanel.tsx
'use client'

import { useMemo, useState } from 'react'
import { Download, Copy, Check } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { generateM3CorePalettes } from '@/lib/color/tonal'
import { createLightThemeRoles, createDarkThemeRoles } from '@/lib/color/m3-roles'
import {
  exportAsCSS,
  exportAsJSON,
  exportAsTailwind,
  exportAsSCSS,
  exportAsFigmaTokens,
} from '@/lib/export/m3-tokens'

type ExportFormat = 'css' | 'json' | 'tailwind' | 'scss' | 'figma'

const EXPORT_FORMATS: { value: ExportFormat; label: string; extension: string }[] = [
  { value: 'css', label: 'CSS Variables', extension: 'css' },
  { value: 'json', label: 'Design Tokens (JSON)', extension: 'json' },
  { value: 'tailwind', label: 'Tailwind Config', extension: 'ts' },
  { value: 'scss', label: 'SCSS Variables', extension: 'scss' },
  { value: 'figma', label: 'Figma Tokens', extension: 'json' },
]

/**
 * Material Design 3 Export Panel
 * Light/Dark Theme tokens을 다양한 형식으로 export
 */
export function M3ExportPanel() {
  const { baseColor, harmonyRule } = usePaletteStore()
  const [format, setFormat] = useState<ExportFormat>('css')
  const [copied, setCopied] = useState(false)

  const exportCode = useMemo(() => {
    if (harmonyRule !== 'm3-tonal') return null

    const palettes = generateM3CorePalettes(baseColor)
    const lightRoles = createLightThemeRoles(palettes)
    const darkRoles = createDarkThemeRoles(palettes)

    switch (format) {
      case 'css':
        return exportAsCSS(lightRoles, darkRoles)
      case 'json':
        return exportAsJSON(lightRoles, darkRoles, palettes)
      case 'tailwind':
        return exportAsTailwind(lightRoles, darkRoles)
      case 'scss':
        return exportAsSCSS(lightRoles, darkRoles)
      case 'figma':
        return exportAsFigmaTokens(lightRoles, darkRoles)
      default:
        return ''
    }
  }, [baseColor, harmonyRule, format])

  if (!exportCode) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const formatConfig = EXPORT_FORMATS.find((f) => f.value === format)
    const filename = `m3-theme.${formatConfig?.extension || 'txt'}`

    const blob = new Blob([exportCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Material Design 3 Export
          </h3>
          <p className="text-sm text-gray-500">
            Export Light/Dark theme tokens
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      {/* Format Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {EXPORT_FORMATS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFormat(f.value)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              format === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Code Preview */}
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs">
        <code className="font-mono text-gray-800">{exportCode}</code>
      </pre>
    </div>
  )
}
