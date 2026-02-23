// components/preview/PreviewText.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { assignColorRoles } from '@/lib/color/roles'

/**
 * 텍스트 미리보기 컴포넌트
 *
 * 타이포그래피 스타일:
 * - H1, H2, H3 제목
 * - 본문 텍스트
 * - 링크
 * - 작은 텍스트 (caption)
 * - Accent 텍스트
 */
export function PreviewText() {
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
      <h3 className="text-sm font-medium text-gray-700">Typography Styles</h3>

      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: roles.background.hex }}
      >
        {/* Heading 1 */}
        <h1
          className="mb-4 text-4xl font-bold"
          style={{ color: roles.textOnBackground }}
        >
          Heading 1
        </h1>

        {/* Heading 2 */}
        <h2
          className="mb-3 text-3xl font-bold"
          style={{ color: roles.textOnBackground }}
        >
          Heading 2
        </h2>

        {/* Heading 3 */}
        <h3
          className="mb-3 text-2xl font-semibold"
          style={{ color: roles.textOnBackground }}
        >
          Heading 3
        </h3>

        {/* Paragraph */}
        <p
          className="mb-4 text-base leading-relaxed"
          style={{ color: roles.textOnBackground, opacity: 0.9 }}
        >
          This is a paragraph with body text. The quick brown fox jumps over
          the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Link */}
        <a
          href="#"
          className="font-medium underline"
          style={{ color: roles.accent.hex }}
        >
          This is a link
        </a>

        {/* Small Text */}
        <p
          className="mt-4 text-sm"
          style={{ color: roles.textOnBackground, opacity: 0.7 }}
        >
          Small text for captions and footnotes.
        </p>

        {/* Accent Text */}
        <p
          className="mt-4 text-lg font-semibold"
          style={{ color: roles.accent.hex }}
        >
          Accent colored text for emphasis
        </p>
      </div>
    </div>
  )
}
