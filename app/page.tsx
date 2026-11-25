import Hero from '@/components/hero/Hero'
import ServicesTunnel from '@/components/ServicesTunnel'
import EdgeScene from '@/components/EdgeScene'
import SuperPowers from '@/components/superpowers/SuperPowers'
import ContactCta from '@/components/contact/ContactCta'
import FaqSection from '@/components/faq/FaqSection'
import SiteFooter from '@/components/footer/SiteFooter'

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <SuperPowers />
        <EdgeScene />
        <ServicesTunnel />
        <ContactCta />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  )
}
