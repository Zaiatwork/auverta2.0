import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

export const metadata: Metadata = pageMeta({ title: 'Work', description: 'Selected Auverta Studio projects across brand, web, AI content and social.', path: '/work' })

export default function WorkPage() {
  return <PageStub eyebrow="Work" title="Selected work" note="Work index arrives in milestone M3." />
}
