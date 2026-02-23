// components/layout/PreviewPanel.tsx
import { PreviewContainer } from '@/components/preview/PreviewContainer'

export function PreviewPanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Preview
      </h2>

      <PreviewContainer />
    </div>
  )
}
