import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Contact', description: 'Start a project with Auverta Studio. Tell us your goals and get a blueprint and quote in 24-48 hours.', path: '/contact' })

export default function ContactPage() {
  return <PageStub eyebrow="Contact" title="Let's talk." tone="soft" note="Full page arrives in milestone M5." />
}
