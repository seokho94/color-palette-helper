import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Color Palette Helper - AI-Powered Color Scheme Generator',
  description:
    'Generate beautiful, accessible color palettes for your web projects. Automatically extract colors from images and ensure WCAG compliance.',
  keywords: ['color palette', 'color scheme', 'accessibility', 'WCAG', 'design tool'],
  authors: [{ name: 'Color Palette Helper Team' }],
  openGraph: {
    title: 'Color Palette Helper',
    description: 'Generate accessible color palettes with ease',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
