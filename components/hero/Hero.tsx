import MaskedHeading from '@/components/ui/MaskedHeading'
import SiteHeader from './SiteHeader'
import { HERO } from '@/content/hero'

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-white">
      <SiteHeader />

      <div className="mx-auto w-[calc(100%-2.5rem)] pt-[28svh] lg:w-[57.5%] lg:pt-[17.4vw]">
        {/* width = 9.2em, so the title breaks into the 3 Figma lines */}
        <MaskedHeading
          tag="h1"
          text={HERO.title.join(' ')}
          src="/hero/title-fill.svg"
          className="font-display text-violet"
          weight={400}
          tracking={0}
          lineHeight={1.43}
          textScale={0.1087}
          reveal="rise"
          stagger={0.05}
          letterLift={0.14}
          trigger="mount"
          fillScale={1.2}
        />
      </div>
    </section>
  )
}
