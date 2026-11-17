'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef } from 'react'
import {
  motion, motionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform,
  type MotionValue,
} from 'framer-motion'

import { SUPER_POWERS as BANDS, type SuperPower as Band } from '@/content/superPowers'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const TILT = 14 // deg, how far a covered band leans back
const BACK_SCALE = 0.9

function BandItem({ band, i, arrivals, reduce }: {
  band: Band; i: number; arrivals: MotionValue<number>[]; reduce: boolean | null
}) {
  const ref = useRef<HTMLElement>(null)
  const none = useMemo(() => motionValue(0), [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => arrivals[i].set(v))
  useEffect(() => { arrivals[i].set(scrollYProgress.get()) }, [arrivals, i, scrollYProgress])

  const next = arrivals[i + 1] ?? none // the next band sliding over this one
  const rotateX = useTransform(next, [0, 1], reduce ? [0, 0] : [0, TILT])
  const scale = useTransform(next, [0, 1], reduce ? [1, 1] : [1, BACK_SCALE])
  const shade = useTransform(next, [0, 1], reduce ? [0, 0] : [0, 0.35])

  return (
    <section ref={ref} className="relative md:sticky md:top-0" style={{ zIndex: i + 1 }}>
      <motion.div
        style={{ rotateX, scale, transformPerspective: 1400, transformOrigin: '50% 100%' }}
        className={`relative overflow-hidden bg-gradient-to-br ${band.tone} px-5 pb-[8vh] pt-[14vh] text-white md:h-svh md:px-[10.8vw] md:pt-[16vh]`}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-[11vw] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[max(3.3vw,30px)]">
            {band.title[0]}<br />{band.title[1]}
          </h2>
          <span className="text-[18vw] font-bold leading-none tracking-[-0.04em] md:text-[6.5vw]">
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="relative mt-[5vh] border border-white/25 p-6 pb-14 md:p-[1.6vw] md:pb-[3.4vw]">
          <p className="max-w-[52ch] text-lg font-semibold leading-tight tracking-tight md:text-[max(1.35vw,17px)]">{band.text}</p>
          <Link
            href={band.href}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-white px-7 py-3 text-sm text-night transition-transform hover:scale-105"
          >
            Explore in detail
          </Link>
        </div>

        <div className={`mt-[7vh] grid gap-3 rounded-[24px] bg-white/15 p-3 md:gap-[0.8vw] md:p-[0.9vw] ${band.imgs.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {band.imgs.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized
            <img key={src} src={`${BASE}/images/super-power/${src}`} alt="" loading="lazy" decoding="async" className="aspect-video w-full rounded-[18px] object-cover md:aspect-auto md:h-[34vh]" />
          ))}
        </div>

        <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.div>
    </section>
  )
}

export default function ValueCards() {
  const reduce = useReducedMotion()
  const arrivals = useMemo(() => BANDS.map(() => motionValue(0)), [])
  return (
    <div id="super-powers" className="bg-white">
      {BANDS.map((b, i) => (
        <BandItem key={b.title[0]} band={b} i={i} arrivals={arrivals} reduce={reduce} />
      ))}
    </div>
  )
}
