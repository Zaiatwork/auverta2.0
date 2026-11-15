'use client'

import dynamic from 'next/dynamic'
import { useInteracted } from '@/lib/interaction'

// GSAP, ScrollTrigger and Draggable stay out of the page load; they arrive on the first scroll, pointer or key event.
const HomeEffects = dynamic(() => import('./HomeEffects'), { ssr: false })

export function HomeMotion() {
  return useInteracted() ? <HomeEffects /> : null
}
