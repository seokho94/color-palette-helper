// components/layout/Header.tsx
'use client'

import { useState } from 'react'
import { Palette, HelpCircle, History } from 'lucide-react'
import { HistorySidebar } from '@/components/history/HistorySidebar'
import { ShareButton } from '@/components/share/ShareButton'

export function Header() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white px-6">
        <div className="flex h-full items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Color Palette Helper
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <ShareButton />

            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
              aria-label="History"
            >
              <History className="h-5 w-5" />
              <span className="hidden md:inline">History</span>
            </button>

            <button
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="hidden md:inline">Help</span>
            </button>
          </div>
        </div>
      </header>

      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  )
}
