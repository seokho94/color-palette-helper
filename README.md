# 🎨 Color Palette Helper

Generate beautiful, accessible color palettes for your web projects with AI-powered recommendations and automatic WCAG compliance checking.

## ✨ Features

- 🎨 **6 Harmony Rules**: Complementary, Analogous, Triadic, Split-Complementary, Tetradic, Monochromatic
- 🖼️ **Image Color Extraction**: Upload images and extract dominant colors using ColorThief
- ♿ **WCAG Compliance**: Automatic AA/AAA contrast ratio checking with fix suggestions
- 👁️ **Live Preview**: See colors applied to buttons, cards, forms, and typography
- 📤 **7 Export Formats**: HEX, RGB, HSL, CSS Variables, SCSS, Tailwind Config, JSON
- 💾 **History & Favorites**: Save up to 50 palettes with LocalStorage persistence
- 🔗 **URL Sharing**: Share palettes via URL with query parameters
- 🔒 **Color Locking**: Lock specific colors while regenerating the rest
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Color Libraries**: chroma.js, color-thief, react-colorful
- **Package Manager**: pnpm

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

### Key Documents

- [Feature Priority](./docs/1.Plan/02-Feature-Priority.md)
- [UX Design Plan](./docs/1.Plan/04-UX-Design-Plan.md)
- [Frontend Architecture](./docs/1.Plan/06-Frontend-Architecture.md)
- [Development Schedule](./docs/1.Plan/07-Development-Schedule.md)

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
│   ├── color/             # Color-related components
│   ├── palette/           # Palette display components
│   ├── preview/           # UI preview components
│   └── export/            # Export functionality
├── lib/                   # Utility libraries
│   ├── color/             # Color manipulation & harmony
│   └── export/            # Code generation
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── types/                 # TypeScript types
├── constants/             # App constants
└── docs/                  # Documentation
```

## 🎯 Development Progress

- ✅ **Week 1**: Foundation & Basic UI (100%)
  - Project setup, Layout, Color input, Image upload
- ✅ **Week 2**: Core Features (100%)
  - Palette generation, Accessibility checks, UI preview
- ✅ **Week 3**: Advanced Features (100%)
  - Export functionality, History & Favorites, URL sharing
- ✅ **Week 4**: Testing & Deployment (87%)
  - Unit tests, Integration tests, SEO optimization, Vercel deployment

**Overall Progress**: 87% complete (78/90 tasks)

See [Task Manager](./docs/4.DevelopPlan/Task-Manager.md) for detailed progress tracking.

## 🧪 Testing

This project uses **Vitest** and **Testing Library** for comprehensive test coverage:

- **Unit Tests**: Color conversion, harmony algorithms, WCAG calculations, URL encoding
- **Component Tests**: ColorPicker, PaletteDisplay, AccessibilityCheck
- **Integration Tests**: Full palette generation workflow, URL sharing, history management

```bash
# Run all tests
pnpm test

# Watch mode for development
pnpm test --watch

# Generate coverage report
pnpm test:coverage
```

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

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Color manipulation with [chroma.js](https://gka.github.io/chroma.js/)
