// lib/color/extractors.ts
import ColorThief from 'colorthief'
import chroma from 'chroma-js'

/**
 * 이미지에서 색상 추출
 */
export async function extractColorsFromImage(
  file: File,
  colorCount: number = 6
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }

    img.onload = () => {
      try {
        const colorThief = new ColorThief()
        const palette = colorThief.getPalette(img, colorCount)

        // Convert RGB arrays to HEX
        const hexColors = palette.map((rgb: [number, number, number]) =>
          chroma(rgb).hex()
        )

        resolve(hexColors)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    reader.onerror = () => reject(new Error('Failed to read file'))

    reader.readAsDataURL(file)
  })
}
