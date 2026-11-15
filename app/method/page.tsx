import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'The One-Roof Method', description: 'Four steps, one team: how Auverta Studio takes a project from audit to launch and scale.', path: '/method' })

export default function MethodPage() {
  return <PageStub eyebrow="How we work" title="The One-Roof Method" tone="violet" note="Full page arrives in milestone M5." />
}
