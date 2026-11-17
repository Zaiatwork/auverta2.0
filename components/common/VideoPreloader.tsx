'use client'

import { useEffect, useRef, useState } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const MAX_MS = 6000 // never keep the visitor waiting longer than this, whatever the video does
const KEY = 'auverta-preloader-seen'

// Full-screen intro video. Plays once per browser session, then slides up and reveals the page.
export default function VideoPreloader() {
  const [gone, setGone] = useState(false) // fully removed
  const [leaving, setLeaving] = useState(false) // slide-up running
  const video = useRef<HTMLVideoElement>(null)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const skip = (() => {
      try { return sessionStorage.getItem(KEY) === '1' } catch { return false }
    })() || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (skip) { root.current?.style.setProperty('display', 'none'); return } // DOM write, not setState: no extra render

    document.documentElement.style.overflow = 'hidden'
    const timer = setTimeout(finish, MAX_MS)
    video.current?.play().catch(finish) // autoplay blocked: do not trap the visitor
    function finish() {
      clearTimeout(timer)
      try { sessionStorage.setItem(KEY, '1') } catch { /* private mode: it just plays again next visit */ }
      setLeaving(true)
      document.documentElement.style.overflow = ''
    }
    const v = video.current
    v?.addEventListener('ended', finish)
    v?.addEventListener('error', finish)
    return () => {
      clearTimeout(timer)
      v?.removeEventListener('ended', finish)
      v?.removeEventListener('error', finish)
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (gone) return null
  return (
    <div
      ref={root}
      aria-hidden="true"
      onTransitionEnd={() => leaving && setGone(true)}
      className={`fixed inset-0 z-[300] bg-night transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${leaving ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <video
        ref={video}
        src={`${BASE}/video/preloader.mp4`}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />
      <noscript><style>{'.fixed.z-\\[300\\]{display:none}'}</style></noscript>
    </div>
  )
}
