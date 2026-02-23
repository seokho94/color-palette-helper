// components/accessibility/AccessibilityCheck.tsx
'use client'

import { useMemo } from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { checkAllCombinations } from '@/lib/color/accessibility'
import { ContrastRatio } from './ContrastRatio'
import { WCAGBadge } from './WCAGBadge'

/**
 * 접근성 검사 컴포넌트
 *
 * 팔레트의 모든 색상 조합에 대해 WCAG 대비 비율을 검증하고 결과를 표시합니다.
 *
 * 기능:
 * - 전체 조합 요약 (통과/실패 개수)
 * - 상세 결과 확장/축소
 * - 각 조합별 대비 비율 및 WCAG 레벨 표시
 */
export function AccessibilityCheck() {
  const { colors } = usePaletteStore()

  const results = useMemo(() => {
    if (colors.length === 0) return []
    const hexColors = colors.map((c) => c.hex)
    return checkAllCombinations(hexColors)
  }, [colors])

  const passCount = results.filter((r) => r.wcagLevel !== 'Fail').length
  const totalCount = results.length

  const allPassing = passCount === totalCount

  if (colors.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">
          Generate a palette to check accessibility
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
        allPassing
          ? 'border-green-200 bg-green-50'
          : 'border-yellow-200 bg-yellow-50'
      }`}>
        {allPassing ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-600" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {allPassing
              ? 'All color combinations pass WCAG AA!'
              : `${passCount} of ${totalCount} combinations pass WCAG AA`
            }
          </p>
          {!allPassing && (
            <p className="mt-1 text-xs text-gray-600">
              Some color combinations may not be accessible
            </p>
          )}
        </div>
      </div>

      {/* Detailed Results */}
      <details className="group rounded-lg border border-gray-200">
        <summary className="cursor-pointer p-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Info className="mr-2 inline-block h-4 w-4" />
          View all combinations ({results.length})
        </summary>

        <div className="divide-y divide-gray-100 border-t border-gray-200">
          {results.map((result, index) => (
            <div key={index} className="p-4 transition-colors hover:bg-gray-50">
              {/* Color Pair */}
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded border border-gray-300"
                    style={{ backgroundColor: result.foreground }}
                    title={result.foreground}
                  />
                  <span className="text-xs font-mono text-gray-600">
                    {result.foreground}
                  </span>
                  <span className="text-gray-400">+</span>
                  <div
                    className="h-6 w-6 rounded border border-gray-300"
                    style={{ backgroundColor: result.background }}
                    title={result.background}
                  />
                  <span className="text-xs font-mono text-gray-600">
                    {result.background}
                  </span>
                </div>

                <WCAGBadge level={result.wcagLevel} />
              </div>

              {/* Contrast Ratio */}
              <ContrastRatio ratio={result.contrastRatio} passes={result.passes} />

              {/* Suggestion */}
              {result.suggestion && (
                <p className="mt-2 text-xs text-yellow-600">
                  💡 {result.suggestion}
                </p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
