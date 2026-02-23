// components/color/ColorPicker.tsx
'use client'

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import chroma from 'chroma-js'
import { usePaletteStore } from '@/store/usePaletteStore'
import { debounce } from '@/lib/utils'

export function ColorPicker() {
  const { baseColor, setBaseColor } = usePaletteStore()
  const [localColor, setLocalColor] = useState(baseColor)

  // Debounce store update
  useEffect(() => {
    const updateStore = debounce((color: string) => {
      setBaseColor(color)
    }, 500)

    updateStore(localColor)
  }, [localColor, setBaseColor])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-lg border border-gray-200 p-4">
        <HexColorPicker color={localColor} onChange={setLocalColor} />
      </div>

      {/* Current Color Display */}
      <div
        className="h-16 w-full rounded-lg border border-gray-200"
        style={{ backgroundColor: localColor }}
      />

      {/* Color Value Display */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">HEX:</span>
          <span className="font-mono font-medium">{localColor}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">RGB:</span>
          <span className="font-mono font-medium">
            {chroma(localColor).rgb().map(Math.round).join(', ')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">HSL:</span>
          <span className="font-mono font-medium">
            {chroma(localColor)
              .hsl()
              .map((v, i) => (i === 0 ? Math.round(v) : Math.round(v * 100) + '%'))
              .join(', ')}
          </span>
        </div>
      </div>
    </div>
  )
}
