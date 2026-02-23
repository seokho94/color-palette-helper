// components/color/ColorInput.tsx
'use client'

import { useState } from 'react'
import { usePaletteStore } from '@/store/usePaletteStore'
import { validateHexColor, validateRgbColor, validateHslColor } from '@/lib/color/validators'

type ColorFormat = 'hex' | 'rgb' | 'hsl'

export function ColorInput() {
  const { baseColor, setBaseColor } = usePaletteStore()
  const [format, setFormat] = useState<ColorFormat>('hex')
  const [inputValue, setInputValue] = useState(baseColor)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = false

    switch (format) {
      case 'hex':
        isValid = validateHexColor(inputValue)
        break
      case 'rgb':
        isValid = validateRgbColor(inputValue)
        break
      case 'hsl':
        isValid = validateHslColor(inputValue)
        break
    }

    if (isValid) {
      setBaseColor(inputValue)
      setError(null)
    } else {
      setError(`Invalid ${format.toUpperCase()} format`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Format Tabs */}
      <div className="flex gap-2">
        {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map((fmt) => (
          <button
            key={fmt}
            type="button"
            onClick={() => setFormat(fmt)}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              format === fmt
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            format === 'hex'
              ? '#3B82F6'
              : format === 'rgb'
              ? 'rgb(59, 130, 246)'
              : 'hsl(217, 91%, 60%)'
          }
          className={`flex-1 rounded-lg border px-3 py-2 text-sm font-mono ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Apply
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
