'use client'

import { useEffect, useMemo, useRef } from 'react'
import {
  motion, motionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform,
  type MotionValue,
} from 'framer-motion'

type Card = { title: string; tag: string; text: string; img?: string; tone: string }

// All copy is DRAFT
const CARDS: Card[] = [
  { title: 'One roof', tag: 'Everything in one place.', text: 'Brand, web, content and marketing run by one team, so nothing gets lost between freelancers.', tone: 'from-violet to-night' },
  { title: 'Built to scale', tag: 'Systems, not one-offs.', text: 'Design systems and content engines that keep working as your business grows.', tone: 'from-pink to-violet' },
  { title: 'Human + AI', tag: 'Fast, with a human eye.', text: 'AI speeds up production. People keep the ideas, taste and standards high.', tone: 'from-night to-violet' },
  { title: 'Measured growth', tag: 'Numbers over adjectives.', text: 'Every project has clear goals and reporting, so you can see what is working.', tone: 'from-violet to-pink' },
  { title: 'Made to last', tag: 'Built to be used.', text: 'Clean handoff, editable files and honest documentation. Yours to run after launch.', tone: 'from-night to-pink' },
]

const STACK_TOP = 14 // vh, where cards stick
const BACK_SCALE = 0.925 // scale of the card that is covered by the next one

function StackItem({ card, i, arrivals, reduce }: {
  card: Card; i: number; arrivals: MotionValue<number>[]; reduce: boolean | null
}) {
  const ref = useRef<HTMLLIElement>(null)
  const none = useMemo(() => motionValue(0), [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', `start ${STACK_TOP}vh`] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => arrivals[i].set(v))
  useEffect(() => { arrivals[i].set(scrollYProgress.get()) }, [arrivals, i, scrollYProgress])

  const driver = arrivals[i + 1] ?? none // the next card covering this one
  const scale = useTransform(driver, [0, 1], reduce ? [1, 1] : [1, BACK_SCALE])
  const textOpacity = useTransform(arrivals[i], [0.6, 1], reduce ? [1, 1] : [0, 1])
  const textY = useTransform(arrivals[i], [0.6, 1], reduce ? [0, 0] : [24, 0])

  return (
    <li
      ref={ref}
      className={`${reduce ? '' : 'sticky'} list-none pb-[6.1vh]`}
      style={{ top: `calc(${STACK_TOP}vh + ${i * 3}px)` }}
    >
      <motion.article
        style={{ scale }}
        className="mx-auto grid aspect-[3/4] w-[90vw] origin-top grid-rows-[46%_1fr] overflow-hidden rounded-[28px] bg-black md:aspect-[1.83/1] md:w-[65.2vw] md:grid-cols-2 md:grid-rows-1 md:rounded-[2.4vw]"
      >
        <div className={`relative bg-gradient-to-br ${card.tone}`}>
          {card.img ? (
            // eslint-disable-next-line @next/next/no-img-element -- optional card art, no image set yet
            <img src={card.img} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="absolute inset-3 grid place-items-center rounded-2xl border border-dashed border-white/40 text-center text-[10px] uppercase tracking-widest text-white/60">
              Placeholder · image
            </span>
          )}
        </div>
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="flex flex-col items-center justify-center gap-3 px-8 text-center md:gap-[1.2vw] md:px-[4vw]"
        >
          <h3 className="font-display text-[11vw] uppercase leading-[1.25] md:text-[4vw]">{card.title}</h3>
          <p className="text-lg text-lime md:text-[1.35vw]">{card.tag}</p>
          <p className="max-w-[28ch] text-sm text-white/60 md:text-[max(0.8vw,13px)]">{card.text}</p>
        </motion.div>
      </motion.article>
    </li>
  )
}

export default function ValueCards() {
  const reduce = useReducedMotion()
  const arrivals = useMemo(() => CARDS.map(() => motionValue(0)), [])
  return (
    <section id="why" className="bg-night pb-[14vh] pt-[27vh] text-white">
      <ul>
        {CARDS.map((c, i) => (
          <StackItem key={c.title} card={c} i={i} arrivals={arrivals} reduce={reduce} />
        ))}
      </ul>
    </section>
  )
}
