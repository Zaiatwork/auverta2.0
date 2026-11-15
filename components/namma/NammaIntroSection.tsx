'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

export default function NammaIntroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const [hoverImage, setHoverImage] = useState<string | null>(null)
  const cursorFollowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!paragraphRef.current) return

      // Studio Namma line blur scrub effect
      const lines = paragraphRef.current.querySelectorAll('.intro-line')
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.15, filter: 'blur(10px)', y: 24 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        )
      })

      // Mouse tracking for hover image
      const xTo = gsap.quickTo(cursorFollowRef.current, 'x', { duration: 0.35, ease: 'power2.out' })
      const yTo = gsap.quickTo(cursorFollowRef.current, 'y', { duration: 0.35, ease: 'power2.out' })

      const handlePointerMove = (e: PointerEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }

      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-abyss py-32 px-6 sm:px-10 lg:px-16 text-ghost-white selection:bg-toxic-lime selection:text-abyss"
    >
      {/* Floating Hover Image Tooltip */}
      <div
        ref={cursorFollowRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-ghost-white/20 bg-deep-layer shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-md transition-opacity duration-300 md:block ${
          hoverImage ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ width: '280px', height: '180px' }}
      >
        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Monospace Sub-Heading */}
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
          <span>[ CREATIVE STUDIO BUILDING PREMIER BRANDS ]</span>
        </div>

        {/* Studio Namma Signature Interactive Typography */}
        <p
          ref={paragraphRef}
          className="mt-12 font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl flex flex-col gap-2"
        >
          <span className="intro-line block">IT&apos;S NEVER &ldquo;JUST A WEBSITE.&rdquo;</span>
          <span className="intro-line block">
            EVERY{' '}
            <span
              onMouseEnter={() => setHoverImage('/images/branding.webp')}
              onMouseLeave={() => setHoverImage(null)}
              className="cursor-pointer text-toxic-lime underline decoration-toxic-lime/40 underline-offset-8 transition-colors hover:text-white"
            >
              DETAIL
            </span>{' '}
            MATTERS.
          </span>
          <span className="intro-line block">WE CRAFT DIGITAL EXPERIENCES.</span>
          <span className="intro-line block">YOUR DESIGN. OUR OBSESSION.</span>
          <span className="intro-line block">
            YOUR BRAND. OUR{' '}
            <span
              onMouseEnter={() => setHoverImage('/images/web-development.webp')}
              onMouseLeave={() => setHoverImage(null)}
              className="cursor-pointer text-electric-violet underline decoration-electric-violet/40 underline-offset-8 transition-colors hover:text-toxic-lime"
            >
              PLAYGROUND
            </span>
            .
          </span>
        </p>
      </div>
    </section>
  )
}
