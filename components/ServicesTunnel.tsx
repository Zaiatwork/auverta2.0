'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
  type MotionValue,
} from 'framer-motion'

type Item = { title: string; href: string; img?: string; tone: string }

// Titles and links are DRAFT.
const ITEMS: Item[] = [
  { title: 'Web & Design Development', href: '/services/web-design-development/', tone: 'bg-gradient-to-br from-violet to-night' },
  { title: 'Digital Marketing', href: '/services/digital-marketing/', tone: 'bg-gradient-to-br from-pink to-violet' },
  { title: 'AI Content Creation', href: '/services/ai-content/', tone: 'bg-gradient-to-br from-night to-violet' },
  { title: 'Creative Design', href: '/services/creative-design/', tone: 'bg-gradient-to-br from-violet to-pink' },
  { title: 'SEO / AEO / GEO', href: '/services/seo/', tone: 'bg-gradient-to-br from-night to-pink' },
]

// Tuning knobs
// R: helix radius (px). dTheta: turn per card (deg). dY: drop per card (px).
const DESKTOP = { R: 760, dTheta: 48, dY: 120, perspective: 1200 }
const COMPACT = { R: 520, dTheta: 55, dY: 110, perspective: 900 }
type Geo = typeof DESKTOP

const MotionLink = motion.create(Link)

function useCompact() {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(max-width: 767px)')
    const f = () => setCompact(m.matches)
    f()
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return compact
}

function Card({ item, i, active, geo }: { item: Item; i: number; active: MotionValue<number>; geo: Geo }) {
  // Cards far from the active one fade into the dark (depth fog)
  const opacity = useTransform(active, (a) => {
    const d = Math.abs(i - a)
    if (d < 0.5) return 1
    if (d < 1.5) return 1 - (d - 0.5) * 0.65
    return Math.max(0.1, 0.35 - (d - 1.5) * 0.15)
  })
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? 'auto' : 'none')) as MotionValue<'auto' | 'none'>

  return (
    // The slot is full size, so its transform-origin is the helix axis.
    // Back faces stay visible on purpose (mirrored text on far cards).
    <div
      className="pointer-events-none absolute inset-0 grid place-items-center"
      style={{ transform: `translateY(${i * geo.dY}px) rotateY(${i * geo.dTheta}deg) translateZ(${geo.R}px)` }}
    >
      <MotionLink
        href={item.href}
        aria-label={item.title}
        style={{ opacity, pointerEvents }}
        className="group pointer-events-auto block w-[62vw] max-w-[380px] rounded-[28px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-lime md:w-[32vw] md:max-w-[600px] md:rounded-[36px]"
      >
        <span className={`relative block aspect-[4/5] overflow-hidden rounded-[28px] md:aspect-[3/2] md:rounded-[36px] ${item.tone}`}>
          {item.img ? (
            // eslint-disable-next-line @next/next/no-img-element -- optional card art, no image set yet
            <img
              src={item.img} alt="" loading="lazy" decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-3 rounded-[20px] border border-dashed border-white/40">
              <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-white/60">
                Placeholder · image 3:2
              </span>
            </span>
          )}
          <span className="absolute inset-0 grid place-items-center bg-black/20 p-4 text-center font-display text-[5.6vw] uppercase leading-[1.3] tracking-wide text-white transition-colors group-hover:bg-black/5 md:text-[2.2vw]">
            {item.title}
          </span>
        </span>
      </MotionLink>
    </div>
  )
}

export default function ServicesTunnel({
  title = 'Super Powers',
  id = 'super-powers',
}: { title?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const compact = useCompact()
  const geo: Geo = compact ? COMPACT : DESKTOP
  const geoRef = useRef(geo)
  // eslint-disable-next-line react-hooks/refs -- read inside the transform below, which runs outside render
  geoRef.current = geo
  const last = ITEMS.length - 1

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // small hold at the start and the end
  const raw = useTransform(scrollYProgress, [0.06, 0.94], [0, last])
  const active = useSpring(raw, { stiffness: 140, damping: 28, mass: 0.4 })
  // camera: pull back by R, move down along the helix, rotate around the axis
  const scene = useTransform(
    active,
    (a) => `translateZ(${-geoRef.current.R}px) translateY(${-a * geoRef.current.dY}px) rotateY(${-a * geoRef.current.dTheta}deg)`,
  )

  // slight mouse tilt (mouse only)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-3, 3]), { stiffness: 80, damping: 20 })
  const tiltX = useSpring(useTransform(my, [-1, 1], [2, -2]), { stiffness: 80, damping: 20 })
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  const links = (
    <nav aria-label="All services" className="bg-night px-[5vw] pb-16 text-white">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
        {ITEMS.map((it) => (
          <li key={it.title}><Link href={it.href} className="underline-offset-4 hover:text-white hover:underline">{it.title}</Link></li>
        ))}
      </ul>
    </nav>
  )

  if (reduce) {
    return (
      <>
        <section id={id} className="bg-night px-[5vw] py-24 text-white">
          <h2 className="font-display text-[14vw] uppercase leading-none md:text-[7vw]">{title}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((it) => (
              <li key={it.title}>
                <Link href={it.href} className={`block rounded-[28px] p-8 font-display text-3xl uppercase ${it.tone}`}>{it.title}</Link>
              </li>
            ))}
          </ul>
        </section>
        {links}
      </>
    )
  }

  return (
    <>
      <section
        id={id}
        ref={ref}
        className="relative bg-night text-white"
        style={{ height: `${(ITEMS.length + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: geo.perspective }} onPointerMove={onMove}>
          <h2 className="pointer-events-none absolute left-[5vw] top-24 z-20 font-display text-[14vw] uppercase leading-none md:text-[7vw]">
            {title}
          </h2>
          {/* wrappers are pointer-events-none so they never swallow clicks meant for the cards */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
            <motion.div className="pointer-events-none absolute inset-0" style={{ transform: scene, transformStyle: 'preserve-3d' }}>
              {ITEMS.map((item, i) => (
                <Card key={item.title} item={item} i={i} active={active} geo={geo} />
              ))}
            </motion.div>
          </motion.div>
          {/* edge vignette so cards fade into the section background */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-night)_100%)]" />
          <p className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-widest text-white/60">
            Scroll · click a card
          </p>
        </div>
      </section>
      {links}
    </>
  )
}
