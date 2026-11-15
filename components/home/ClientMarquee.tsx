'use client'

import { useRef } from 'react'

const CLIENTS = [
  'HYPERION LABS',
  'CHANCE PARFUMS',
  'MATERA ART',
  'SILVR CAPITAL',
  'INTRAMUROS',
  'AURA LIVING',
  'NANO BANANA',
  'METROPOLIS 3D',
  'MONOLITH VENTURES',
  'SYNTH AI',
]

export default function ClientMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative w-full border-y border-ghost-white/10 bg-abyss py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
          [ 03 · TRUSTED BY VISIONARIES &amp; GLOBAL BRANDS ]
        </span>
      </div>

      <div className="flex w-max select-none items-center gap-12 whitespace-nowrap animate-marquee">
        {/* Track 1 */}
        <div className="flex items-center gap-12">
          {CLIENTS.map((client, idx) => (
            <div key={`client-1-${idx}`} className="flex items-center gap-12">
              <span className="font-display text-3xl font-extrabold uppercase tracking-wider text-ghost-white/40 transition-colors hover:text-ghost-white sm:text-5xl">
                {client}
              </span>
              <span className="h-2 w-2 rounded-full bg-toxic-lime/50" />
            </div>
          ))}
        </div>

        {/* Track 2 duplicate for smooth infinite loop */}
        <div className="flex items-center gap-12" aria-hidden="true">
          {CLIENTS.map((client, idx) => (
            <div key={`client-2-${idx}`} className="flex items-center gap-12">
              <span className="font-display text-3xl font-extrabold uppercase tracking-wider text-ghost-white/40 transition-colors hover:text-ghost-white sm:text-5xl">
                {client}
              </span>
              <span className="h-2 w-2 rounded-full bg-toxic-lime/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
