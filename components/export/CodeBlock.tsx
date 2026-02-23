// components/export/CodeBlock.tsx
'use client'

interface CodeBlockProps {
  code: string
  language?: string
}

/**
 * 코드 블록 표시 컴포넌트
 */
export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
      <code className="text-sm font-mono text-gray-800">{code}</code>
    </pre>
  )
}
