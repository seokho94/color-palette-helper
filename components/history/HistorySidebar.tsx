// components/history/HistorySidebar.tsx
'use client'

import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useHistoryStore } from '@/store/useHistoryStore'
import { PaletteHistoryItem } from './PaletteHistoryItem'

interface HistorySidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * 히스토리 사이드바
 */
export function HistorySidebar({ isOpen, onClose }: HistorySidebarProps) {
  const { palettes, clearHistory } = useHistoryStore()
  const [filter, setFilter] = useState<'all' | 'favorites'>('all')

  const filteredPalettes =
    filter === 'favorites'
      ? palettes.filter((p) => p.isFavorite)
      : palettes

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">History</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b border-gray-200 px-6 py-3">
          <button
            onClick={() => setFilter('all')}
            className={`text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({palettes.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`text-sm font-medium transition-colors ${
              filter === 'favorites'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Favorites ({palettes.filter((p) => p.isFavorite).length})
          </button>
        </div>

        {/* List */}
        <div className="h-[calc(100%-180px)] overflow-y-auto p-6">
          {filteredPalettes.length === 0 ? (
            <p className="mt-8 text-center text-sm text-gray-500">
              {filter === 'favorites'
                ? 'No favorite palettes yet'
                : 'No palettes saved yet'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredPalettes.map((palette) => (
                <PaletteHistoryItem
                  key={palette.id}
                  palette={palette}
                  onSelect={onClose}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {palettes.length > 0 && (
          <div className="absolute bottom-0 w-full border-t border-gray-200 p-6">
            <button
              onClick={clearHistory}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  )
}
