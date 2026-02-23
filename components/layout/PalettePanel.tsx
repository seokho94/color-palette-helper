// components/layout/PalettePanel.tsx
import { PaletteDisplay } from '@/components/palette/PaletteDisplay'
import { AccessibilityCheck } from '@/components/accessibility/AccessibilityCheck'
import { ExportPanel } from '@/components/export/ExportPanel'
import { ToneVisualizer } from '@/components/palette/ToneVisualizer'
import { M3ExportPanel } from '@/components/export/M3ExportPanel'

export function PalettePanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Color Palette
      </h2>

      <PaletteDisplay />

      {/* M3 Tonal Visualizer */}
      <div className="mt-8">
        <ToneVisualizer />
      </div>

      {/* Accessibility Check */}
      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          Accessibility Check
        </h3>
        <AccessibilityCheck />
      </div>

      {/* M3 Export */}
      <div className="mt-8">
        <M3ExportPanel />
      </div>

      {/* Export */}
      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          Export Code
        </h3>
        <ExportPanel />
      </div>
    </div>
  )
}
