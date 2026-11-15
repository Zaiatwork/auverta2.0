import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'
import routes from '@/content/routes.json'

// One source of truth: the same route list verify and screenshots use.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.routes.map((r) => ({ url: `${SITE.url}${r === '/' ? '' : r}` }))
}
