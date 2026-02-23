// lib/export/m3-tokens.ts
import type { M3CorePalettes } from '@/lib/color/tonal'
import type { M3ColorRoles } from '@/lib/color/m3-roles'

/**
 * CSS Custom Properties (CSS Variables) 형식으로 export
 */
export function exportAsCSS(
  lightRoles: M3ColorRoles,
  darkRoles: M3ColorRoles
): string {
  const cssLight = Object.entries(lightRoles)
    .map(([key, value]) => `  --md-sys-color-${toKebabCase(key)}: ${value};`)
    .join('\n')

  const cssDark = Object.entries(darkRoles)
    .map(([key, value]) => `  --md-sys-color-${toKebabCase(key)}: ${value};`)
    .join('\n')

  return `:root {
  /* Light Theme */
${cssLight}
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Theme */
${cssDark}
  }
}

/* Manual Dark Mode */
[data-theme="dark"] {
${cssDark}
}
`
}

/**
 * JSON 형식으로 export (Design Tokens)
 */
export function exportAsJSON(
  lightRoles: M3ColorRoles,
  darkRoles: M3ColorRoles,
  palettes: M3CorePalettes
): string {
  const tokens = {
    $schema: 'https://m3.material.io/theme-builder',
    version: '1.0.0',
    theme: {
      light: lightRoles,
      dark: darkRoles,
    },
    palettes: {
      primary: Object.fromEntries(
        Object.entries(palettes.primary).map(([tone, color]) => [
          `tone${tone}`,
          color,
        ])
      ),
      secondary: Object.fromEntries(
        Object.entries(palettes.secondary).map(([tone, color]) => [
          `tone${tone}`,
          color,
        ])
      ),
      tertiary: Object.fromEntries(
        Object.entries(palettes.tertiary).map(([tone, color]) => [
          `tone${tone}`,
          color,
        ])
      ),
      neutral: Object.fromEntries(
        Object.entries(palettes.neutral).map(([tone, color]) => [
          `tone${tone}`,
          color,
        ])
      ),
      neutralVariant: Object.fromEntries(
        Object.entries(palettes.neutralVariant).map(([tone, color]) => [
          `tone${tone}`,
          color,
        ])
      ),
      error: Object.fromEntries(
        Object.entries(palettes.error).map(([tone, color]) => [
          `tone${tone}`,
          color,
        ])
      ),
    },
  }

  return JSON.stringify(tokens, null, 2)
}

/**
 * Tailwind CSS Config 형식으로 export
 */
export function exportAsTailwind(
  lightRoles: M3ColorRoles,
  darkRoles: M3ColorRoles
): string {
  const lightColors = Object.entries(lightRoles)
    .map(([key, value]) => `        '${toKebabCase(key)}': '${value}',`)
    .join('\n')

  const darkColors = Object.entries(darkRoles)
    .map(([key, value]) => `          '${toKebabCase(key)}': '${value}',`)
    .join('\n')

  return `// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Light Theme
${lightColors}
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '@media (prefers-color-scheme: dark)': {
          ':root': {
            // Dark Theme colors
${darkColors}
          },
        },
      })
    },
  ],
}
`
}

/**
 * SCSS Variables 형식으로 export
 */
export function exportAsSCSS(
  lightRoles: M3ColorRoles,
  darkRoles: M3ColorRoles
): string {
  const scssLight = Object.entries(lightRoles)
    .map(([key, value]) => `$md-sys-color-${toKebabCase(key)}: ${value};`)
    .join('\n')

  const scssDark = Object.entries(darkRoles)
    .map(([key, value]) => `$md-sys-color-${toKebabCase(key)}-dark: ${value};`)
    .join('\n')

  return `// Light Theme
${scssLight}

// Dark Theme
${scssDark}
`
}

/**
 * Figma Tokens 형식으로 export
 */
export function exportAsFigmaTokens(
  lightRoles: M3ColorRoles,
  darkRoles: M3ColorRoles
): string {
  const tokens = {
    global: {},
    light: Object.fromEntries(
      Object.entries(lightRoles).map(([key, value]) => [
        `md.sys.color.${toKebabCase(key)}`,
        {
          value,
          type: 'color',
        },
      ])
    ),
    dark: Object.fromEntries(
      Object.entries(darkRoles).map(([key, value]) => [
        `md.sys.color.${toKebabCase(key)}`,
        {
          value,
          type: 'color',
        },
      ])
    ),
  }

  return JSON.stringify(tokens, null, 2)
}

/**
 * camelCase를 kebab-case로 변환
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
