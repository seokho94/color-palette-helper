// components/export/ExportPanel.tsx
'use client'

import { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import type { ExportFormat } from '@/types/export'
import { formatHex, formatRgb, formatHsl } from '@/lib/export/formatters'
import { generateCssVariables } from '@/lib/export/css'
import { generateScssVariables } from '@/lib/export/scss'
import { generateTailwindConfig } from '@/lib/export/tailwind'
import { generateJsonSimple } from '@/lib/export/json'
import { ExportFormatSelector } from './ExportFormatSelector'
import { CodeBlock } from './CodeBlock'
import { CopyButton } from './CopyButton'

/**
 * Export 패널 메인 컴포넌트
 */
export function ExportPanel() {
  const { colors } = usePaletteStore()
  const [format, setFormat] = useState<ExportFormat>('hex')

  const code = useMemo(() => {
    if (colors.length === 0) return ''

    switch (format) {
      case 'hex':
        return formatHex(colors)
      case 'rgb':
        return formatRgb(colors)
      case 'hsl':
        return formatHsl(colors)
      case 'css':
        return generateCssVariables(colors)
      case 'scss':
        return generateScssVariables(colors)
      case 'tailwind':
        return generateTailwindConfig(colors)
      case 'json':
        return generateJsonSimple(colors)
      default:
        return ''
    }
  }, [colors, format])

  const handleDownload = () => {
    const extensions: Record<ExportFormat, string> = {
      hex: 'txt',
      rgb: 'txt',
      hsl: 'txt',
      css: 'css',
      scss: 'scss',
      tailwind: 'js',
      json: 'json',
    }

    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `palette.${extensions[format]}`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (colors.length === 0) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Generate a palette first to export
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ExportFormatSelector value={format} onChange={setFormat} />

      <CodeBlock code={code} language={format} />

      <div className="flex gap-2">
        <CopyButton text={code} />

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
    </div>
  )
}
