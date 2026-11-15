import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Journal', description: 'Notes from Auverta Studio on brand, web, AI content and growth.', path: '/journal' })

export default function JournalPage() {
  return <PageStub eyebrow="Notes" title="Journal" tone="violet" note="Full page arrives in milestone M6." />
}
