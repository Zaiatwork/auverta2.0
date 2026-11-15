'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

const TRAIL_IMAGES = [
  '/images/branding.webp',
  '/images/web-development.webp',
  '/images/digital-marketing.webp',
  '/images/ai-content.webp',
  '/images/auva/auva-card-hero.jpg',
  '/images/auva/auva-solo.jpg',
  '/images/contact.webp',
]

export default function NammaHeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const trailContainerRef = useRef<HTMLDivElement>(null)
  const imageIndexRef = useRef(0)
  const lastSpawnPos = useRef({ x: 0, y: 0 })

  useGSAP(
    () => {
      // 1. Initial Line & Blur Reveal
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } })

      tl.fromTo(
        '.namma-hero-tag',
        { opacity: 0, y: -20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 0.2 }
      )

      tl.fromTo(
        '.namma-hero-line',
        { opacity: 0, y: 80, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, stagger: 0.15 },
        '-=0.8'
      )

      tl.fromTo(
        '.namma-hero-sub',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
        '-=0.8'
      )

      // 2. Mouse Move Image Spawner Trail (Studio Namma displayImages mechanic)
      const container = heroRef.current
      const trailRoot = trailContainerRef.current
      if (!container || !trailRoot || typeof window === 'undefined') return
      if (!window.matchMedia('(pointer: fine)').matches) return

      const spawnImage = (x: number, y: number) => {
        const wrapper = document.createElement('div')
        Object.assign(wrapper.style, {
          borderRadius: '0.8rem',
          overflow: 'hidden',
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: '15',
          border: '1px solid rgba(245, 240, 255, 0.2)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(88,33,250,0.3)',
          willChange: 'transform, opacity',
        })

        const img = document.createElement('img')
        img.src = TRAIL_IMAGES[imageIndexRef.current % TRAIL_IMAGES.length]
        Object.assign(img.style, {
          display: 'block',
          width: '18rem',
          height: '12rem',
          objectFit: 'cover',
        })

        wrapper.appendChild(img)
        trailRoot.appendChild(wrapper)

        imageIndexRef.current++

        // GSAP exact Studio Namma trail animation
        gsap.fromTo(
          wrapper,
          {
            xPercent: -50,
            yPercent: -50,
            x: x + (Math.random() - 0.5) * 40,
            y: y + 40,
            rotation: (Math.random() - 0.5) * 16,
            scale: 0.85,
            opacity: 0,
          },
          {
            xPercent: -50,
            yPercent: -50,
            x,
            y,
            rotation: (Math.random() - 0.5) * 12,
            scale: 1,
            opacity: 1,
            ease: 'back.out(2.5)',
            duration: 0.45,
          }
        )

        gsap.to(wrapper, {
          scale: 0.85,
          opacity: 0,
          delay: 0.55,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            if (wrapper.parentNode === trailRoot) {
              trailRoot.removeChild(wrapper)
            }
          },
        })
      }

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const dist = Math.hypot(x - lastSpawnPos.current.x, y - lastSpawnPos.current.y)
        // Spawn an image every 90px of cursor travel
        if (dist > 95) {
          spawnImage(x, y)
          lastSpawnPos.current = { x, y }
        }
      }

      container.addEventListener('pointermove', handlePointerMove, { passive: true })
      return () => container.removeEventListener('pointermove', handlePointerMove)
    },
    { scope: heroRef }
  )

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-abyss px-6 text-center text-ghost-white selection:bg-toxic-lime selection:text-abyss select-none sm:px-10"
    >
      {/* Container for spawning trail images */}
      <div ref={trailContainerRef} className="pointer-events-none absolute inset-0 overflow-hidden" />

      {/* Top Micro Label */}
      <div className="namma-hero-tag mb-8 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-toxic-lime">
        <span className="size-2 rounded-full bg-toxic-lime animate-ping" />
        <span>[ CREATIVE STUDIO FOR AMBITIOUS BRANDS ]</span>
      </div>

      {/* Studio Namma Giant Typography */}
      <div className="max-w-7xl">
        <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem]">
          <span className="namma-hero-line block overflow-hidden">
            <span className="block">WE THINK</span>
          </span>
          <span className="namma-hero-line block overflow-hidden">
            <span className="block text-toxic-lime">CRAFT AND</span>
          </span>
          <span className="namma-hero-line block overflow-hidden">
            <span className="block">DESIGN.</span>
          </span>
        </h1>
      </div>

      {/* Subtitle / Manifesto */}
      <div className="namma-hero-sub mt-10 max-w-2xl font-sans text-sm font-light leading-relaxed text-ghost-white/70 sm:text-base md:text-lg">
        <p>
          Bespoke brand ecosystems, high-impact digital experiences, and creative engineering for brands that refuse to be ignored.
        </p>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-ghost-white/40">
        <span>MOVE CURSOR TO EXPLORE ARCHIVE · SCROLL DOWN ↓</span>
      </div>
    </section>
  )
}
