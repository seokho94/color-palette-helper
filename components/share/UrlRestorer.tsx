// components/share/UrlRestorer.tsx
'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePaletteStore } from '@/store/usePaletteStore'
import { decodePaletteFromUrl } from '@/lib/share/url'

/**
 * URL에서 팔레트를 복원하는 컴포넌트
 * useSearchParams()를 사용하므로 Suspense 경계 내에서 사용해야 함
 */
export function UrlRestorer() {
  const searchParams = useSearchParams()
  const { setBaseColor, setHarmonyRule, setColors } = usePaletteStore()

  useEffect(() => {
    const queryString = searchParams.toString()

    if (queryString) {
      const palette = decodePaletteFromUrl(queryString)

      if (palette) {
        if (palette.baseColor) setBaseColor(palette.baseColor)
        if (palette.harmonyRule) setHarmonyRule(palette.harmonyRule)
        if (palette.colors) setColors(palette.colors)
      }
    }
  }, [searchParams, setBaseColor, setHarmonyRule, setColors])

  return null
}
