# 🎨 Color Palette Helper

Generate beautiful, accessible color palettes for your web projects with AI-powered recommendations and automatic WCAG compliance checking.

## 🚀 Features

- **Color Harmony Rules**: Generate palettes using proven color theory (Complementary, Analogous, Triadic, etc.)
- **Image Color Extraction**: Upload an image and extract dominant colors automatically
- **Accessibility Checking**: Automatic WCAG AA/AAA contrast ratio validation
- **Live Preview**: See your colors applied to real UI components
- **Multiple Export Formats**: Copy as HEX, RGB, HSL, CSS Variables, Tailwind Config, or JSON
- **History & Favorites**: Save and manage your color palettes locally

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

## 🧪 Development

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Format code
pnpm format
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

## 🎯 Roadmap

- [x] Week 1: Foundation & Basic UI
- [ ] Week 2: Core Features (Image extraction, Preview)
- [ ] Week 3: Advanced Features (Accessibility, Export)
- [ ] Week 4: Testing & Deployment

See [Development Schedule](./docs/1.Plan/07-Development-Schedule.md) for details.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Color manipulation with [chroma.js](https://gka.github.io/chroma.js/)
