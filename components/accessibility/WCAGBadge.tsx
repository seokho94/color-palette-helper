// components/accessibility/WCAGBadge.tsx
import type { WCAGLevel } from '@/types/accessibility'

interface WCAGBadgeProps {
  level: WCAGLevel
}

/**
 * WCAG 레벨 배지 컴포넌트
 *
 * - AAA: 최고 수준 (녹색)
 * - AA: 일반 수준 (파란색)
 * - Fail: 기준 미달 (빨간색)
 */
export function WCAGBadge({ level }: WCAGBadgeProps) {
  const styles = {
    AAA: 'bg-green-100 text-green-800 border-green-200',
    AA: 'bg-blue-100 text-blue-800 border-blue-200',
    Fail: 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[level]}`}
    >
      {level === 'Fail' ? 'Failed' : `WCAG ${level}`}
    </span>
  )
}
