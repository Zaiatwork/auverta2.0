'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useAuvaLife } from '@/lib/auva-life'
import { setLenis } from '@/lib/lenis'
import { useReducedMotion } from '@/lib/motion'
import { Cursor } from '@/components/ui/Cursor'

/** Everything that is not needed for first paint: smooth scroll, cursor, scroll progress, Auva's eyes. Loaded after idle. */
export default function Enhancements() {
  const reduced = useReducedMotion()
  useAuvaLife()

  // The one Lenis instance, driven by the GSAP ticker.
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.09 })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <Cursor />
}
