import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Terms', description: 'The terms for working with Auverta Studio.', path: '/terms' })

export default function TermsPage() {
  return <PageStub eyebrow="Legal" title="Terms" tone="soft" note="Full page arrives in milestone M5." />
}
