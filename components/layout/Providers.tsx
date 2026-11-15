'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useInteracted } from '@/lib/interaction'
import { getLenis } from '@/lib/lenis'
import { useReducedMotion } from '@/lib/motion'
import { Defs } from '@/components/ui/Defs'
import type { Mood } from '@/types/content'
import { SiteContext, type SiteApi } from './SiteContext'
import type { WipeHandle } from './Wipe'

// Motion code (GSAP, Lenis, cursor, wipe) loads on the first interaction, so it never costs first paint or hydration.
const Enhancements = dynamic(() => import('./Enhancements'), { ssr: false })
const Wipe = dynamic(() => import('./Wipe').then((m) => m.Wipe), { ssr: false })

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const idle = useInteracted()
  const wipe = useRef<WipeHandle | null>(null)
  const busy = useRef(false)
  const arrived = useRef<(() => void) | null>(null)

  // A route has mounted: let a waiting transition continue.
  useEffect(() => {
    arrived.current?.()
    arrived.current = null
  }, [pathname])

  const register = useCallback((h: WipeHandle | null) => {
    wipe.current = h
  }, [])

  const scrollTo = useCallback<SiteApi['scrollTo']>((target, opts) => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(target, { ...opts, force: true })
    else if (typeof target === 'number') window.scrollTo({ top: target })
    else document.querySelector(target)?.scrollIntoView()
  }, [])

  const go = useCallback<SiteApi['go']>(
    async (href, label = 'Auverta', mood: Mood = 'happy') => {
      const w = wipe.current
      // Motion not loaded yet, or reduced motion: navigate instantly.
      if (reduced || !w) {
        router.push(href)
        return
      }
      if (busy.current) return
      busy.current = true
      const root = document.documentElement
      root.dataset.transition = '1' // page intro CSS waits for the wipe to open
      await w.cover(label, mood)
      const mounted = new Promise<void>((res) => { arrived.current = res })
      router.push(href)
      await Promise.race([mounted, new Promise((res) => setTimeout(res, 4000))])
      getLenis()?.scrollTo(0, { immediate: true, force: true })
      await w.refresh()
      await w.reveal()
      delete root.dataset.transition
      busy.current = false
    },
    [reduced, router],
  )

  const api = useMemo<SiteApi>(() => ({ go, scrollTo }), [go, scrollTo])

  return (
    <SiteContext.Provider value={api}>
      <Defs />
      {idle && <Enhancements />}
      {idle && <Wipe register={register} />}
      {children}
    </SiteContext.Provider>
  )
}
