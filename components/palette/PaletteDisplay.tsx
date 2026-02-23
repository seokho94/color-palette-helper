// components/palette/PaletteDisplay.tsx
'use client'

import { useEffect } from 'react'
import { Shuffle } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { ColorCard } from './ColorCard'
import { HarmonySelector } from './HarmonySelector'

export function PaletteDisplay() {
  const { colors, generateColors, toggleLock, randomize } = usePaletteStore()

  // 초기 로드 시 팔레트 생성
  useEffect(() => {
    if (colors.length === 0) {
      generateColors()
    }
  }, [colors.length, generateColors])

  return (
    <div className="space-y-6">
      {/* Harmony Selector */}
      <HarmonySelector />

      {/* Color Grid */}
      {colors.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {colors.map((color, index) => (
            <ColorCard
              key={`${color.hex}-${index}`}
              color={color}
              index={index}
              onToggleLock={toggleLock}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-sm text-gray-600">
            Select a color to generate a palette
          </p>
        </div>
      )}

      {/* Randomize Button */}
      <button
        onClick={randomize}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Shuffle className="h-5 w-5" />
        Randomize Palette
      </button>
    </div>
  )
}
