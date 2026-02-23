// components/share/ShareButton.tsx
'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { ShareModal } from './ShareModal'

export function ShareButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { colors, baseColor, harmonyRule } = usePaletteStore()

  const handleShare = () => {
    if (colors.length === 0) {
      alert('Please generate a palette first')
      return
    }

    setIsModalOpen(true)
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        aria-label="Share"
      >
        <Share2 className="h-5 w-5" />
        <span className="hidden md:inline">Share</span>
      </button>

      <ShareModal
        palette={{
          id: 'temp',
          name: 'Shared Palette',
          colors,
          baseColor,
          harmonyRule,
          createdAt: Date.now(),
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
