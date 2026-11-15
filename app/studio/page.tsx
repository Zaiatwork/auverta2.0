import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Studio', description: 'Meet Auverta Studio, a full-service digital agency with brand and web, and AI content and growth divisions.', path: '/studio' })

export default function StudioPage() {
  return <PageStub eyebrow="Studio" title="One studio. Two divisions." tone="violet" note="Full page arrives in milestone M5." />
}
