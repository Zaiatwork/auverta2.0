import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject } from '@/content/work'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug)
  if (!p) return {}
  return pageMeta({ title: p.title, description: p.blurb.replace(' (draft)', ''), path: `/work/${p.slug}` })
}

export default async function CasePage({ params }: Props) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  return <PageStub eyebrow={p.tags} title={p.title} note="Case study template arrives in milestone M3." />
}
