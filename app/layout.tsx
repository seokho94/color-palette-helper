import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MainLayout } from '@/components/layout/MainLayout'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Color Palette Helper - AI-Powered Color Scheme Generator',
  description:
    'Generate beautiful, accessible color palettes for your web projects. 6 harmony rules, WCAG compliance checking, image color extraction, and export to CSS, Tailwind, SCSS, and more.',
  keywords: [
    'color palette',
    'color scheme',
    'color generator',
    'WCAG',
    'accessibility',
    'design tool',
    'harmony',
    'complementary',
    'analogous',
    'triadic',
    'tailwind',
    'css variables',
  ],
  authors: [{ name: 'Color Palette Helper Team' }],
  creator: 'Color Palette Helper',
  publisher: 'Color Palette Helper',
  openGraph: {
    title: 'Color Palette Helper - AI-Powered Color Scheme Generator',
    description:
      'Generate beautiful, accessible color palettes with 6 harmony rules, WCAG compliance, and export to multiple formats.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Color Palette Helper',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Color Palette Helper - Generate accessible color schemes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Palette Helper',
    description:
      'Generate beautiful, accessible color palettes with AI. Perfect for web designers and developers.',
    images: ['/og-image.png'],
    creator: '@colorpalette',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
