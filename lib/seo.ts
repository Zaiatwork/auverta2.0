import type { Metadata } from 'next'
import { SITE } from '@/content/site'

interface PageMeta {
  title: string
  description: string
  path: string
}

/** Per-route metadata: title, description, canonical, Open Graph and Twitter in one place (Next does not merge openGraph from the layout). */
export function pageMeta({ title, description, path }: PageMeta): Metadata {
  const full = `${title} | ${SITE.name}`
  return {
    title,
    description,
    alternates: { canonical: path },
    // Pages that set their own openGraph/twitter replace the file-based image, so point at it explicitly.
    openGraph: { title: full, description, url: path, siteName: SITE.name, type: 'website', locale: 'en_US', images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: full, description, images: ['/twitter-image'] },
  }
}
