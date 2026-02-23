// components/palette/ColorCard.tsx
'use client'

import { useState } from 'react'
import { Lock, Unlock, Copy, Check } from 'lucide-react'
import chroma from 'chroma-js'
import type { Color } from '@/types/color'

interface ColorCardProps {
  color: Color
  index: number
  onToggleLock: (index: number) => void
}

export function ColorCard({ color, index, onToggleLock }: ColorCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Contrast text color
  const textColor = chroma.contrast(color.hex, '#FFFFFF') > 4.5 ? '#FFFFFF' : '#000000'

  return (
    <div
      className="group relative flex h-32 flex-col items-center justify-center rounded-lg border border-gray-200 transition-all hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: color.hex }}
    >
      {/* Lock Button */}
      <button
        onClick={() => onToggleLock(index)}
        className="absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition-opacity hover:bg-black/10 group-hover:opacity-100"
        style={{ color: textColor }}
        aria-label={color.locked ? 'Unlock color' : 'Lock color'}
      >
        {color.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
      </button>

      {/* Color Info */}
      <div className="text-center" style={{ color: textColor }}>
        <p className="mb-1 font-mono text-sm font-semibold">{color.hex}</p>
        <p className="text-xs opacity-80">
          RGB({color.rgb.map((v) => Math.round(v)).join(', ')})
        </p>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-medium opacity-0 transition-all hover:bg-black/10 group-hover:opacity-100"
        style={{ color: textColor }}
      >
        {copied ? (
          <>
            <Check className="mr-1 inline-block h-3 w-3" />
            Copied
          </>
        ) : (
          <>
            <Copy className="mr-1 inline-block h-3 w-3" />
            Copy
          </>
        )}
      </button>
    </div>
  )
}
