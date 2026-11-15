import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Pricing', description: 'Clear scope and clear timelines. Pricing for Auverta Studio brand, web and AI content work.', path: '/pricing' })

export default function PricingPage() {
  return <PageStub eyebrow="Pricing" title="Clear scope. Clear timelines." tone="soft" note="Full page arrives in milestone M5." />
}
