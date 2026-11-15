'use client'

import { createContext, useContext } from 'react'
import type { Mood } from '@/types/content'

export interface SiteApi {
  /** Navigate with the three-band wipe (instant when reduced motion is on). */
  go: (href: string, label?: string, mood?: Mood) => Promise<void>
  scrollTo: (target: string | number, opts?: { duration?: number; immediate?: boolean }) => void
}

const fallbackApi: SiteApi = {
  go: async (href: string) => {
    if (typeof window !== 'undefined') window.location.href = href
  },
  scrollTo: (target: string | number) => {
    if (typeof window !== 'undefined') {
      if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
      else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  },
}

export const SiteContext = createContext<SiteApi>(fallbackApi)

export function useSite(): SiteApi {
  const ctx = useContext(SiteContext)
  return ctx || fallbackApi
}
