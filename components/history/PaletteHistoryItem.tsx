// components/history/PaletteHistoryItem.tsx
'use client'

import { Heart, Trash2 } from 'lucide-react'
import type { Palette } from '@/types/color'
import { formatRelativeTime } from '@/lib/utils'
import { useHistoryStore } from '@/store/useHistoryStore'
import { usePaletteStore } from '@/store/usePaletteStore'

interface PaletteHistoryItemProps {
  palette: Palette
  onSelect?: () => void
}

/**
 * 팔레트 히스토리 아이템 카드
 */
export function PaletteHistoryItem({ palette, onSelect }: PaletteHistoryItemProps) {
  const { toggleFavorite, removePalette } = useHistoryStore()
  const { setBaseColor, setHarmonyRule } = usePaletteStore()

  const handleLoad = () => {
    setBaseColor(palette.baseColor)
    setHarmonyRule(palette.harmonyRule)
    onSelect?.()
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(palette.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    removePalette(palette.id)
  }

  return (
    <div
      onClick={handleLoad}
      className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:shadow-md"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {palette.name || 'Untitled Palette'}
          </h4>
          <p className="text-xs text-gray-500">
            {formatRelativeTime(palette.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`transition-opacity ${
              palette.isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            aria-label={palette.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-4 w-4 ${
                palette.isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Delete palette"
          >
            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-6 gap-1">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="h-8 rounded"
            style={{ backgroundColor: color.hex }}
            title={color.hex}
          />
        ))}
      </div>

      {/* Harmony Rule */}
      <p className="mt-2 text-xs capitalize text-gray-500">
        {palette.harmonyRule}
      </p>
    </div>
  )
}
