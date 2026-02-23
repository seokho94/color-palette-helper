// components/palette/HarmonySelector.tsx
'use client'

import type { HarmonyRule } from '@/types/color'
import { usePaletteStore } from '@/store/usePaletteStore'

const HARMONY_OPTIONS: { value: HarmonyRule; label: string; description: string }[] = [
  {
    value: 'complementary',
    label: 'Complementary',
    description: 'Opposite colors (180°)',
  },
  {
    value: 'analogous',
    label: 'Analogous',
    description: 'Adjacent colors (±30°)',
  },
  {
    value: 'triadic',
    label: 'Triadic',
    description: 'Evenly spaced (120°)',
  },
  {
    value: 'split-complementary',
    label: 'Split-Complementary',
    description: 'Complement + neighbors',
  },
  {
    value: 'tetradic',
    label: 'Tetradic',
    description: 'Double complementary',
  },
  {
    value: 'monochromatic',
    label: 'Monochromatic',
    description: 'Single hue variations',
  },
]

export function HarmonySelector() {
  const { harmonyRule, setHarmonyRule } = usePaletteStore()

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Harmony Rule
      </label>

      <select
        value={harmonyRule}
        onChange={(e) => setHarmonyRule(e.target.value as HarmonyRule)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {HARMONY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500">
        {HARMONY_OPTIONS.find((o) => o.value === harmonyRule)?.description}
      </p>
    </div>
  )
}
