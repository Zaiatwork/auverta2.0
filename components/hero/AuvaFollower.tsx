'use client'

import { useEffect, useRef, useState } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const MOODS = ['happy', 'excited', 'surprised', 'thinking', 'sleepy'] as const
type Mood = (typeof MOODS)[number]

// Tuning knobs
const SIZE = 110 // px
const SPRING = 0.07 // pull towards the cursor (higher = snappier)
const DAMP = 0.8 // velocity kept per frame (lower = less wobble)
const STRETCH = 0.012 // squash & stretch per px/frame of speed
const TILT = 1.4 // deg of lean per px/frame of sideways speed
const FAST = 22 // px/frame: shocked
const MEDIUM = 7 // px/frame: excited
const IDLE_MS = 2500 // no movement for this long: sleepy
const HOLD_MS = 450 // minimum time between expression changes

const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))

// Auva trails the mouse inside the hero. Speed decides the expression and the squash, lean and wobble. Mouse only.
export default function AuvaFollower() {
  const box = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const [mood, setMood] = useState<Mood>('happy')

  useEffect(() => {
    const el = box.current
    const inner = body.current
    const hero = el?.parentElement
    if (!el || !inner || !hero) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0
    let raf = 0, started = false, lastMove = 0, lastSwap = 0
    let current: Mood = 'happy'
    let calm: Mood = 'happy'

    const pick = (m: Mood, now: number) => {
      if (m === current || now - lastSwap < HOLD_MS) return
      current = m
      lastSwap = now
      setMood(m)
    }

    const tick = (now: number) => {
      vx = (vx + (tx - x) * SPRING) * DAMP
      vy = (vy + (ty - y) * SPRING) * DAMP
      x += vx
      y += vy
      const speed = Math.hypot(vx, vy)

      // squash & stretch along the direction of travel, lean sideways, breathe when still
      const angle = Math.atan2(vy, vx)
      const k = Math.min(speed * STRETCH, 0.3)
      const bob = Math.sin(now / 420) * 3 * (1 - Math.min(speed / 4, 1))
      el.style.transform = `translate3d(${x}px,${y + bob}px,0)`
      inner.style.transform = `rotate(${clamp(vx * TILT, 28)}deg) rotate(${angle}rad) scale(${1 + k},${1 - k}) rotate(${-angle}rad)`

      if (now - lastMove > IDLE_MS) pick('sleepy', now)
      else if (speed > FAST) pick('surprised', now)
      else if (speed > MEDIUM) pick('excited', now)
      else if (speed > 1.5) pick(calm, now)
      raf = requestAnimationFrame(tick)
    }

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = hero.getBoundingClientRect()
      el.style.opacity = e.clientY >= r.top && e.clientY <= r.bottom ? '1' : '0'
      tx = e.clientX - r.left + 18
      ty = e.clientY - r.top + 18
      lastMove = performance.now()
      if (!started) { started = true; x = tx; y = ty; raf = requestAnimationFrame(tick) }
    }

    // gentle moves alternate between happy and thinking
    const calmSwap = setInterval(() => { calm = calm === 'happy' ? 'thinking' : 'happy' }, 2200)
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      clearInterval(calmSwap)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30 opacity-0 transition-opacity duration-300 max-md:hidden"
      style={{ width: SIZE, willChange: 'transform' }}
    >
      <div ref={body} className="relative" style={{ aspectRatio: '436 / 391', willChange: 'transform' }}>
        {/* all moods stay mounted so swapping never flashes */}
        {MOODS.map((m) => (
          // eslint-disable-next-line @next/next/no-img-element -- static SVG, basePath handled by BASE
          <img
            key={m}
            src={`${BASE}/auva/auva-${m}.svg`}
            alt=""
            className={`absolute left-0 top-0 w-full transition-opacity duration-150 ${m === mood ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </div>
  )
}
