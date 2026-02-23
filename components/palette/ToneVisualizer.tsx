// components/palette/ToneVisualizer.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { generateM3CorePalettes, type TonalPalette } from '@/lib/color/tonal'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

/**
 * Material Design 3 Tonal Palette Visualizer
 * 13단계 톤을 시각적으로 표시
 */
export function ToneVisualizer() {
  const { baseColor, harmonyRule } = usePaletteStore()
  const [copiedTone, setCopiedTone] = useState<string | null>(null)

  const palettes = useMemo(() => {
    if (harmonyRule !== 'm3-tonal') return null
    return generateM3CorePalettes(baseColor)
  }, [baseColor, harmonyRule])

  const handleCopy = (color: string, tone: number) => {
    navigator.clipboard.writeText(color)
    setCopiedTone(`${tone}`)
    setTimeout(() => setCopiedTone(null), 2000)
  }

  if (!palettes) return null

  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100] as const

  const renderPalette = (
    name: string,
    palette: TonalPalette,
    description: string
  ) => (
    <div className="space-y-2">
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <div className="grid grid-cols-13 gap-1">
        {tones.map((tone) => {
          const color = palette[tone]
          const isLight = tone >= 50
          const key = `${name}-${tone}`

          return (
            <div key={tone} className="group relative">
              <button
                onClick={() => handleCopy(color, tone)}
                className="relative h-12 w-full rounded transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: color }}
                title={`Tone ${tone}: ${color}`}
              >
                {/* Tone Number */}
                <span
                  className={`absolute inset-x-0 bottom-0.5 text-[8px] font-mono ${
                    isLight ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {tone}
                </span>

                {/* Copy Icon */}
                <div
                  className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 ${
                    isLight ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {copiedTone === `${tone}` ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </div>
              </button>

              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {color}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Material Design 3 Tonal Palettes
        </h3>
        <p className="text-sm text-gray-500">
          13-step tone scale (0-100). Click to copy color code.
        </p>
      </div>

      {renderPalette('Primary', palettes.primary, 'Main brand color')}
      {renderPalette('Secondary', palettes.secondary, 'Supporting color (+60°)')}
      {renderPalette('Tertiary', palettes.tertiary, 'Accent color (+120°)')}
      {renderPalette('Neutral', palettes.neutral, 'Grayscale (5% saturation)')}
      {renderPalette(
        'Neutral Variant',
        palettes.neutralVariant,
        'Tinted gray (15% saturation)'
      )}
      {renderPalette('Error', palettes.error, 'Error/Warning states')}
    </div>
  )
}
