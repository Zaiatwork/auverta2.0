'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PhotoSlot from './PhotoSlot'

const TEXT = 'Why Auverta / One roof / Zero juggling / ' // DRAFT

export default function EdgeHeading() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-38%'])
  const yLeft = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -180])
  const yRight = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [300, -380])

  return (
    <section ref={ref} className="relative bg-night py-[28vh] text-white" style={{ overflowX: 'clip' }}>
      <div className="mx-auto w-[74.4vw] overflow-hidden">
        <motion.h2
          style={{ x }}
          className="w-max whitespace-nowrap font-display text-[17vw] uppercase leading-[1.05] md:text-[11.4vw]"
        >
          {TEXT}{TEXT}
        </motion.h2>
      </div>
      <motion.div style={{ y: yLeft }} className="absolute left-[15.8vw] top-[16%] z-10 w-[28vw] md:w-[17.9vw]">
        <PhotoSlot className="aspect-[2/3]" label="portrait 2:3" tone="from-pink to-violet" />
      </motion.div>
      <motion.div style={{ y: yRight }} className="absolute right-[15.8vw] top-[52%] z-10 w-[34vw] md:w-[23.8vw]">
        <PhotoSlot className="aspect-[9/16]" label="portrait 9:16" tone="from-violet to-night" />
      </motion.div>
    </section>
  )
}
