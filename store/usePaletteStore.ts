// store/usePaletteStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Color, HarmonyRule } from '@/types/color'
import { generatePalette } from '@/lib/color/harmony'
import { hexArrayToColors, randomColor } from '@/lib/color/utils'
import { useHistoryStore } from './useHistoryStore'

interface PaletteState {
  baseColor: string
  colors: Color[]
  harmonyRule: HarmonyRule

  setBaseColor: (color: string) => void
  setColors: (colors: Color[]) => void
  setHarmonyRule: (rule: HarmonyRule) => void
  generateColors: () => void
  toggleLock: (index: number) => void
  randomize: () => void
}

export const usePaletteStore = create<PaletteState>()(
  persist(
    (set, get) => ({
      baseColor: '#3B82F6',
      colors: [],
      harmonyRule: 'complementary',

      setBaseColor: (color) => {
        set({ baseColor: color })
        get().generateColors()
      },

      setColors: (colors) => set({ colors }),

      setHarmonyRule: (rule) => {
        set({ harmonyRule: rule })
        get().generateColors()
      },

      generateColors: () => {
        const { baseColor, harmonyRule, colors } = get()
        const hexArray = generatePalette(baseColor, harmonyRule)
        const newColors = hexArrayToColors(hexArray)

        // 잠긴 색상은 유지
        const mergedColors = newColors.map((color, i) => {
          if (colors[i]?.locked) {
            return colors[i]
          }
          return color
        })

        set({ colors: mergedColors })

        // 히스토리에 자동 저장
        if (mergedColors.length > 0) {
          useHistoryStore.getState().addPalette({
            name: `${harmonyRule} Palette`,
            colors: mergedColors,
            harmonyRule,
            baseColor,
          })
        }
      },

      toggleLock: (index) =>
        set((state) => ({
          colors: state.colors.map((c, i) =>
            i === index ? { ...c, locked: !c.locked } : c
          ),
        })),

      randomize: () => {
        const { harmonyRule, colors } = get()
        const newBaseColor = randomColor()
        const hexArray = generatePalette(newBaseColor, harmonyRule)
        const newColors = hexArrayToColors(hexArray)

        // 잠긴 색상은 유지
        const mergedColors = newColors.map((color, i) => {
          if (colors[i]?.locked) {
            return colors[i]
          }
          return color
        })

        set({ baseColor: newBaseColor, colors: mergedColors })

        // 히스토리에 자동 저장
        if (mergedColors.length > 0) {
          useHistoryStore.getState().addPalette({
            name: `${harmonyRule} Palette`,
            colors: mergedColors,
            harmonyRule,
            baseColor: newBaseColor,
          })
        }
      },
    }),
    {
      name: 'palette-storage',
    }
  )
)
