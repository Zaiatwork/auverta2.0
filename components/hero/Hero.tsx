import FoldText from '@/components/FoldText'
import SiteHeader from './SiteHeader'
import AuvaFollower from './AuvaFollower'
import { HERO } from '@/content/hero'

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-white">
      <SiteHeader />
      <AuvaFollower />

      <h1 className="px-5 pt-[22svh] text-center font-display text-[clamp(3rem,12.5vw,5rem)] uppercase leading-[1.43] text-violet lg:pt-[13vw] xl:text-[6.25vw]">
        <FoldText text={HERO.title.join('\n')} hoverRefold className="block" />
      </h1>
    </section>
  )
}
