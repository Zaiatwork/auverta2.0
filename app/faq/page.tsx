import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'FAQ', description: 'Answers to common questions about working with Auverta Studio.', path: '/faq' })

export default function FaqPage() {
  return <PageStub eyebrow="FAQ" title="Quick questions" tone="soft" note="Full page arrives in milestone M5." />
}
