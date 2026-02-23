# 🎨 Color Palette Helper

Generate beautiful, accessible color palettes for your web projects with **Material Design 3** support, AI-powered recommendations, and automatic WCAG compliance checking.

## ✨ Features

### 🎨 Color Generation
- **7 Harmony Rules**: Complementary, Analogous, Triadic, Split-Complementary, Tetradic, Monochromatic, **Material Design 3 Tonal**
- **M3 Tonal Palettes**: Google's latest design system with 13-step tone scales (0-100)
- **Perceptual Color Space**: LAB-based color processing for uniform, natural tones
- 🖼️ **Image Color Extraction**: Upload images and extract dominant colors using ColorThief
- 🔒 **Color Locking**: Lock specific colors while regenerating the rest

### ♿ Accessibility & Preview
- **WCAG Compliance**: Automatic AA/AAA contrast ratio checking with fix suggestions
- **Automatic Contrast**: Smart text color selection (white/black) based on background
- 👁️ **Live Preview**: See colors applied to buttons, cards, forms, and typography
- **Tone Visualizer**: Visual display of all 13 M3 tonal steps with click-to-copy

### 🌓 Theme & Export
- **☀️🌙 Light/Dark Mode**: Toggle between themes (M3 Tonal palettes only)
- **10+ Export Formats**:
  - Standard: HEX, RGB, HSL, CSS Variables, SCSS, Tailwind Config, JSON
  - M3 Tokens: CSS Variables (Light/Dark), Design Tokens (JSON), Figma Tokens
- 📤 **Professional Export**: Industry-standard design tokens for design systems

### 💾 Productivity
- **History & Favorites**: Save up to 50 palettes with LocalStorage persistence
- 🔗 **URL Sharing**: Share palettes via URL with query parameters
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand (with persist middleware)
- **Color Libraries**:
  - chroma.js (color manipulation + LAB color space)
  - color-thief (image color extraction)
  - react-colorful (color picker UI)
- **Design System**: Material Design 3 (Tonal Palettes)
- **Testing**: Vitest + Testing Library (55 tests)
- **Package Manager**: pnpm 9.x

## 📦 Getting Started

### Prerequisites

- Node.js 20 LTS or higher
- pnpm 9.x

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📖 Documentation

All project documentation is available in the `docs/` folder:

- **[0.Concept/](./docs/0.Concept/)**: Project concept and requirements
- **[1.Plan/](./docs/1.Plan/)**: Detailed planning and architecture documents
- **[M3 Tonal Guide](./docs/M3-TONAL-GUIDE.md)**: Complete Material Design 3 usage guide

### Key Documents

- [Feature Priority](./docs/1.Plan/02-Feature-Priority.md)
- [UX Design Plan](./docs/1.Plan/04-UX-Design-Plan.md)
- [Frontend Architecture](./docs/1.Plan/06-Frontend-Architecture.md)
- [Development Schedule](./docs/1.Plan/07-Development-Schedule.md)
- **[M3 Tonal Palette Guide](./docs/M3-TONAL-GUIDE.md)** ⭐ New!

## 🧪 Development & Testing

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## 📂 Project Structure

```
color-palette-helper/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── color/             # Color input & image upload
│   ├── palette/           # Palette display & tone visualizer
│   ├── preview/           # UI preview (Card, Text, Form)
│   ├── export/            # Export panels (Standard + M3)
│   ├── theme/             # Theme toggle (Light/Dark)
│   ├── accessibility/     # WCAG compliance checker
│   └── history/           # History & favorites
├── lib/                   # Utility libraries
│   ├── color/             # Color manipulation
│   │   ├── harmony.ts     # 7 harmony rules
│   │   ├── tonal.ts       # M3 Tonal Palette generation
│   │   ├── m3-roles.ts    # M3 Color Roles (Light/Dark)
│   │   ├── perceptual.ts  # LAB color space processing
│   │   ├── accessibility.ts # WCAG contrast checking
│   │   └── roles.ts       # Color role assignment
│   ├── export/            # Code generation
│   │   └── m3-tokens.ts   # M3 Design Tokens export
│   └── share/             # URL encoding/decoding
├── store/                 # Zustand stores
│   ├── usePaletteStore.ts # Palette state
│   ├── useHistoryStore.ts # History state
│   └── useThemeStore.ts   # Theme state (Light/Dark)
├── types/                 # TypeScript types
├── __tests__/             # Vitest test suites (55 tests)
└── docs/                  # Documentation
    └── M3-TONAL-GUIDE.md  # Material Design 3 guide
```

## 🎯 Development Progress

- ✅ **Phase 1**: Foundation & Basic UI (100%)
  - Project setup, Layout, Color input, Image upload
- ✅ **Phase 2**: Core Features (100%)
  - 6 Harmony rules, Accessibility checks, UI preview
- ✅ **Phase 3**: Advanced Features (100%)
  - Export functionality, History & Favorites, URL sharing
- ✅ **Phase 4**: Material Design 3 (100%) ⭐ New!
  - M3 Tonal Palettes, Light/Dark theme, Tone visualizer
  - Perceptual color space (LAB), M3 Token export
- ✅ **Phase 5**: Testing & Deployment (95%)
  - 55 unit tests, CI/CD, SEO optimization, Lighthouse CI

**Overall Progress**: 95% complete

See [Task Manager](./docs/4.DevelopPlan/Task-Manager.md) for detailed progress tracking.

## 🧪 Testing

This project uses **Vitest** and **Testing Library** for comprehensive test coverage:

- **Unit Tests (55 passing)**:
  - Color conversion & harmony algorithms
  - WCAG contrast calculations & accessibility
  - URL encoding/decoding with validation
  - M3 Tonal Palette generation
  - LAB color space processing
- **Component Tests**: ColorPicker, PaletteDisplay, AccessibilityCheck
- **Integration Tests**: Full workflow, URL sharing, history management

```bash
# Run all tests (55 tests)
pnpm test

# Watch mode for development
pnpm test --watch

# UI mode with test explorer
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

**Test Coverage**:
- ✅ lib/color/harmony.ts - 11 tests
- ✅ lib/color/accessibility.ts - 10 tests
- ✅ lib/share/url.ts - 12 tests
- ✅ lib/share/validation.ts - 6 tests
- ✅ lib/color/utils.ts - 16 tests

## 🚀 Deployment

This project is optimized for deployment on **Vercel**:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

Alternatively, connect your GitHub repository to Vercel for automatic deployments on every push to `main`.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 🎨 Material Design 3 Features

This project implements Google's **Material Design 3** color system:

### 🌈 Tonal Palettes
- **13-step tone scale** (0, 10, 20, ..., 100)
- **6 core palettes**: Primary, Secondary, Tertiary, Neutral, Neutral Variant, Error
- **Perceptual uniformity**: LAB color space for natural tone progression

### 🌓 Dynamic Color
- **Light Theme**: Tone 40 (primary), Tone 99 (background)
- **Dark Theme**: Tone 80 (primary), Tone 10 (background)
- **Automatic contrast**: Text colors adjust based on background luminance

### 📦 Design Tokens
Export M3 color tokens in 5 formats:
- CSS Variables (with dark mode support)
- Design Tokens (JSON)
- Tailwind Config
- SCSS Variables
- Figma Tokens

See [M3 Tonal Guide](./docs/M3-TONAL-GUIDE.md) for detailed documentation.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Color manipulation with [chroma.js](https://gka.github.io/chroma.js/)
- Design system based on [Material Design 3](https://m3.material.io/)
