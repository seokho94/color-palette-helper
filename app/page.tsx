export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          🎨 Color Palette Helper
        </h1>
        <p className="text-lg text-gray-600">
          Generate beautiful, accessible color palettes for your web projects
        </p>
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Development environment is ready! 🚀
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Check <code className="rounded bg-gray-100 px-2 py-1">docs/1.Plan/</code> for the
            implementation plan
          </p>
        </div>
      </div>
    </main>
  )
}
