import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Privacy', description: 'How Auverta Studio handles your information.', path: '/privacy' })

export default function PrivacyPage() {
  return <PageStub eyebrow="Legal" title="Privacy" tone="soft" note="Full page arrives in milestone M5." />
}
