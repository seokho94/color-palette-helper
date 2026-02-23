// components/preview/PreviewContainer.tsx
'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { PreviewButton } from './PreviewButton'
import { PreviewCard } from './PreviewCard'
import { PreviewText } from './PreviewText'
import { PreviewForm } from './PreviewForm'

/**
 * Preview 컨테이너
 *
 * 4개 탭으로 구성:
 * - Button: 버튼 스타일 미리보기
 * - Card: 카드 스타일 미리보기
 * - Text: 타이포그래피 미리보기
 * - Form: 폼 요소 미리보기
 */
export function PreviewContainer() {
  return (
    <Tabs defaultValue="button">
      <TabsList>
        <TabsTrigger value="button">Button</TabsTrigger>
        <TabsTrigger value="card">Card</TabsTrigger>
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="form">Form</TabsTrigger>
      </TabsList>

      <TabsContent value="button">
        <PreviewButton />
      </TabsContent>

      <TabsContent value="card">
        <PreviewCard />
      </TabsContent>

      <TabsContent value="text">
        <PreviewText />
      </TabsContent>

      <TabsContent value="form">
        <PreviewForm />
      </TabsContent>
    </Tabs>
  )
}
