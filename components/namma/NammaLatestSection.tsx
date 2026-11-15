'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import type { Project } from '@/types'

const PROJECT_VIDEOS = [
  'https://studionamma.vercel.app/videos/matera/matera-highlight-2.mp4',
  'https://studionamma.vercel.app/videos/chance/chance-cover.mp4',
  'https://studionamma.vercel.app/videos/silvr/silvr-highlight.mp4',
  'https://studionamma.vercel.app/videos/intramuros/intramuros-highlight.mp4',
  'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa249c8ad1d2624abf3d5_Footer-Service-designV2-transcode.mp4',
]

export default function NammaLatestSection({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<'selected' | 'playground'>('selected')

  const items = activeTab === 'selected' ? projects.slice(0, 4) : projects

  const handleMouseEnter = (card: HTMLElement | null, video: HTMLVideoElement | null) => {
    if (!card) return
    gsap.to(card, { scale: 0.98, duration: 0.4, ease: 'power2.out' })
    if (video) {
      video.play().catch(() => {})
    }
  }

  const handleMouseLeave = (card: HTMLElement | null, video: HTMLVideoElement | null) => {
    if (!card) return
    gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' })
    if (video) {
      video.pause()
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-abyss py-32 px-6 sm:px-10 lg:px-16 text-ghost-white selection:bg-toxic-lime selection:text-abyss"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Tabs (Exact Studio Namma format) */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ghost-white/10 pb-8 sm:flex-row sm:items-end">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setActiveTab('selected')}
              className={`font-display text-4xl font-extrabold uppercase tracking-tight transition-colors cursor-pointer sm:text-6xl ${
                activeTab === 'selected' ? 'text-ghost-white' : 'text-ghost-white/30 hover:text-ghost-white/60'
              }`}
            >
              Selected projects
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('playground')}
              className={`font-display text-4xl font-extrabold uppercase tracking-tight transition-colors cursor-pointer sm:text-6xl ${
                activeTab === 'playground' ? 'text-toxic-lime' : 'text-ghost-white/30 hover:text-ghost-white/60'
              }`}
            >
              Playground
            </button>
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ghost-white/50">
            <Link href="/projects" className="group inline-flex items-center gap-2 hover:text-toxic-lime">
              <span>EXPLORE ALL ARCHIVES (0{projects.length})</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Project Visuals Grid */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2">
          {items.map((project, i) => {
            let cardRef: HTMLAnchorElement | null = null
            let videoRef: HTMLVideoElement | null = null
            const videoSrc = PROJECT_VIDEOS[i % PROJECT_VIDEOS.length]

            return (
              <div key={project.id} className="group flex flex-col">
                <Link
                  ref={(el) => {
                    cardRef = el
                  }}
                  href={`/projects/${project.slug}`}
                  data-cursor={project.title}
                  onMouseEnter={() => handleMouseEnter(cardRef, videoRef)}
                  onMouseLeave={() => handleMouseLeave(cardRef, videoRef)}
                  className="latest_visual relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-ghost-white/10 bg-deep-layer shadow-[0_20px_50px_rgba(0,0,0,0.6)] will-change-transform group-hover:border-electric-violet"
                >
                  {/* Poster Image */}
                  <Image
                    src={project.thumbnail_url}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="latest_visual_background object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[6px]"
                  />

                  {/* Real Looping Video Overlay (Studio Namma signature hover video) */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                    <video
                      ref={(el) => {
                        videoRef = el
                      }}
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="size-full object-cover"
                    >
                      <source src={videoSrc} type="video/mp4" />
                    </video>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Pill Action */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-toxic-lime px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-abyss shadow-[0_0_25px_rgba(196,255,0,0.6)]">
                      VIEW CASE STUDY ↗
                    </span>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute left-6 top-6 flex items-center gap-3 pointer-events-none">
                    <span className="rounded-full border border-ghost-white/20 bg-abyss/80 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ghost-white backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-ghost-white/60">
                      0{i + 1}
                    </span>
                  </div>
                </Link>

                {/* Meta Below Card */}
                <div className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em]">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ghost-white transition-colors group-hover:text-toxic-lime sm:text-3xl">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <span className="text-ghost-white/40">{project.client_name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
