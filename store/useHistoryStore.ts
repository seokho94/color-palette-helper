// store/useHistoryStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Palette } from '@/types/color'
import { generateId } from '@/lib/utils'

interface HistoryState {
  palettes: Palette[]
  maxHistory: number

  addPalette: (palette: Omit<Palette, 'id' | 'createdAt'>) => void
  removePalette: (id: string) => void
  toggleFavorite: (id: string) => void
  clearHistory: () => void
  getPalette: (id: string) => Palette | undefined
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      palettes: [],
      maxHistory: 50,

      addPalette: (palette) => {
        const newPalette: Palette = {
          ...palette,
          id: generateId(),
          createdAt: Date.now(),
        }

        set((state) => {
          const updated = [newPalette, ...state.palettes]

          // 최대 개수 제한
          if (updated.length > state.maxHistory) {
            // 즐겨찾기가 아닌 항목부터 삭제
            const favorites = updated.filter((p) => p.isFavorite)
            const nonFavorites = updated.filter((p) => !p.isFavorite)

            if (nonFavorites.length > state.maxHistory - favorites.length) {
              nonFavorites.pop()
            }

            return {
              palettes: [...favorites, ...nonFavorites].slice(0, state.maxHistory),
            }
          }

          return { palettes: updated }
        })
      },

      removePalette: (id) =>
        set((state) => ({
          palettes: state.palettes.filter((p) => p.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
          ),
        })),

      clearHistory: () => {
        const confirmed = confirm('Are you sure you want to clear all history?')
        if (confirmed) {
          set({ palettes: [] })
        }
      },

      getPalette: (id) => get().palettes.find((p) => p.id === id),
    }),
    {
      name: 'palette-history',
    }
  )
)
