// app/page.tsx
import { Suspense } from 'react'
import { InputPanel } from '@/components/layout/InputPanel'
import { PalettePanel } from '@/components/layout/PalettePanel'
import { PreviewPanel } from '@/components/layout/PreviewPanel'
import { UrlRestorer } from '@/components/share/UrlRestorer'

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <UrlRestorer />
      </Suspense>
      <div className="grid h-full grid-cols-1 gap-px bg-gray-200 md:grid-cols-2 lg:grid-cols-[320px_1fr_1fr]">
        <InputPanel />
        <PalettePanel />
        <PreviewPanel />
      </div>
    </>
  )
}
