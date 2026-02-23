// components/preview/PreviewForm.tsx
'use client'

import { useMemo } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { useThemeStore } from '@/store/useThemeStore'
import { assignColorRoles } from '@/lib/color/roles'

/**
 * 폼 미리보기 컴포넌트
 *
 * 폼 요소:
 * - Text Input
 * - Textarea
 * - Checkbox
 * - Submit Button
 */
export function PreviewForm() {
  const { colors, baseColor, harmonyRule } = usePaletteStore()
  const { theme } = useThemeStore()

  const roles = useMemo(() => {
    if (colors.length < 5) return null
    return assignColorRoles(colors, harmonyRule, baseColor, theme)
  }, [colors, harmonyRule, baseColor, theme])

  if (!roles) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">Generate a palette first</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">Form Elements</h3>

      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: roles.background.hex }}
      >
        <form className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: roles.textOnBackground }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: roles.textOnBackground,
                color: roles.textOnBackground,
                borderWidth: '1px',
              }}
            />
          </div>

          {/* Textarea */}
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: roles.textOnBackground }}
            >
              Message
            </label>
            <textarea
              placeholder="Your message..."
              rows={3}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: roles.textOnBackground,
                color: roles.textOnBackground,
                borderWidth: '1px',
              }}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded"
              style={{ accentColor: roles.primary.hex }}
            />
            <label
              htmlFor="terms"
              className="text-sm"
              style={{ color: roles.textOnBackground }}
            >
              I agree to the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg py-2.5 font-medium transition-transform hover:scale-105"
            style={{
              backgroundColor: roles.primary.hex,
              color: roles.textOnPrimary,
            }}
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  )
}
