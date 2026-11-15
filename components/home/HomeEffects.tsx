'use client'

import { Draggable } from 'gsap/Draggable'
import { gsap, AUVA_EASE, IO, OUT, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { markHomeEffectsReady } from '@/lib/island'

gsap.registerPlugin(Draggable)

const MOCK_X = [-120, 120, -80, 80]
const MOCK_ROT = [-6, 5, -4, 3]

/**
 * Every scroll-driven effect on the home page, in one island loaded on first interaction.
 * Two pinned sections only (story, method). Reduced motion skips all of it and the page stays static and complete.
 */
export default function HomeEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const all = <T extends Element>(s: string) => gsap.utils.toArray<T>(s)

      // Card grids lean with scroll velocity, then settle.
      const setSkew = gsap.quickSetter('[data-skew]', 'skewY', 'deg')
      const clamp = gsap.utils.clamp(-5, 5)
      const skew = { s: 0 }
      ScrollTrigger.create({
        onUpdate: (self) => {
          const s = clamp(self.getVelocity() / -300)
          if (Math.abs(s) > Math.abs(skew.s)) {
            skew.s = s
            gsap.to(skew, { s: 0, duration: 0.6, ease: OUT, overwrite: true, onUpdate: () => setSkew(skew.s) })
          }
        },
      })

      // Marquee runs on a CSS animation; scroll velocity changes its playback rate and direction.
      const marq = document.querySelector<HTMLElement>('[data-marq]')?.getAnimations()[0]
      const rate = { r: 1 }
      if (marq) {
        const apply = () => marq.updatePlaybackRate(rate.r)
        ScrollTrigger.create({
          onUpdate: (s) => {
            const v = 1 + Math.min(Math.abs(s.getVelocity()) / 350, 8)
            gsap.to(rate, { r: s.direction * v, duration: 0.25, ease: OUT, overwrite: true, onUpdate: apply })
            gsap.to(rate, { r: s.direction, duration: 1.2, delay: 0.3, ease: OUT, onUpdate: apply })
          },
        })
      }

      // Pinned #1: story, chaos pulled into Auva.
      const story = document.querySelector<HTMLElement>('[data-story]')
      const auva = story?.querySelector<HTMLElement>('[data-story-auva]')
      if (story && auva) {
        const tx = () => auva.offsetLeft + auva.offsetWidth / 2
        const ty = () => auva.offsetTop + auva.offsetHeight / 2
        gsap.set('[data-story-b]', { y: 40 })
        gsap
          .timeline({ scrollTrigger: { trigger: story, start: 'top top', end: '+=220%', scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
          .to(all('[data-chip]'), {
            x: (_i, c: HTMLElement) => tx() - (c.offsetLeft + c.offsetWidth / 2),
            y: (_i, c: HTMLElement) => ty() - (c.offsetTop + c.offsetHeight / 2),
            scale: 0.15, opacity: 0, rotation: () => gsap.utils.random(-200, 200), ease: IO, duration: 1, stagger: 0.12,
          }, 0)
          .to('[data-story-a]', { opacity: 0, y: -40, duration: 0.4, ease: OUT }, 0.9)
          .to(auva, { scale: 1.18, duration: 0.35, ease: AUVA_EASE }, 1.0)
          .to(auva, { scale: 1, duration: 0.35, ease: OUT }, 1.35)
          .to('[data-story-b]', { opacity: 1, y: 0, duration: 0.5, ease: OUT }, 1.15)
          .to({}, { duration: 0.6 })
      }

      // One signature reveal per section: <Reveal> wrappers describe their own targets.
      all<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(gsap.utils.toArray(el.dataset.reveal!, el), {
          y: Number(el.dataset.revealY ?? 60), opacity: 0, duration: 0.9, ease: OUT, clearProps: 'transform',
          stagger: Number(el.dataset.revealStagger ?? 0.12),
          scrollTrigger: { trigger: el, start: el.dataset.revealStart ?? 'top 85%' },
        })
      })

      all<HTMLElement>('[data-lever]').forEach((l) =>
        ScrollTrigger.create({ trigger: l, start: 'top 85%', onEnter: () => { l.dataset.on = 'true' } }),
      )

      gsap.from('[data-mock]', {
        x: (i) => MOCK_X[i], y: 60, rotation: (i) => MOCK_ROT[i], opacity: 0, duration: 1.1, stagger: 0.1, ease: OUT, clearProps: 'transform',
        scrollTrigger: { trigger: '[data-mocks]', start: 'top 80%' },
      })

      gsap.from('[data-row]', { y: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: OUT, clearProps: 'transform,opacity', scrollTrigger: { trigger: '[data-list]', start: 'top 85%' } })

      // Pinned #2: The One-Roof Method, horizontal.
      const method = document.querySelector<HTMLElement>('[data-method]')
      const track = method?.querySelector<HTMLElement>('[data-track]')
      if (method && track) {
        const dist = () => track.scrollWidth - innerWidth
        gsap
          .timeline({ scrollTrigger: { trigger: method.querySelector('[data-pin]'), start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } })
          .to(track, { x: () => -dist(), ease: 'none' }, 0)
          .to('[data-prog-fill]', { scaleX: 1, ease: 'none' }, 0)
          .to('[data-prog-dot]', { left: '100%', xPercent: -100, ease: 'none' }, 0)
      }

      // Closing screen: title rises, stickers pop in and become draggable.
      const cta = document.querySelector<HTMLElement>('[data-cta]')
      if (cta) {
        gsap.from('[data-cta-title]', { y: 80, opacity: 0, duration: 1.2, ease: OUT, scrollTrigger: { trigger: cta, start: 'top 60%' } })
        gsap.from('[data-sticker]', { scale: 0, rotation: () => gsap.utils.random(-90, 90), duration: 0.8, stagger: 0.08, ease: OUT, scrollTrigger: { trigger: cta, start: 'top 70%' } })
        Draggable.create('[data-sticker]', {
          type: 'x,y', bounds: cta,
          onPress() { gsap.to(this.target, { scale: 1.15, duration: 0.2, ease: OUT }) },
          onRelease() { gsap.to(this.target, { scale: 1, rotation: gsap.utils.random(-15, 15), duration: 0.6, ease: OUT }) },
        })
      }

      return () => marq?.updatePlaybackRate(1)
    })
    ScrollTrigger.refresh() // pin spacers now exist: re-measure before anything scrolls
    markHomeEffectsReady()
    return () => mm.revert()
  })

  return null
}
