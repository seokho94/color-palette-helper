// components/layout/InputPanel.tsx
import { ColorPicker } from '@/components/color/ColorPicker'
import { ColorInput } from '@/components/color/ColorInput'
import { ImageUpload } from '@/components/color/ImageUpload'

export function InputPanel() {
  return (
    <div className="overflow-y-auto bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Color Input
      </h2>

      {/* Color Picker */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Pick a Color
        </h3>
        <ColorPicker />
      </div>

      {/* Manual Input */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Or Enter Manually
        </h3>
        <ColorInput />
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-gray-500">OR</span>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Upload an Image
        </h3>
        <ImageUpload />
      </div>
    </div>
  )
}
