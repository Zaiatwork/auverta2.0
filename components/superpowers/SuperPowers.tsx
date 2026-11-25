'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

import { SUPER_POWERS } from '@/content/superPowers'
import { TILES } from '@/content/superPowerTiles'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const S = 1 + SUPER_POWERS.length // scene 0 = intro, then one scene per service
// Tuning knobs for the spiral tunnel
const CFG = { N: TILES.length, TURNS: 3, Z_FAR: -3200, TILT_Y: 28, TILT_X: 18, FLOW_TOTAL: S * 0.3, DRIFT: 0.004, SMOOTH_MS: 140, SPOT_MS: 300 }
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const pad = (n: number) => String(n).padStart(2, '0')

export default function SuperPowers() {
  const reduce = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const tiles = useRef<(HTMLDivElement | null)[]>([])
  const scenes = useRef<(HTMLElement | null)[]>([])
  const dots = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const trackEl = track.current, stageEl = stage.current
    if (!trackEl || !stageEl) return
    const els = tiles.current as HTMLDivElement[]
    const panels = scenes.current as HTMLElement[]
    const dotEls = dots.current as HTMLButtonElement[]
    const vids = els.map((t) => t.querySelector('video'))
    const spot = new Array<number>(CFG.N).fill(0.7)
    const still = !!reduce

    let W = 1, H = 1, R = 330, zNear = 800, maxPlay = 8
    let target = 0, sp = 0, drift = 0, last = 0, t0 = 0, raf = 0, visible = false, resizeRaf = 0, cur = -1

    const measure = () => {
      W = innerWidth; H = innerHeight
      const phone = W < 820 && H > W
      const s = Math.max(0.45, Math.min(W / 1440, H / 900))
      const size = phone ? Math.round(Math.min(W * 0.26, 120)) : Math.round(150 * s)
      R = phone ? 0.34 * W : Math.round(330 * s)
      const persp = phone ? 800 : 1000
      zNear = persp - 200 // keep the nearest tile in front of the camera plane
      maxPlay = phone ? 5 : 8
      stageEl.style.perspective = `${persp}px`
      stageEl.style.setProperty('--t', `${size}px`)
    }
    const run = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame) } }
    const readScroll = () => {
      const b = trackEl.getBoundingClientRect()
      target = clamp(-b.top / (b.height - innerHeight))
      if (still) run() // no loop in reduced motion: redraw on scroll only
    }

    const frame = (now: number) => {
      const dt = Math.min(40, now - (last || now)); last = now
      if (still) sp = target
      else {
        sp += (target - sp) * (1 - Math.exp(-dt / CFG.SMOOTH_MS)) // one smoothed value drives tunnel and text
        drift += CFG.DRIFT * dt / 1000
      }
      const flow = still ? 0 : sp * CFG.FLOW_TOTAL + drift

      // ---- scenes: fly through, neighbours cross-fade ----
      let best = 0, bestO = -1
      for (let k = 0; k < S; k++) {
        const q = clamp((sp - k / S) * S), outAt = k === S - 1 ? 0.9 : 0.85
        const o = still ? (clamp(sp * S, 0, S - 0.001) | 0) === k ? 1 : 0
          : Math.min(k === 0 ? 1 : clamp(q / 0.15), 1 - clamp((q - outAt) / (1 - outAt)))
        const sc = still ? 1 : (k === 0 ? 1 : 0.94 + 0.06 * clamp(q / 0.15)) + 0.08 * clamp((q - outAt) / (1 - outAt))
        panels[k].style.opacity = String(o)
        panels[k].style.transform = `scale(${sc})`
        if (o > bestO) { bestO = o; best = k }
      }
      if (best !== cur) {
        cur = best
        panels.forEach((p, k) => {
          p.style.pointerEvents = k === cur ? 'auto' : 'none'
          p.inert = k !== cur
          p.setAttribute('aria-hidden', String(k !== cur))
        })
        dotEls.forEach((d, k) => {
          d.style.background = k === cur ? '#fff' : 'rgba(255,255,255,.3)'
          d.style.transform = k === cur ? 'scale(1.5)' : 'none'
        })
      }

      // ---- tiles ----
      const open = t0 ? now - t0 : 0
      const active: { pri: number; u: number; v: HTMLVideoElement }[] = []
      const match = cur > 0 ? SUPER_POWERS[cur - 1].category : null
      for (let i = 0; i < CFG.N; i++) {
        const u = (((i / CFG.N - flow) % 1) + 1) % 1
        const th = Math.PI * 2 * CFG.TURNS * u + flow * Math.PI
        const cos = Math.cos(th), sin = Math.sin(th)
        const z = zNear + (CFG.Z_FAR - zNear) * u
        const want = match === null ? 0.7 : TILES[i].category === match ? 1 : 0.35
        spot[i] = still ? want : spot[i] + (want - spot[i]) * (1 - Math.exp(-dt / CFG.SPOT_MS))
        // opening: nearest first, 600ms each, ease-out sine
        const k = still ? 1 : t0 ? Math.sin(clamp((open - u * 600) / 600) * Math.PI / 2) : 0
        const o = Math.min(1, (1 - u) / 0.15, u / 0.1) * k * spot[i]
        const el = els[i]
        el.style.opacity = String(o)
        el.style.transform = `translate(-50%,-50%) translate3d(${cos * R}px,${sin * R}px,${z}px) rotateY(${-cos * CFG.TILT_Y}deg) rotateX(${sin * CFG.TILT_X}deg) scale(${0.9 + 0.1 * k})`
        const v = vids[i]
        if (v) {
          if (u < 0.75 && v.preload !== 'auto') v.preload = 'auto'
          if (o > 0.15 && u < 0.55) active.push({ pri: want === 1 ? 0 : 1, u, v })
        }
      }
      if (!still) {
        const play = new Set(active.sort((a, b) => a.pri - b.pri || a.u - b.u).slice(0, maxPlay).map((a) => a.v))
        for (const v of vids) {
          if (!v) continue
          if (play.has(v)) { if (v.paused) v.play().catch(() => {}) } else if (!v.paused) v.pause()
        }
      }
      raf = visible && !still ? requestAnimationFrame(frame) : 0
    }

    const pauseAll = () => vids.forEach((v) => v && !v.paused && v.pause())
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) { if (!t0) t0 = performance.now(); readScroll(); run() } else pauseAll()
    }, { rootMargin: '200px' })
    io.observe(trackEl)

    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => { measure(); readScroll(); run() })
    }
    const onVis = () => { if (document.hidden) pauseAll() }
    measure(); readScroll(); sp = target
    addEventListener('scroll', readScroll, { passive: true })
    addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(resizeRaf)
      removeEventListener('scroll', readScroll); removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis); pauseAll()
    }
  }, [reduce])

  const goTo = (k: number) => {
    const t = track.current
    if (!t) return
    const top = t.getBoundingClientRect().top + scrollY + ((k + 0.5) / S) * (t.offsetHeight - innerHeight)
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  const sceneCls = 'absolute left-1/2 top-1/2 flex max-h-[78svh] w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-[radial-gradient(closest-side,rgba(0,0,0,.78),rgba(0,0,0,0))] px-[4vw] py-[6vh] text-center [text-shadow:0_2px_24px_rgba(0,0,0,.6)]'
  return (
    <section id="super-powers" aria-label="Super Powers" className="bg-black text-white">
      <div ref={track} style={{ height: `${100 + S * 130}vh` }} className="bg-black">
        <div ref={stage} className="sticky top-0 h-svh overflow-hidden bg-black [--t:150px]" style={{ perspective: 1000, perspectiveOrigin: '50% 50%' }}>
          <div aria-hidden className="absolute inset-0 [transform-style:preserve-3d]">
            {TILES.map((t, i) => (
              <div
                key={i}
                ref={(el) => { tiles.current[i] = el }}
                className="absolute left-1/2 top-1/2 aspect-square w-[var(--t)] overflow-hidden rounded-[14px] bg-gradient-to-br from-[#141414] to-plum opacity-0 will-change-[transform,opacity] [backface-visibility:visible]"
              >
                {t.type === 'video' ? (
                  <video
                    src={`${BASE}${t.src}`} poster={t.poster ? `${BASE}${t.poster}` : undefined}
                    muted loop playsInline preload="none"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized
                  <img
                    src={`${BASE}${t.src}`} alt="" loading="lazy" decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/45 px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none text-[#a8a8a0]">
                  {t.category}
                </span>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            <section ref={(el) => { scenes.current[0] = el }} data-scene="intro" className={sceneCls}>
              <h2 className="font-display text-[8vw] uppercase leading-none tracking-[-0.03em] md:text-[3.4vw]">Super Powers</h2>
            </section>
            {SUPER_POWERS.map((s, i) => (
              <section key={s.href} ref={(el) => { scenes.current[i + 1] = el }} data-scene={s.href} className={`${sceneCls} opacity-0`}>
                <p className="font-mono text-xs text-[#a8a8a0]">{pad(i + 2)} / {pad(S)}</p>
                <h3 className="mt-3 text-[clamp(32px,9vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[clamp(40px,6vw,96px)]">
                  {s.title[0]}<br />{s.title[1]}
                </h3>
                <p className="mt-5 max-w-[28ch] text-sm text-[#a8a8a0] md:max-w-[34ch] md:text-[clamp(14px,1.4vw,20px)]">{s.text}</p>
                <Link href={s.href} className="mt-7 rounded-full bg-white px-7 py-3 text-sm text-night transition-transform hover:scale-105">
                  Explore in detail
                </Link>
              </section>
            ))}
          </div>

          <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
            {Array.from({ length: S }, (_, k) => (
              <button
                key={k} type="button" ref={(el) => { dots.current[k] = el }} onClick={() => goTo(k)}
                aria-label={k === 0 ? 'Super Powers intro' : `${SUPER_POWERS[k - 1].title[0]} ${SUPER_POWERS[k - 1].title[1]}`}
                className="h-2 w-2 rounded-full bg-white/30"
              />
            ))}
          </div>
        </div>
      </div>
      <ul className="sr-only">
        {SUPER_POWERS.map((s) => (
          <li key={s.href}><Link href={s.href}>{s.title[0]} {s.title[1]}</Link>: {s.text}</li>
        ))}
      </ul>
    </section>
  )
}
