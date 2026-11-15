'use client'

import { useRef } from 'react'
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

const GAP = 700
const START = -200
const PERSPECTIVE = 1100

const POSE = [
  { x: -18, y: -8, ry: 22, rx: -6 },
  { x: 20, y: 6, ry: -20, rx: 5 },
  { x: -16, y: 10, ry: 18, rx: 4 },
  { x: 18, y: -10, ry: -22, rx: -4 },
  { x: -4, y: 0, ry: 8, rx: 0 },
]

const MotionLink = motion.create(Link)

function Card({ item, i, progress, sceneEnd }: {
  item: Item; i: number; progress: MotionValue<number>; sceneEnd: number
}) {
  const pose = POSE[i % POSE.length]
  const baseZ = START - i * GAP

  const opacity = useTransform(progress, (p) => {
    const z = baseZ + p * sceneEnd
    if (z > 450) return 0
    if (z > 150) return 1 - (z - 150) / 300
    return Math.max(0, Math.min(1, 1 + z / 2200))
  })
  const pointerEvents = useTransform(opacity, (o) => (o > 0.3 ? 'auto' : 'none')) as MotionValue<'auto' | 'none'>

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[68vw] max-w-[420px] md:w-[26vw] md:max-w-[480px]"
      style={{
        transform: `translate3d(calc(-50% + ${pose.x}vw * var(--spread)), calc(-50% + ${pose.y}vh), ${baseZ}px) rotateY(${pose.ry}deg) rotateX(${pose.rx}deg)`,
      }}
    >
      <MotionLink
        href={item.href}
        aria-label={item.title}
        style={{ opacity, pointerEvents }}
        className="group block rounded-[28px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-lime md:rounded-[36px]"
      >
        <span className={`relative block aspect-[4/5] overflow-hidden rounded-[28px] md:rounded-[36px] ${item.tone}`}>
          {item.img ? (
            // eslint-disable-next-line @next/next/no-img-element -- optional card art, no image set yet
            <img
              src={item.img} alt="" loading="lazy" decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-3 rounded-[20px] border border-dashed border-white/40">
              <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-white/60">
                Placeholder · image 4:5
              </span>
            </span>
          )}
          <span className="absolute inset-0 grid place-items-center bg-black/20 p-6 text-center font-display text-[7vw] uppercase leading-[1.3] tracking-wide text-white transition-colors group-hover:bg-black/5 md:text-[2.2vw]">
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const sceneEnd = (ITEMS.length - 1) * GAP + 260
  const z = useTransform(scrollYProgress, [0, 1], [0, sceneEnd])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const ry = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { stiffness: 80, damping: 20 })
  const rx = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 80, damping: 20 })
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
        className="relative bg-night text-white [--spread:0.35] md:[--spread:1]"
        style={{ height: `${(ITEMS.length + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: PERSPECTIVE }} onPointerMove={onMove}>
          <h2 className="pointer-events-none absolute left-[5vw] top-24 z-20 font-display text-[14vw] uppercase leading-none md:text-[7vw]">
            {title}
          </h2>
          <motion.div className="absolute inset-0" style={{ z, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
            {ITEMS.map((item, i) => (
              <Card key={item.title} item={item} i={i} progress={scrollYProgress} sceneEnd={sceneEnd} />
            ))}
          </motion.div>
          {/* edge vignette so cards fade into the section background */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--color-night)_100%)]" />
        </div>
      </section>
      {links}
    </>
  )
}
