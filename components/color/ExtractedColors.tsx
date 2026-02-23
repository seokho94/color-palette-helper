// components/color/ExtractedColors.tsx
'use client'

import { usePaletteStore } from '@/store/usePaletteStore'

interface ExtractedColorsProps {
  colors: string[]
}

export function ExtractedColors({ colors }: ExtractedColorsProps) {
  const { setBaseColor } = usePaletteStore()

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">
        Extracted Colors ({colors.length})
      </p>

      <div className="grid grid-cols-3 gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setBaseColor(color)}
            className="group relative overflow-hidden rounded-lg border border-gray-200 transition-transform hover:scale-105"
            title={`Use ${color}`}
          >
            <div
              className="h-16 w-full"
              style={{ backgroundColor: color }}
            />
            <div className="bg-white p-1 text-center">
              <p className="text-xs font-mono text-gray-600">{color}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
