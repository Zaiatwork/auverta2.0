import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/content/services'
import { pageMeta } from '@/lib/seo'
import { PageStub } from '@/components/ui/PageStub'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }))

const find = (slug: string) => SERVICES.find((s) => s.slug === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = find((await params).slug)
  if (!s) return {}
  return pageMeta({ title: s.title, description: `${s.title} from Auverta Studio.`, path: `/services/${s.slug}` })
}

export default async function ServicePage({ params }: Props) {
  const s = find((await params).slug)
  if (!s) notFound()
  return <PageStub eyebrow="Service" title={s.title} note="Service page arrives in milestone M4." />
}
