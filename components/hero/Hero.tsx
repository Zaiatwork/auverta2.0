import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import SiteHeader from './SiteHeader'
import { HERO } from '@/content/hero'

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-white">
      <SiteHeader />

      <h1 className="px-5 pt-[28svh] text-center font-display text-[clamp(3rem,12.5vw,5rem)] uppercase leading-[1.43] text-violet lg:pt-[17.4vw] xl:text-[6.25vw]">
        {HERO.title.map((line, i) => (
          <span key={line} className="line-reveal block overflow-hidden">
            <span style={{ '--d': `${150 + i * 120}ms` } as React.CSSProperties}>{line}</span>
          </span>
        ))}
      </h1>

      <FadeIn delay={700} className="absolute left-[76.6%] top-[83%]">
        <Image src="/hero/cursor.svg" alt="" width={47} height={47} unoptimized priority className="-rotate-[9.05deg]" />
      </FadeIn>
    </section>
  )
}
