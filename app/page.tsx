// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { InputPanel } from '@/components/layout/InputPanel'
import { PalettePanel } from '@/components/layout/PalettePanel'
import { PreviewPanel } from '@/components/layout/PreviewPanel'
import { usePaletteStore } from '@/store/usePaletteStore'
import { decodePaletteFromUrl } from '@/lib/share/url'

export default function HomePage() {
  const searchParams = useSearchParams()
  const { setBaseColor, setHarmonyRule, setColors } = usePaletteStore()

  // URL에서 팔레트 복원
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

  return (
    <div className="grid h-full grid-cols-1 gap-px bg-gray-200 md:grid-cols-2 lg:grid-cols-[320px_1fr_1fr]">
      <InputPanel />
      <PalettePanel />
      <PreviewPanel />
    </div>
  )
}
