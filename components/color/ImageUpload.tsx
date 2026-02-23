// components/color/ImageUpload.tsx
'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { extractColorsFromImage } from '@/lib/color/extractors'
import { IMAGE_CONFIG } from '@/constants/config'
import { ExtractedColors } from './ExtractedColors'

export function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [colors, setColors] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    // Validate file
    if (!IMAGE_CONFIG.allowedFormats.includes(file.type as any)) {
      setError('Only JPG, PNG, WebP formats are supported')
      return
    }

    if (file.size > IMAGE_CONFIG.maxSize) {
      setError('Image size must be less than 5MB')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Extract colors
      const extractedColors = await extractColorsFromImage(file, IMAGE_CONFIG.colorCount)
      setColors(extractedColors)
    } catch (err) {
      setError('Failed to extract colors from image')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    setPreview(null)
    setColors([])
    setError(null)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
        >
          <Upload className="mb-3 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm font-medium text-gray-700">
            Drop an image here or click to upload
          </p>
          <p className="text-xs text-gray-500">JPG, PNG, WebP (max 5MB)</p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      ) : (
        /* Preview & Clear */
        <div className="relative">
          <img
            src={preview}
            alt="Uploaded"
            className="h-48 w-full rounded-lg object-cover"
          />
          <button
            onClick={handleClear}
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-lg transition-colors hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-sm text-gray-600">
          Extracting colors...
        </div>
      )}

      {/* Extracted Colors */}
      {colors.length > 0 && <ExtractedColors colors={colors} />}
    </div>
  )
}
