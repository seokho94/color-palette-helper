// components/theme/ThemeToggle.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'

/**
 * Light/Dark Theme 토글 버튼
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-gray-200 bg-white p-2 transition-all hover:bg-gray-50 hover:shadow-md"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-700" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  )
}
