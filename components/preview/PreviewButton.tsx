// components/preview/PreviewButton.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

/**
 * 버튼 미리보기 컴포넌트
 *
 * 5가지 버튼 스타일 표시:
 * - Primary: 기본 버튼
 * - Secondary: 보조 버튼
 * - Accent: 강조 버튼
 * - Outline: 테두리 버튼
 * - Ghost: 투명 버튼
 */
export function PreviewButton() {
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
      <h3 className="text-sm font-medium text-gray-700">Button Styles</h3>

      {/* Primary Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Primary</p>
        <button
          className="rounded-lg px-6 py-3 font-medium shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.primary.hex,
            color: roles.textOnPrimary,
          }}
        >
          Primary Action
        </button>
      </div>

      {/* Secondary Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Secondary</p>
        <button
          className="rounded-lg px-6 py-3 font-medium shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.secondary.hex,
            color: roles.textOnSecondary,
          }}
        >
          Secondary Action
        </button>
      </div>

      {/* Accent Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Accent</p>
        <button
          className="rounded-lg px-6 py-3 font-medium shadow-sm transition-transform hover:scale-105"
          style={{
            backgroundColor: roles.accent.hex,
            color: roles.textOnAccent,
          }}
        >
          Accent Action
        </button>
      </div>

      {/* Outline Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Outline</p>
        <button
          className="rounded-lg border-2 px-6 py-3 font-medium transition-transform hover:scale-105"
          style={{
            borderColor: roles.primary.hex,
            color: roles.primary.hex,
            backgroundColor: 'transparent',
          }}
        >
          Outline Action
        </button>
      </div>

      {/* Ghost Button */}
      <div>
        <p className="mb-2 text-xs text-gray-600">Ghost</p>
        <button
          className="rounded-lg px-6 py-3 font-medium transition-colors hover:bg-gray-100"
          style={{
            color: roles.primary.hex,
          }}
        >
          Ghost Action
        </button>
      </div>
    </div>
  )
}
