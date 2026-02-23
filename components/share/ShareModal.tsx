// components/share/ShareModal.tsx
'use client'

import { useState } from 'react'
import { X, Copy, Check, Share2 } from 'lucide-react'
import type { Palette } from '@/types/color'
import { generateShareUrl } from '@/lib/share/url'

interface ShareModalProps {
  palette: Palette
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ palette, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = generateShareUrl(palette)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Share Palette
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* URL Display */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Share Link
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-600"
            />

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Preview
          </label>

          <div className="grid grid-cols-6 gap-2">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="h-12 rounded-lg"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500">
          Anyone with this link can view and use this color palette.
        </p>
      </div>
    </>
  )
}
