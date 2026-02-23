// components/accessibility/ContrastRatio.tsx
import type { ContrastCheck } from '@/types/accessibility'

interface ContrastRatioProps {
  ratio: number
  passes: ContrastCheck['passes']
}

/**
 * 대비 비율 및 WCAG 기준별 통과 여부 표시 컴포넌트
 *
 * 4가지 기준 표시:
 * - AA Normal (4.5:1)
 * - AA Large (3:1)
 * - AAA Normal (7:1)
 * - AAA Large (4.5:1)
 */
export function ContrastRatio({ ratio, passes }: ContrastRatioProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-700">
        Contrast Ratio: <span className="font-mono">{ratio.toFixed(2)}:1</span>
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={passes.AA ? 'text-green-600' : 'text-gray-400'}>
          {passes.AA ? '✓' : '✗'} AA Normal (&gt;4.5:1)
        </div>
        <div className={passes.AALarge ? 'text-green-600' : 'text-gray-400'}>
          {passes.AALarge ? '✓' : '✗'} AA Large (&gt;3:1)
        </div>
        <div className={passes.AAA ? 'text-green-600' : 'text-gray-400'}>
          {passes.AAA ? '✓' : '✗'} AAA Normal (&gt;7:1)
        </div>
        <div className={passes.AAALarge ? 'text-green-600' : 'text-gray-400'}>
          {passes.AAALarge ? '✓' : '✗'} AAA Large (&gt;4.5:1)
        </div>
      </div>
    </div>
  )
}
