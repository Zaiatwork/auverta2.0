'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'

const FOOTER_VIDEOS = [
  {
    title: 'IMMERSIVE WEB',
    tag: 'Next.js & Webflow',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa249c8ad1d2624abf3d5_Footer-Service-designV2-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa249c8ad1d2624abf3d5_Footer-Service-designV2-poster-00001.jpg',
  },
  {
    title: 'BRAND IDENTITY',
    tag: 'Design Systems',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa2b25db26651805ae2e3_Zefir%20footerV2-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa2b25db26651805ae2e3_Zefir%20footerV2-poster-00001.jpg',
  },
  {
    title: '3D & MOTION',
    tag: 'GSAP & Shaders',
    video: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa433842c3ec7c9a44485_FOOTER%20-%20BRANDINGV2-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa433842c3ec7c9a44485_FOOTER%20-%20BRANDINGV2-poster-00001.jpg',
  },
]

export default function NammaFooter() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC',
        }) + ' UTC'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full border-t border-ghost-white/10 bg-abyss pt-24 pb-12 text-ghost-white selection:bg-toxic-lime selection:text-abyss">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Top 3 Interactive Expanding Video Capsules */}
        <div className="mb-24">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
              [ 05 · RECENT MOTION WORK ]
            </span>
            <span className="font-mono text-xs text-ghost-white/50">HOVER TO EXPAND</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:flex md:h-72 md:items-stretch">
            {FOOTER_VIDEOS.map((item, idx) => {
              const isHovered = activeVideo === idx
              const isAnyHovered = activeVideo !== null

              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActiveVideo(idx)}
                  onMouseLeave={() => setActiveVideo(null)}
                  className={`group relative min-h-[220px] overflow-hidden rounded-2xl border border-ghost-white/10 bg-deep-layer transition-all duration-700 ease-out md:min-h-0 ${
                    isHovered
                      ? 'md:flex-[2.5]'
                      : isAnyHovered
                      ? 'md:flex-[0.75] opacity-60'
                      : 'md:flex-1'
                  }`}
                >
                  <video
                    src={item.video}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover brightness-75 transition-transform duration-700 group-hover:scale-105 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/30 to-transparent p-6 flex flex-col justify-end">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-toxic-lime">
                      {item.tag}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold uppercase text-ghost-white sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 gap-10 border-t border-ghost-white/10 pt-16 md:grid-cols-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ghost-white/40">NAVIGATION</span>
            <ul className="mt-6 flex flex-col gap-3 font-display text-lg font-bold uppercase">
              <li>
                <Link href="/work" className="transition-colors hover:text-toxic-lime">
                  WORK
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-toxic-lime">
                  SERVICES
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-toxic-lime">
                  STUDIO
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-toxic-lime">
                  PRICING
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ghost-white/40">SOCIALS</span>
            <ul className="mt-6 flex flex-col gap-3 font-display text-lg font-bold uppercase">
              <li>
                <a
                  href="https://www.instagram.com/auverta.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-toxic-lime"
                >
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/auverta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-toxic-lime"
                >
                  LINKEDIN ↗
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-toxic-lime"
                >
                  TWITTER / X ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ghost-white/40">HQ &amp; TIME</span>
            <div className="mt-6 font-mono text-xs leading-relaxed text-ghost-white/70">
              <p>REMOTE GLOBAL HQ</p>
              <p className="mt-2 text-toxic-lime font-bold">{time || '00:00:00 UTC'}</p>
              <p className="mt-4 text-ghost-white/50">AVAILABLE FOR SELECT Q2/Q3 COMMISSIONS</p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <span className="font-mono text-xs uppercase tracking-widest text-ghost-white/40">SCROLL</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-3 rounded-full border border-ghost-white/20 bg-deep-layer px-5 py-3 font-mono text-xs uppercase tracking-wider text-ghost-white transition-all hover:bg-toxic-lime hover:text-abyss"
            >
              <span>BACK TO TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>

        {/* Studio Namma Signature Giant Monolithic Wordmark */}
        <div className="mt-20 overflow-hidden border-t border-ghost-white/10 pt-10 select-none">
          <h1 className="w-full text-center font-display text-[15vw] font-black uppercase leading-none tracking-tight text-ghost-white/10 transition-colors hover:text-toxic-lime/20">
            AUVERTA
          </h1>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ghost-white/5 pt-8 font-mono text-xs text-ghost-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} AUVERTA STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ghost-white">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-ghost-white">
              TERMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
