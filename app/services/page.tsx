import type { Metadata } from 'next'
import Link from 'next/link'
import NammaCTASection from '@/components/namma/NammaCTASection'
import { SERVICES, TECH_STACK } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services | Auverta Studio',
  description: 'Brand architecture, custom Next.js & Webflow development, 3D experiences, and performance marketing.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <div className="relative w-full bg-abyss text-ghost-white">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[70vh] flex-col justify-center px-6 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
            <span>[ 01 · CAPABILITIES &amp; DISCIPLINES ]</span>
          </div>
          <h1 className="mt-8 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            END-TO-END <br />
            <span className="text-toxic-lime">DIGITAL</span> CRAFT.
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-ghost-white/70 sm:text-lg">
            We don&apos;t build disposable templates. We engineer brand ecosystems, bespoke web architectures, and growth engines built to outlast trends.
          </p>
        </div>
      </section>

      {/* 2. SERVICES BREAKDOWN */}
      <section className="border-t border-ghost-white/10 px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="divide-y divide-ghost-white/10">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="group py-16 transition-colors hover:bg-deep-layer/20">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="font-mono text-sm font-bold text-toxic-lime lg:col-span-2">
                    [0{i + 1}]
                  </div>
                  <div className="lg:col-span-6">
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-ghost-white transition-colors group-hover:text-toxic-lime sm:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-xl font-sans text-sm font-light leading-relaxed text-ghost-white/70 sm:text-base">
                      {s.body}
                    </p>
                  </div>
                  <div className="lg:col-span-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-toxic-lime">
                      [ KEY DELIVERABLES ]
                    </span>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-ghost-white/10 bg-deep-layer/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ghost-white/80"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TECH STACK */}
      <section className="border-t border-ghost-white/10 bg-deep-layer/20 px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-toxic-lime">
            <span>[ TECH STACK &amp; INFRASTRUCTURE ]</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase sm:text-5xl">
            TOOLS WE OBSESS OVER
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((group) => (
              <div
                key={group.group}
                className="rounded-3xl border border-ghost-white/10 bg-deep-layer/60 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md"
              >
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic-lime">
                  {group.group}
                </h3>
                <ul className="mt-6 flex flex-col gap-3 font-sans text-sm text-ghost-white/80">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-toxic-lime" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA CLOSER */}
      <NammaCTASection />
    </div>
  )
}
