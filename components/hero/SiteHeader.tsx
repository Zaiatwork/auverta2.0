import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Magnet from '@/components/ui/Magnet'
import Logo from './Logo'
import { HERO } from '@/content/hero'

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto] items-center gap-y-4 px-[clamp(1.25rem,5vw,6rem)] pt-[clamp(1rem,2.8vw,3.4rem)] lg:grid-cols-[1fr_auto_1fr]">
      <FadeIn>
        <Logo />
      </FadeIn>

      <FadeIn delay={120} className="justify-self-end lg:order-3">
        <Magnet>
          <Link
            href={HERO.cta.href}
            className="flex h-[41px] w-[132px] items-center justify-center rounded-full bg-pink text-[14px] font-semibold text-fog"
          >
            {HERO.cta.label}
          </Link>
        </Magnet>
      </FadeIn>

      <FadeIn delay={60} className="col-span-2 justify-self-center lg:order-2 lg:col-span-1">
        <nav
          aria-label="Main"
          className="flex h-[58px] w-[344px] max-w-full items-center justify-between rounded-full bg-night px-[25px] text-[14px] text-white"
        >
          {HERO.nav.map((l) => (
            <Link key={l.label} href={l.href} className="outline-offset-4 hover:underline focus-visible:outline-white">
              {l.label}
            </Link>
          ))}
        </nav>
      </FadeIn>
    </header>
  )
}
