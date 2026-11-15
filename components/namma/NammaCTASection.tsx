'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

export default function NammaCTASection() {
  const containerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      if (!buttonRef.current || typeof window === 'undefined') return
      if (!window.matchMedia('(pointer: fine)').matches) return

      const btn = buttonRef.current
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' })

      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const btnCenterX = rect.left + rect.width / 2
        const btnCenterY = rect.top + rect.height / 2
        const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY)

        if (dist < 150) {
          xTo((e.clientX - btnCenterX) * 0.35)
          yTo((e.clientY - btnCenterY) * 0.35)
        } else {
          xTo(0)
          yTo(0)
        }
      }

      window.addEventListener('mousemove', onMouseMove)
      return () => window.removeEventListener('mousemove', onMouseMove)
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-abyss py-36 px-6 sm:px-10 lg:px-16 text-ghost-white selection:bg-toxic-lime selection:text-abyss"
    >
      <div className="mx-auto max-w-7xl">
        {/* Studio Namma Embedded Visual Headline */}
        <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <span>LET&apos;S WORK</span> <br />
          <span className="flex flex-wrap items-center gap-4 sm:gap-8">
            {/* Embedded Capsule Image between words (Studio Namma signature cta_visual) */}
            <span className="relative inline-block h-12 w-28 overflow-hidden rounded-full border border-ghost-white/20 bg-deep-layer align-middle sm:h-20 sm:w-44 md:h-24 md:w-56 shadow-[0_0_30px_rgba(88,33,250,0.4)]">
              <Image
                src="/images/branding.webp"
                alt=""
                fill
                className="object-cover"
              />
            </span>
            <span className="text-toxic-lime">TOGETHER</span>
          </span>
        </h2>

        {/* Content & Magnetic Action */}
        <div className="mt-14 flex flex-col items-start justify-between gap-10 border-t border-ghost-white/10 pt-10 md:flex-row md:items-end">
          <p className="max-w-xl font-sans text-base font-light leading-relaxed text-ghost-white/70 sm:text-xl">
            Work with us if average isn&apos;t your thing. <br />
            Drop your brief, and we&apos;ll build something iconic.
          </p>

          <Link
            ref={buttonRef}
            href="/contact"
            className="group relative inline-flex items-center gap-4 rounded-full bg-toxic-lime px-10 py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-abyss shadow-[0_0_35px_rgba(196,255,0,0.4)] transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95 sm:text-sm"
          >
            <span>SAY HELLO</span>
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
