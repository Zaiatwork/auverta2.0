'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'

interface ServiceItem {
  id: string
  name: string
  tag: string
  sub: string
  video: string
  poster: string
}

const SERVICES: ServiceItem[] = [
  {
    id: 'art-direction',
    name: 'Art direction',
    tag: 'Storytelling',
    sub: 'Creative Direction & Narrative',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef694221ab31dc7a0898e_Home-artdirection-transcode.webm',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef694221ab31dc7a0898e_Home-artdirection-poster-00001.jpg',
  },
  {
    id: 'branding',
    name: 'Branding',
    tag: 'Identity',
    sub: 'Brand Architecture & Systems',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef76a17912168bc67811f_Home-branding-transcode.webm',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef76a17912168bc67811f_Home-branding-poster-00001.jpg',
  },
  {
    id: 'webflow',
    name: 'Webflow',
    tag: 'Integration',
    sub: 'Clean Enterprise Builds',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef7ea54539b4433a39276_Webflow-home-transcode.webm',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef7ea54539b4433a39276_Webflow-home-poster-00001.jpg',
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    tag: 'Wireframes',
    sub: 'Digital Products & Interfaces',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef86a1717db6af24e06f2_UI-UX-Home-transcode.webm',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68bef86a1717db6af24e06f2_UI-UX-Home-poster-00001.jpg',
  },
  {
    id: 'gsap',
    name: 'GSAP Animations',
    tag: 'Transitions',
    sub: 'Fluid Motion Choreography',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F69f31d237bb976aa6e0bc834_Scene-1_webm.webm',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68befb5c906395bf405011f5_Motion%20Design%20-%20Home-poster-00001.jpg',
  },
  {
    id: 'advertising',
    name: 'Advertising',
    tag: 'Creative Ads',
    sub: 'High-Converting Performance Funnels',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68df9e1b94554da67438cec0_Ads-service-homeV3-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68df9e1b94554da67438cec0_Ads-service-homeV3-poster-00001.jpg',
  },
  {
    id: 'seo-content',
    name: 'SEO & Content',
    tag: 'Ranking',
    sub: 'Search Authority & Growth',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68befca9c05567e63bc4d4a0_seo%20content%20home-transcode.webm',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68befca9c05567e63bc4d4a0_seo%20content%20home-poster-00001.jpg',
  },
]

export default function NammaHomeServices() {
  const [activeIndex, setActiveIndex] = useState(1) // Default to Branding as in Namma-1.mp4
  const activeService = SERVICES[activeIndex]
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Ensure active video is playing
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return
      if (idx === activeIndex) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
      }
    })

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.97, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  return (
    <section className="section_home-services relative w-full bg-abyss py-28 px-6 sm:px-10 lg:px-16 text-ghost-white selection:bg-toxic-lime selection:text-abyss overflow-hidden border-t border-ghost-white/10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Monospace Section Eyebrow */}
        <div className="mb-14 font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
          <span>[ SERVICES ]</span>
        </div>

        <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: Pinned / Sticky Interactive Video Card */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28 flex items-center justify-center">
            <div
              ref={cardRef}
              className="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-3xl border border-ghost-white/15 bg-deep-layer shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(88,33,250,0.25)] will-change-transform"
            >
              {/* Preloaded video stack with instant smooth crossfade */}
              {SERVICES.map((s, idx) => (
                <video
                  key={s.id}
                  ref={(el) => {
                    videoRefs.current[idx] = el
                  }}
                  autoPlay={idx === activeIndex}
                  loop
                  muted
                  playsInline
                  poster={s.poster}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out ${
                    idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <source src={s.video} />
                </video>
              ))}

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-abyss/90 via-abyss/20 to-transparent pointer-events-none" />

              {/* Bottom Card Meta HUD */}
              <div className="absolute bottom-6 left-6 right-6 z-30 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-toxic-lime">
                    [{activeService.tag}]
                  </span>
                  <span className="font-display text-xl font-bold uppercase text-ghost-white sm:text-2xl">
                    {activeService.name}
                  </span>
                  <span className="block font-sans text-xs text-ghost-white/60 mt-1">
                    {activeService.sub}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-ghost-white/40">
                  0{activeIndex + 1}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Giant Typographic List (Exact Studio Namma Layout from Namma-1.mp4) */}
          <div className="lg:col-span-7 flex flex-col items-start select-none">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              {SERVICES.map((s, idx) => {
                const isActive = activeIndex === idx
                return (
                  <div
                    key={s.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className="group relative flex items-center cursor-pointer py-1.5 transition-all"
                  >
                    <span
                      className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] font-extrabold uppercase leading-[0.88] tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-ghost-white scale-100 opacity-100 translate-x-2'
                          : 'text-ghost-white/25 hover:text-ghost-white/60 scale-[0.98] opacity-25 translate-x-0'
                      }`}
                    >
                      {s.name}
                    </span>

                    {/* Active Accent Glowing Dot */}
                    {isActive && (
                      <span className="inline-block size-3 sm:size-3.5 rounded-full bg-toxic-lime ml-4 shadow-[0_0_20px_#c4ff00] animate-pulse" />
                    )}

                    {/* Active Micro-Tag */}
                    {isActive && (
                      <span className="hidden xl:inline-block absolute left-full ml-6 font-mono text-xs font-bold uppercase tracking-[0.25em] text-toxic-lime whitespace-nowrap">
                        {s.tag}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Bottom See All Link with arrow */}
            <div className="mt-14 pt-6 border-t border-ghost-white/10 w-full flex items-center justify-between">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ghost-white/60 hover:text-toxic-lime transition-colors"
              >
                <span>SEE ALL</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>

              <span className="font-mono text-xs text-ghost-white/30 hidden sm:block">
                [ 07 CORE DISCIPLINES ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
