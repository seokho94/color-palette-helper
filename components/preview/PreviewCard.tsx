// components/preview/PreviewCard.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

/**
 * 카드 미리보기 컴포넌트
 *
 * 2가지 카드 스타일:
 * - 일반 카드: background 색상 사용
 * - 반전 카드: primary 색상을 배경으로 사용
 */
export function PreviewCard() {
  const { colors } = usePaletteStore()

  const roles = useMemo(() => {
    if (colors.length < 5) return null
    return assignColorRoles(colors)
  }, [colors])

  if (!roles) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">Generate a palette first</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">Card Styles</h3>

      {/* Card 1 - Normal */}
      <div
        className="rounded-lg p-6 shadow-lg"
        style={{ backgroundColor: roles.background.hex }}
      >
        <div
          className="mb-2 inline-block rounded px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: roles.accent.hex,
            color: roles.textOnAccent,
          }}
        >
          Featured
        </div>

        <h4
          className="mb-2 text-xl font-bold"
          style={{ color: roles.text.hex }}
        >
          Card Title
        </h4>

        <p
          className="mb-4 text-sm"
          style={{ color: roles.text.hex, opacity: 0.8 }}
        >
          This is a preview of how your color palette looks in a card component.
          The colors are automatically assigned based on your palette.
        </p>

        <button
          className="rounded-lg px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.primary.hex,
            color: roles.textOnPrimary,
          }}
        >
          Learn More
        </button>
      </div>

      {/* Card 2 - Inverted */}
      <div
        className="rounded-lg p-6 shadow-lg"
        style={{ backgroundColor: roles.primary.hex }}
      >
        <h4
          className="mb-2 text-xl font-bold"
          style={{ color: roles.textOnPrimary }}
        >
          Inverted Card
        </h4>

        <p
          className="mb-4 text-sm"
          style={{ color: roles.textOnPrimary, opacity: 0.9 }}
        >
          This card uses the primary color as background, demonstrating
          color versatility.
        </p>

        <button
          className="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
          style={{
            borderColor: roles.textOnPrimary,
            color: roles.textOnPrimary,
            backgroundColor: 'transparent',
          }}
        >
          Action
        </button>
      </div>
    </div>
  )
}
