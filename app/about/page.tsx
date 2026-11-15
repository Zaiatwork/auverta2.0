import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import NammaCTASection from '@/components/namma/NammaCTASection'
import { VALUES } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Studio | Auverta Studio',
  description: 'The creative and engineering studio behind unforgettable digital brands.',
  alternates: { canonical: '/about' },
}

const FOUNDERS = [
  { name: 'Josh V.', role: 'Creative Director', image: '/images/founders/josh.jpg' },
  { name: 'Lucy M.', role: 'Head of Brand Strategy', image: '/images/founders/lucy.jpg' },
  { name: 'Martin K.', role: 'Lead Creative Technologist', image: '/images/founders/martin.jpg' },
  { name: 'Luigi R.', role: '3D & Motion Lead', image: '/images/founders/luigi.jpg' },
]

export default function AboutPage() {
  return (
    <div className="relative w-full bg-abyss text-ghost-white">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[75vh] flex-col justify-center px-6 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
            <span>[ 01 · ABOUT AUVERTA STUDIO ]</span>
          </div>
          <h1 className="mt-8 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            DESIGN WITH <span className="text-toxic-lime">WEIGHT</span>. <br />
            CODE WITH DISCIPLINE.
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-ghost-white/70 sm:text-lg">
            We are an independent creative studio at the intersection of branding, immersive web development, and performance culture.
          </p>
        </div>
      </section>

      {/* 2. VALUES SECTION */}
      <section className="border-t border-ghost-white/10 px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
            <span>[ CORE PRINCIPLES ]</span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase sm:text-6xl">
            HOW WE OPERATE
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="group rounded-3xl border border-ghost-white/10 bg-deep-layer/50 p-10 backdrop-blur-xl transition-all duration-300 hover:border-electric-violet"
              >
                <span className="font-mono text-xs font-bold text-toxic-lime">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-ghost-white group-hover:text-toxic-lime sm:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-ghost-white/70">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PEOPLE SECTION */}
      <section className="border-t border-ghost-white/10 bg-deep-layer/20 px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
            <span>[ THE ARCHITECTS ]</span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase sm:text-6xl">
            LEADERSHIP
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDERS.map((person) => (
              <div key={person.name} className="group flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ghost-white/10 bg-deep-layer">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold uppercase text-ghost-white group-hover:text-toxic-lime">
                  {person.name}
                </h3>
                <span className="font-mono text-xs text-ghost-white/50">{person.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <NammaCTASection />
    </div>
  )
}
