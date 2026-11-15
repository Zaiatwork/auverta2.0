'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'

export default function NammaVideoSection() {
  const containerRef = useRef<HTMLElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useGSAP(
    () => {
      if (!videoWrapperRef.current) return

      // Studio Namma scroll-driven expand & rounded border softening
      gsap.fromTo(
        videoWrapperRef.current,
        {
          scale: 0.92,
          borderRadius: '2.5rem',
          filter: 'brightness(0.9)',
        },
        {
          scale: 1,
          borderRadius: '0.75rem',
          filter: 'brightness(1)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 20%',
            scrub: true,
          },
        }
      )
    },
    { scope: containerRef }
  )

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-abyss py-12 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div
        ref={videoWrapperRef}
        className="relative mx-auto aspect-[16/9] w-full max-w-[1440px] overflow-hidden bg-deep-layer shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-ghost-white/10"
      >
        <video
          ref={videoRef}
          src="https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa50701b9ebf03d3a73aa_light%20Showreel%20%286%29v2-transcode.mp4"
          poster="https://cdn.prod.website-files.com/679cb9cacf00799ba4b4c985%2F68dfa50701b9ebf03d3a73aa_light%20Showreel%20%286%29v2-poster-00001.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />

        {/* Studio Namma HUD Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
          {/* Top Tag */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime bg-abyss/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-ghost-white/10">
              AUVERTA // SHOWREEL 2026
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-ghost-white/60 hidden sm:block">
              [ 60 FPS MOTION SYSTEM ]
            </span>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pointer-events-auto">
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center gap-2 rounded-full bg-abyss/80 backdrop-blur-md px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ghost-white transition-all hover:bg-toxic-lime hover:text-abyss border border-ghost-white/10"
            >
              <span>{isPlaying ? 'PAUSE REEL' : 'PLAY REEL'}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-toxic-lime" />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="rounded-full bg-abyss/80 backdrop-blur-md p-3 text-ghost-white transition-all hover:bg-toxic-lime hover:text-abyss border border-ghost-white/10"
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              <span className="font-mono text-xs uppercase">
                {isMuted ? 'SOUND OFF' : 'SOUND ON'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
