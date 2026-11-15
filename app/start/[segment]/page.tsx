import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { START_SEGMENTS } from '@/content/services'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

type Props = { params: Promise<{ segment: string }> }

export const dynamicParams = false
export const generateStaticParams = () => START_SEGMENTS.map((s) => ({ segment: s.slug }))

const find = (slug: string) => START_SEGMENTS.find((s) => s.slug === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).segment)
  if (!s) return {}
  return pageMeta({ title: `Start here: ${s.title}`, description: `How Auverta Studio works with ${s.title.toLowerCase()}.`, path: `/start/${s.slug}` })
}

export default async function StartPage({ params }: Props) {
  const s = find((await params).segment)
  if (!s) notFound()
  return <PageStub eyebrow="Start here" title={s.title} note="Segment page arrives in milestone M4." />
}
